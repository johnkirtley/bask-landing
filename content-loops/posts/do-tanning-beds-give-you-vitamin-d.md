Status: DRAFT

# Do Tanning Beds Give You Vitamin D?

**Slug:** `do-tanning-beds-give-you-vitamin-d`
**Primary keyword:** do tanning beds give vitamin D
**Secondary keywords:** tanning bed vitamin D · sunbed vitamin D · tanning vitamin D · is a tan a sign of vitamin D
**Pillar:** P1.14
**Author:** Bask Health Team
**Published:** (pending)

---

## Schema notes for Developer

- **Article schema:** standard (site-wide via Astro layout)
- **FAQ schema:** mark up the FAQ section with `FAQPage` + `Question`/`Answer` structured data — all five FAQ items are self-contained Q&A answers
- **ComparisonTable component:** use for the UVA-vs-UVB mechanism table and the safer-ways-to-raise-D table
- **Callout components:** use for the "mostly UVA" mechanism callout (info type), the Group 1 carcinogen warning (warning type), the Bask CTA (info type), and the medical disclaimer (warning type)

---

## Reviewer checklist

- [ ] Verify IARC/WHO Group 1 classification of UV-emitting tanning devices (2009) — confirmed by 06-22 research verification
- [ ] Confirm "most" beds are UVA-dominant phrasing (a minority emit some UVB) per Operating Principles accuracy rule
- [ ] Verify the roughly 75% melanoma risk increase for first use before age 30 (IARC/WHO; Woo & Eide 2010)
- [ ] Confirm NIH ODS distinction: UVA does not drive cutaneous vitamin D synthesis; UVB (290–315 nm) does
- [ ] Check App Store link points to correct tracked URL for per-post click attribution
- [ ] Confirm "Author: Bask Health Team" or update to named author per E-E-A-T principles
- [ ] Verify internal links resolve: /blog/best-uv-index-for-tanning, /blog/how-much-sun-do-you-need-for-vitamin-d, /blog/what-uv-index-do-you-need-for-vitamin-d, /blog/d3-dosage-how-much-vitamin-d-should-i-take

---

## Post content

Mostly no. Tanning beds emit mainly UVA, the wavelength that darkens skin and ages it, rather than the UVB your body needs to make vitamin D. A few high-UVB beds can raise vitamin D levels slightly, but not reliably and not enough to justify the trade-off: the World Health Organization classifies UV tanning devices as Group 1 carcinogens, the same category as tobacco. No health authority recommends tanning beds for vitamin D. And a tan is not proof you made any.

## The short answer: UVA vs UVB in tanning beds

Your skin makes vitamin D only when UVB light hits 7-dehydrocholesterol in the skin. UVA, the longer wavelength, tans you by oxidizing melanin already present, but it does almost nothing for vitamin D synthesis.

Commercial tanning beds are engineered to deliver a tan, not a supplement. Most emit overwhelmingly UVA, often 95% or more of total output, at intensities well above natural sunlight. That is the design goal: fast, dark color without the quick burn that UVB causes. Vitamin D is not part of the engineering.

A minority of beds, sometimes marketed as "vitamin D beds," do emit higher UVB fractions. Studies show these can raise blood levels modestly in some users. But the effect is inconsistent, depends on the specific unit and how often you use it, and carries the same cancer risk as any other UV device.

<Callout type="info" title="Why most beds miss vitamin D entirely">
  Vitamin D synthesis is UVB-driven photochemistry. Most tanning beds are
  UVA-dominant by design, because UVA produces the fast cosmetic tan that
  customers want. The wavelength that makes vitamin D is largely absent.
</Callout>

## Why a tan isn't proof of vitamin D

The belief that a tan equals vitamin D comes from blurring two separate processes that both happen to involve UV light.

Tanning is UVA-driven melanin oxidation and redistribution. It can happen fast and visibly with little UVB exposure. Vitamin D synthesis is UVB-driven photochemistry in a different skin layer, and it produces no visible signal. You can be deeply tan and vitamin D deficient at the same time, and regular tanning bed users often are.

This is also why "I tan easily, so I must be getting enough D" is unreliable. The tanning response says nothing about your 25-hydroxyvitamin D blood level. Only a blood test does.

