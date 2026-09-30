#!/usr/bin/env python3
"""Run content jobs under a repository lock and verify their actual outcome."""
import argparse
import fcntl
import html as html_module
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
os.environ['PATH'] = str(Path.home() / '.local/bin') + ':' + os.environ.get('PATH', '/usr/bin:/bin')
STATE = Path.home() / '.local/state/content-pipelines' / ROOT.name
SITE = {'bask-landing': 'https://www.getbask.app', 'olly-landing': 'https://ollyposture.com',
        'relocate-to-japan-pipeline': 'https://www.relocatetojapan.com',
        'relocate-to-japan': 'https://www.relocatetojapan.com'}

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT, text=True).strip()

def published():
    directory = ROOT / ('data/blog' if (ROOT / 'content-loops/ledger.json').exists() else 'src/content/blog')
    result = {}
    for path in directory.glob('*.mdx'):
        raw = path.read_text()
        front = raw.split('---', 2)[1]
        if re.search(r'^draft:\s*true\s*$', front, re.M):
            continue
        title = re.search(r'^title:\s*(.+)$', front, re.M)
        result[path.stem] = title.group(1).strip("'\"") if title else path.stem
    return result

def pending(job):
    if (ROOT / 'content-loops/ledger.json').exists():
        ledger = json.loads((ROOT / 'content-loops/ledger.json').read_text())
        statuses = ['APPROVED'] if 'publisher' in job else (['BRIEFED', 'NEEDS_REVIEW'] if 'writer' in job else ['DRAFT', 'NEEDS_REVIEW'])
        return [a['slug'] for a in ledger['articles'] if a['status'] in statuses]
    statuses = ['READY TO PUBLISH'] if 'publisher' in job else (['NEEDS REVIEW'] if 'writer' in job else ['DRAFT', 'NEEDS REVIEW'])
    return [p.stem for p in (ROOT / 'content-loops/posts').glob('*.md')
            if p.read_text().splitlines()[0].removeprefix('Status: ') in statuses]

def live(slugs, wait=0):
    deadline = time.monotonic() + wait
    errors = []
    while True:
        errors = []
        def fetch(url):
            request = urllib.request.Request(url, headers={'User-Agent': 'ContentPipelineHealth/1.0'})
            with urllib.request.urlopen(request, timeout=25) as response:
                return response.url, response.read().decode()
        sitemap_urls = set()
        try:
            base = SITE[ROOT.name]
            sitemap_path = '/sitemap.xml' if 'relocate' in ROOT.name else '/sitemap-index.xml'
            _, sitemap = fetch(base + sitemap_path)
            tree = ET.fromstring(sitemap)
            locations = [node.text for node in tree.iter() if node.tag.endswith('loc')]
            if tree.tag.endswith('sitemapindex'):
                for location in locations:
                    _, child = fetch(location)
                    sitemap_urls.update(node.text.rstrip('/') for node in ET.fromstring(child).iter() if node.tag.endswith('loc'))
            else:
                sitemap_urls.update(location.rstrip('/') for location in locations)
        except Exception as error:
            errors.append(f'production sitemap: {error}')
        for slug, title in slugs.items():
            url = SITE[ROOT.name] + '/blog/' + slug
            try:
                actual_url, html = fetch(url)
                if '/blog/' + slug not in actual_url:
                    raise ValueError('unexpected redirect')
                heading = re.search(r'<h1\b[^>]*>(.*?)</h1>', html, re.S)
                def normalize(value):
                    return ' '.join(html_module.unescape(re.sub(r'<[^>]+>', '', value)).replace("\\'", "'").replace("''", "'").split())
                if not heading or normalize(heading.group(1)) != normalize(title):
                    raise ValueError('expected article title is missing')
                if url.rstrip('/') not in sitemap_urls:
                    raise ValueError('article missing from production sitemap')
            except Exception as error:
                errors.append(f'{url}: {error}')
        if not errors or time.monotonic() >= deadline:
            return errors
        time.sleep(30)

def report(name, errors, **details):
    STATE.mkdir(parents=True, exist_ok=True)
    result = dict(job=name, checkedAt=time.time(), status='failed' if errors else 'success',
                  errors=errors, **details)
    target = STATE / (name + '.json')
    temporary = target.with_suffix('.tmp')
    temporary.write_text(json.dumps(result, indent=2) + '\n')
    temporary.replace(target)
    print(json.dumps(result), flush=True)
    return 1 if errors else 0

