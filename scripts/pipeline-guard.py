#!/usr/bin/env python3
"""Run content jobs under a repository lock and verify their actual outcome."""
import argparse
import fcntl
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

os.environ['PATH'] = str(Path.home() / '.local/bin') + ':' + os.environ.get('PATH', '/usr/bin:/bin')
ROOT = Path(__file__).resolve().parents[1]
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
        statuses = ['APPROVED'] if 'publisher' in job else ['DRAFT', 'NEEDS_REVIEW']
        return [a['slug'] for a in ledger['articles'] if a['status'] in statuses]
    statuses = ['READY TO PUBLISH'] if 'publisher' in job else ['DRAFT', 'NEEDS REVIEW']
    return [p.stem for p in (ROOT / 'content-loops/posts').glob('*.md')
            if p.read_text().splitlines()[0].removeprefix('Status: ') in statuses]

def live(slugs, wait=0):
    deadline = time.monotonic() + wait
    errors = []
    while True:
        errors = []
        for slug, title in slugs.items():
            url = SITE[ROOT.name] + '/blog/' + slug
            try:
                request = urllib.request.Request(url, headers={'User-Agent': 'ContentPipelineHealth/1.0'})
                with urllib.request.urlopen(request, timeout=25) as response:
                    html = response.read().decode()
                    if response.status != 200 or '/blog/' + slug not in response.url:
                        raise ValueError('unexpected response or redirect')
                    if not re.search(r'<h1\b', html) or slug not in html:
                        raise ValueError('article content/canonical missing')
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
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        before = git('rev-parse', 'HEAD')
        was_pending = pending(job) if 'review' in job or 'publisher' in job else []
        was_published = published()
        capture = STATE / (job + '.latest.log')
        with capture.open('w') as output:
            child = subprocess.Popen(command, cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            for line in child.stdout:
                print(line, end='', flush=True)
                output.write(line)
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
            errors.extend(live(new, wait=600))
        return report(job, errors, before=before, after=git('rev-parse', 'HEAD'), newPublished=list(new))

def health():
    errors = []
    directory = 'data/blog' if (ROOT / 'content-loops/ledger.json').exists() else 'src/content/blog'
    timestamp = git('log', '-1', '--format=%ct', '--', directory)
    age = (time.time() - int(timestamp)) / 86400 if timestamp else 999
    if age > 14:
        errors.append(f'no publication/content update in {age:.1f} days (limit: 14)')
    if (ROOT / 'content-loops/ledger.json').exists() and git('status', '--porcelain'):
        errors.append('pipeline worktree is dirty')
    for path in STATE.glob('*.json'):
        if path.stem == 'health':
            continue
        outcome = json.loads(path.read_text())
        if outcome['status'] == 'failed':
            errors.append(f"{outcome['job']}: " + '; '.join(outcome['errors']))
    errors.extend(live(published()))
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
