# Handoff: Bask Landing Page Redesign

## Overview

A redesign of the marketing landing page for **Bask** — an iOS app that translates UV index into estimated vitamin D synthesis (IU/min), forecasts daily "D-windows," and tracks live sun sessions. Pivot direction is **playful but clean**, anchored by a cute 3D sun mascot. Tone is smart-punchy headlines + warm body copy.

The page covers seven sections (sticky nav → hero → "The Hook" myth busters → How it works → Features grid → Comparison table → FAQ accordion → Final CTA → Footer) and ships an in-design Tweaks panel for palette / animation / headline cycling.

## About the Design Files

The files in `design/` are **design references created in HTML** — prototypes showing the intended look and behavior. They are NOT production code to copy directly. Your task is to **recreate these designs in Bask's existing marketing-site environment** (Next.js, Astro, plain HTML, etc.) using its established patterns, components, and CMS.

If no marketing site framework exists yet, **Astro** is the recommended choice (lightweight, MDX support for FAQ/blog later, ships near-zero JS for marketing pages, and the React-style components in `design/*.jsx` port over cleanly to Astro components or React islands).

## Fidelity

**High-fidelity.** Final colors, typography, spacing, animation, and copy are all specified below. Recreate pixel-perfectly in the target framework.

## Tech Notes for the Build

- The prototype is React + plain CSS loaded via `<script type="text/babel">` (Babel-standalone). **Do not ship this stack to production** — it's purely for the prototype environment. Move components to your real toolchain.
- All palette values are wired through CSS variables (`--bask-bg`, `--bask-sun`, etc.) which `app.jsx` sets on `:root` based on the active palette. Keep this pattern — it makes theming and dark mode trivial.
- The mascot is a single PNG at `assets/sun-mascot.png` (500×500, transparent). Use `<img>` tags, not SVG.
- The Tweaks panel (`tweaks-panel.jsx`) is a prototyping tool only — **do not ship it**. It exists so non-engineers can preview palette/animation/headline variations live.

---

## Screens / Views

Single long-scroll landing page. Max content width is **1240px**, page padding **32px** desktop / 20px mobile. All sections share `padding: 110px 32px` (vertical: 110px desktop, 80px mobile).

### 1. Nav (sticky)

- **Position**: Sticky top, `z-index: 50`
- **Background**: `color-mix(in srgb, var(--bask-bg) 80%, transparent)` with `backdrop-filter: blur(12px)`
- **Border-bottom**: 1px `var(--bask-line)` at 60% opacity
- **Inner**: max-width 1240px, padding `14px 32px`, flex row, justify-between
- **Left — brand**: `SunGlyph` icon (28px) + "Bask" wordmark in Fraunces 600 / 22px, letter-spacing -0.01em
- **Middle — links** ("How it works", "Features", "FAQ"): Nunito 600 / 15px, color `--bask-muted`, gap 28px. Hover → `--bask-text`. Hidden below 980px.
- **Right — CTA "Download"**: pill button. Background `--bask-text`, color `--bask-bg`, padding `10px 18px`, border-radius 999px, font 700/14px. Hover → translateY(-1px).

### 2. Hero

- **Layout**: 2-col grid, `1.05fr 0.95fr`, gap 60px, align-items center. Stacks to 1-col below 980px.
- **Padding**: `56px 32px 80px`
- **Background**: layered radial gradients on `--bask-bg`:
  - `radial-gradient(ellipse 80% 60% at 80% 20%, color-mix(in srgb, var(--bask-sun) 28%, transparent), transparent 70%)`
  - `radial-gradient(ellipse 60% 50% at 20% 90%, color-mix(in srgb, var(--bask-coral) 14%, transparent), transparent 70%)`
- **Decorative clouds**: 3 white SVG clouds (sizes 70/90/120px, opacities 0.4/0.55/0.7), absolutely positioned, each animated with `bask-drift` (18-26s ease-in-out infinite, alternating direction). Pointer-events: none.

#### Left column (copy)

- **Eyebrow pill**: `display: inline-flex`, padding `6px 12px`, background `rgba(0,0,0,0.04)`, border-radius 999px, font 600/13px, uppercase, letter-spacing 0.04em, color `--bask-muted`. 8px dot at left in `--bask-coral` with 3px glow ring. Margin-bottom 24px. Copy: "New · Now on the App Store".
- **H1 — Fraunces 500**, `clamp(40px, 5.6vw, 84px)`, line-height 1.02, letter-spacing -0.02em, `text-wrap: balance`. `<em>` is italic + color `--bask-honey`. Three available copy options (cycle via Tweaks):
  1. "You're outside. You're getting zero vitamin D."
  2. "The sun is medicine. Most of yours doesn't count." (default)
  3. "Stop guessing whether your sun is doing anything."