def checkpoint_drafts(before):
    """Preserve interrupted RTJ work without approving or publishing it."""
    if not (ROOT / 'content-loops/ledger.json').exists() or git('diff', '--cached', '--name-only'):
        return
    changed = git('diff', '--name-only').splitlines()
    untracked = git('ls-files', '--others', '--exclude-standard').splitlines()
    paths = changed + untracked
    if not paths:
        return
    ledger = json.loads((ROOT / 'content-loops/ledger.json').read_text())
    old = json.loads(subprocess.check_output(['git', 'show', before + ':content-loops/ledger.json'], cwd=ROOT))
    original = {a['slug']: a for a in old['articles']}
    if any(a['status'] in ['APPROVED', 'PUBLISHED'] and a != original.get(a['slug']) for a in ledger['articles']):
        return
    if any(ledger[key] != old[key] for key in ['mode', 'publishingEnabled', 'pilotPublished']):
        return
    safe = {a['path'] for a in ledger['articles'] if a.get('managed') and a['status'] in ['DRAFT', 'NEEDS_REVIEW']
            and original.get(a['slug'], {}).get('status') in ['DRAFT', 'NEEDS_REVIEW', 'BRIEFED']}
    if any(p not in safe | {'content-loops/ledger.json'} for p in paths):
        return
    for p in paths:
        if p.endswith('.mdx') and not re.search(r'^draft:\s*true\s*$', (ROOT / p).read_text().split('---', 2)[1], re.M):
            return
    if subprocess.call(['node', 'scripts/validate-ledger.mjs'], cwd=ROOT):
        return
    subprocess.check_call(['git', 'add', '--', *paths], cwd=ROOT)
    subprocess.check_call(['git', 'commit', '-m', 'content: checkpoint unfinished draft review (not approved)'], cwd=ROOT)
    subprocess.check_call(['git', 'push', 'origin', 'HEAD:main'], cwd=ROOT)

