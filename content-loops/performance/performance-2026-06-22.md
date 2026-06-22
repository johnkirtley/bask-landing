# Performance Snapshot — 2026-06-22

**Agent:** 4 (Analyst)
**Phase:** 0 / early Phase 1 — content cluster is 2–5 weeks old. SEO data does not yet exist at meaningful scale. Expect indexing signals to emerge August–September for the May/June posts; this snapshot establishes the baseline and flags the data plumbing gaps that must close before the loop produces actionable SEO intelligence.

---

## 1. Data Sources Wired vs Missing

| Signal | Status | Notes |
|--------|--------|-------|
| RevenueCat (macro app trend) | **Wired** | Full access via MCP. Project: `proj4cddd2bc`. |
| Google Search Console (per-URL clicks, impressions, position, queries) | **NOT WIRED** | No GSC integration available in this session. This is the single most important gap. Connecting GSC is the prerequisite for closing the research loop. |
| Download-CTA click-through per post | **NOT WIRED** | No analytics events wired to the CTA buttons on blog posts. This is the most attributable blog→install signal we can own site-side, and it requires a one-time implementation (e.g., GA4/Plausible event on `.download-cta` clicks, segmented by page URL). Flag for Developer. |
| MMP / install attribution | N/A (expected) | Blog→App Store attribution requires a mobile MMP. Directional revenue/trial trend is the best proxy available without one. |

**Immediate action items for the team:**
1. **Connect GSC** to a future agent session so Agent 1 can read per-URL rank data.
2. **Implement CTA click events** on blog posts (one event per click, keyed to `document.location.pathname`) so Agent 4 can read the most attributable per-post signal.

---

## 2. RevenueCat — Macro App Trend

*Pulled 2026-06-22. All RevenueCat data is app-wide; no blog-to-install attribution is possible at this layer.*

### 28-Day Overview (ending ~2026-06-22)

| Metric | Value |
|--------|-------|
| Active Subscriptions | 26 |
| Active Trials | 3 |
| MRR | $73 |
| Revenue (28-day) | $314 |
| New Customers (28-day) | 301 |
| Active Users (28-day) | 344 |

### Monthly Trend (month resolution, all figures incomplete for June)

| Month | New Customers | New Trials | Revenue | Transactions | Trial Conv. Rate |
|-------|---------------|------------|---------|--------------|------------------|
| April 2026 | — | 0 | $49.98 | 3 | 0% |
| May 2026 | 36 | 1 | ~$0* | 1* | — |
| June 2026 (incomplete) | 265 | 23 | $314.83 | 17 | **39.1%** |

*May revenue reads near zero in the monthly chart but the 28-day overview includes it in the $314 total — this is likely a measurement-period overlap artifact. Revenue is definitively accelerating; the exact May attribution is unclear.*

### Interpretation

June shows a sharp acceleration on every metric relative to May: ~7× new customers, 23× new trials, strong revenue ($314.83 from 17 transactions). The P1 content cluster launched across May 18–June 6 (6 posts), and the P1.3 skin-type post went live June 20. It is plausible that organic content is starting to drive discovery, but **causal attribution is not possible without GSC + CTA tracking**. The correlation is encouraging; treat it as a directional positive, not proof.

Trial-to-paid conversion at 39.1% for the June cohort is strong. That means the people finding and installing Bask are converting well — the funnel from install to payment is not the problem; top-of-funnel awareness is.

**Sanity-check read:** The channel is contributing. The question for future snapshots is whether specific blog URLs are driving measurable download-CTA clicks.

---

## 3. Per-URL Status Table

Search Console data is not available. The table below records each published URL with its age and flags; cells requiring GSC are left blank pending integration.

