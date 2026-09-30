#!/usr/bin/env python3
"""Sync repository job specs into existing scheduler jobs and install checks."""
import json
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
scheduler = Path.home() / '.config/opencode/scheduler/scopes'
for spec_path in sorted((root / '.opencode/jobs').glob('*.json')):
    spec = json.loads(spec_path.read_text())
    matches = []
    for active_path in scheduler.glob('*/jobs/*.json'):
        active = json.loads(active_path.read_text())
        if active.get('name') == spec['name'] and Path(active.get('workdir', '')).resolve() == root:
            matches.append((active_path, active))
    if len(matches) != 1:
        raise SystemExit(f"Expected one active job for {spec['name']}, found {len(matches)}; register first")
    active_path, active = matches[0]
    command = ['/root/.opencode/bin/opencode', 'run', '--agent', spec.get('agent', 'build'),
               '--model', spec['model'], '--variant', spec.get('variant', 'high')]
    if spec.get('files'):
        command += ['--file', spec['files']]
    command += ['--', spec['prompt']]
    guard = ['python3', str(root / 'scripts/pipeline-guard.py'), 'run', '--job', spec['name'], '--', *command]
    if (root / 'scripts/content-pipeline-lock.sh').exists():
        guard = ['env', 'PIPELINE_LOCK_HELD=1', 'scripts/content-pipeline-lock.sh', 'run', spec['name'], '--', *guard]
    active.update(prompt=spec['prompt'], timeoutSeconds=spec.get('timeoutSeconds', 3600),
                  invocation=dict(command=guard[0], args=guard[1:]),
                  run=dict(agent=spec.get('agent', 'build'), model=spec['model'],
                           variant=spec.get('variant', 'high'), prompt=spec['prompt']))
    temporary = active_path.with_suffix('.tmp')
    temporary.write_text(json.dumps(active, indent=2) + '\n')
    temporary.replace(active_path)
    # Preserve timer names and schedules; source specs must agree with active schedules.
    if active['schedule'] != spec['schedule']:
        raise SystemExit(f"Schedule drift for {spec['name']}: register updated schedule first")
    print('Synced guarded job:', spec['name'])

hooks = root / '.pipeline-hooks'
hooks.mkdir(exist_ok=True)
hook = hooks / 'pre-push'
hook.write_text('''#!/usr/bin/env bash
set -euo pipefail
changed=0
while read -r local_ref local_sha remote_ref remote_sha; do
  [[ "$local_sha" =~ ^0+$ ]] && continue
  if [[ "$remote_sha" =~ ^0+$ ]]; then
    remote_sha=$(git hash-object -t tree /dev/null)
  fi
  if git diff --name-only "$remote_sha" "$local_sha" -- src/content/blog data/blog content-loops/ledger.json | grep -q .; then
    changed=1
  fi
done
if [[ "$changed" == 1 ]]; then
  if [[ -f content-loops/ledger.json ]]; then
    node scripts/validate-ledger.mjs
    node .yarn/releases/yarn-3.6.1.cjs build
  else
    npm run build
  fi
fi
''')
hook.chmod(0o755)
existing = subprocess.run(['git', 'config', '--get', 'core.hooksPath'], cwd=root, text=True, capture_output=True).stdout.strip()
if existing and existing != '.pipeline-hooks':
    raise SystemExit('Existing hooksPath needs manual integration: ' + existing)
subprocess.check_call(['git', 'config', 'core.hooksPath', '.pipeline-hooks'], cwd=root)

name = 'content-pipeline-health-' + root.name
units = Path.home() / '.config/systemd/user'
(units / (name + '.service')).write_text(f'''[Unit]
Description=Verify content pipeline and live publications: {root.name}
[Service]
Type=oneshot
WorkingDirectory={root}
Environment="PATH=/root/.local/bin:/root/.opencode/bin:/usr/local/bin:/usr/bin:/bin"
ExecStart=/usr/bin/python3 {root}/scripts/pipeline-guard.py health
StandardOutput=journal
StandardError=journal
''')
(units / (name + '.timer')).write_text(f'''[Unit]
Description=Hourly publication health check: {root.name}
[Timer]
OnCalendar=hourly
Persistent=true
RandomizedDelaySec=120
[Install]
WantedBy=timers.target
''')
print('Installed hooks and health timer:', name)