- **Sub** — Nunito 400, `clamp(17px, 1.25vw, 20px)`, line-height 1.55, color `--bask-muted`, max-width 52ch, margin-bottom 32px. Copy: "Bask reads the UV index, your skin, your clothing, and the angle of the sun — then tells you exactly when stepping outside actually produces vitamin D, and when it's just light."
- **CTA row** — flex, gap 14px:
  - **Primary**: background `--bask-text`, color `--bask-bg`, padding `14px 24px`, radius 999px, font 700/16px, gap 10px. Apple logo SVG inline (18×20). Box-shadow `0 4px 14px rgba(0,0,0,0.12)`. Hover: translateY(-2px) + shadow `0 8px 24px rgba(0,0,0,0.18)`. Copy: "Download for iOS".
  - **Ghost**: just text + arrow. Font 700/16px, color `--bask-text`. Arrow `→` translates 4px right on hover. Copy: "See how it works".
- **Meta row** — margin-top 36px, flex gap 12px, font 600/14px, color `--bask-muted`:
  - 5 yellow stars (color `--bask-sun`, letter-spacing 2px, 16px)
  - "4.8 · 2,400+ reviews"
  - dim dot
  - "Data stays on your iPhone"

#### Right column (mascot)

- 360px sun mascot, centered, animated `bask-bob` (4.5s ease-in-out infinite, translateY ±12px + rotate ±1.5deg)
- **3 floating chips** (hide-able via Tweaks `showFloaters`), each `position: absolute`, background `--bask-card`, border-radius 16px, padding `10px 14px`, font 700/13px, drop-shadow `0 8px 24px rgba(0,0,0,0.08)`, 1px border `--bask-line`:
  - **Floater 1 (top-left, stacked content)**: Number `+12 IU` in Fraunces 600/22px color `--bask-honey`, then `per minute` in 600/11px uppercase muted. Animates `bask-float-a` (5s).
  - **Floater 2 (mid-right)**: red coral dot + "Live · 14:22". Animates `bask-float-b` (6s).
  - **Floater 3 (bottom-left)**: "☁ 22% clouds". Animates `bask-float-a` reverse (7s).

### 3. The Hook (myth busters)

- **Background**: `--bask-bgAlt`
- **Section head**: centered, max-width 760px, margin-bottom 56px
  - Eyebrow: dot `--bask-sun`, copy "The problem"
  - H2 — Fraunces 500, `clamp(32px, 3.8vw, 56px)`: "Most people think _sun = vitamin D_. It's not that simple." (`<em>` italic + honey color)
  - Lede — Nunito 400, `clamp(18px, 1.5vw, 22px)`, max-width 56ch, color muted: "An estimated **42% of US adults** are vitamin D deficient. Most don't know it. Most are getting sun and assuming it counts."
- **3-col fact grid**, gap 24px (stacks below 980px). Each card:
  - Background `--bask-card`, border 1px `--bask-line`, radius 24px, padding 32px
  - 56×56 inline SVG icon (window / SPF bottle / clock)
  - Title — Fraunces 500/24px, line-height 1.15, margin 0 0 10px
  - Body — Nunito 400/16px, color muted

  Card copy:
  - **Sunny window. Zero IU.** — "UVB doesn't pass through glass. That 9am desk sun? Light, not synthesis."
  - **SPF 30 blocks 95%.** — "Most sunscreens cut UVB synthesis to almost nothing. Bask knows where you're covered."
  - **4pm in November. Zero IU.** — "North of 37°N, the sun's angle blocks UVB for half the year. You can't tell. We can."

- **Pull-quote card** below, margin-top 56px, max-width 720px centered. Padding `28px 36px`, background `--bask-card`, border `--bask-line`, radius 24px. Flex row, gap 24px. Contains:
  - 88px mascot (animation: pulse — `bask-pulse`, scale 1 ↔ 1.06 over 2.4s)
  - Kicker (uppercase 700/14px muted): "Bask is the first app that doesn't track sunlight."
  - Line (Fraunces 500/28px): "It tracks _synthesis_." (`<em>` honey)

### 4. How it works

