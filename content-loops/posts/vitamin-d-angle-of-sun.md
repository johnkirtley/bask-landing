Status: DRAFT

# The Angle of the Sun and Vitamin D: Why the Shadow Rule Works

**Slug:** `vitamin-d-angle-of-sun`
**Primary keyword:** vitamin D angle of sun
**Secondary keywords:** shadow rule vitamin D · what angle sun vitamin D · sun elevation vitamin D · 45 degree sun vitamin D
**Pillar:** P1.13
**Author:** Bask Health Team
**Published:** (pending)

---

## Schema notes for Developer

- **Article schema:** standard (site-wide via Astro layout)
- **FAQ schema:** mark up the FAQ section with `FAQPage` structured data
- **ComparisonTable component:** use for the shadow-length and sun-angle table
- **Callout components:** use for the shadow test (`success`), the Bask download CTA (`info`), and the medical disclaimer (`warning`)

---

## Reviewer checklist

- [ ] Verify that a shadow equal to your height corresponds to a 45-degree solar elevation using basic right-triangle geometry
- [ ] Verify that the 45-degree shadow rule is presented as a rough field check, not a hard biological threshold, against EPA shadow guidance and Engelsen et al.
- [ ] Confirm EPA UV Index guidance: UVI 1-2 is low, 3-7 is moderate to high, and a shorter shadow indicates higher UV exposure
- [ ] Confirm NIH ODS guidance that UVB drives vitamin D synthesis and that season, time of day, cloud cover, skin melanin, and sunscreen affect production
- [ ] Check internal links resolve: /blog/how-much-sun-do-you-need-for-vitamin-d, /blog/what-uv-index-do-you-need-for-vitamin-d, /blog/best-time-of-day-to-get-vitamin-d, /blog/morning-sunlight-benefits
- [ ] Confirm "Author: Bask Health Team" per E-E-A-T

---

## Post content

If your shadow is shorter than you are, the sun is above roughly 45 degrees and useful UVB is more likely to reach your skin. If your shadow is longer than you, the sun is low and vitamin D production is usually weak or absent. Treat that as a quick field check, not a hard cutoff: a local UV index of 3 or higher is the better practical test.

## The short answer: check your shadow

- A shadow shorter than you means the sun is higher than 45 degrees.
- A shadow about as long as you means the sun is near 45 degrees.
- A shadow longer than you means the sun is below 45 degrees.

At a 45-degree solar elevation, a vertical object and its shadow have the same length. But the atmosphere does not flip UVB on at one angle. UVB increases as the sun climbs, while ozone, clouds, altitude, and pollution affect how much reaches the ground.

<Callout type="success" title="Try the shadow test">
  If your shadow is shorter than you, useful UVB is more likely. Then check the
  local UV index. A reading of 3 or higher is a better sign that conditions can
  support vitamin D production.
</Callout>

## Why a low sun angle filters out UVB

Your skin starts making vitamin D when UVB converts 7-dehydrocholesterol into previtamin D3. These short wavelengths have a hard time passing through the atmosphere.

When the sun is high, its rays take a relatively direct path to the ground. When the sun sits near the horizon, those rays travel through much more air. Ozone absorbs a large share of the UVB along that longer route. The sky can look bright and the sun can feel warm while very little vitamin-D-producing UVB reaches you.

Sunrise and sunset light can still help set your body clock. Circadian timing responds to visible light reaching your eyes, while vitamin D requires UVB on bare skin. The [morning sunlight guide](/blog/morning-sunlight-benefits) explains the difference.

## What your shadow says about the sun

<ComparisonTable
headers={[
'Shadow length',
'Approximate sun elevation',
'What it suggests',
]}

>

  <tr>
    <td>Twice your height</td>
    <td>About 27 degrees</td>
    <td>Sun is low; useful UVB is unlikely in many locations</td>
  </tr>
  <tr>
    <td>Same as your height</td>
    <td>45 degrees</td>
    <td>Rough transition point, not a universal cutoff</td>
  </tr>
  <tr>
    <td>Half your height</td>
    <td>About 63 degrees</td>
    <td>Sun is high; UVB is more likely and burn risk rises</td>
  </tr>
