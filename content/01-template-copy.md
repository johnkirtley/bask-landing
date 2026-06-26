# Template Copy — City Vitamin D Pages

**For:** developer (assembly) + John (review)
**Covers:** plan sections C2 (1, 3, 4, 5), table intros, variable glossary, compliance line.
**Status:** drafted, humanizer pass applied. Per-city local block and FAQ tailoring are separate files.

All prose below is written once and reused. Anything in `{curly_braces}` is filled per city from the developer's data model (D2). The variable glossary at the bottom maps every variable to its source field.

A note on the numbers in examples: I've used placeholder figures so the prose reads naturally. The dev's engine supplies the real values. Never ship my example numbers.

---

## Variable conventions

- Times are local, 12-hour with am/pm (e.g. `11:40am`, `1:20pm`).
- `{skin_type_label}` is the plain-language Fitzpatrick label, not the roman numeral, in body copy (e.g. "fair skin that burns easily" rather than "Type II"). The table can show the roman numeral.
- Season-dependent figures (`{window_start}`, `{minutes}`, `{burn_minutes}`, `{typical_uv}`) default to the page's current-season value, with the opposite season mentioned in section 3 or the table. The dev decides whether the page recomputes seasonally or shows a representative month; copy works either way.

---

## Section 1 — Answer-first opening (40–60 words)

This is the most important paragraph on the page. It has to answer the search before any setup, because this is what gets pulled into AI Overviews and featured snippets. No warm-up, no "vitamin D is essential." First sentence states the window. Keep it to 40–60 words.

**Template (city with a vitamin D winter):**

> In {city}, your skin can make vitamin D from about {window_start} to {window_end} around midday, roughly {window_months}. With {skin_type_label}, {minutes} minutes is usually enough. After about {burn_minutes} minutes you start to risk burning. From {winter_months} the sun stays too low here to make any, so most people look at diet or a supplement.

**Template (city with a year-round window, e.g. lower latitudes):**

> In {city}, your skin can make vitamin D most of the day, with the strongest window from about {window_start} to {window_end}. With {skin_type_label}, {minutes} minutes around midday is usually enough. After about {burn_minutes} minutes you start to risk burning, so the goal is the benefit without the damage.

---

## Section 2 — Key-facts table intro (1 line)

One line above the table the dev generates. No preamble.

> Here are the numbers for {city} at a glance. Times are local; minutes assume bare arms and face around midday.

---

## Section 3 — "When you can actually make vitamin D in {city}"

Explains the window and why it moves. This is where the latitude story lives.

> Your skin only makes vitamin D when the sun is high enough in the sky. The rough cutoff is a sun angle of about 45 degrees above the horizon. Below that, the atmosphere absorbs most of the UVB, the specific wavelength that kicks off vitamin D in your skin. This is why midday matters and early morning doesn't, and why the window is wider in summer than winter.
>
> In {city}, that puts the daily window at roughly {window_start} to {window_end} right now, centered on solar noon at about {solar_noon}. The window shrinks through autumn as the sun's midday height drops.
>
> {winter_paragraph}

**`{winter_paragraph}` has two versions the dev selects on:**

_If the city has vitamin D winter months:_

> From {winter_months}, the sun in {city} never climbs past that 45-degree mark, even at noon. For those weeks the window is effectively closed. You can stand outside all day and make almost none. This isn't a {city} quirk, it's physics at {latitude}° latitude, and it's the main reason vitamin D levels dip in late winter here. It's also why a lot of people this far north consider a supplement through the dark months.

_If the city has no vitamin D winter:_

> {city} sits low enough in latitude ({latitude}°) that the midday sun clears the 45-degree mark year-round, so there's a usable window every month. It narrows in winter, but it doesn't close.

---

## Section 4 — "How long you need, by skin type"

Explains the skin-type spread and points at the table.

> How long you need comes down to melanin. It's a natural sunscreen, so darker skin filters more UVB before it reaches the cells that make vitamin D. That's not a flaw, it's just chemistry, and it means the same window asks for different amounts of time from different people.
>
> The gap is bigger than most people expect. Fair skin might be done in a few minutes of midday {city} sun. Deep brown or black skin can need five to ten times longer for the same amount. The table above gives the {city} figure for each skin type at today's typical UV of about {typical_uv}. Match your skin to the row and that's your rough target.
>
> One thing the minutes don't capture: more skin exposed means less time. Arms and face is the baseline. Shorts and a t-shirt cut it down.

---

## Section 5 — "When you'd start to burn in {city}"

The safety bookend. Frames the safe band between making D and burning. This is Bask's whole point, so it gets a small point of view.

> Here's the part most sun advice skips. There's a gap between the time it takes to make vitamin D and the time it takes to burn, and that gap is the whole game. Make the vitamin, leave before the damage.
>
> In {city} at today's UV of about {typical_uv}, {skin_type_label} starts to risk burning at around {burn_minutes} minutes. Your vitamin D only needs {minutes}. So the safe band is real, and on a strong summer day it can be tight. Burning doesn't earn you extra vitamin D, your skin caps production well before that point, so there's no benefit in pushing past it. The burn is pure cost.
>
> The catch is that the safe band changes every day with the UV, the season, and your skin. A fixed rule like "20 minutes" is wrong half the time. That's the case for checking before you go out rather than guessing.

---

## Compliance line (footer, every page)

One light line. Not a scary wall. Per C7.

> This is general information, not medical advice. Vitamin D needs vary by person. If you're worried about your levels or thinking about a supplement, check with a clinician.

---

## Variable glossary (maps to dev data model D2)

| Variable in copy                  | Source field (D2)                             | Notes                                                               |
| --------------------------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| `{city}`, `{region}`, `{country}` | `city`, `region`, `country`                   | Use region for disambiguation in title/H1                           |
| `{latitude}`                      | `latitude`                                    | Show as whole or one-decimal degrees                                |
| `{window_start}`, `{window_end}`  | `vitamin_d_window_by_month`                   | Current-season month; local 12h time                                |
| `{window_months}`                 | derived from `vitamin_d_window_by_month`      | Plain-language span, e.g. "March through October"                   |
| `{winter_months}`                 | `vitamin_d_winter_months`                     | Plain-language span; empty triggers the no-winter variant           |
| `{solar_noon}`                    | `solar_noon_by_month`                         | Current-season month                                                |
| `{skin_type_label}`               | from `minutes_for_vitamin_d_by_skin_type` key | Plain-language Fitzpatrick label (see table below)                  |
| `{minutes}`                       | `minutes_for_vitamin_d_by_skin_type`          | Current-season midday value for the chosen representative skin type |
| `{burn_minutes}`                  | `burn_time_by_skin_type`                      | Same skin type and UV as `{minutes}`                                |
| `{typical_uv}`                    | `typical_uv_by_month`                         | Current-season midday UV index                                      |
| `{solar_noon}`                    | `solar_noon_by_month`                         |                                                                     |
| `{nearby_cities}`                 | internal-linking set                          | Used in links, not body copy here                                   |

### Plain-language skin labels (for `{skin_type_label}`)

| Fitzpatrick | Body-copy label                             |
| ----------- | ------------------------------------------- |
| I           | very fair skin that always burns            |
| II          | fair skin that burns easily                 |
| III         | medium skin that sometimes burns            |
| IV          | olive or light brown skin that rarely burns |
| V           | brown skin that rarely burns                |
| VI          | deep brown or black skin                    |

For the answer-first opening, pick one representative skin type per page (suggest Type II or III for northern pilot cities, since that's the largest local audience and the most-searched intent). The table covers all six.
