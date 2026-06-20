# Bask — Programmatic SEO Build Plan ("Your Complete Sun Day in {City}")

**Audience for this doc:** one copywriter + one developer.
**Goal:** ship a set of city pages that rank in search _and_ get cited in AI answers (Google AI Overviews, ChatGPT, Perplexity, Gemini), and drive installs of Bask (getbask.app).
**Owner:** John. **Status:** approved direction, ready to build.

---

## 1. What we're building, in one paragraph

A templated set of city pages, each titled around the idea of "your complete sun day in {city}." Every page answers three questions for that specific city using real computed numbers: when your skin can actually make vitamin D today, how long you'd need outside based on your skin type, and when you'd start to burn. The page is essentially Bask's in-app calculation, published as an evergreen web page, one per city. Burn-time guidance lives on the same page as the safety bookend. We are **not** building separate sunburn pages or circadian-rhythm pages in this phase (see scope below).

## 2. Why this shape (the one rule that governs everything)

In 2026, Google demotes mass-produced pages that only swap a variable into boilerplate. The March 2026 core update wiped out sites doing exactly that. Pages survive only when each one answers a distinct question with genuinely unique data that no other page on the site covers.

That is the whole reason this works for Bask: the vitamin D window, the minutes-by-skin-type, and the burn time are **different real numbers for every city** because they're driven by latitude and sun angle. A page for Reykjavik and a page for Miami are not the same page with the city name changed; they describe different physical realities. That difference is what keeps us on the right side of the line. Protect it. The moment a page becomes "fill-in-the-blank with no unique data," kill it.

## 3. Scope

**In scope (build now):** vitamin D city pages with burn-time safety section.

**Out of scope (handled elsewhere, do not build here):**

- **Sunburn calculators / "how long to burn in {city}" pages.** That niche is saturated with standalone calculator sites and the intent isn't geographic. We capture burn-time intent _inside_ the city page instead.
- **Circadian / morning-sunlight pages.** The advice barely changes by city, so it's the wrong fit for a city template. It's being handled as editorial pillar content, separately.

## 4. The page concept

Each page is built from three layers:

1. **Computed data** (generated per city, fully unique) — the tables and numbers.
2. **Template copy** (written once, reused) — the explanatory prose that frames the data.
3. **Local context** (written/researched per city, short) — a small block of genuinely city-specific facts so the page isn't 100% machine-stamped.

The developer owns layer 1 and the assembly. The copywriter owns layers 2 and 3. Both must be present on every page or the page doesn't ship.

---

# DEVELOPER TRACK

## D1. Source of truth

Bask's existing app engine is the source of truth for all calculations. Do not re-derive a new vitamin D model from scratch for the website. Either (a) export the app's computation as a static dataset, or (b) replicate the app's exact logic server-side. The app and the website must never show contradicting numbers for the same city, skin type, and date. If they disagree, that's a bug and a credibility problem.

The formulas below are the documented public versions so you understand the shape of the data. Confirm the exact constants against Bask's engine before generating anything.

## D2. Per-city data model

Generate and store these fields for each city:

| Field                                | Type   | Notes                                                           |
| ------------------------------------ | ------ | --------------------------------------------------------------- |
| `city`, `region`, `country`          | string | Display + disambiguation (e.g. "Chelsea, London" not "Chelsea") |
| `slug`                               | string | URL slug, e.g. `denver-colorado`                                |
| `latitude`, `longitude`              | float  | Drives everything                                               |
| `vitamin_d_window_by_month`          | object | For each month: start time, end time, or "no window"            |
| `vitamin_d_winter_months`            | array  | Months where solar elevation never crosses the threshold        |
| `minutes_for_vitamin_d_by_skin_type` | object | Fitzpatrick I–VI, at typical midday UV for the city/season      |
| `burn_time_by_skin_type`             | object | Fitzpatrick I–VI, at typical midday UV                          |
| `typical_uv_by_month`                | object | Monthly climatological UV index (not live)                      |
| `cloud_cover_note`                   | string | From climate data — affects real-world UVB                      |
| `solar_noon_by_month`                | object | When the window centers                                         |

## D3. How to compute each thing

