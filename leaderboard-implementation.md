# Bask Touch Grass Leaderboard — Marketing Site Integration Guide

Use this document as instructions for an LLM (or developer) integrating the live leaderboard into **getbask.app**.

---

## Task

Build a **live public leaderboard section** on the existing marketing site **getbask.app**. The Bask iOS app already uploads opt-in sun session data to Supabase. Your job is to **fetch and display aggregate leaderboard rankings** on the marketing site. You do **not** need to handle writes — only reads.

---

## Context

| Item                     | Value                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Product                  | Bask — vitamin D tracking iOS app                                                                                                 |
| Leaderboard name         | Touch Grass Leaderboard                                                                                                           |
| Data source              | Supabase Postgres via a public RPC                                                                                                |
| Privacy model            | Users opt in from the app. Only anonymous names + aggregate sun stats are public. Raw session logs are **not** publicly readable. |
| Ranking metric           | **Current streak** — consecutive days hitting daily Vitamin D goals (IU goal achieved)                                            |
| Display stats (all-time) | **Sun-exposure IU**, **sun minutes**, and **session count** for the all-time date range (supplements excluded)                    |
| Reference implementation | `bask/leaderboard-site/` in the Bask repo (`index.html`, `app.js`, `styles.css`)                                                  |

---

## Supabase Setup (Project Owner)

Before the marketing site can fetch data:

1. Create a Supabase project (or use an existing one).
2. Open **SQL Editor** and run the full schema from [`../supabase/schema.sql`](../supabase/schema.sql), then apply streak ranking migrations in [`supabase/migrations/`](supabase/migrations/) (e.g. `20260528120000_get_leaderboard_rank_by_streak.sql`).
3. Add env vars to the marketing site deploy:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
   ```

   Find these under **Project Settings → API**.

   **Important:** Use the **Project URL** only (e.g. `https://abcdefgh.supabase.co`). Do **not** append `/rest/v1` — the Supabase client adds that automatically. Using the Data API URL causes `Invalid path specified in request URL`.

### Do I enable “Automatic RLS”?

**You do not need to rely on Supabase’s “automatic RLS” toggle.** Our schema script already:

- Runs `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` on every leaderboard table
- Creates explicit policies that **block all direct table access**
- Exposes data only through `SECURITY DEFINER` RPCs (`get_leaderboard`, etc.)

If Supabase asks whether to enable RLS when creating tables manually: **yes, always enable RLS** — but for this project you should **run `schema.sql` instead of creating tables by hand**. That script is the source of truth.

**Summary:** Run `schema.sql`. RLS is configured there. The marketing site only calls `get_leaderboard`; it never reads tables directly.

---

## Credentials

Store as environment variables on the marketing site (never commit real keys to git):

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

The Supabase **anon key is public** by design. Security is enforced server-side via RLS + RPCs.

---

## The Only API You Need

**RPC name:** `get_leaderboard`

### Parameters

| Param            | Type                         | Required | Description                           |
| ---------------- | ---------------------------- | -------- | ------------------------------------- |
| `p_start`        | `DATE` string (`YYYY-MM-DD`) | Yes      | Inclusive start date (UTC)            |
| `p_end`          | `DATE` string (`YYYY-MM-DD`) | Yes      | Exclusive end date (UTC)              |
| `p_limit`        | integer                      | No       | Max rows (default 50, max 100)        |
| `p_country_code` | string or `null`             | No       | ISO country code filter (e.g. `"US"`) |

### Response

Array of rows, pre-sorted by rank:

```typescript
interface LeaderboardEntry {
  anonymous_name: string; // e.g. "wandering-apple"
  country_code: string | null; // only if user opted to show location
  region_label: string | null; // state/region
  city_label: string | null;
  location_precision: 'none' | 'country' | 'region' | 'city';
  current_streak: number; // consecutive days hitting daily IU goal
  longest_streak: number; // personal best streak
  total_iu: number; // all-time aggregate IU for p_start..p_end
  total_sun_minutes: number; // all-time aggregate sun time in minutes
  session_count: number; // all-time session count
  last_updated_at: string; // ISO timestamp — use for "Updated Xm ago"
  rank: number; // 1 = top (by current_streak DESC)
}
```

**Ranking:** `current_streak` DESC, then `longest_streak` DESC, then `last_updated_at` ASC. The date range (`p_start` / `p_end`) only affects aggregate stats, not rank order.

---

## Date Range Helpers (UTC)

All date boundaries use **UTC midnight**. The marketing site always passes **all-time** bounds for aggregate stats (`total_iu`, `total_sun_minutes`, `session_count`).