</ComparisonTable>

If the shadow is shorter, check the UV index before deciding how long to stay outside. The shadow cannot account for clouds, ozone, your skin type, or clothing. Use it as the first check and the UV index as the second. Our [UV index guide](/blog/what-uv-index-do-you-need-for-vitamin-d) covers that threshold.

## Why winter and high latitudes can fail

Earth's tilt changes the sun's daily path. It climbs higher in summer and follows a lower arc in winter. Far from the equator, the winter sun can stay low even at solar noon.

Engelsen and colleagues modeled vitamin D-effective UV around the world. They found periods with no cutaneous vitamin D production at 51 degrees latitude and higher under clear skies. At 70 degrees latitude, the gap could last five months. Clouds, aerosols, and ozone shortened the available window further.

This is why a fixed clock time does not travel well. Noon in Boston in January is not noon in Miami in July. The [best time of day for vitamin D](/blog/best-time-of-day-to-get-vitamin-d) is when your local sun and UV index peak, but some winter days never open a useful window.

## How the angle of the sun relates to Bask

Bask uses your location and a 48-hour UV forecast to show when your local vitamin D window opens. It then estimates vitamin D from the live UV index, your skin type, and your clothing, covering the conditions a shadow cannot.

<Callout type="info" title="Find today's vitamin D window">
  Bask shows when useful UV is available where you are and estimates your
  vitamin D during a timed sun session.
  [Download Bask on the App Store](https://apps.apple.com/us/app/bask-vitamin-d-sun-tracker/id6758405235) →
</Callout>

## Frequently asked questions

**What sun angle is needed for vitamin D?**

About 45 degrees is a useful rule of thumb, not a universal cutoff. Check for a shadow shorter than you, then confirm the local UV index is 3 or higher.

**How do I use the shadow rule?**

Compare your shadow with your height on level ground. A shorter shadow means the sun is above 45 degrees. A longer one means UVB takes a more heavily filtered path through the atmosphere.

**Why is winter sun often poor for vitamin D?**

The winter sun stays lower, especially far from the equator. More UVB gets absorbed before reaching your skin, and some latitudes have no useful vitamin D window for weeks or months.

**Does the shadow rule work everywhere?**

The geometry works everywhere, but it cannot account for clouds, ozone, altitude, pollution, skin type, or exposed skin. Use the local UV index for a better reading.

## Where to go next

- Start with the full exposure guide: [How much sun do you need for vitamin D?](/blog/how-much-sun-do-you-need-for-vitamin-d)
- Check whether today's UV is high enough: [What UV index do you need for vitamin D?](/blog/what-uv-index-do-you-need-for-vitamin-d)
- Find the strongest part of the day: [Best time of day to get vitamin D](/blog/best-time-of-day-to-get-vitamin-d)
- Separate circadian light from vitamin D sun: [Morning sunlight benefits](/blog/morning-sunlight-benefits)

## Sources

1. [NIH Office of Dietary Supplements, Vitamin D Fact Sheet for Health Professionals](https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/).
2. [US EPA, UV Index Scale](https://www.epa.gov/sunsafety/uv-index-scale-0).
3. Engelsen O, Brustad M, Aksnes L, Lund E. ["Daily duration of vitamin D synthesis in human skin with relation to latitude, total ozone, altitude, ground cover, aerosols and cloud thickness"](https://pubmed.ncbi.nlm.nih.gov/16354110/). _Photochemistry and Photobiology._ 2005;81(6):1287-1290.
4. [World Health Organization, Global Solar UV Index: A Practical Guide](https://www.who.int/publications/i/item/9241590076).

---

<Callout type="warning" title="A note on medical advice">
  This article is educational, not medical advice. Sun exposure can damage skin
  even when conditions support vitamin D production. If you have a history of
  skin cancer, take photosensitizing medication, or are treating a vitamin D
  deficiency, ask a clinician about safe exposure, blood testing, and supplements.
</Callout>

---

_Post file lives at: `content-loops/posts/vitamin-d-angle-of-sun.md`_
_When ready to publish, Developer creates `src/content/blog/vitamin-d-angle-of-sun.mdx`_