def run(job, command):
    STATE.mkdir(parents=True, exist_ok=True)
    with (STATE / 'run.lock').open('w') as lock:
        # Serialize stages, including manual recovery runs crossing a timer boundary.
        # The supervisor's timeout still bounds this wait.
        fcntl.flock(lock, fcntl.LOCK_EX)
        owner_name = git('config', '--global', '--get', 'user.name')
        owner_email = git('config', '--global', '--get', 'user.email')
        if not owner_name or not owner_email:
            return report(job, ['missing repository owner Git identity'])
        for role in ['AUTHOR', 'COMMITTER']:
            os.environ['GIT_' + role + '_NAME'] = owner_name
            os.environ['GIT_' + role + '_EMAIL'] = owner_email
        before = git('rev-parse', 'HEAD')
        was_pending = pending(job) if any(stage in job for stage in ['review', 'publisher', 'writer']) else []
        was_published = published()
        permission = json.loads(os.environ.get('OPENCODE_PERMISSION', '{}'))
        permission['external_directory'] = {'*': 'deny', '/tmp/**': 'allow'}
        permission.update(question='deny', task='deny', bash={'*': 'deny', 'git *': 'allow', 'rtk git *': 'allow', 'npm run build': 'allow', 'rtk npm run build': 'allow', 'rtk ls *': 'allow', 'rtk grep *': 'allow', 'rtk find *': 'allow', 'rtk cat *': 'allow', 'rtk head *': 'allow', 'rtk tail *': 'allow', 'node *': 'allow', 'curl *': 'allow', 'rtk curl *': 'allow', 'grep *': 'allow', 'rg *': 'allow', 'rtk rg *': 'allow', 'find *': 'allow', 'ls *': 'allow', 'date *': 'allow', 'wc *': 'allow', 'rtk wc *': 'allow', 'sha256sum *': 'allow', 'python3 *': 'allow', 'scripts/content-pipeline-lock.sh *': 'allow', 'sleep *': 'allow', 'sed *': 'allow', 'head *': 'allow', 'tail *': 'allow', 'sort *': 'allow', 'uniq *': 'allow', 'tr *': 'allow', 'cut *': 'allow', 'printf *': 'allow', 'cat *': 'allow', 'mkdir -p *': 'allow', 'test *': 'allow'})
        os.environ['OPENCODE_PERMISSION'] = json.dumps(permission)
        capture = STATE / (job + '.latest.log')
        with capture.open('w') as output:
            child = subprocess.Popen(command, cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            for line in child.stdout:
                print(line, end='', flush=True)
                output.write(line)
                output.flush()
            code = child.wait()
        raw = re.sub(r'\x1b\[[0-9;]*m', '', capture.read_text())
        statuses = re.findall(r'Status:\s*(?:\*\*)?\s*(success|skipped|partial|failed)', raw, re.I)
        errors = []
        if code:
            errors.append(f'agent exit code {code}')
        if 'Maximum steps for this agent have been reached' in raw:
            errors.append('agent exhausted its step budget')
        if not statuses:
            errors.append('missing final output contract')
        elif statuses[-1].lower() in ['partial', 'failed']:
            errors.append('agent reported ' + statuses[-1])
        elif statuses[-1].lower() == 'skipped' and was_pending:
            errors.append('job skipped with pending work: ' + ', '.join(was_pending))
        if was_pending and before == git('rev-parse', 'HEAD'):
            errors.append('pending work produced no committed progress')
        if git('status', '--porcelain') and (ROOT / 'content-loops/ledger.json').exists():
            errors.append('job left unfinished work; attempting safe draft checkpoint')
            checkpoint_drafts(before)
        if git('rev-parse', 'HEAD') != git('rev-parse', 'origin/main'):
            errors.append('local commit is not pushed to origin/main')
        new = {s: t for s, t in published().items() if s not in was_published}
        if new:
            live_errors = live(new, wait=600)
            # Vercel propagation can outlast the agent's immediate GET. The guard
            # is authoritative only for this narrowly identified transient error.
            if not live_errors and errors == ['agent reported failed'] and re.search(r'Reason:.*(?:live|URL).*(?:404|deployment|propagat)', raw, re.I):
                errors = []
            errors.extend(live_errors)
        return report(job, errors, before=before, after=git('rev-parse', 'HEAD'), newPublished=list(new))

def health():
    errors = []
    directory = 'data/blog' if (ROOT / 'content-loops/ledger.json').exists() else 'src/content/blog'
    # A draft checkpoint must not reset the publication freshness clock.
    dates = [git('log', '-1', '--format=%ct', '--', directory + '/' + slug + '.mdx') for slug in published()]
    timestamp = max((int(date) for date in dates if date), default=0)
    age = (time.time() - int(timestamp)) / 86400 if timestamp else 999
    if age > 14:
        errors.append(f'no publication/content update in {age:.1f} days (limit: 14)')
    if (ROOT / 'content-loops/ledger.json').exists() and git('status', '--porcelain'):
        errors.append('pipeline worktree is dirty')
    if git('rev-parse', 'HEAD') != git('rev-parse', 'origin/main'):
        errors.append('local HEAD differs from origin/main')
    public = published()
    ledger_path = ROOT / 'content-loops/ledger.json'
    if ledger_path.exists():
        marked = [a['slug'] for a in json.loads(ledger_path.read_text())['articles'] if a['status'] == 'PUBLISHED']
    else:
        marked = [p.stem for p in (ROOT / 'content-loops/posts').glob('*.md') if p.read_text().startswith('Status: PUBLISHED')]
    for slug in marked:
        if slug not in public:
            errors.append(f'{slug}: marked PUBLISHED but no publishable MDX exists')
    live_errors = live(public)
    for path in STATE.glob('*.json'):
        if path.stem == 'health':
            continue
        outcome = json.loads(path.read_text())
        if outcome['status'] == 'failed':
            if (not live_errors and 'publisher' in outcome['job']
                and outcome.get('newPublished') and outcome['errors'] == ['agent reported failed']
                and all(slug in public for slug in outcome['newPublished'])):
                # Keep the failed-run history; current health reflects recovered deployment.
                continue
            errors.append(f"{outcome['job']}: " + '; '.join(outcome['errors']))
    errors.extend(live_errors)
    return report('health', errors, publicationAgeDays=round(age, 1), publishedCount=len(published()),
                  reviewQueue=pending('review'), publishQueue=pending('publisher'))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['run', 'health'])
    parser.add_argument('--job')
    args, command = parser.parse_known_args()
    if command[:1] == ['--']:
        command = command[1:]
    try:
        sys.exit(health() if args.mode == 'health' else run(args.job, command))
    except Exception as error:
        sys.exit(report(args.job or args.mode, [str(error)]))
