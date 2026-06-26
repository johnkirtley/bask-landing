# Proposed Pilot City Set — for John's sign-off

**For:** John (city list + prioritization is your call per S3).
**Plan target:** 25–40 cities, prioritizing northern, English-speaking, higher-deficiency metros (UK, Canada, northern US, northern Europe). Skip equatorial clusters where every page says the same boring thing.

**The logic:** the further north, the longer the vitamin D winter, which makes the data genuinely useful and the "should I supplement?" angle natural rather than forced. These cities also have real English-language search demand for "[city] vitamin D" and "vitamin D winter [city]," and high documented deficiency rates. That's the overlap we want: strong data, real searches, a reason to install.

Latitudes are approximate. **Vitamin D winter is a rough estimate for prioritization only — the dev's solar model computes the exact months per city (D3), and that figure governs the page.**

---

## Tier 1 — core pilot (publish first): 25 cities

English-first markets, strong vitamin D winter, solid search demand. This alone satisfies the 25-city floor.

### UK & Ireland (11)

| City       | Slug                       | Lat (°N) | Est. vit D winter | Note                             |
| ---------- | -------------------------- | -------- | ----------------- | -------------------------------- |
| London     | `london-england`           | 51.5     | ~Oct–Mar          | Highest search volume in the set |
| Manchester | `manchester-england`       | 53.5     | ~Oct–Mar          |                                  |
| Birmingham | `birmingham-england`       | 52.5     | ~Oct–Mar          |                                  |
| Leeds      | `leeds-england`            | 53.8     | ~Oct–Mar          |                                  |
| Liverpool  | `liverpool-england`        | 53.4     | ~Oct–Mar          |                                  |
| Newcastle  | `newcastle-england`        | 55.0     | ~Sep–Mar          |                                  |
| Sheffield  | `sheffield-england`        | 53.4     | ~Oct–Mar          |                                  |
| Glasgow    | `glasgow-scotland`         | 55.9     | ~Sep–Mar          |                                  |
| Edinburgh  | `edinburgh-scotland`       | 56.0     | ~Sep–Mar          |                                  |
| Cardiff    | `cardiff-wales`            | 51.5     | ~Oct–Mar          |                                  |
| Belfast    | `belfast-northern-ireland` | 54.6     | ~Sep–Mar          |                                  |
| Dublin     | `dublin-ireland`           | 53.3     | ~Oct–Mar          | Ireland, strong deficiency angle |

_(That's 12 — Dublin tips UK&I to 12; total Tier 1 below counts it.)_

### Canada (6)

| City      | Slug                         | Lat (°N) | Est. vit D winter | Note                             |
| --------- | ---------------------------- | -------- | ----------------- | -------------------------------- |
| Toronto   | `toronto-ontario`            | 43.7     | ~Nov–Feb          | Largest CA market                |
| Vancouver | `vancouver-british-columbia` | 49.3     | ~Oct–Feb          | Heavy cloud angle is strong here |
| Montreal  | `montreal-quebec`            | 45.5     | ~Oct–Feb          |                                  |
| Calgary   | `calgary-alberta`            | 51.0     | ~Oct–Mar          |                                  |
| Edmonton  | `edmonton-alberta`           | 53.5     | ~Oct–Mar          | Classic vitamin D research city  |
| Ottawa    | `ottawa-ontario`             | 45.4     | ~Oct–Feb          |                                  |

### Northern US (7)

| City        | Slug                    | Lat (°N) | Est. vit D winter | Note                              |
| ----------- | ----------------------- | -------- | ----------------- | --------------------------------- |
| Seattle     | `seattle-washington`    | 47.6     | ~Nov–Feb          | Cloud cover angle is the story    |
| Portland    | `portland-oregon`       | 45.5     | ~Nov–Feb          | Disambiguate from Portland, ME    |
| Minneapolis | `minneapolis-minnesota` | 45.0     | ~Nov–Feb          |                                   |
| Chicago     | `chicago-illinois`      | 41.9     | ~Nov–Jan          |                                   |
| Boston      | `boston-massachusetts`  | 42.4     | ~Nov–Feb          | Holick's classic study city       |
| Detroit     | `detroit-michigan`      | 42.3     | ~Nov–Jan          |                                   |
| Anchorage   | `anchorage-alaska`      | 61.2     | ~Oct–Mar          | Extreme case, very shareable data |

**Tier 1 total: 25 cities** (12 UK&I + 6 CA + 7 US).

---

## Tier 2 — add if the pilot ranks: 10 cities

Northern Europe with high English proficiency and severe winters. Search demand is partly local-language, so the English pages won't pull the same volume as Tier 1, but the data is the most dramatic in the set and the deficiency story is well documented. Good for the scale-up batch, not day one.

| City       | Slug                    | Lat (°N) | Est. vit D winter | Note                                     |
| ---------- | ----------------------- | -------- | ----------------- | ---------------------------------------- |
| Reykjavik  | `reykjavik-iceland`     | 64.1     | ~Oct–Mar          | Longest winter in the set, flagship data |
| Helsinki   | `helsinki-finland`      | 60.2     | ~Oct–Mar          |                                          |
| Oslo       | `oslo-norway`           | 59.9     | ~Oct–Mar          |                                          |
| Stockholm  | `stockholm-sweden`      | 59.3     | ~Oct–Mar          |                                          |
| Copenhagen | `copenhagen-denmark`    | 55.7     | ~Sep–Mar          |                                          |
| Amsterdam  | `amsterdam-netherlands` | 52.4     | ~Oct–Mar          | High English proficiency                 |
| Aberdeen   | `aberdeen-scotland`     | 57.1     | ~Sep–Mar          | Most northern UK metro, strong data      |
| Winnipeg   | `winnipeg-manitoba`     | 49.9     | ~Oct–Mar          | Coldest-clear angle                      |
| Buffalo    | `buffalo-new-york`      | 42.9     | ~Nov–Jan          | Lake-effect cloud                        |
| Milwaukee  | `milwaukee-wisconsin`   | 43.0     | ~Nov–Feb          |                                          |

**Tier 1 + Tier 2 total: 35 cities** — within the 25–40 target.

---

## Notes for John

- **Disambiguation matters for ranking and for the title/H1.** Portland (OR vs ME), and any "Chelsea / Richmond"-type sub-area should always carry region, per the plan's example. Slugs above bake region in.
- **Skip list (deliberate):** equatorial and low-latitude metros (Singapore, Miami, Lagos, etc.). Every page would read "year-round, ~10 min midday," which is the thin-duplicate trap the plan warns against. If we ever want them, they belong on a single combined "sunny cities" page, not one each.
- **If you want to trim to exactly 25:** drop Tier 2 entirely and ship Tier 1. If you want closer to 40, I can extend Tier 2 with Hamburg, Berlin, Hull, Nottingham, Bristol, and Quebec City, all of which fit the profile.
- **One thing to confirm:** which skin type we feature in each page's answer-first opening. My recommendation is Type II for the UK/Ireland/Canada/US pages (largest local audience, highest-volume query) and to let the full table carry the rest. Flag if your install data suggests otherwise.