- **Background**: `--bask-bg`
- Eyebrow dot `--bask-coral`, copy "How Bask works"
- H2: "Three systems, one question: _is it counting?_"
- **Three alternating rows**, 2-col grid (`1fr 1fr`), gap 80px, vertical gap 96px between rows. Row 2 reverses (`order: 2` on copy). Stacks below 980px (copy first).
  - **Tag** (per row) — JetBrains Mono 600/12px, uppercase, letter-spacing 0.05em, color `--bask-honey`:
    - "01 · D-Engine"
    - "02 · D-Window Forecast"
    - "03 · Live Bask Sessions"
  - **H3** — Fraunces 500/`clamp(26px, 2.4vw, 36px)`:
    - "From UV to IU."
    - "Know when to step outside."
    - "Track sun like a workout."
  - **Body** — Nunito 400/17px, line-height 1.6, color muted. Full copy in `sections-2.jsx` `HowItWorks`.
  - **Phone mockup** (right side, alternates). Specs in §"Phone Mockups" below.
  - **70px mascot** absolutely positioned, peeking from phone (different position per row). Animation `bask-bob` or `bask-cheer`.

### 5. Features

- **Background**: `--bask-bg`
- Eyebrow dot `--bask-sky`, copy "Everything inside"
- H2: "What you get with Bask"
- **3×3 grid** of feature cards, 1px gap (gap is `--bask-line` showing through), wrapped in rounded card with overflow hidden:
  - Wrapper: `display: grid`, `grid-template-columns: repeat(3, 1fr)`, `gap: 1px`, `background: var(--bask-line)`, border-radius 28px, border 1px `--bask-line`, overflow hidden
  - Each cell: background `--bask-card`, padding `36px 32px`, hover background → mix 70% card / 30% sun
  - Emoji 32px / Title Fraunces 500/22px / Body Nunito 400/15px muted
- Cells stack to 2-col below 980px, 1-col below 580px. Full copy in `sections-2.jsx` `Features`.

### 6. Comparison

- **Background**: `--bask-bgAlt`
- Eyebrow dot `--bask-sun`, copy "Why Bask wins"
- H2: "The same sun. A very different answer."
- **Card**: max-width 960px centered, background `--bask-card`, radius 28px, border `--bask-line`, box-shadow `0 20px 60px rgba(0,0,0,0.06)`, overflow hidden.
- **Rows**: 2-col grid `1fr 1.1fr`. First row is header (Fraunces 500/22px). All cells padding `22px 32px`, border-top `--bask-line`.
  - **Left col** ("Other apps"): color muted, background `rgba(0,0,0,0.02)`. ✕ glyph in muted color before each cell.
  - **Right col** ("Bask"): background `linear-gradient(135deg, var(--bask-sun), var(--bask-honey))`, color text, font 600. ✓ in 22×22 dark circle with sun-colored checkmark.
- Header right cell includes a 36px mascot inline next to "Bask" wordmark.
- Stacks to 1-col below 980px. Rows from `Compare` in `sections-2.jsx`.

### 7. FAQ

- **Background**: `--bask-bg`
- 2-col layout `0.8fr 1.2fr`, gap 80px (stacks below 980px).
- **Left**: eyebrow dot `--bask-coral`, copy "FAQ". H2 "Questions, answered." Body with email link in `--bask-honey`, underlined offset 3px.
- **Right**: stacked accordion items, gap 12px. Each:
  - Background `--bask-card`, border 1px `--bask-line`, radius 18px, padding `22px 28px`
  - Question row: Fraunces 500/20px, justified between question and 32px ⊕ circle (background `--bask-bgAlt`, color `--bask-honey`)
  - When open: + becomes –, answer reveals below 1px top border
  - Hover border → mix honey/line. Open state adds box-shadow `0 8px 24px rgba(0,0,0,0.06)`.
- Default first item open. 5 items total — copy in `FAQ` component.

### 8. Final CTA

- **Background**: radial-gradient ellipse at center-top `--bask-sun` 40% transparent → transparent 70%, layered on `--bask-bgAlt`. Centered, max-width 720px.
- 140px mascot with `bask-cheer` animation (1.6s, translateY + rotate ±4deg + scale 1.04)
- H2 (`clamp(32px, 4vw, 56px)`): "The sun is your most powerful, free, undertracked input."
- Body (19px): "Download Bask and start counting what counts."
- Big primary CTA (font 18px, padding `18px 32px`): "Download — Free on iOS"
- Note (13px muted): "Free to use · iPhone · iOS 17+ · No account needed"