## The cancer-risk trade-off

In 2009, the International Agency for Research on Cancer (IARC), part of the WHO, classified UV-emitting tanning devices as Group 1 carcinogens, "carcinogenic to humans." The same category includes tobacco smoke and asbestos.

The risk is not theoretical. First use of a tanning bed before age 30 raises melanoma risk by roughly 75%. The Skin Cancer Foundation reports that people who use tanning beds have a markedly higher risk of basal and squamous cell carcinomas as well. Risk accumulates with each session, and it is the same UV wavelengths doing the damage: UVA penetrates deep and harms DNA whether or not you visibly burn.

<Callout type="warning" title="A Group 1 carcinogen, not a wellness tool">
  WHO/IARC places tanning beds in the same cancer-risk category as tobacco. Using one to raise vitamin D trades a small, inconsistent nutrient gain for a documented, dose-dependent increase in skin cancer risk. No major health authority recommends them for this purpose.
</Callout>

The honest framing is that even the minority of beds emitting some UVB deliver it alongside a large, intense dose of Group 1 carcinogenic UVA. Sunlight, by contrast, delivers UVB in a mix you can time, dose, and step out of. A bed session offers none of that control.

## Safer ways to raise low vitamin D

If the actual goal is raising vitamin D, three routes work without the cancer risk.

Timed sun exposure is the most direct. At a UV index of 3 or higher, fair to medium skin with arms and legs bare typically produces a meaningful dose in 10 to 20 minutes. Darker skin needs longer, sometimes three to six times as long for the same output. The [sun exposure guide](/blog/how-much-sun-do-you-need-for-vitamin-d) breaks this down by skin type, and the [UV index guide](/blog/what-uv-index-do-you-need-for-vitamin-d) explains why 3 is the cutoff. Once your skin hits its synthesis ceiling, more time adds UV damage without more D, which is why timing beats duration.

Food contributes smaller but steady amounts. Fatty fish (salmon, mackerel, sardines), egg yolks, and fortified milk and cereal cover much of the dietary base. Realistic intake is usually a few hundred IU per day: useful, rarely sufficient on its own.

Supplements are the reliable fallback, especially in winter, at higher latitudes, or for darker skin types where sun alone is impractical. Standard doses of 1,000 to 2,000 IU per day work for most adults; the NIH upper limit is 4,000 IU. The [D3 dosage guide](/blog/d3-dosage-how-much-vitamin-d-should-i-take) covers dosing in detail.

<ComparisonTable
headers={[
'Route',
'Raises vitamin D?',
'Cancer-risk trade-off',
]}

>

  <tr>
    <td>Tanning bed (UVA-dominant)</td>
    <td>Barely — almost no UVB</td>
    <td>Group 1 carcinogen; melanoma risk rises roughly 75% with first use before 30</td>
  </tr>
  <tr>
    <td>Timed midday sun (UV 3+)</td>
    <td>Yes — meaningful in 10–20 min for fair/medium skin</td>
    <td>Low when timed; UV damage stays manageable if you cap sessions</td>
  </tr>
  <tr>
    <td>Food (salmon, eggs, fortified milk)</td>
    <td>Modestly — a few hundred IU/day</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Vitamin D supplement (1,000–2,000 IU)</td>
    <td>Yes — reliable, dose-controlled</td>
    <td>None at standard doses</td>
  </tr>
</ComparisonTable>

## How Bask helps you get D the safe way

Bask replaces the "more UV means more D" guesswork with a timed window. It reads your skin type, location, and live UV index, then tells you the minutes you need today to produce a meaningful dose and the point at which you have hit your synthesis ceiling and should head in. That is the control a tanning bed cannot give you.

If you also want color, the [tanning and UV index guide](/blog/best-uv-index-for-tanning) covers the safer band (UV 3 to 5) for a gradual tan with lower burn risk, without resorting to a bed.

