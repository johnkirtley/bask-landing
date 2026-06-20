# FAQ + CTA — City Vitamin D Pages

**For:** developer (assembly into FAQPage schema) + John (review)
**Covers:** plan sections C4 (FAQ) and C5 (CTAs).

Every answer leads with the answer in the first sentence, then 1–3 sentences of support. Keep them tight. The dev marks these up as `FAQPage` schema, which is what gets us into rich results and helps LLMs lift the answer cleanly.

Questions 1, 4, and 5 are fully templated (same answer every city). Questions 2, 3, and 6 take a per-city variable or a one-line local tailoring, flagged inline. Pull two or three extra questions per city from the live "People Also Ask" box for that city's queries and swap them in where they're stronger than a generic one.

---

## FAQ block

**Q: Can you get vitamin D through a window in {city}?**

No. Standard glass blocks almost all UVB, the wavelength your skin needs to make vitamin D, so sitting by a sunny window does nothing for your levels. You'll still get UVA through the glass, which ages skin without any of the upside. To make vitamin D you need direct sun on bare skin, outdoors.

**Q: Can you get vitamin D from the sun in winter in {city}?**
*(Per-city: the dev selects one of the two answers below based on `vitamin_d_winter_months`.)*

*Has a vitamin D winter:*
> Not from about {winter_months}. The midday sun in {city} stays too low for the UVB to get through, so your skin makes little to none for those weeks no matter how long you're out. This is why late-winter levels drop here, and why a lot of people this far north supplement through the dark months.

*No vitamin D winter:*
> Yes. {city} is far enough south that the midday sun stays high enough all year, so there's a usable window even in winter. It's shorter and weaker than summer, so you'll need a bit longer outside, but it doesn't close.

**Q: What time of day is best for vitamin D in {city}?**

Around midday, give or take a couple of hours, when the sun is highest. In {city} that centers on solar noon at about {solar_noon}. UVB only gets through when the sun is high in the sky, so morning and late afternoon light, even when it's bright, makes very little vitamin D. It's the angle, not the brightness.

**Q: Does sunscreen block vitamin D?**

Barely, in practice. In the lab, high-SPF sunscreen applied perfectly cuts vitamin D production a lot, but real-world studies keep finding little to no effect on people's levels. The reason is that most people apply less than half the test amount, miss patches, and stay out longer, so plenty of UVB still gets through. Sunscreen is worth wearing. It isn't the reason someone's vitamin D is low.

**Q: Does cloud cover stop you making vitamin D in {city}?**

It depends how thick the cloud is. Heavy overcast can filter out up to 90 percent of UVB, which nearly stops vitamin D production, while thin or broken cloud lets a good amount through and just means you need longer outside. Bright haze still works; a dark, fully overcast sky mostly doesn't. {city}'s typical cloud cover is covered in the local section above.

**Q: Can you make too much vitamin D from the sun in {city}?**
*(Light per-city flavor optional; the core answer is templated.)*

No, you can't overdose on vitamin D from sunlight. Your skin caps how much it makes and breaks down the excess, so the risk from staying out isn't too much vitamin D, it's sunburn. That's the real limit, and it's why the burn time on this page matters more than chasing extra minutes. (Supplements are different; you can take too much in pill form.)

---

## CTA

Soft and useful, never pushy. The page already gave away the static answer for free. Bask is the tool that does it live, for today's actual UV and your skin, and tells you when to go out and when to stop. One CTA mid-page (right after the skin-type section, section 4), one at the end.

### Mid-page CTA (after section 4)

> **The catch: these numbers are an average, and your day isn't average.** The real window shifts with today's UV, the cloud, and the season. Bask does this math live for {city} and your skin, and tells you the minutes that actually apply right now. [Get Bask](https://getbask.app). It's free to try.

### End CTA (after FAQ)

> **Stop guessing at the sun.** Bask tracks your sessions, reads the live UV for {city}, and tells you when you've made your vitamin D and when to cover up, before you burn. The benefit, not the damage. [Get Bask for iPhone and Android](https://getbask.app).

*Dev note: confirm the canonical CTA URL and the App Store / Play Store deep links. If install attribution wants a tracked link, swap the href but keep the visible text.*
