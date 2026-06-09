# Bask Content Outlines — Pillar & Cluster Briefs

A working blueprint for the full content program. Everything is organized into **four pillars** (hub pages) with their **supporting children** (spoke posts), plus one **interactive tool**. Each brief gives you the snippet answer, section outline, FAQ questions, internal links, and CTA so a writer can move straight to drafting.

---

## How to read this document

**Hub-and-spoke logic:** Each pillar is a long, comprehensive page that targets a broad term and links down to its children. Each child targets one specific long-tail query, answers it deeply, and links back up to its pillar plus sideways to 2–3 siblings. This is what builds topical authority and feeds Google + LLMs a tight, interlinked cluster.

**The standard post skeleton** (every article uses this unless noted):
1. **Snippet answer** — 2–4 sentences at the very top that directly answer the title question with a number or yes/no. This is the block that wins featured snippets and gets quoted by ChatGPT/Perplexity. Write it so it stands alone.
2. **Short intro** — why this matters, who's asking (1 paragraph, no fluff).
3. **Body sections** — question-style H2s, at least one table, one "what changes this" bulleted list.
4. **How Bask helps** — one tight section connecting the answer to the app (never salesy; "here's how to know your number without doing the math").
5. **FAQ block** — 3–6 Q&As with FAQ schema markup.
6. **Sources** — primary citations (NIH ODS, Endocrine Society, EPA, peer-reviewed studies).

**Voice rules:** Write like a knowledgeable friend, not a brochure. Short sentences. Real numbers. No "in today's fast-paced world," no "unlock," no "delve," no "it's important to note." Cite sources plainly. Admit uncertainty where the science is mixed.

