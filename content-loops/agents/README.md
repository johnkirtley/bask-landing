# Bask Content Loop — Automated Pipeline

A 5-stage autonomous content pipeline that scans Reddit for vitamin D and health signals, generates strategic blog topics, writes posts, humanizes them, and publishes to the Astro blog.

## Pipeline overview

```
Stage 1              Stage 2               Stage 3            Stage 4               Stage 5
Reddit Scanner  →    Topic Strategist  →   Blog Writer   →   Humanizer Reviewer →  Publisher
(daily 7 AM)         (daily 11 AM)         (Mon/Wed/Fri       (daily 7 PM)          (daily 9 AM)
                                            3 PM)

Scans subreddits     Merges signals +      Writes full post   Applies humanizer     Converts .md → .mdx
for pain points      blueprint + dedup     from brief         Verifies sources      Publishes to blog/
→ reddit-scan file   → research brief      → posts/*.md       → READY TO PUBLISH    Updates ledger
                                           Status: DRAFT                            Status: PUBLISHED
```

Each stage is a separate scheduled job. Stages are **pull-based** — each looks for new work and processes it. If there's nothing to do, the job skips. Content flows from idea to published in ~26 hours.

## Schedule

| Job | Cron | Runs | Model |
|-----|------|------|-------|
| Reddit Scanner | `0 7 * * *` | Every day at 7:00 AM | mimo-v2.5 (cheap) |
| Publisher | `0 9 * * *` | Every day at 9:00 AM | mimo-v2.5 (cheap) |
| Topic Strategist | `0 11 * * *` | Every day at 11:00 AM | glm-5.2 (premium) |
| Blog Writer | `0 15 * * 1,3,5` | Mon, Wed, Fri at 3:00 PM | glm-5.2 (premium) |
| Humanizer Reviewer | `0 19 * * *` | Every day at 7:00 PM | glm-5.2 (premium) |

## File flow

```
content-loops/
├── agents/                          # Agent prompt files (this directory)
│   ├── 01-reddit-scanner.md         # Agent 1 instructions
│   ├── 02-topic-strategist.md       # Agent 2 instructions
│   ├── 03-blog-writer.md            # Agent 3 instructions
│   ├── 04-humanizer-reviewer.md     # Agent 4 instructions
│   ├── 05-publisher.md              # Agent 5 instructions
│   └── README.md                    # This file
├── .state/                          # Idempotency tracking
│   ├── reddit-scanner-state.json
│   ├── topic-strategist-state.json
│   ├── writer-state.json
│   ├── humanizer-state.json
│   └── publisher-state.json
├── research/                        # Research output
│   ├── reddit-scan-YYYY-MM-DD.md    # Agent 1 output (raw Reddit signals)
│   └── research-YYYY-MM-DD.md       # Agent 2 output (strategic topic briefs)
├── posts/                           # Draft posts
│   └── slug.md                      # Agent 3 writes, Agent 4 edits
├── topics-covered.md                # Running ledger of published content
├── performance/                     # Performance snapshots
└── known-issues/                    # Dev/build issues

src/content/blog/
└── slug.mdx                         # Agent 5 output (live blog posts)
```

## Post status lifecycle

```
DRAFT → (Agent 4 humanizes) → READY TO PUBLISH → (Agent 5 publishes) → PUBLISHED
                                    ↘ NEEDS REVIEW (Agent 4 flagged an issue)
```

## Subreddits scanned

- **r/vitamin-d** — vitamin D specifics, deficiency, supplementation
- **r/hubermanlab** — health optimization, protocols, morning light
- **r/supplements** — supplement questions, dosing, interactions
- **r/depression** — mood/mental health, sunlight, SAD connections
- **r/biohacking** — optimization, sun exposure, self-experimentation

## Git workflow

Each agent commits and pushes directly to `main`. This is an autonomous pipeline — no PRs. Pushing to `main` triggers Vercel deploys automatically.

Commit message format: `[content-loop] Agent N: <description>`

## Manual operations

### Run an agent manually

```bash
# Run any agent immediately
opencode --prompt "Follow the instructions in content-loops/agents/01-reddit-scanner.md"

# Or use the scheduler's run_job
run_job --name "bask-reddit-scan"
```

### Pause the pipeline

Delete or disable the scheduled jobs:
```bash
delete_job --name "bask-reddit-scan"
delete_job --name "bask-topic-strategy"
delete_job --name "bask-blog-writer"
delete_job --name "bask-humanizer-review"
delete_job --name "bask-publisher"
```

### Reset state

Clear the state files to force reprocessing:
```bash
for f in content-loops/.state/*.json; do echo '{"processed":[],"lastRun":null}' > "$f"; done
```

### Override a status

Edit the `Status:` line in any `content-loops/posts/*.md` file:
- Set to `READY TO PUBLISH` to force-publish on next Publisher run
- Set to `DRAFT` to force-humanize on next Humanizer run
- Set to `PUBLISHED` to exclude from all processing

## Content blueprint

The full pillar/cluster plan lives at `src/content/bask_content_outlines.md`. All topic briefs from Agent 2 should align with this structure:

- **Pillar 1** — How Much Sun Do You Need for Vitamin D (calculation cluster)
- **Pillar 2** — Vitamin D Deficiency: Symptoms, Levels & Treatment
- **Pillar 3** — Vitamin D in Winter & by Latitude (seasonal)
- **Pillar 4** — Best Vitamin D & Sun Tracking Apps (comparison/BoFu)