### 9. Footer

- Background `--bask-text`, color `--bask-bg`, padding `80px 32px 32px`
- Grid: `1.2fr 1fr 1fr 1fr` (2-col below 980px)
- Brand col: 32px SunGlyph + "Bask" Fraunces 600/26px, then tagline "Sunlight intelligence for vitamin D." in 15px at 70% opacity
- 3 link cols: "App / Company / Legal" with `--bask-h` headings (700/13px uppercase, 60% opacity) and links at 15px / 80% opacity
- Bottom row: `border-top: 1px color-mix(--bask-bg, 12% opacity)`, padding-top 24px, margin-top 48px, flex justify-between, font 13px / 55% opacity. Contains copyright + "Educational tool — not a diagnostic device. For deficiency testing, see your doctor."

---

## Phone Mockups

Stylized iPhone mockups (NOT real screenshots — for hifi shipping, swap these for App Store renders). Specs:

- **Shell**: 320×660px, background `--bask-text`, border-radius 48px, padding 12px, box-shadow `0 30px 60px rgba(42,31,18,0.18), 0 0 0 2px rgba(0,0,0,0.1)`
- **Screen**: full inner area, border-radius 38px, padding `14px 18px`, background tint passed in via prop (default `--bask-bg`)
- **Notch**: 100×28px black pill centered at top
- **Status bar**: Nunito 800/13px, "9:41" left, signal/battery SVGs right

Three mock contents:

1. **PhoneRing (D-Engine)** — Daily IU progress ring. SVG `viewBox="0 0 200 200"`, 14px stroke ring (gray bg, sun-colored 62% arc with `bask-ring-pulse` 2.4s opacity 0.7↔1). Centered text: "IU TODAY" label (JetBrains Mono 13px), "2,480" (Fraunces 600/40px), "of 4,000 goal" (Nunito 11px muted). Below: two chips — sun "1,480 IU" and supplement "1,000 IU".

2. **PhoneForecast (D-Window)** — Tomorrow's optimal window. Card with linear-gradient `135deg, sun, honey`, copy "Your D-window / 12:40 – 1:25 pm / 22 min outside hits your daily goal". Below: 7-bar hour chart (10a–4p), bars colored sun if in window otherwise `rgba(0,0,0,0.1)`.

3. **PhoneSession (Live Session)** — Real-time tracker. Coral "● LIVE SESSION" header. Big number "847 IU" (Fraunces 600/64px), "14:22 elapsed" (Mono 13px). 62% progress meter (8px height). 3-stat grid: "UV NOW 7.2 / BURN IN 38m / PACE 59/min". "Stop session" pill button at bottom (text bg, bg-color text).

---

## Interactions & Behavior

### Mascot animations

All CSS @keyframes, all `infinite`. Toggleable globally via Tweaks `animate` flag.

- **`bask-bob`** — 4.5s ease-in-out. translateY 0↔-12px, rotate -1.5deg↔1.5deg. Used: hero, how-it-works mascots.
- **`bask-cheer`** — 1.6s ease-in-out, 4 keyframes (0/25/50/75/100%). Bouncy: translateY/rotate/scale. Used: final CTA mascot.
- **`bask-pulse`** — 2.4s ease-in-out, scale 1↔1.06. Used: hook pull-quote mascot.
- **`bask-drift-m`** — 7s ease-in-out. Used: optional sleepy mood.

### Floater animations (hero)

- **`bask-float-a`** — 5s/7s. translateY 0↔-12px.
- **`bask-float-b`** — 6s. translateY 0↔-8px + rotate 2deg.

### Cloud animations

- **`bask-drift`** — 18s/22s/26s ease-in-out infinite (alternating direction). translateX 0↔30px.

### Ring pulse

- **`bask-ring-pulse`** — 2.4s ease-in-out. opacity 1↔0.7.

### Hover states

- **CTA primary**: `transform: translateY(-2px)` + box-shadow grows
- **Ghost CTA**: arrow translateX +4px
- **Nav CTA**: translateY -1px
- **Feature card**: background mix 30% sun
- **FAQ item**: border-color → honey/line mix

### FAQ accordion

- Click row to toggle. Single-open or multi-open both acceptable — prototype uses single (clicking new item replaces). `useState` int index (`-1` = none).
- `+` becomes `–` when open. Answer slides in with 1px top border.

### Responsive breakpoints