**Vitamin D window.** UVB strong enough to make vitamin D in skin only when the sun is high enough in the sky — roughly above 45° solar elevation (sources cite 45–50°; confirm Bask's threshold). Run a solar position algorithm (NOAA SPA, or a library like `suncalc`) for the city's lat/lon across each day. The window is the span of hours where elevation is at or above the threshold. This is free and deterministic — no API needed.

**Vitamin D winter.** At higher latitudes the sun never reaches the threshold for part of the year, so the window is empty. The published science is clear that this period grows with latitude — none at ~35°N, several months at northern-European latitudes. Compute it directly from the solar elevation model; don't hardcode it.

**Minutes for vitamin D by skin type.** A function of UV index and Fitzpatrick type (melanin slows synthesis, so darker skin needs longer). Use Bask's engine values. Present at the city's typical seasonal midday UV.

**Burn time by skin type.** Documented dermatology formula: `burn minutes = (0.667 × MED) / adjusted UV index`, where MED (minimal erythemal dose) varies by Fitzpatrick type. MED constants differ slightly between sources, so use Bask's. Burn time and the vitamin D window share the same inputs (UV index + skin type) — that's why they belong on one page.

**Typical UV by month.** Use monthly climatological averages per city, not a live feed. Evergreen, cacheable, and stable for ranking. You can optionally add a small live-UV widget later, but the page must be fully useful and rankable without it.

**Bask App Calculations** can be found in CALCULATIONS.md file

## D4. Architecture

- **Generation:** static site generation (Next.js, Astro, or your existing stack). Pre-render every page; don't render city data client-side only — crawlers and LLM scrapers need it in the HTML.
- **URL:** clean and consistent, e.g. `getbask.app/sun/denver-colorado` or `/vitamin-d/denver-colorado`. Pick one and never change it.
- **Hub pages:** build an index ("vitamin D from the sun by city") and country/region roll-up pages. These give crawlers a path to every page and create internal-link equity.
- **Internal linking (automate this):** every city page links up to its hub, sideways to 3–5 nearby/related cities, and out to the relevant editorial pillar articles (the "how much sun" pillar and the "winter/latitude" pillar). Automated, contextual, no orphan pages.
- **Schema markup:** `Article` + `FAQPage` on every page. Mark up the key-facts table cleanly. FAQ schema is what gets you into rich results and helps LLM extraction.
- **Sitemap:** generate automatically; submit in batches as we roll out (see sequencing), not all at once.

## D5. Quality gates (enforce in code, not by hope)

- A page does not publish unless it has: computed tables, ≥300 words of unique on-page text, the per-city local-context block (from the copywriter), and a non-empty FAQ.
- Cities where the data is boring or near-identical to a neighbor (e.g. clustered equatorial cities with "year-round, 10 min midday") should be merged or skipped, not published as thin duplicates.
- Add a flag/report so we can `noindex` or redirect any page that gets no impressions after ~90 days.

## D6. Stack notes

Static generation + a structured data source (Airtable, a JSON store, or a small DB) feeding the templates is the standard pattern. The data job (D2/D3) runs once, outputs the dataset, and the build consumes it. Re-run the data job seasonally so monthly figures stay current.

---

# COPYWRITER TRACK

## C1. Your job in one line

Write the reusable prose that frames the numbers (once), and a short genuinely-local block for each city (every time). The data makes pages factually unique; your local block makes them _read_ like someone who knows the city wrote them.

## C2. Page anatomy (write the template copy for each section)

1. **Answer-first opening (40–60 words).** The page must answer the query in the first two sentences, before any preamble — this is what gets pulled into AI Overviews and featured snippets. Pattern: "In {city}, your skin can make vitamin D roughly between {start} and {end} from {months}. If you have {skin type}, about {X} minutes is enough. After about {Y} minutes you risk burning." Then the page expands.
2. **The key-facts table** (data supplied by dev) — introduce it in one line.
3. **"When you can actually make vitamin D in {city}"** — explain the window, why it shifts with season, and the city's vitamin D winter months if it has any.
4. **"How long you need, by skin type"** — explain why darker skin needs longer, reference the table.
5. **"When you'd start to burn"** — the safety bookend. Frame the safe window between making D and burning. This is Bask's whole point: get the benefit, skip the damage.
6. **Local context block (per city, 120–200 words)** — see C3.
7. **FAQ** (5–6 Q&As) — see C4.
8. **CTA** — see C5.

Sections 1, 3, 4, 5 are template copy with `{variables}` — write them once. Sections 6 and 7's answers may need light per-city tailoring.

## C3. The local-context block (the part that can't be automated)

This is the most important thing you write and the reason the pages survive. 120–200 words per city of real, specific detail: the actual months that city has weak or no vitamin D sun, how its typical cloud cover or climate changes the real-world picture, and a concrete local note on getting midday sun (a well-known park, waterfront, or open space). Use real facts — the dev will give you the latitude-derived months and cloud-cover note as raw inputs. Do not pad it with generic filler; a tight, specific paragraph beats a vague long one. If you find yourself writing something that would be true of any city, cut it.

## C4. FAQ block

Use real questions people ask (pull from the "People Also Ask" box for each city's queries). Cover at least: can you get vitamin D through a window (no — UVB doesn't pass glass), can you get it in winter here, what time of day is best, does sunscreen block it, how does cloud cover change things. Keep each answer to 2–4 sentences, answer the question in the first sentence.

## C5. CTA

Soft, useful, not pushy. The page already gave away the static answer; Bask is the tool that does this live, tracks your sessions, and tells you when to go out today and when to stop. One clear CTA mid-page after the skin-type section and one at the end. Link to getbask.app / the App Store listing.

## C6. Voice — write like a person, not a content mill

John's hard requirement: nothing that reads as AI-generated. Concrete rules:

- **Answer first, no warm-up.** Don't open with "In today's world" or "When it comes to vitamin D." Start with the answer.
- **No significance inflation.** Skip "plays a crucial role," "is a testament to," "stands as," "in the ever-evolving landscape of." Just say the thing.
- **Vary sentence length.** Short punchy sentence. Then a longer one that earns its length. AI writing has an even, mid-length drone — break it.
- **Cut the rule of three.** Not everything needs three parallel adjectives or clauses. One precise word beats three vague ones.
- **No em dashes** (it's a common tell when stacked with other patterns). Use commas, periods, or parentheses.
- **Drop the AI vocabulary:** delve, leverage, robust, seamless, comprehensive, vibrant, foster, underscore, navigate (figurative), testament, realm. If a word feels like it's reaching for impressive, replace it.
- **No "In conclusion" / "It's important to note" / "When it comes to."** Filler. Delete.
- **Have a small point of view.** "Most apps just track sunburn risk; the vitamin D side gets ignored" is human. Neutral fact-listing reads like a robot.
- **Be specific.** Real months, real numbers, a real park. Specifics are the strongest human signal; vagueness is the strongest AI tell.

Run finished drafts through a humanizer pass before handoff.

## C7. Health-content compliance

Educational, not medical advice. No diagnosis, no treatment claims, no "cures." Frame supplementation as "many people consider supplementing when..." not "you should take." Add a brief, non-alarming "this is general information, not medical advice; check with a clinician about your levels" line in the footer of each page. Keep it light — one line, not a scary disclaimer wall.

---

# SHARED: SEQUENCING, ROLES, AND DONE

## S1. Timeline (this is seasonal — don't miss the window)

Vitamin D search demand peaks in late winter (February). Pages need to be indexed and aged _before_ that peak to rank during it. Target publishing the city pages in the **September–October** window. Working backward:

- **Summer:** dev builds the data engine (D2/D3) and the template (D4); copywriter writes all template copy (C2) and the voice/compliance patterns.
- **Late summer:** assemble and QA the pilot batch.
- **Sept–Oct:** publish the pilot, then roll out in batches.
- **By Dec:** full set live and indexed, ageing into the Feb peak.

## S2. Phased rollout (do not publish everything at once)

1. **Pilot: 25–40 cities.** Prioritize northern, English-speaking, higher-deficiency metros (UK, Canada, northern US, northern Europe) — they have the longest vitamin D winters, which makes the data most useful and the "should I supplement?" angle most natural. Skip equatorial clusters where every page says the same boring thing.
2. **Validate (4–8 weeks):** confirm pages get indexed, check Search Console for impressions and early rankings, confirm no thin-content flags.
3. **Scale only if the pilot ranks:** expand in controlled batches. A young domain that 10x's its sitemap overnight gets flagged. Grow proportionally.

## S3. Who owns what

- **Developer:** data engine, formulas (validated against Bask's app), template build, URL/schema/sitemap, internal-linking automation, quality gates, batch publishing.
- **Copywriter:** template copy, per-city local-context blocks, FAQs, CTAs, voice and compliance passes.
- **John:** city list and prioritization, final QA sign-off, Search Console monitoring, the call on when to scale.

## S4. Definition of done (per page)

- [ ] Answer appears in the first two sentences
- [ ] Key-facts table present and matches Bask's app numbers
- [ ] Vitamin D window + winter months correct for the latitude
- [ ] Minutes-by-skin-type and burn-time tables present
- [ ] Unique local-context block (120–200 words, genuinely specific)
- [ ] FAQ with schema, 5–6 real questions
- [ ] Internal links: up to hub, across to related cities, out to 2 editorial pillars
- [ ] CTA present (mid + end)
- [ ] Compliance line in footer
- [ ] Passes humanizer voice check (no AI tells)
- [ ] ≥300 words of unique text

## S5. Success metrics

- Pages indexed (Search Console coverage)
- Impressions and average position for "{city} vitamin D" / "vitamin D winter {city}" / "best time sun {city}"
- Citations/appearances in AI Overviews and LLM answers (spot-check key cities)
- Clickthroughs to getbask.app and install attribution
- Review cadence: monthly during rollout, then quarterly

## S6. The one thing to never forget

Every page must earn its place with real, city-specific data and a human-written local block. The day a page becomes a pure fill-in-the-blank, it stops helping users and starts being a liability. Quality gate it, don't hope.
