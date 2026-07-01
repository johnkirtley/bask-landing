# Bask Content Pipeline — VPS Setup Guide

This guide sets up the autonomous content pipeline on a fresh Linux VPS.
The pipeline runs 5 scheduled jobs that scan Reddit, write blog posts,
humanize them, and publish to the Astro blog via git push to main.

## Prerequisites

- Fresh Ubuntu 24.04 VPS (Hetzner CX23 or similar: 2 vCPU, 4 GB RAM)
- SSH access as a non-root user
- A GitHub deploy key with **write access** to `johnkirtley/bask-landing`

## Step 1 — System prep

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl jq gcc

# Set timezone — crons are scheduled in Pacific time
sudo timedatectl set-timezone America/Los_Angeles
timedatectl

# Enable lingering so systemd user timers run without an active SSH session
sudo loginctl enable-linger $(whoami)
loginctl show-user $(whoami) | grep Linger   # should show Linger=yes
```

## Step 2 — Install Node.js 22 LTS

Required for `npm run build` in the Publisher job.

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install -y nodejs
node --version   # should be v22.x
npm --version
```

## Step 3 — Install opencode

```bash
curl -fsSL https://opencode.ai/install.sh | bash
source ~/.bashrc
opencode --version
```

## Step 4 — Set up SSH deploy key for GitHub

```bash
ssh-keygen -t ed25519 -C "vps-bask-pipeline" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
```

Add the printed public key to GitHub:
**Repo → Settings → Deploy keys → Add deploy key**
- Title: `vps-bask-pipeline`
- Check **Allow write access** (the pipeline pushes to main)

Then:

```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
ssh -T git@github.com   # should succeed
```

## Step 5 — Clone and install dependencies

```bash
git clone git@github.com:johnkirtley/bask-landing.git
cd bask-landing
npm install
```

## Step 6 — Authenticate LLM providers

```bash
opencode auth login
```

Authenticate these providers (the pipeline uses both):
- **zai-coding-plan** — powers the Topic Strategist, Blog Writer, Humanizer Reviewer
- **openrouter** — powers the Reddit Scanner, Publisher, and the general agent

## Step 7 — Register the scheduled jobs

```bash
cd ~/bask-landing
chmod +x scripts/register-jobs.sh
./scripts/register-jobs.sh
```

This reads `.opencode/jobs/*.json` and registers all 5 jobs as systemd
user timers via the opencode-scheduler plugin.

## Step 8 — Verify

```bash
systemctl --user list-timers
```

You should see 5 timers:

| Job                  | Schedule          |
| -------------------- | ----------------- |
| bask-reddit-scan     | daily 7:00 AM PT  |
| bask-publisher       | daily 9:00 AM PT  |
| bask-topic-strategy  | daily 11:00 AM PT |
| bask-blog-writer     | Mon/Wed/Fri 3 PM  |
| bask-humanizer-review| daily 7:00 PM PT  |

## Step 9 — Hardening (recommended)

```bash
# Firewall — SSH only
sudo ufw allow ssh
sudo ufw enable
sudo ufw status

# Brute force protection
sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban
```

## Stopping the laptop jobs

Once the VPS is running, **stop the jobs on your laptop** to avoid
duplicate commits. From your laptop:

```bash
# Delete all 5 scheduled jobs
# (run via opencode MCP tools or the scheduler CLI)
```

Or simply shut down opencode on the laptop — launchd/systemd timers
only fire when opencode is running.

## Useful commands on the VPS

```bash
# Check timer status
systemctl --user list-timers

# Check logs for a specific job
journalctl --user -u opencode-scheduler-* -f

# Trigger a job immediately
# (via opencode MCP: run_job --name "bask-reddit-scan")

# Pause all jobs — stop the scheduler
systemctl --user stop opencode-scheduler

# Resume
systemctl --user start opencode-scheduler
```

## Troubleshooting

**Jobs not firing:** Confirm lingering is enabled (`Linger=yes`) and
the user systemd instance is running (`systemctl --user status`).

**Git push failures:** Verify the deploy key has write access and
`ssh -T git@github.com` works from the VPS.

**Build failures in Publisher:** Run `npm run build` manually to see
the error. The Publisher will set the post status to NEEDS REVIEW
automatically on failure.

**Timezone wrong:** Confirm `timedatectl` shows the correct timezone.
All cron schedules are in the system timezone.