- **≤ 980px**: hero stacks (mascot below copy), hook grid 1-col, how-it-works 1-col with copy first (revert `order: 2`), features 2-col, comparison 1-col, FAQ stacks, footer 2-col, nav links hidden (add hamburger if needed).
- **≤ 580px**: section padding `80px 20px`, hero padding `32px 20px 60px`, features 1-col.

---

## State Management

Minimal — only the FAQ accordion needs state:

- `openIndex: number` (default 0). Click → toggle to -1 if same, else index.

Tweaks panel state (palette / animate / showFloaters / headlineIdx) is **prototype-only**. Production should:

- Pick one palette (default `Sunshine`) and bake it in.
- Pick one headline (default index 1 — "The sun is medicine. Most of yours doesn't count.") or A/B test via your experimentation tool.
- Keep `animate` enabled but respect `prefers-reduced-motion: reduce` — wrap all `@keyframes` usage in a media query.

---

## Design Tokens

### Color palettes

All palettes are wired through CSS custom properties. Default palette is **Sunshine**. Other palettes provided for future A/B tests / seasonal swaps.

#### Sunshine (default)

```
--bask-bg:    #FFF6E6   /* page background, warm cream */
--bask-bgAlt: #FFEFD3   /* alternate section background */
--bask-card:  #FFFDF7   /* cards, FAQ items */
--bask-sun:   #FFC93C   /* primary yellow */
--bask-honey: #E89B2C   /* darker accent, italics, mono tags */
--bask-coral: #FF7B5C   /* live/coral pop */
--bask-sky:   #7BC4DB   /* secondary blue accent */
--bask-text:  #2A1F12   /* body & headings, also footer bg */
--bask-muted: #6B5D4A   /* secondary text */
--bask-line:  #E8DCC2   /* borders, dividers */
```

#### Sunset

```
bg #FFEFE3 / bgAlt #FFD9C2 / card #FFFAF4
sun #FF9E5C / honey #E26B45 / coral #E84A6E / sky #FFC56A
text #3A1B14 / muted #7E5A4A / line #F0D1B6
```

#### SkySun

```
bg #EEF6FA / bgAlt #DCEBF3 / card #FFFFFF
sun #FFCB47 / honey #E59A2A / coral #FF8A6E / sky #4FA8C8
text #1A2A35 / muted #5A6F7C / line #D0E2EC
```

#### Earthy

```
bg #F4ECD8 / bgAlt #E7DAB6 / card #FBF6E8
sun #E8A53A / honey #B86A1F / coral #C9512C / sky #7A9A6E
text #2C1F0E / muted #6C5A3A / line #D8C699
```

#### Dusk (dark)

```
bg #1F1A2E / bgAlt #15111F / card #2A2440
sun #FFCB47 / honey #FF9E3A / coral #FF7AA8 / sky #8FA8E8
text #FFF6E6 / muted #A99FB8 / line #39314F
```

### Typography

- **Fraunces** (Google Fonts) — display headings. Weights 400/500/600. Italic supported (used for inline `<em>` highlights with `--bask-honey` color). Axes available: `opsz 9..144`, `SOFT 100`.
- **Nunito** (Google Fonts) — body, UI, navigation, buttons. Weights 400/600/700/800.
- **JetBrains Mono** (Google Fonts) — numbers and data labels (IU readouts, tags like "01 · D-Engine", status bar times). Weights 500/700.

Type scale (defined in `styles.css`):

```
h1   Fraunces 500   clamp(40px, 5.6vw, 84px)   lh 1.02   ls -0.02em
h2   Fraunces 500   clamp(32px, 3.8vw, 56px)   lh 1.05   ls -0.015em
h3   Fraunces 500   clamp(26px, 2.4vw, 36px)   lh 1.10   ls -0.01em
sub  Nunito   400   clamp(17px, 1.25vw, 20px)  lh 1.55   muted
body Nunito   400   17px                        lh 1.60   muted
lede Nunito   400   clamp(18px, 1.5vw, 22px)   lh 1.55   muted
eyebrow Nunito 600 13px uppercase ls 0.04em muted
```

### Spacing scale

The page uses a loose 4/8/12/16/24/32/48/56/80/96/110 px scale. Most generally:

- **Section vertical padding**: 110px (desktop) / 80px (mobile)
- **Section horizontal padding**: 32px (desktop) / 20px (mobile)
- **Inter-element gap** in copy blocks: 24/32px
- **Card padding**: 32px (fact cards), 22-28px (FAQ), 36×32px (features)
- **CTA padding**: 14×24px (regular), 18×32px (big)