<Callout type="info" title="Get your vitamin D window">
  Bask shows how long to be outside today based on your skin type and live UV — no bed required.
  [Download Bask on the App Store](https://apps.apple.com/us/app/bask-uv-vitamin-d-tracker/id6741454317) →
</Callout>

## Frequently asked questions

**Do sunbeds make vitamin D?**

Mostly not. Standard commercial sunbeds emit mainly UVA, which tans skin but does not drive vitamin D synthesis. A minority of high-UVB beds can raise vitamin D modestly in some users, but the effect is inconsistent and comes with the same Group 1 carcinogen risk as any UV tanning device. Health authorities do not recommend sunbeds as a vitamin D source.

**Is a tan a sign of vitamin D?**

No. A tan is a UVA-driven response (melanin oxidation and redistribution), and it tells you nothing about your vitamin D level. The two processes run on different wavelengths. You can be visibly tan and deficient at the same time. Only a 25-hydroxyvitamin D blood test shows your actual level.

**Are tanning beds ever recommended?**

No major health authority recommends tanning beds for any purpose, including vitamin D. WHO/IARC classifies them as Group 1 carcinogens. The American Academy of Dermatology and the Skin Cancer Foundation both advise against indoor tanning. If you have seen a salon advertise "vitamin D beds," recognize the marketing incentive: tanning salons sell sessions, and the UVA-versus-UVB distinction is exactly what that marketing tends to blur.

**What's safer than a tanning bed?**

Three options, in order of directness: timed midday sun at a UV index of 3 or higher (10 to 20 minutes for fair or medium skin, longer for darker skin); dietary sources like fatty fish, eggs, and fortified foods; and a standard vitamin D supplement (1,000 to 2,000 IU per day for most adults). All three raise vitamin D without the documented cancer risk of a tanning bed. Many people use a combination.

**Can I get vitamin D from a tanning bed in winter?**

Technically a high-UVB bed can raise levels slightly when winter sun is too weak to help. But the Group 1 carcinogen classification applies year-round, and a supplement delivers the same or better result at a fraction of the risk. Winter vitamin D gaps are a real problem. The safer fix is a supplement, not a bed.

## Where to go next

- The right UV band for a safer tan: [What UV index is best for tanning?](/blog/best-uv-index-for-tanning)
- How much sun you actually need, by skin type: [How much sun do you need for vitamin D?](/blog/how-much-sun-do-you-need-for-vitamin-d)
- The UVB cutoff that controls synthesis: [What UV index do you need for vitamin D?](/blog/what-uv-index-do-you-need-for-vitamin-d)
- Dosing if you supplement: [D3 dosage: how much vitamin D should I take?](/blog/d3-dosage-how-much-vitamin-d-should-i-take)

## Sources

1. [IARC/WHO, "Sunbeds and UV Radiation"](https://www.iarc.who.int/news-events/sunbeds-and-uv-radiation/). Group 1 carcinogen classification of UV-emitting tanning devices (2009).
2. [Woo DK, Eide MJ. "Tanning beds, skin cancer, and vitamin D: An examination of the scientific evidence and public health implications." _Dermatol Ther (Heidelb)._ 2010;23(1):61–83.](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1529-8019.2009.01291.x) Melanoma risk increase with first use before age 30; UVA dominance in commercial beds.
3. [NIH Office of Dietary Supplements, Vitamin D Fact Sheet for Health Professionals](https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/). UVB-driven cutaneous vitamin D synthesis; supplement intake guidance.
4. [Skin Cancer Foundation, "Skin Cancer Facts & Statistics"](https://www.skincancer.org/skin-cancer-information/skin-cancer-facts/). Skin cancer prevalence and indoor tanning risk.
5. [American Academy of Dermatology, survey on Gen Z sunburn and tanning risks](https://www.aad.org/news/gen-z-unfamiliar-sunburn-tanning-risks). Awareness and risk findings on indoor tanning.

---

<Callout type="warning" title="A note on medical advice">
  This article is educational, not medical advice. If you have a known vitamin D deficiency, a personal or family history of skin cancer, or are choosing between sun, food, and supplements to manage your levels, talk to a clinician. A blood test for 25-hydroxyvitamin D is the only reliable way to know where you stand.
</Callout>

---

_Post file lives at: `content-loops/posts/do-tanning-beds-give-you-vitamin-d.md`_
_When ready to publish, Developer creates `src/content/blog/do-tanning-beds-give-you-vitamin-d.mdx`_