### All time (`2020-01-01` → tomorrow UTC)

```javascript
const ALL_TIME_START = '2020-01-01';

function getAllTimeBounds() {
  const now = new Date();
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );
  return {
    start: ALL_TIME_START,
    end: end.toISOString().slice(0, 10),
  };
}
```

---

## Fetch Example

### JavaScript (`@supabase/supabase-js`)

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const { start, end } = getAllTimeBounds();

const { data, error } = await supabase.rpc('get_leaderboard', {
  p_start: start,
  p_end: end,
  p_limit: 50,
  p_country_code: null, // or "US" to filter
});

if (error) throw error;
// data = LeaderboardEntry[]
```

### Static HTML (CDN)

See [`app.js`](app.js) for a complete vanilla JS example using `@supabase/supabase-js` from CDN.

---

## Display Requirements

Build a leaderboard UI section with:

1. **No period tabs** — single list ranked by current streak with all-time stats
2. **Optional country filter** dropdown (pass `p_country_code`)
3. **Table columns:** Rank, Name (sessions + sun time + IU as secondary lines), Location, Streak (hero value on the right; all-time aggregates)
4. **Auto-refresh** every 60 seconds (leaderboard should feel live)
5. **Empty state:** “No sessions yet. Be the first to touch grass.”
6. **CTA:** “Join the leaderboard in the Bask app” → App Store / getbask.app download

---

## Formatting Helpers

### Location label

Respect `location_precision` — never show hidden fields:

```javascript
function formatLocation(entry) {
  if (
    entry.location_precision === 'city' &&
    entry.city_label &&
    entry.region_label
  ) {
    return `${entry.city_label}, ${entry.region_label}`;
  }
  if (entry.location_precision === 'region' && entry.region_label) {
    return entry.region_label; // optionally append country name
  }
  if (entry.location_precision === 'country' && entry.country_code) {
    return entry.country_code; // map to full country name in UI
  }
  return '—';
}
```

### Other formatting

| Field        | Example                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------- |
| IU           | `4200` → `"4.2k"` if ≥ 1000                                                                         |
| Minutes      | `42` → `"42m"`, `90` → `"1h 30m"`                                                                   |
| Last updated | Relative from `last_updated_at` (e.g. “Updated 12m ago”) — **do not** show exact session timestamps |

---

## What NOT To Do

- Do **not** query Supabase tables directly (`leaderboard_sessions`, `leaderboard_users`, etc.) — RLS blocks them
- Do **not** expose or attempt to read write tokens
- Do **not** fabricate fake users/stats as real competitors — use empty states or clearly labeled demo data only
- Do **not** claim this is medical data — add disclaimer: “Estimates only · Not medical advice”

---

## Suggested Placement on getbask.app

Add a dedicated section or page (e.g. `/leaderboard` or a homepage block) styled to match Bask:

- Dark background (`#0A0E1A`)
- Solar accent (`#FF9500`)
- Gold highlights for top 3
- Top 3 rows visually emphasized
- Mobile-responsive (hide location column on small screens if needed)

---

## Join Flow Copy (CTA)

> Opt in from **Bask → Settings → Community → Touch Grass Leaderboard**. Anonymous by default. Supplements never count. Location is optional and never uses GPS.

---

## Error Handling

| Scenario                  | Behavior                             |
| ------------------------- | ------------------------------------ |
| Supabase env vars missing | Show config error, not a broken page |
| RPC fails                 | Show retry-friendly error message    |
| `data` is empty array     | Show empty state, not an error       |

---

## Acceptance Criteria

- [ ] Fetches via `get_leaderboard` RPC only
- [ ] All-time date bounds used for aggregate stats
- [ ] Ranked by `current_streak` (requires streak migration applied)
- [ ] Country filter works
- [ ] Auto-refreshes every 60s
- [ ] Renders rank, anonymous name (sessions + sun + IU under name), optional location, streak hero on the right (all-time)
- [ ] Handles empty/error states gracefully
- [ ] Includes App Store / download CTA
- [ ] Matches getbask.app visual style

---

## Related Files in Bask Repo

| File                                                                   | Purpose                                 |
| ---------------------------------------------------------------------- | --------------------------------------- |
| [`../supabase/schema.sql`](../supabase/schema.sql)                     | Database schema, RLS, RPC definitions   |
| [`app.js`](app.js)                                                     | Reference fetch + render logic          |
| [`config.example.js`](config.example.js)                               | Config template for static deploy       |
| [`../LEADERBOARD_IMPLEMENTATION.md`](../LEADERBOARD_IMPLEMENTATION.md) | Full app + backend implementation guide |