### Border radius

```
button pill:        999px
nav cta:            999px
floater chip:       16px
fact card:          24px
faq item:           18px
phone shell:        48px
phone screen:       38px
phone notch:        14px
window card:        18px
mock chip:          12px
feature wrapper:    28px
comparison card:    28px
session button:     14px
```

### Shadow scale

```
floater chip:    0 8px 24px rgba(0,0,0,0.08)
cta primary:     0 4px 14px rgba(0,0,0,0.12)
cta primary:hover 0 8px 24px rgba(0,0,0,0.18)
phone:           0 30px 60px rgba(42,31,18,0.18), 0 0 0 2px rgba(0,0,0,0.1)
comparison:      0 20px 60px rgba(0,0,0,0.06)
faq open:        0 8px 24px rgba(0,0,0,0.06)
mascot:          drop-shadow(0 12px 24px rgba(232,155,44,0.25))
```

---

## Assets

- **`assets/sun-mascot.png`** — Official Bask mascot. 500×500, transparent PNG, ~150KB. Provided by user. Use directly via `<img>`. The dev should ask the user for 2x/3x versions for retina, or a high-resolution source to re-export.
- **Apple logo SVG** — inlined in `Hero` and `CTA` components (path data in source).
- **Fact icons** — inline SVG (window grid, SPF bottle, clock) drawn in `FactIcon` component. Replace with your icon system if you have one.
- **Cloud shapes** — inline SVG (single path).
- **`SunGlyph`** — inline SVG version of the mascot for nav/footer at small sizes (28-32px). Use this where the PNG would be illegible.

## Files

In `design/`:

- **`Bask Landing.html`** — Entry point. Loads fonts (Google), styles, then React/Babel and all JSX modules.
- **`styles.css`** — All styles. CSS variables, type scale, layout, animations, responsive breakpoints. This is the styling source of truth.
- **`mascot.jsx`** — `SunMascot` (image wrapper with animation variants), `SunGlyph` (small inline SVG), `Cloud` (decorative shape).
- **`sections.jsx`** — `Hero`, `Hook`, `FactIcon`, plus the three phone mockup contents (`PhoneMockup`, `PhoneRing`, `PhoneForecast`, `PhoneSession`).
- **`sections-2.jsx`** — `Nav`, `HowItWorks`, `Features`, `Compare`, `FAQ`, `CTA`, `Footer`.
- **`app.jsx`** — Root component, palette definitions, Tweaks wiring, headline cycle.
- **`tweaks-panel.jsx`** — Prototype-only. Do NOT ship.
- **`assets/sun-mascot.png`** — The mascot image.

---

## Implementation Checklist

1. Choose target framework (Astro recommended for marketing).
2. Set up Google Fonts: Fraunces, Nunito, JetBrains Mono with weights listed above.
3. Port CSS variables and type scale from `styles.css` to your global stylesheet or Tailwind config.
4. Build components in this order: Layout (nav + footer) → Hero → Hook → HowItWorks (incl. phone mockups) → Features → Compare → FAQ → CTA.
5. Bring in the mascot PNG. Ask the user for retina / higher-resolution exports.
6. Wire up the FAQ accordion state.
7. Add `prefers-reduced-motion: reduce` media query that disables `animation` properties across the page.
8. Lighthouse-check the page: hero LCP should be the mascot or H1; defer Babel/React if you accidentally carry them over from the prototype.
9. SEO: add `<title>`, `<meta name="description">`, OpenGraph/Twitter cards. Suggested title: "Bask — Sunlight intelligence for vitamin D". Description: pull the H1 sub.
10. Hook the "Download" CTAs to the real App Store URL: `https://apps.apple.com/us/app/bask-vitamin-d-sun-tracker/id6758405235`.
11. Swap the stylized phone mockups for real App Store screenshots when available — the slots are designed at 320×660 (≈9:18.5 aspect, close to iPhone).

## What's NOT in the prototype (decide before ship)

- "Who Bask Is For" section from the marketing rundown — intentionally omitted to keep above-fold tight. Add it after the Hook if needed.
- Pricing / Pro tier callout.
- Testimonials / press logos.
- Email capture / newsletter signup.
- Cookie banner, GDPR / privacy popups.
- Analytics tags.
- Mobile-specific hero crop / mascot scale tuning (current responsive rules are functional but minimal).