**The four pillars:**
- **Pillar 1 — How Much Sun Do You Need for Vitamin D** (the calculation cluster; Bask's core moat)
- **Pillar 2 — Vitamin D Deficiency: Symptoms, Levels & What to Do**
- **Pillar 3 — Vitamin D in Winter & by Latitude** (seasonal/geographic)
- **Pillar 4 — Best Vitamin D & Sun Tracking Apps** (comparison/bottom-of-funnel)
- **Plus:** the Vitamin D Sun Exposure Calculator (interactive tool, bridges Pillar 1)

---

# PILLAR 1 — How Much Sun Do You Need for Vitamin D?

> ✅ **WRITTEN — published 2026-06-05.** Draft at `src/content/blog/how-much-sun-do-you-need-for-vitamin-d.mdx`. Humanized; sourced to NIH ODS, EPA, Webb/Holick 1988, Linus Pauling Institute. Children still pending.

**Role:** Cornerstone page. This is the single most important asset in the program — highest Bask relevance and the cleanest LLM-citation shape. Everything in this cluster links back here.

**Primary keywords:** how much sun for vitamin D, how much sun to get vitamin D
**Secondary:** how long in the sun for vitamin D, sun exposure for vitamin D, vitamin D sunlight guide
**Search intent:** Informational — user wants a concrete number of minutes personalized to their skin, location, and the day's conditions, not a vague range.
**Target length:** 2,500–3,500 words (comprehensive pillar)

**Snippet answer (draft):**
> Most light-skinned people make enough vitamin D from roughly 10–30 minutes of midday sun on bare arms and legs a few times a week, but the real number depends on four things: the UV index (you need at least 3), your skin tone, how much skin is exposed, and your latitude and the season. Darker skin can need 2–6 times longer. Below about 35° latitude in winter, the sun is too low to produce any vitamin D at all.

**Outline:**
- **H2: The short answer (and why "10–30 minutes" is misleading)** — give the range, then immediately explain it's useless without context.
- **H2: The four things that decide your number** — UV index, skin type (Fitzpatrick), skin exposed, latitude/season. One sentence each, each linking to its child article.
- **H2: A minutes-by-UV-index-and-skin-type table** — the centerpiece. Rows = Fitzpatrick I–VI, columns = UV 3, 5, 7, 9+. This table is the asset LLMs will lift.
- **H2: The "shadow rule" — a no-app way to check** — if your shadow is shorter than you are, UVB is strong enough. Links to the angle-of-sun child.
- **H2: How much skin you expose changes everything** — face+hands vs. arms+legs vs. most of body. Rough multipliers.
- **H2: Can you get too much?** — body self-limits cutaneous D; burning gives you zero extra D and real risk. Links to the "too much sun" child.
- **H2: When the sun can't do the job** — winter, high latitude, indoor lifestyles → supplement. Links to Pillar 3 and "sun vs supplements."
- **H2: How Bask calculates your exact number** — the app combines live UV index, your location, skin type, and exposure to give a real-time "go outside now / you're done" readout.
- **FAQ:** How long should a fair-skinned person stay in the sun? Does the time change in winter? Can I get vitamin D before 10am? Do I need to expose my face? Is sunburn ever worth it for vitamin D?
- **Internal links:** all Pillar 1 children; the Calculator tool; Pillar 3 (winter).
- **CTA:** "Stop guessing your number — Bask does this math for your exact location and skin in real time."

---

## Pillar 1 children

### 1.1 — What UV Index Do You Need to Make Vitamin D?
> ✅ **WRITTEN — published 2026-06-05.** Draft at `src/content/blog/what-uv-index-do-you-need-for-vitamin-d.mdx`. Humanized; sourced to EPA, NIH ODS, WHO. Links up to cornerstone, sideways to 1.2.
- **Type:** Child (high priority — closest to Bask's core mechanic)
- **Primary keyword:** what UV index for vitamin D · **Secondary:** UV index vitamin D, minimum UV index vitamin D, UV index 3 vitamin D
- **Intent:** Calculation/technical — biohackers and app-adjacent searchers.
- **Length:** 1,200–1,600 words
- **Snippet answer:** You need a UV index of at least 3 for your skin to make vitamin D, because below that the sun sits too low in the sky for UVB rays to reach the ground. Higher UV means faster production but also faster burning.
- **Outline:**
  - H2: The magic number is 3 — why UVB needs UV index ≥3
  - H2: What "UV index" actually measures (UVA vs UVB; only UVB makes D)
  - H2: UV index → vitamin D speed table (UV 3 / 5 / 7 / 9+ and rough minutes by skin type)
  - H2: Why a high UV index doesn't mean "more is better" (burn risk rises faster than D)
  - H2: How to check today's UV index (weather apps, EPA, or Bask's live reading)
  - H2: How Bask uses UV index to time your sessions
- **FAQ:** Can you get vitamin D at UV index 2? Does UV index 10 make vitamin D faster? Is the UV index the same as temperature? What UV index causes sunburn?
- **Internal links:** Pillar 1; Best Time of Day; Cloudy Day; Calculator.
- **CTA:** "Bask reads your local UV index minute by minute so you know the moment it crosses 3."

### 1.2 — The Best Time of Day to Get Vitamin D From the Sun
> ✅ **WRITTEN — published 2026-06-05.** Draft at `src/content/blog/best-time-of-day-to-get-vitamin-d.mdx`. Humanized; sourced to NIH ODS, EPA, Webb/Holick 1988. Links up to cornerstone, sideways to 1.1.
- **Type:** Child (high priority)
- **Primary keyword:** best time of day to get vitamin D from sun · **Secondary:** best time for vitamin D, midday sun vitamin D, is morning sun good for vitamin D
- **Intent:** Practical timing.
- **Length:** 1,200–1,500 words
- **Snippet answer:** The best time to make vitamin D is the middle of the day — roughly 10am to 3pm, centered on solar noon — when the sun is highest and UVB is strongest. Early morning and late afternoon sun feel pleasant but produce little to no vitamin D.
- **Outline:**
  - H2: Why midday wins (sun angle and UVB explained simply)
  - H2: What "solar noon" means and why it's not always 12:00
  - H2: Morning sun vs midday sun (morning = circadian benefits, not D — link to circadian child)
  - H2: How the best window shifts by season and latitude
  - H2: The trade-off: peak D time is also peak burn time
  - H2: How Bask finds your daily window
- **FAQ:** Can you get vitamin D after 3pm? Is 8am sun good for vitamin D? What time is solar noon where I live? Is afternoon sun better than morning?
- **Internal links:** Pillar 1; UV Index; Solar Noon child; Morning Sunlight (Pillar 3); Calculator.

### 1.3 — How Long to Sit in the Sun for Vitamin D, by Skin Type
- **Type:** Child
- **Primary keyword:** how long to sit in sun for vitamin D · **Secondary:** sun exposure for vitamin D by skin type, vitamin D dark skin sun, melanin vitamin D
- **Intent:** Calculation.
- **Length:** 1,200–1,500 words
- **Snippet answer:** At a UV index of 3 or higher, very fair skin (type I–II) needs about 10–15 minutes, medium skin (III–IV) about 15–25 minutes, and dark skin (V–VI) can need 40 minutes to over an hour to make the same vitamin D — because melanin is natural sun protection that slows UVB absorption.
- **Outline:**
  - H2: Why skin tone changes the timer (melanin = built-in SPF)
  - H2: Minutes-by-skin-type table (at UV 3, 5, 7)
  - H2: The dark-skin vitamin D gap (higher deficiency rates, why it matters)
  - H2: How to find your skin type in 30 seconds (link to Fitzpatrick child)
  - H2: Why "until slightly pink" is the wrong target
  - H2: How Bask personalizes your timer
- **FAQ:** How long for dark skin to get vitamin D? Does tanned skin make less vitamin D? Why do I burn before I tan? Can darker skin get enough vitamin D from the sun?
- **Internal links:** Pillar 1; Fitzpatrick child; UV Index; Calculator.

### 1.4 — Fitzpatrick Skin Type & Vitamin D: Find Your Type and Your Sun Number
- **Type:** Child (add interactive quiz)
- **Primary keyword:** Fitzpatrick skin type · **Secondary:** Fitzpatrick scale, skin type chart, what is my skin type
- **Intent:** Informational + self-assessment.
- **Length:** 1,400–1,800 words + embedded quiz
- **Snippet answer:** The Fitzpatrick scale sorts skin into six types based on how it reacts to sun, from Type I (always burns, never tans) to Type VI (deeply pigmented, rarely burns). Your type determines both how quickly you burn and how long you need in the sun to make vitamin D.
- **Outline:**
  - H2: What the Fitzpatrick scale is and why dermatologists use it
  - H2: The six types, described plainly (with a comparison table)
  - H2: Take the quiz — find your type (interactive)
  - H2: What your type means for sunburn risk
  - H2: What your type means for vitamin D timing (link to 1.3)
  - H2: How Bask uses your type to personalize everything
- **FAQ:** What's the most common skin type? Can your skin type change? Is Fitzpatrick the same as skin tone? Which skin types are most at risk of vitamin D deficiency?
- **Internal links:** Pillar 1; How Long by Skin Type; Calculator; Deficiency pillar.
- **Note:** The quiz is a dwell-time and engagement asset — build it to output "your type + your sun number + try Bask."

### 1.5 — Can You Get Vitamin D on a Cloudy Day?
> ✅ **WRITTEN — published 2026-06-05.** Draft at `src/content/blog/can-you-get-vitamin-d-on-a-cloudy-day.mdx`. Humanized; EPA cloud figures, NIH ODS, WHO. Linked into cornerstone + cluster.
- **Type:** Child
- **Primary keyword:** can you get vitamin D on a cloudy day · **Secondary:** vitamin D cloudy day, vitamin D overcast, do clouds block UV
- **Intent:** Informational/practical.
- **Length:** 900–1,200 words
- **Snippet answer:** Yes, you can still make some vitamin D on a cloudy day, but a lot less. Clear skies let through nearly all UV; scattered clouds pass about 89%, broken clouds about 73%, and full overcast only around 31% — so a gray day can cut your vitamin D production by roughly two-thirds.
- **Outline:**
  - H2: The short answer (with the EPA cloud-cover percentages — your citable table)
  - H2: Why clouds block UVB unevenly (thin haze vs thick storm clouds)
  - H2: The catch — you can burn on a cloudy day too
  - H2: How much longer you'd need on an overcast day
  - H2: How Bask factors cloud cover into your reading
- **FAQ:** Can you get sunburned on a cloudy day? Does fog block vitamin D? How long in the sun on a cloudy day? Is winter sun worth it when it's overcast?
- **Internal links:** Pillar 1; UV Index; Through a Window; Pillar 3.
- **Sources:** US EPA "Learn About the UV Index" cloud transmission figures.

### 1.6 — Can You Get Vitamin D Through a Window?
> ✅ **WRITTEN — published 2026-06-05.** Draft at `src/content/blog/can-you-get-vitamin-d-through-a-window.mdx`. Humanized; Utah Health, NIH ODS, Skin Cancer Foundation. Linked into cornerstone + cluster.
- **Type:** Child (high evergreen volume)
- **Primary keyword:** can you get vitamin D through a window · **Secondary:** vitamin D through glass, vitamin D car window, does glass block UVB
- **Intent:** Myth-check.
- **Length:** 900–1,200 words
- **Snippet answer:** No. Ordinary window glass blocks essentially all UVB — the specific wavelength your skin needs to make vitamin D — so sitting by a sunny window does almost nothing for your levels. Glass lets through UVA (which can still age and damage skin), which is why you can feel warmth and even tan slightly without making vitamin D.
- **Outline:**
  - H2: The short answer: no, and here's the science (UVB vs UVA through glass)
  - H2: Why you can still feel hot and even tan through glass
  - H2: Car windows, office windows, sunrooms — same problem
  - H2: The skin-damage twist (UVA exposure without the D benefit)
  - H2: So when can you actually make it? (link to Pillar 1)
- **FAQ:** Can you get vitamin D in a sunroom? Does UV glass exist? Can you tan through a window? Do I still need sunscreen near a window?
- **Internal links:** Pillar 1; Sunscreen child; Best Time of Day.

### 1.7 — Does Sunscreen Block Vitamin D? What the Research Actually Says
> ✅ **WRITTEN — published 2026-06-05.** Draft at `src/content/blog/does-sunscreen-block-vitamin-d.mdx`. Humanized; Skin Cancer Foundation, NIH ODS, Prevent Cancer Foundation. Linked into cornerstone + cluster.
- **Type:** Child (high interest)
- **Primary keyword:** does sunscreen block vitamin D · **Secondary:** SPF and vitamin D, can you get vitamin D with sunscreen on
- **Intent:** Informational — resolving a perceived conflict.
- **Length:** 1,200–1,500 words
- **Snippet answer:** In theory, sunscreen blocks vitamin D — SPF 30 filters about 97% of UVB and SPF 50 about 98%. In practice, most people apply far less than the tested amount and miss spots, so studies consistently find that regular sunscreen use does not cause vitamin D deficiency. You can protect your skin and still make vitamin D.
- **Outline:**
  - H2: The lab answer vs the real-world answer
  - H2: Why "97% blocked" doesn't play out in practice (application amount, reapplication, missed areas)
  - H2: What the studies show (no link between everyday sunscreen use and deficiency)
  - H2: The smart approach: get your short window first, then protect
  - H2: How Bask helps you time the window before you cover up
- **FAQ:** Should I skip sunscreen to get vitamin D? Does SPF 50 block all vitamin D? How long before sunscreen can I sit in the sun? Is daily sunscreen bad for vitamin D?
- **Internal links:** Pillar 1; Through a Window; Too Much Sun; Calculator.
- **Sources:** EPA/dermatology SPF transmission figures; real-world application studies.

### 1.8 — Can You Get Vitamin D in the Shade?
- **Type:** Child (long-tail, fast win)
- **Primary keyword:** can you get vitamin D in the shade · **Secondary:** vitamin D direct sunlight, vitamin D under umbrella
- **Intent:** Informational.
- **Length:** 700–1,000 words
- **Snippet answer:** Yes, a little. Shade still contains scattered UVB bouncing off the sky and surroundings, so you make some vitamin D — but typically far less than in direct sun, often less than half. An umbrella or tree cuts your production significantly but doesn't zero it out.
- **Outline:**
  - H2: The short answer (scattered vs direct UVB)
  - H2: How much less D you make in shade
  - H2: Open shade vs deep shade vs under an umbrella
  - H2: When shade is the smart move (high UV, burn risk)
  - H2: How Bask reads your real exposure
- **FAQ:** Do you make vitamin D under a tree? Can you burn in the shade? Is shade enough in summer? Does an umbrella block all UV?
- **Internal links:** Pillar 1; Cloudy Day; Sunscreen.

### 1.9 — How Much Vitamin D Can You Get in 15 Minutes of Sun?
- **Type:** Child (long-tail, ideal AI-Overview shape)
- **Primary keyword:** how much vitamin D in 15 minutes of sun · **Secondary:** vitamin D 10 minutes sun, IU vitamin D per minute sun
- **Intent:** Calculation.
- **Length:** 800–1,100 words
- **Snippet answer:** A fair-skinned person exposing arms and legs to midday summer sun (UV index 6+) can make several thousand IU of vitamin D in about 15 minutes — often more than a typical supplement dose. Darker skin, lower UV, or less exposed skin can drop that to a few hundred IU or less in the same 15 minutes.
- **Outline:**
  - H2: The short answer with a real range
  - H2: Why a single number is impossible (the four variables again)
  - H2: 15-minute estimates by skin type and UV index (table)
  - H2: How 15 minutes of sun compares to a 1,000–2,000 IU pill
  - H2: How Bask estimates your actual IU per session
- **FAQ:** Is 15 minutes of sun enough vitamin D? How many IU is 20 minutes of sun? Does 10 minutes count? Can a short walk give me vitamin D?
- **Internal links:** Pillar 1; Sun vs Supplements; Calculator; How Long by Skin Type.

### 1.10 — What Time Does the Sun Stop Making Vitamin D? (Solar Noon Explained)
- **Type:** Child (long-tail timing)
- **Primary keyword:** what time vitamin D sun · **Secondary:** solar noon vitamin D, can you get vitamin D in the evening, vitamin D after 3pm
- **Intent:** Timing/calculation.
- **Length:** 800–1,100 words
- **Snippet answer:** Your skin makes vitamin D only when the sun is high enough for the UV index to reach 3, which usually means a window of a few hours centered on solar noon — roughly 10am to 3pm in summer, and a much shorter or nonexistent window in winter. Once the sun drops low in late afternoon, vitamin D production stops even though it's still light out.
- **Outline:**
  - H2: The short answer (UV index ≥3 window, centered on solar noon)
  - H2: What solar noon is and how to find yours
  - H2: Why late afternoon sun produces little D
  - H2: How the window shrinks with season and latitude
  - H2: How Bask shows your open and close times each day
- **FAQ:** Can you get vitamin D at 5pm? Is sunset sun good for vitamin D? What time is best in summer vs winter? Does the window change where I live?
- **Internal links:** Pillar 1; Best Time of Day; Angle of Sun; Pillar 3.

### 1.11 — Can You Get Vitamin D in the Morning?
- **Type:** Child (long-tail; clears a common confusion)
- **Primary keyword:** can you get vitamin D in the morning · **Secondary:** morning sun vitamin D, early sun vitamin D
- **Intent:** Informational.
- **Length:** 700–1,000 words
- **Snippet answer:** Usually not much. Early-morning sun sits too low in the sky for UVB to reach you, so the UV index is typically below 3 until mid-to-late morning — meaning little vitamin D. Morning light is still valuable for your body clock and mood, but that's a different benefit from vitamin D.
- **Outline:**
  - H2: The short answer (low sun angle = low UVB)
  - H2: The mix-up: morning light for your circadian rhythm vs vitamin D (link to circadian child)
  - H2: When morning sun does start making D (season-dependent)
  - H2: The best of both: morning light for your clock, midday for D
  - H2: How Bask separates the two for you
- **FAQ:** Is 7am sun good for vitamin D? Does morning sun count? Should I get sun in the morning or midday? Is morning light the same as vitamin D?
- **Internal links:** Pillar 1; Best Time of Day; Morning Sunlight (Pillar 3); Solar Noon.

### 1.12 — Can You Get Too Much Vitamin D From the Sun?
- **Type:** Child (reassurance/safety myth-bust)
- **Primary keyword:** can you get too much vitamin D from the sun · **Secondary:** vitamin D toxicity sun, sun vitamin D overdose
- **Intent:** Safety/informational.
- **Length:** 800–1,100 words
- **Snippet answer:** No — you can't overdose on vitamin D from sunlight. Your skin naturally caps how much it makes and breaks down the excess, so vitamin D toxicity only comes from high-dose supplements, never the sun. The real risk from too much sun is burning and skin damage, not too much vitamin D.
- **Outline:**
  - H2: The short answer (the body self-limits cutaneous D)
  - H2: How that built-in safety switch works
  - H2: Where toxicity actually comes from (supplements)
  - H2: The real danger of overexposure: burns, aging, cancer risk
  - H2: How Bask keeps you in the safe zone
- **FAQ:** Can sunbathing cause vitamin D toxicity? How much sun is too much? Can supplements be dangerous? What are signs of too much vitamin D?
- **Internal links:** Pillar 1; Sunscreen; Optimal Levels (Pillar 2); Dosage (Pillar 2).

### 1.13 — The Angle of the Sun & Vitamin D: Why the Shadow Rule Works
- **Type:** Child (niche, high Bask-fit, low competition)
- **Primary keyword:** vitamin D angle of sun · **Secondary:** shadow rule vitamin D, sun angle UVB, 45 degree sun vitamin D
- **Intent:** Technical/informational.
- **Length:** 800–1,100 words
- **Snippet answer:** When the sun is higher than about 45° above the horizon, UVB can reach you and your skin can make vitamin D. The easy test is the shadow rule: if your shadow is shorter than your height, the sun is high enough; if it's longer, the angle is too low and you're making little to none.
- **Outline:**
  - H2: The short answer + the shadow rule
  - H2: Why a low sun angle filters out UVB (longer path through atmosphere)
  - H2: How to use the shadow rule without any app
  - H2: Why this is why winter and high latitudes fail (link to Pillar 3)
  - H2: How Bask calculates sun angle precisely for your spot
- **FAQ:** What sun angle is needed for vitamin D? How do I use the shadow rule? Why is winter sun useless for vitamin D? Does the rule work everywhere?
- **Internal links:** Pillar 1; Solar Noon; Pillar 3; How Far From Equator.

### 1.14 — Do Tanning Beds Give You Vitamin D?
- **Type:** Child (myth/safety; captures tanning-adjacent audience)
- **Primary keyword:** do tanning beds give vitamin D · **Secondary:** tanning bed vitamin D, sunbed vitamin D, tanning vitamin D
- **Intent:** Informational/safety.
- **Length:** 800–1,100 words
- **Snippet answer:** Most tanning beds give you little to no vitamin D because they emit mainly UVA — the wavelength that tans and ages skin — rather than the UVB your body needs to make vitamin D. Health authorities don't recommend tanning beds for vitamin D, since they raise skin cancer risk without reliably raising your levels.
- **Outline:**
  - H2: The short answer (UVA vs UVB in tanning beds)
  - H2: Why a tan isn't proof of vitamin D
  - H2: The cancer-risk trade-off
  - H2: Safer ways to raise low vitamin D (sun timing, food, supplements)
  - H2: How Bask helps you get D the safe way
- **FAQ:** Do sunbeds make vitamin D? Is a tan a sign of vitamin D? Are tanning beds ever recommended? What's safer than a tanning bed?
- **Internal links:** Pillar 1; Sun vs Supplements (Pillar 2); Without the Sun (Pillar 2).

---

# PILLAR 2 — Vitamin D Deficiency: Symptoms, Levels & What to Do

**Role:** The authority anchor. Highest-volume informational territory, dominated by major medical sites, so this is a gradual, long-term ranking play that establishes E-E-A-T. Connects the "am I deficient?" audience to the sun-exposure and supplement answers.

**Primary keywords:** vitamin D deficiency symptoms, signs of vitamin D deficiency
**Secondary:** vitamin D deficiency symptoms in women/men, am I vitamin D deficient, low vitamin D signs
**Search intent:** Informational/health-concern — user suspects deficiency and wants the symptom list plus what to do next.
**Target length:** 2,500–3,500 words (pillar)

**Snippet answer (draft):**
> The most common signs of vitamin D deficiency are fatigue, bone or muscle aches, frequent illness, low mood, and hair thinning — but many people have no symptoms at all, which is why it's so common. Deficiency is defined as a blood 25(OH)D level below 20 ng/mL. A blood test is the only way to confirm it; the fix is usually more sunlight, vitamin D–rich food, or a supplement.

**Outline:**
- **H2: The short answer + who's most at risk** (older adults, darker skin, indoor lifestyles, high latitudes, obesity).
- **H2: The full symptom checklist** — fatigue, bone/muscle pain, frequent infections, low mood/depression, hair loss, slow healing. Each with a one-line "why."
- **H2: The silent problem — why most deficiency has no symptoms.**
- **H2: What counts as deficient? The blood-level numbers** — NIH ODS thresholds (deficient <12 ng/mL, inadequate 12–20, sufficient ≥20, possible harm >50). Link to Optimal Levels child. Note the 2024 Endocrine Society stance against routine screening.
- **H2: How deficiency happens** — not enough sun, season/latitude, diet, absorption, skin tone. Each links to the relevant article.
- **H2: How to fix it** — sun (link Pillar 1), food (link child), supplements (link dosage child); when to see a doctor.
- **H2: How Bask helps you catch the most fixable cause** — are you actually getting usable sun? The app tells you.
- **FAQ:** What are the first signs of low vitamin D? Can low vitamin D cause weight gain? How long to fix a deficiency? Should I get tested? What level is dangerous?
- **Internal links:** all Pillar 2 children; Pillar 1; Pillar 3.
- **CTA:** "The most common cause of low vitamin D is simply not getting usable sun — Bask shows you whether you are."
- **Compliance note:** YMYL topic. Cite NIH ODS, Endocrine Society. Add a "this isn't medical advice; see your doctor" disclaimer.

---

## Pillar 2 children

### 2.1 — How Much Vitamin D Do You Need Per Day? (RDA, Optimal Levels & the 2024 Guidelines)
- **Type:** Child (high volume)
- **Primary keyword:** how much vitamin D per day · **Secondary:** how much vitamin D should I take, vitamin D dosage, vitamin D IU per day
- **Intent:** Informational/decision (dose).
- **Length:** 1,500–2,000 words
- **Snippet answer:** The official RDA is 600 IU a day for most adults and 800 IU for those over 70, set by the Institute of Medicine. Some experts argue for 1,000–2,000 IU, but the 2024 Endocrine Society guideline advises against routine high-dose supplements for healthy adults under 75. The right dose depends on your blood level, sun exposure, and risk factors.
- **Outline:**
  - H2: The short answer (RDA numbers)
  - H2: The conflicting guidance, explained (IOM vs older Endocrine Society vs 2024 update) — comparison table
  - H2: Why recommendations disagree (different goals: avoiding deficiency vs chasing "optimal")
  - H2: Dose by situation (deficient, maintenance, older adults, darker skin, low-sun lifestyle)
  - H2: Sun vs pill — how to count what the sun already gives you (link Pillar 1)
  - H2: How Bask factors your sun into your supplement decision
- **FAQ:** Is 2000 IU too much? How much vitamin D in winter? Can I take vitamin D daily? Do I need vitamin D if I get sun?
- **Internal links:** Pillar 2; Optimal Levels; Sun vs Supplements; Pillar 1.
- **Sources:** NIH ODS; Endocrine Society 2024 guideline (Demay et al., JCEM).

### 2.2 — Optimal Vitamin D Levels: What Should Your 25(OH)D Number Be?
- **Type:** Child
- **Primary keyword:** optimal vitamin D level · **Secondary:** what should vitamin D level be, vitamin D ng/mL chart, normal vitamin D range
- **Intent:** Informational (post-blood-test).
- **Length:** 1,200–1,600 words
- **Snippet answer:** Most labs consider a 25(OH)D level of 20 ng/mL or above sufficient and below 12 ng/mL deficient, per the NIH. Some researchers argue 30–50 ng/mL is "optimal," but the 2024 Endocrine Society guideline stepped back from a fixed target. Above 50 ng/mL offers no added benefit and may carry risk.
- **Outline:**
  - H2: The short answer + a reference table (ng/mL and nmol/L)
  - H2: Deficient vs insufficient vs sufficient vs too high
  - H2: The "optimal" debate (why 20 vs 30 vs 50 is contested)
  - H2: What the big trials found (VITAL — link to Benefits child)
  - H2: How to read your own test result
  - H2: How Bask helps you maintain a steady level year-round
- **FAQ:** Is 30 ng/mL good? What level is deficient? Can vitamin D be too high? How often should I test?
- **Internal links:** Pillar 2; Dosage; Benefits; Too Much Sun.
- **Sources:** NIH ODS thresholds; VITAL trial; Endocrine Society 2024.

### 2.3 — Vitamin D Deficiency and Fatigue: Is Your Tiredness Linked to Low D?
- **Type:** Child (high-volume symptom long-tail)
- **Primary keyword:** vitamin D deficiency fatigue · **Secondary:** can low vitamin D cause tiredness, vitamin D and energy, low vitamin D exhaustion
- **Intent:** Symptom/informational.
- **Length:** 1,000–1,300 words
- **Snippet answer:** Yes — fatigue is one of the most common symptoms of low vitamin D, and studies show that correcting a deficiency can improve tiredness in people who were deficient. But fatigue has many causes, so low vitamin D is worth checking, not assuming.
- **Outline:**
  - H2: The short answer (the D–fatigue link)
  - H2: Why low vitamin D can drain energy
  - H2: What the research actually shows (modest, mostly in deficient people)
  - H2: Other common causes of fatigue to rule out
  - H2: How to check and fix it
  - H2: How Bask helps address the sun-exposure piece
- **FAQ:** Can low vitamin D make you sleepy? How long until energy improves? Is tiredness the first sign? Does winter fatigue mean low D?
- **Internal links:** Pillar 2; Optimal Levels; Pillar 3 (SAD); Pillar 1.

### 2.4 — Vitamin D From Sun vs. Supplements: Which Is Better?
- **Type:** Child (core to Bask's value prop)
- **Primary keyword:** vitamin D from sun vs supplements · **Secondary:** sun or supplements vitamin D, is sunlight better than vitamin D pills
- **Intent:** Decision/informational.
- **Length:** 1,200–1,600 words
- **Snippet answer:** Both work. Sunlight is free and may produce vitamin D that lasts longer in your blood, but it's unreliable in winter, at high latitudes, and for darker skin. Supplements are consistent and precise year-round. The best approach for most people is sun when it's available and a supplement to fill the gaps.
- **Outline:**
  - H2: The short answer (sun + supplement, not either/or)
  - H2: The case for sun (free, possibly longer-lasting, extra light benefits)
  - H2: The case for supplements (reliable, dosed, all-season)
  - H2: When sun simply can't do it (link Pillar 3)
  - H2: A simple decision framework
  - H2: How Bask tells you which you need today
- **FAQ:** Is sun or supplement better? Does sun vitamin D last longer? Can I rely on sun alone? Do I still need a pill in summer?
- **Internal links:** Pillar 2; Dosage; Without the Sun; Pillar 1; Pillar 3.

### 2.5 — How to Get Vitamin D Without the Sun (Foods, Supplements & Lamps)
- **Type:** Child
- **Primary keyword:** how to get vitamin D without sun · **Secondary:** vitamin D foods, foods high in vitamin D, vitamin D without sunlight
- **Intent:** Informational (low-sun situations).
- **Length:** 1,200–1,500 words
- **Snippet answer:** When sun isn't an option, you can get vitamin D from fatty fish (salmon, mackerel, sardines), egg yolks, fortified milk and cereals, and mushrooms exposed to UV — but few foods carry enough to hit your daily target, so a D3 supplement is usually the most reliable backup.
- **Outline:**
  - H2: The short answer (food + supplements)
  - H2: Best food sources (table with IU per serving)
  - H2: Why food alone rarely covers it
  - H2: Supplements: D2 vs D3, dosing basics (link Dosage)
  - H2: Do UV lamps work? (briefly — and the cautions)
  - H2: How Bask helps you know when you need the backup
- **FAQ:** What food has the most vitamin D? Can you get enough from diet alone? Is D3 better than D2? Do vitamin D lamps work?
- **Internal links:** Pillar 2; Dosage; Sun vs Supplements; Pillar 3.

### 2.6 — Vitamin D Benefits: What the Evidence Actually Supports
- **Type:** Child (authority/E-E-A-T anchor)
- **Primary keyword:** vitamin D benefits · **Secondary:** benefits of vitamin D, what does vitamin D do, vitamin D immune system
- **Intent:** Informational.
- **Length:** 1,500–2,000 words
- **Snippet answer:** Vitamin D's best-proven job is keeping bones and muscles strong by helping the body absorb calcium. Claims about preventing cancer, heart disease, and infections are popular but largely unproven — the large VITAL trial found no reduction in cancer, cardiovascular events, or fractures in healthy adults taking 2,000 IU a day.
- **Outline:**
  - H2: The short answer (strong for bone; mixed for the rest)
  - H2: What vitamin D definitely does (calcium, bone, muscle)
  - H2: The promising-but-unproven list (immunity, mood, cancer, heart) — evidence-graded
  - H2: What the big trials found (VITAL and its fracture follow-up)
  - H2: Who actually benefits most (the deficient)
  - H2: How Bask helps you cover the proven basics
- **FAQ:** Does vitamin D boost immunity? Does it prevent cancer? Does it help depression? Who benefits most from vitamin D?
- **Internal links:** Pillar 2; Optimal Levels; Dosage; Testosterone child.
- **Sources:** VITAL (Manson et al., NEJM 2019); LeBoff et al. fracture ancillary (NEJM 2022); NIH ODS.
- **Compliance note:** Avoid overstated claims; this honesty is the ranking and citation advantage.

### 2.7 — Does Vitamin D From the Sun Last Longer Than Supplements?
- **Type:** Child (long-tail, shareable)
- **Primary keyword:** does sun vitamin D last longer · **Secondary:** how long does vitamin D from sun last, vitamin D stored in fat
- **Intent:** Informational.
- **Length:** 800–1,100 words
- **Snippet answer:** There's evidence that vitamin D made in your skin from sunlight may circulate in your blood longer than vitamin D from a supplement, possibly because it's released more gradually. Either way, your body stores vitamin D in fat and can draw on it for weeks to months, which is why summer sun helps buffer the early winter.
- **Outline:**
  - H2: The short answer (sun-made D may linger longer)
  - H2: Why that might be (gradual release from skin)
  - H2: How the body stores vitamin D for later
  - H2: What this means for your winter buffer (link Pillar 3)
  - H2: How Bask helps you bank D while you can
- **FAQ:** How long does vitamin D stay in your body? Can summer sun last into winter? Is sun D really better? How long to deplete stores?
- **Internal links:** Pillar 2; Sun vs Supplements; Pillar 3; Pillar 1.

### 2.8 — Vitamin D and Testosterone: Does Sunlight Boost T?
- **Type:** Child (targets the male-optimizer/biohacker segment)
- **Primary keyword:** vitamin D testosterone · **Secondary:** does vitamin D increase testosterone, sunlight testosterone
- **Intent:** Informational (optimizer audience).
- **Length:** 1,000–1,300 words
- **Snippet answer:** The link is real but modest and mostly applies to men who are vitamin D deficient. Some studies show correcting low vitamin D can nudge testosterone up, but in men with normal levels, more vitamin D doesn't reliably raise it. Sunlight may help indirectly by fixing a deficiency, not by acting as a testosterone booster.
- **Outline:**
  - H2: The short answer (modest, deficiency-dependent)
  - H2: What the research shows (mixed; strongest in deficient/overweight men)
  - H2: Why sunlight gets credit (it fixes the deficiency)
  - H2: What this means if your T is low
  - H2: How Bask helps you rule out the vitamin D piece
- **FAQ:** Does sunlight raise testosterone? How much vitamin D for testosterone? Is the effect proven? Does it work if I'm not deficient?
- **Internal links:** Pillar 2; Benefits; Dosage; Pillar 1.
- **Compliance note:** Don't overstate; flag mixed evidence clearly.

---

# PILLAR 3 — Can You Get Vitamin D in Winter? (Latitude & Season)

**Role:** The seasonal/geographic cornerstone. Search demand for vitamin D peaks in February, so publish this cluster in early autumn (Sept–Oct) to lead the spike. Bask's latitude engine is the clearest differentiator here — nobody owns the "by city/by month" answer well.

**Primary keywords:** can you get vitamin D in winter, vitamin D in winter
**Secondary:** vitamin D winter sun, winter vitamin D deficiency, vitamin D by latitude
**Search intent:** Informational/seasonal — "is winter sun pointless, and what should I do about it?"
**Target length:** 2,200–3,000 words (pillar)

**Snippet answer (draft):**
> For much of the world, no — you can't make vitamin D in winter. Above about 35° latitude (most of the US, Europe, and Canada), the winter sun sits too low for UVB to reach you from roughly October through March, a stretch sometimes called "vitamin D winter." During those months, food and supplements are the only reliable sources.

**Outline:**
- **H2: The short answer + the 35° rule.**
- **H2: What "vitamin D winter" means and how long it lasts** (cite the ~126-day European average; London/Oslo UVB contrasts).
- **H2: Find your vitamin D winter by latitude** — table or map by latitude band / major cities. Link to the by-city child.
- **H2: Why the winter sun fails** (low angle, long atmospheric path — link Angle of Sun).
- **H2: What to do from October to March** (banked summer stores, food, supplements — link children).
- **H2: The mood angle** (less light, SAD — link SAD child).
- **H2: How Bask tells you exactly when your window closes and reopens.**
- **FAQ:** Can you get vitamin D in winter sun? What latitude can't make vitamin D in winter? Should everyone supplement in winter? When does the window reopen?
- **Internal links:** all Pillar 3 children; Angle of Sun (Pillar 1); Dosage/Without the Sun (Pillar 2).
- **CTA:** "Bask knows the exact dates your location can and can't make vitamin D — so you supplement only when you actually need to."
- **Sources:** latitude/UVB seasonal studies; Sajadi et al. search-seasonality (for the editorial timing rationale, not the article body).

---

## Pillar 3 children

### 3.1 — When Can You Get Vitamin D in [City]? Vitamin D by Latitude
- **Type:** Child (programmatic/template opportunity — high Bask-fit)
- **Primary keyword:** vitamin D by latitude · **Secondary:** vitamin D winter [city], vitamin D Seattle/Boston/London/New York winter, 37 degrees latitude vitamin D
- **Intent:** Local/informational.
- **Length:** 1,500–2,000 words hub + per-city sections (or templated pages)
- **Snippet answer:** Whether you can make vitamin D depends on your latitude and the month. Cities below about 35°N — like Los Angeles, Atlanta, and Phoenix — can make some vitamin D year-round, while cities above 40°N — like New York, Chicago, Seattle, and London — get little to none from roughly November through February.
- **Outline:**
  - H2: The short answer (latitude + month)
  - H2: Interactive map / lookup by city
  - H2: Major cities table (city, latitude, months you can make D)
  - H2: How to read your own location
  - H2: What to do during your off-months (link Pillar 3 + supplements)
  - H2: How Bask calculates this live for anywhere on Earth
- **FAQ:** Can you get vitamin D in [common cities]? What's the cutoff latitude? Does it change year to year? Which US cities can make it year-round?
- **Internal links:** Pillar 3; Angle of Sun; How Far From Equator; Calculator.
- **Note:** Strong candidate for templated city pages (programmatic SEO) once the hub proves out.

### 3.2 — How to Get Enough Vitamin D in the Winter (A Practical Plan)
- **Type:** Child (actionable companion to the pillar)
- **Primary keyword:** how to get vitamin D in winter · **Secondary:** winter vitamin D tips, vitamin D supplement winter dose
- **Intent:** Actionable/informational.
- **Length:** 1,200–1,500 words
- **Snippet answer:** To keep vitamin D up in winter: bank sunlight in late summer (your body stores it), eat more vitamin D–rich foods like fatty fish and fortified products, and take a D3 supplement — most adults do well on 1,000–2,000 IU daily through the dark months, though your ideal dose depends on your levels.
- **Outline:**
  - H2: The short answer (bank + eat + supplement)
  - H2: Step 1: bank sun before winter (link "lasts longer" child)
  - H2: Step 2: lean on food sources (link Without the Sun)
  - H2: Step 3: supplement smartly (dose, timing — link Dosage)
  - H2: Catch any midwinter sun that counts (rare high-UV days)
  - H2: How Bask builds your winter plan
- **FAQ:** How much vitamin D in winter? When should I start supplementing? Is winter sun ever enough? Can diet cover winter?
- **Internal links:** Pillar 3; Dosage; Without the Sun; Sun Lasts Longer.

### 3.3 — Vitamin D, Winter Depression & SAD: What Actually Helps
- **Type:** Child (seasonal, emotionally driven)
- **Primary keyword:** vitamin D seasonal affective disorder · **Secondary:** vitamin D winter depression, does vitamin D help SAD, winter blues vitamin D
- **Intent:** Informational/health.
- **Length:** 1,200–1,500 words
- **Snippet answer:** Low vitamin D is linked to low winter mood, but the strongest treatment for seasonal affective disorder (SAD) is light therapy, not vitamin D. Supplementing helps most if you're actually deficient. For winter blues, a combination of morning light, time outdoors, and correcting low vitamin D tends to work best.
- **Outline:**
  - H2: The short answer (light therapy first; D helps if deficient)
  - H2: The vitamin D–mood connection, honestly
  - H2: Why light therapy is the gold standard
  - H2: The morning-light angle (link circadian child)
  - H2: A practical winter-mood toolkit
  - H2: How Bask helps with the daylight piece
- **FAQ:** Does vitamin D help seasonal depression? Light box vs vitamin D? How much D for mood? Is winter sadness from low vitamin D?
- **Internal links:** Pillar 3; Morning Sunlight; Fatigue (Pillar 2); Pillar 2.
- **Compliance note:** Mental-health YMYL — include a "seek professional help" line; don't position the app as treatment.

### 3.4 — Morning Sunlight Benefits: Circadian Rhythm, Mood & Energy (Beyond Vitamin D)
- **Type:** Child (rides the morning-light trend; expands the audience)
- **Primary keyword:** morning sunlight benefits · **Secondary:** morning sun circadian rhythm, morning light mood, sunlight in eyes morning
- **Intent:** Informational/wellness/biohacker.
- **Length:** 1,300–1,700 words
- **Snippet answer:** Morning sunlight does something different from midday sun: instead of making vitamin D, it sets your body clock. Getting daylight in your eyes within an hour or two of waking helps regulate sleep, boosts daytime alertness, and supports mood — benefits that come from light hitting the eyes, not UVB on the skin.
- **Outline:**
  - H2: The short answer (clock-setting, not vitamin D)
  - H2: How morning light tunes your circadian rhythm
  - H2: The sleep, mood, and energy payoffs
  - H2: How it's different from vitamin D sun (link Can You Get D in the Morning)
  - H2: How to do it (timing, duration, cloudy days)
  - H2: How Bask helps you catch both kinds of light
- **FAQ:** How long of morning light do I need? Does morning light help sleep? Is it the same as vitamin D? Does it work through clouds or windows?
- **Internal links:** Pillar 3; Can You Get Vitamin D in the Morning; Best Time of Day; SAD child.
- **Note:** Clearly separate circadian (eyes/light) from vitamin D (skin/UVB) — owning that distinction is the content gap.

### 3.5 — How Far From the Equator Can You Still Make Vitamin D Year-Round?
- **Type:** Child (geographic; reinforces latitude authority)
- **Primary keyword:** vitamin D equator · **Secondary:** latitude vitamin D year round, 35 degrees vitamin D, how far north vitamin D
- **Intent:** Geographic/informational.
- **Length:** 800–1,100 words
- **Snippet answer:** Roughly below 35° latitude — think the southern US, southern Europe, North Africa, and similar bands north and south — the sun stays high enough to make vitamin D all year. Between about 35° and 50°, winter production shuts down for several months; above 50°, the off-season is long and supplements become essential.
- **Outline:**
  - H2: The short answer (the ~35° year-round line)
  - H2: The three latitude zones (year-round / seasonal / long-off-season)
  - H2: Where major regions and cities fall
  - H2: Why the line exists (sun angle again — link Angle of Sun)
  - H2: What your zone means for supplementing
  - H2: How Bask pinpoints your zone
- **FAQ:** What latitude gets vitamin D year-round? Can northern countries make vitamin D? Where's the cutoff? Does the southern hemisphere flip?
- **Internal links:** Pillar 3; By City/Latitude; Angle of Sun; Calculator.

---

# PILLAR 4 — Best Vitamin D & Sun Tracking Apps (Honest Comparison)

**Role:** Bottom-of-funnel hub with high commercial intent. This is where comparison searchers and LLM "what's the best vitamin D app?" answers convert. Keep it genuinely fair so it reads as a neutral resource and earns citations — Bask wins by being the most thorough and transparent, not by trashing rivals.

**Primary keywords:** best vitamin D app, best sun tracker app, vitamin D tracking app
**Secondary:** best UV index app, vitamin D app comparison
**Search intent:** Comparison/transactional — choosing an app.
**Target length:** 2,000–2,800 words (pillar; expand the existing post)

**Snippet answer (draft):**
> The best vitamin D and sun tracking apps estimate how much vitamin D you're making in real time using your location, the live UV index, your skin type, and the time of day. Top options include Bask, dminder, SunSafe, Sunbeam, and SunSeek — each suited to slightly different users, from precise vitamin D tracking to general UV and burn safety.

**Outline:**
- **H2: The short answer + quick comparison table** (app, what it's best for, platform, price, key feature). Bask included fairly alongside the rest.
- **H2: What a good vitamin D app should actually do** (live UV, latitude, skin type, exposure, supplement guidance, burn safety).
- **H2: App-by-app rundown** — Bask, dminder, SunSafe, Sunbeam, SunSeek, plus Rays / Sun Day / QSun as relevant. 2–3 honest sentences each: strengths and who it's for.
- **H2: How to choose** (decision guide by user type: deficiency-worried, biohacker, sunscreen-conscious, outdoorsy).
- **H2: How accurate are these apps, really?** (link to the accuracy child).
- **FAQ:** What's the best free vitamin D app? Are vitamin D apps accurate? Which app is best for tracking sun safely? Is there a dminder alternative?
- **Internal links:** all Pillar 4 children; Pillar 1; Calculator.
- **CTA:** Soft — "If you want live, personalized vitamin D timing, Bask is built around exactly that."
- **Note:** This post already exists in some form — expand and re-structure it to the standard skeleton and keep it updated (dated annually).

---

## Pillar 4 children

### 4.1 — dminder Alternatives: Vitamin D Apps Compared
- **Type:** Child (high purchase intent, low competition)
- **Primary keyword:** dminder alternatives · **Secondary:** apps like dminder, dminder vs, dminder review
- **Intent:** Comparison/transactional.
- **Length:** 1,200–1,600 words
- **Snippet answer:** If you're looking for a dminder alternative, the main options are Bask, SunSafe, Sunbeam, and SunSeek. Bask focuses on real-time, personalized vitamin D timing and clear supplement guidance; the others lean toward UV/burn safety or general sun tracking. The best pick depends on whether you want precision vitamin D estimates or broader sun-safety features.
- **Outline:**
  - H2: The short answer (the main alternatives)
  - H2: Why people look for a dminder alternative (common gaps)
  - H2: The alternatives compared (table + short writeups)
  - H2: Best alternative by need
  - H2: How Bask compares specifically to dminder
- **FAQ:** Is there a free dminder alternative? What's better than dminder? Does dminder still work? Which is most accurate?
- **Internal links:** Pillar 4; Sunbeam vs SunSafe vs Bask; Accuracy child; Pillar 1.
- **Compliance note:** Keep factual and fair; verify each competitor's current features before publishing.

### 4.2 — Sunbeam vs. SunSafe vs. Bask: Which UV & Vitamin D App Is Right for You?
- **Type:** Child (long-tail head-to-head; near-zero competition)
- **Primary keyword:** Sunbeam vs SunSafe · **Secondary:** SunSafe vs Bask, Sunbeam vs Bask, [competitor] vs [competitor]
- **Intent:** Comparison.
- **Length:** 1,200–1,600 words
- **Snippet answer:** Sunbeam and SunSafe both focus heavily on UV exposure and sunburn prevention, while Bask centers on personalized vitamin D timing — telling you when to go out, how long, and whether to supplement. If your priority is burn safety, Sunbeam or SunSafe fit; if it's making and tracking enough vitamin D, Bask is built for that.
- **Outline:**
  - H2: The short answer (the core difference)
  - H2: Feature-by-feature table
  - H2: Sunbeam — strengths and best user
  - H2: SunSafe — strengths and best user
  - H2: Bask — strengths and best user
  - H2: The verdict by user type
- **FAQ:** Which is best for vitamin D? Which is best for sunburn? Are they free? Can I use more than one?
- **Internal links:** Pillar 4; dminder Alternatives; Accuracy child; Pillar 1.

### 4.3 — How Accurate Are Vitamin D Tracking Apps? (How They Estimate IU From Sunlight)
- **Type:** Child (handles the #1 skeptic objection)
- **Primary keyword:** are vitamin D apps accurate · **Secondary:** how do vitamin D apps work, vitamin D app vs blood test
- **Intent:** Consideration/informational.
- **Length:** 1,200–1,500 words
- **Snippet answer:** Vitamin D apps don't measure your blood levels — they estimate how much vitamin D your skin is making using your location, the live UV index, sun angle, your skin type, and how much skin is exposed. They're good directional guides for timing sun and avoiding burns, but a blood test is still the only way to know your actual level.
- **Outline:**
  - H2: The short answer (estimates, not measurements — and that's fine)
  - H2: What goes into the calculation (the inputs)
  - H2: What they get right vs what they can't know
  - H2: App estimate vs blood test — when to get tested
  - H2: How to get the most accurate reading (enter your real skin type, exposure)
  - H2: How Bask is built for accuracy
- **FAQ:** Do vitamin D apps really work? Can an app replace a blood test? Why do estimates differ? How do I make mine more accurate?
- **Internal links:** Pillar 4; Pillar 1; Optimal Levels (Pillar 2); Calculator.

---

# TOOL — Vitamin D Sun Exposure Calculator

**Role:** The conversion bridge and link magnet. An interactive calculator earns backlinks, dwell time, and is the highest-converting path to the app. It also anchors Pillar 1.

**Primary keywords:** vitamin D calculator, sun exposure calculator
**Secondary:** how much sun for vitamin D calculator, vitamin D minutes calculator
**Search intent:** Transactional/tool — "just tell me my number."
**Format:** Interactive calculator + a supporting written guide on the same page.

**Calculator inputs:** Fitzpatrick skin type (or quiz link) · location/latitude (auto-detect or manual) · today's UV index (auto or manual) · % of skin exposed · time of day.
**Calculator output:** estimated minutes to a healthy dose + estimated IU + a burn-risk warning + "let Bask track this automatically" CTA.

**Supporting guide outline (below the tool):**
- **Snippet answer:** Enter your skin type, location, and the day's UV index, and this calculator estimates how many minutes of sun you need to make a healthy amount of vitamin D — and when you'd risk burning instead.
- H2: How to use the calculator
- H2: How the math works (the four variables — link Pillar 1)
- H2: Why your number changes every day
- H2: The limits of any calculator (link Accuracy child)
- H2: Let Bask do this automatically
- **FAQ:** How accurate is this calculator? Does it work for winter? What if I don't know the UV index? Does it account for clouds?
- **Internal links:** Pillar 1 and all its children; Pillar 4 (Accuracy); By City/Latitude.
- **Note:** Build 2–3 more tools later if this earns links — a winter/latitude map and the Fitzpatrick quiz are the obvious next two.

---

# Publishing sequence (how to actually roll this out)

**Stage 1 — Calculation foundation (Months 1–2):** Pillar 1 + children 1.1 (UV Index), 1.2 (Best Time), plus the Calculator tool. Interlink tightly; link each to the app. This is the moat — ship it first.

**Stage 2 — Authority + myth-busters (Months 2–4):** Pillar 2 + children 2.1 (Dosage), 2.2 (Levels); Pillar 1 children 1.5 (Cloudy), 1.6 (Window), 1.7 (Sunscreen). Captures the biggest informational volume and the most-shared myth checks.

**Stage 3 — Seasonal/local (publish Sept–Oct to lead the Feb peak):** Pillar 3 + children 3.1 (by City/Latitude), 3.2 (Winter plan), 3.3 (SAD). Add 3.4 (Morning Sunlight) and remaining Pillar 1 sun-exposure children in spring ahead of the summer peak.

**Stage 4 — Comparison + long-tail (ongoing):** Expand Pillar 4 + children 4.1, 4.2, 4.3, and batch-produce the remaining Tier 5 long-tail Q&As (1.8–1.14, 2.3–2.8, 3.5). These are quick to write and fast to rank/cite.

**On every post, every time:**
- Lead with the snippet answer. One direct, quotable answer near the top.
- Question-style H2s, at least one table, one "what changes this" list.
- FAQ block with schema markup (the single highest-leverage tactic for snippets + LLM citation).
- Primary-source citations (NIH ODS, Endocrine Society, EPA, VITAL) for E-E-A-T.
- Link up to the pillar, sideways to 2–3 siblings, and out to the app.
- Date comparison/guideline posts and refresh them annually.
