#!/usr/bin/env bash
set -euo pipefail

# Register all scheduler jobs from .opencode/jobs/*.json
# Run this once on a fresh VPS (or after adding new jobs).
# Idempotent: deletes existing jobs with the same name first.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
JOBS_DIR="$REPO_DIR/.opencode/jobs"

if [ ! -d "$JOBS_DIR" ]; then
  echo "Error: $JOBS_DIR not found"
  exit 1
fi

JOB_COUNT=$(ls -1 "$JOBS_DIR"/*.json 2>/dev/null | wc -l | tr -d ' ')
if [ "$JOB_COUNT" -eq 0 ]; then
  echo "Error: no job specs found in $JOBS_DIR"
  exit 1
fi

echo "Found $JOB_COUNT job specs in $JOBS_DIR"
echo "Registering via opencode..."
echo ""

# opencode reads each job spec JSON and calls the schedule_job MCP tool.
# The scheduler plugin resolves the opencode binary path, workdir, and
# OS-specific runner (systemd on Linux, launchd on macOS) automatically.

opencode run --dangerously-skip-permissions \
  "You are registering scheduled jobs for the Bask content pipeline.

Read every JSON file in .opencode/jobs/. Each file is a job spec with these fields:
name, schedule, agent, model, files, prompt.

For each job spec:
1. If a job with that name already exists, call delete_job to remove it first (idempotent).
2. Call schedule_job, passing through: name, schedule, agent, model, files, and prompt from the spec.
3. Do NOT pass command, workdir, or any path fields — schedule_job resolves those automatically.

After registering all jobs, list them with list_jobs to confirm. Print a summary table
of job name, schedule, and model for each registered job.

Do not modify any other files. Do not commit anything."

echo ""
echo "Done. Verify with: systemctl --user list-timers"
