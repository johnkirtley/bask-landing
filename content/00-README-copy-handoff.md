# Copywriter Handoff — City Vitamin D Pages

First content drop for the programmatic SEO build. Covers the copywriter track (plan sections C2–C7) plus a proposed pilot city list for John's sign-off. Per-city local blocks come after John locks the city list.

## Files

1. **01-template-copy.md** — reusable prose for the answer-first opening and the three explainer sections (window, skin type, burn), table intros, the variable glossary mapped to the dev's D2 fields, and the compliance footer line. Written once, reused on every page.
2. **02-faq-and-cta.md** — six FAQ Q&As (for FAQPage schema) and the mid-page + end CTAs.
3. **03-pilot-cities.md** — proposed 25–40 city pilot, tiered, with rationale. **Needs John's sign-off.**
4. **04-local-context-spec-and-examples.md** — the spec for the per-city local block plus two finished worked examples (Manchester, Seattle) that set the quality bar.

## What's done vs. blocked

Done: all template copy, FAQ, CTAs, voice and compliance passes, two model local blocks.

Blocked on John: the final city list. Blocked on dev: the real per-city numbers (window times, minutes, burn times, UV, solar noon) that fill the `{variables}` — my example numbers are placeholders and must never ship.

Next once unblocked: write one local-context block per approved city to the standard in file 04, and pull two or three real "People Also Ask" questions per city to swap into the FAQ.

## Voice + compliance

Everything ran through the humanizer pass: answer-first, no em dashes in ship copy, varied sentence length, no AI-vocabulary filler, a small point of view in the burn section and CTAs. Health content stays educational, not medical advice, with the light footer line in file 01.

## Research backing the health claims

The factual claims in the copy are sourced, not assumed:

- **45° solar-elevation threshold for vitamin D synthesis** — confirmed across the literature; below that angle the atmosphere absorbs most UVB. At 45°N the winter noon sun never clears it. [JBMR Plus review](https://academic.oup.com/jbmrplus/article/5/1/e10460/7486276), [Holick, Boston/Edmonton winter study](https://pubmed.ncbi.nlm.nih.gov/2839537/)
- **Glass blocks UVB** — standard window glass absorbs effectively all UVB, so no vitamin D behind glass; UVA still passes. [Performance Lab summary of the science](https://www.performancelab.com/blogs/nutrition/can-you-get-vitamin-d-through-a-window)
- **Skin type / melanin** — darker skin needs roughly 2–5x, up to 10x longer for the same synthesis. [Colour Counts, UK latitudes (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5946242/), [GrassrootsHealth](https://www.grassrootshealth.net/blog/determine-skin-type-know-amount-sun-exposure-right/)
- **Sunscreen** — lab studies show large reductions, real-world field and observational studies show little to none because of under-application. [British Association of Dermatologists](https://www.bad.org.uk/sunscreen-application-does-not-prevent-vitamin-d-production-in-the-majority-of-people)
- **Cloud cover** — heavy overcast filters up to ~90% of UVB (retains roughly 30% of clear-sky UV); thin/broken cloud lets much more through. [Calbó et al., cloud effects on UV review (AGU)](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2004RG000155)
- **Burn-time formula** — per the plan's D3: `burn minutes = (0.667 × MED) / adjusted UV index`, MED by Fitzpatrick type. Dev validates constants against Bask's engine so the site and app never disagree.