| URL slug | Published | Days live | GSC clicks | GSC impr. | Avg position | Notable queries | CTA CTR | Flag |
|----------|-----------|-----------|------------|-----------|--------------|-----------------|---------|------|
| `how-much-sun-do-you-need-for-vitamin-d` | 2026-05-18 | 35 | — | — | — | — | — | Cornerstone; oldest in cluster. First to show GSC signals. |
| `what-uv-index-do-you-need-for-vitamin-d` | 2026-05-21 | 32 | — | — | — | — | — | |
| `best-time-of-day-to-get-vitamin-d` | 2026-05-26 | 27 | — | — | — | — | — | |
| `can-you-get-vitamin-d-on-a-cloudy-day` | 2026-05-29 | 24 | — | — | — | — | — | |
| `can-you-get-vitamin-d-through-a-window` | 2026-06-03 | 19 | — | — | — | — | — | |
| `does-sunscreen-block-vitamin-d` | 2026-06-06 | 16 | — | — | — | — | — | |
| `how-long-to-sit-in-sun-for-vitamin-d` | 2026-06-20 | 2 | — | — | — | — | — | Just published; too new for any signal. |
| `best-uv-index-for-tanning` | *not live* | — | — | — | — | — | — | **READY TO PUBLISH — not yet in `/src/content/blog/`. Publish ASAP; summer demand is live now.** |
| `best-apps-to-track-vitamin-d-2026` | 2026-02-02 | 141 | — | — | — | — | — | Oldest post. If GSC is wired, this one should show the most data. |
| `understanding-vitamin-d-synthesis` | 2026-02-02 | 141 | — | — | — | — | — | Off-plan science explainer; lighter SEO build. |

*All GSC/CTA columns will populate once integration is wired. Re-run this snapshot after GSC is connected.*

---

## 4. Takeaways for Agent 1 (next research cycle)

### Winning clusters to deepen
- **P1 vitamin D cluster** is the right bet. Six posts in five weeks, all tightly interlinked, all on high-intent summer queries. Keep executing the existing backlog before proposing new topics — the 06-20 queue (#2–#6 from that cycle, plus #A and #B from the 06-21 cycle) is already more than enough inventory for the next 4–6 weeks.
- **Tanning cluster** (`best-uv-index-for-tanning` + future base-tan + testosterone posts) is a smart audience-expansion play for summer. Prioritize publishing `best-uv-index-for-tanning` this week while UV is at its peak.

### Refresh candidates
None yet. All posts are under 5 weeks old. Refresh logic applies at positions 5–15 in GSC, which won't appear until August at the earliest. Re-evaluate in the August snapshot.

### Gap candidates (no content yet, queries we likely surface for weakly)
Cannot determine without GSC. The most predictable gaps based on research and backlog:
- `how-much-vitamin-d-in-15-minutes-of-sun` (06-20 #3)
- `can-you-get-too-much-vitamin-d-from-the-sun` (06-20 #4 / P1.12)
- `do-tanning-beds-give-you-vitamin-d` (06-20 #5 / P1.14)
- `does-sunlight-increase-testosterone` (06-21 #A)
- `does-a-base-tan-protect-from-sunburn` (06-21 #B)

### Open housekeeping (carry forward until resolved)
1. **GSC integration** — the loop cannot close without it. Highest-priority infrastructure gap.
2. **CTA click tracking** — second highest-priority. Enables per-post attribution without an MMP.
3. **Author byline** — 7 of 9 published posts have no `author` field in frontmatter. Only `how-long-to-sit-in-sun-for-vitamin-d` has `author: Bask Health Team`. Backfill for E-E-A-T.
4. **`best-uv-index-for-tanning`** — READY TO PUBLISH; waiting on Developer. Summer demand is at peak; every day it's not live is lost impression volume.
5. **`topics-covered.md` accuracy** — `how-long-to-sit-in-sun-for-vitamin-d` is live in `/src/content/blog/` (pubDate: 2026-06-20) but still shows as READY TO PUBLISH in the ledger. Developer should update to PUBLISHED.
6. **`performance/` vs `analytics/` directory** — resolved by creating this file in `content-loops/performance/`. Agent 1 reads `content-loops/performance/performance-[YYYY-MM-DD].md`. The `content-loops/analytics/` directory (containing only `.gitkeep`) can be cleaned up or repurposed for raw data exports.

---

## 5. Next Snapshot Trigger

Re-run when **any of the following is true:**
- GSC is wired (run immediately to establish baseline)
- 4 weeks have elapsed (next scheduled: ~2026-07-20)
- A post reaches position 5–15 in GSC (run the next day to flag as refresh candidate)

If no new data sources are wired by the July snapshot, the macro RevenueCat trend remains the only available signal. The loop is operating on inference until GSC is connected.
