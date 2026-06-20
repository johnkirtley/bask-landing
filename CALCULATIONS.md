# Bask — Calculation Reference (Technical Port Spec)

This document specifies the exact math the Bask app uses for vitamin D synthesis,
sunburn risk, and sun-session tracking, so it can be reimplemented faithfully on the
web (landing page / blog).

> **Source of truth:** `lib/dEngine.ts` in the app repo. If the app's constants
> change, this document must be updated to match.
>
> **Not medical advice.** All outputs are calibrated estimates grounded in
> vitamin D photobiology (Holick) and the Fitzpatrick scale — not clinical
> measurements.

---

## 1. Inputs & units

| Input            | Range | Notes                                                |
| ---------------- | ----- | ---------------------------------------------------- |
| UV index         | 0–11+ | From a weather provider (app uses Apple WeatherKit). |
| Cloud cover      | 0–1   | Fraction (0 = clear, 1 = overcast).                  |
| Exposure %       | 0–100 | Fraction of skin exposed = `100 − coverage%`.        |
| Fitzpatrick type | 1–6   | Skin type (see §2).                                  |
| Age              | years | Optional; `null` ⇒ assume peak synthesis.            |
| Minutes          | ≥ 0   | Duration of exposure.                                |

---

## 2. Fitzpatrick type derivation

From two onboarding answers (skin tone + sun reaction):

```
skinToneScores      = { very-fair:1, fair:2, medium:3, olive:4, brown:5, dark-brown:6 }
sunReactionModifiers = { always-burns:-0.5, burns-then-tans:0, rarely-burns:+0.5 }

type = clamp( round(baseScore + modifier), 1, 6 )
```

Defaults if an answer is missing: `baseScore = 3`, `modifier = 0`.

---

## 3. Cloud attenuation → effective UV

A single heuristic is used everywhere the app reasons about synthesis:

```
effectiveUv = rawUv × (1 − cloudCover × 0.7)
```

If `cloudCover` is unknown, `effectiveUv = rawUv`. (At full overcast, UV is reduced
by 70%.)

> **Burn risk uses RAW UV, not effective UV.** Clouds reduce vitamin-D-producing
> UVB in this model, but burn calculations stay conservative and use raw UV.

---

## 4. The Shadow Rule (synthesis threshold)

Vitamin D synthesis only occurs when **(effective) UV ≥ 3**. Below 3, the app
returns **0 IU** — you still get UVA exposure, but effectively no vitamin D.
Rationale: UVB is largely scattered by the atmosphere when the sun is low (sun
angle ≲ 45°).

---

## 5. Vitamin D synthesis (single session)

```
IU = (UV / 10)
   × effectiveMinutes
   × (exposure% / 100)
   × (1 / skinMultiplier)
   × ageFactor
   × BASE_IU_PER_MINUTE
```

Then `IU = round(max(0, IU))`.

### Constants

```
BASE_IU_PER_MINUTE = 1500
```

Calibrated so a fair-skin (Type I), full-body, 1-MED summer session yields
~10,000–15,000 IU (Holick benchmark).

```
skinMultiplier (higher = slower synthesis per minute):
  Type 1 → 1.0      Type 4 → 4.5
  Type 2 → 1.5      Type 5 → 6.0
  Type 3 → 3.0      Type 6 → 7.5
```

These are kept proportional to the MED burn-time table (§7) so the saturation-capped
yield is roughly equal across skin types, while fair skin still synthesizes fastest.

```
ageFactor (getAgeMultiplier):
  age is null  → 1.0   (assume peak)
  age < 30     → 1.0
  age < 50     → 0.8
  age < 70     → 0.5
  age ≥ 70     → 0.3
```

### Biological saturation (the `effectiveMinutes` taper)

Minutes up to ~1 MED (the burn threshold) count fully; beyond that, additional
exposure yields diminishing returns toward a small ceiling (it is **not** a hard
stop).

```
timeToBurn     = calculateTimeToBurn(UV, type)         // see §7
baseMinutes    = min(minutes, timeToBurn)
overMinutes    = max(0, minutes − timeToBurn)
POST_BURN_CEILING = 0.25                                // up to +25% past 1 MED
taperMinutes   = timeToBurn × 0.25 × (1 − e^(−overMinutes / max(1, timeToBurn)))
effectiveMinutes = baseMinutes + taperMinutes
```

---

## 6. Per-minute rate & time-to-goal

**Marginal rate** (used for live accrual and time-to-goal). This is the _pre-saturation_
linear term — no taper:

```
ratePerMinute = (UV/10) × (exposure%/100) × (1/skinMultiplier) × ageFactor × 1500
              = 0   if UV < 3 OR exposure% ≤ 0
```

**Time to reach a target IU** (uncapped; callers compare against `timeToBurn` for safety):

```
minutesToGoal = ceil(targetIU / ratePerMinute)     // Infinity if rate ≤ 0
```

> Note: integrating `ratePerMinute` omits the §5 taper, so for sessions longer than
> `timeToBurn` it runs slightly higher than `calculateVitaminD`. For sessions shorter
> than `timeToBurn` the two agree exactly.

---

## 7. Sunburn / time-to-burn (MED)

```
MED_MINUTES_AT_UV1:
  Type 1 → 67      Type 4 → 300
  Type 2 → 100     Type 5 → 400
  Type 3 → 200     Type 6 → 500

timeToBurn (minutes) = round( MED_MINUTES_AT_UV1[type] / max(1, UV) )
```

**SPF / sunscreen does NOT modify burn time in this model.** Sunscreen habits are
collected for educational guidance only.

### Time-to-burn lookup (minutes), rounded

| Type | UV 3 | UV 5 | UV 8 | UV 10 |
| ---- | ---- | ---- | ---- | ----- |
| I    | 22   | 13   | 8    | 7     |
| II   | 33   | 20   | 13   | 10    |
| III  | 67   | 40   | 25   | 20    |
| IV   | 100  | 60   | 38   | 30    |
| V    | 133  | 80   | 50   | 40    |
| VI   | 167  | 100  | 63   | 50    |

### Burn risk level (from UV)

```
UV < 3  → Low
UV < 6  → Moderate
UV < 8  → High
UV < 11 → Very High
else    → Extreme
```

---

## 8. Vitamin D decay (serum model)

Half-life ≈ 15 days.

```
remainingIU      = round( initialIU × 0.5^(daysElapsed / 15) )
dailyDecayRate   = 1 − 0.5^(1/15)  ≈ 0.0448   (~4.48% per day)
dailyDecayAmount = round( currentIU × dailyDecayRate )
```

---

## 9. D-Window forecast (best time to bask)

- **Synthesis window:** contiguous daytime hours where `hour ∈ [8, 18]` **and**
  `effectiveUv(uv, cloud) ≥ 3`.
- **Optimal window scoring** (picks best 1–3 contiguous hours):

  ```
  uvScore    = min(uv / 8, 1) × 10      // caps at UV 8
  cloudScore = (1 − cloudCover) × 5     // favors clear skies
  score      = uvScore + cloudScore
  ```

- **Recommended session duration:**

  ```
  durationMinutes = max(5, min(minutesToGoal, timeToBurn, 60))
  ```

  (min 5 minutes, hard cap 60 minutes, never past burn time)

- **Viability gate:** a window is only recommended if its estimated yield
  ≥ `MIN_VIABLE_IU = 100`.
- **No-window reason** diagnostic: `uv-too-low` (raw UV never ≥ 3),
  `clouds-blocking` (raw ≥ 3 but effective < 3), or `low-exposure`
  (effective ≥ 3 but estimate too low).

UV/cloud forecasts come from the weather provider — there is no custom
solar-elevation/zenith-angle modeling.

---

## 10. Live session accrual

Vitamin D is integrated incrementally and is **monotonic** (never decreases):

```
dtMin         = (now − lastAccrual) / 60000
accrualUv     = (dtMin > 2 min) ? min(lastEffUv, liveEffUv) : liveEffUv
accumulatedIU += ratePerMinute(accrualUv, ...) × dtMin
```

- `BACKGROUND_GAP_MINUTES = 2`: across gaps > 2 min (e.g. backgrounded), credit at
  the **lower** of start-of-gap and current UV (conservative).
- No pre-threshold back-credit: while effective UV < 3, accrual is 0; it begins the
  moment UV crosses 3.

---

## 11. Morning Light phase (circadian, below synthesis threshold)

When `0 < effectiveUV < 3`, the session promotes circadian-light benefit instead of
vitamin D, and morphs to vitamin D once `effectiveUV ≥ 3`:

```
effectiveUV ≥ 3                      → Vitamin D mode
0 < effectiveUV < 3, rawUV ≥ 3       → "Clouds are blocking vitamin D"
0 < effectiveUV < 3, rawUV < 3       → "Great for circadian rhythm; UV not strong enough yet"
effectiveUV = 0                      → Night
```

---

## 12. Other constants

| Constant                          | Value | Meaning                                            |
| --------------------------------- | ----- | -------------------------------------------------- |
| `DEFAULT_DAILY_GOAL_IU`           | 2000  | Default user daily vitamin D goal                  |
| `NIH_BASELINE_DAILY_GOAL_IU`      | 600   | Conservative baseline for education                |
| `MIN_VIABLE_IU`                   | 100   | Min estimated IU for a recommended window          |
| `MIN_RECOMMENDED_SESSION_MINUTES` | 5     | Floor for recommended session length               |
| `BACKGROUND_GAP_MINUTES`          | 2     | Gap above which accrual is treated as backgrounded |
| `HALF_LIFE_DAYS`                  | 15    | Vitamin D serum half-life                          |

**Display helper:** estimated IU is rounded to the nearest 50 for display
(`formatEstimatedIU`), to read as an estimate rather than false precision.

---

## 13. Worked examples (validate your port against these)

**Example A — no saturation.** Type III, UV 6, 15 min, 80% exposure, age 40, clear sky.

```
uvFactor       = 6/10 = 0.6
skinMultiplier = 3.0
exposure       = 0.8
ageFactor      = 0.8        (age 40)
timeToBurn     = round(200/6) = 33  → 15 < 33, no taper
effectiveMin   = 15

IU = 0.6 × 15 × 0.8 × (1/3) × 0.8 × 1500 = 2,880 IU
```

**Example B — with saturation taper.** Type II, UV 5, 30 min, 50% exposure, age 35.

```
uvFactor       = 0.5
skinMultiplier = 1.5
exposure       = 0.5
ageFactor      = 0.8        (age 35)
timeToBurn     = round(100/5) = 20
overMinutes    = 30 − 20 = 10
taperMinutes   = 20 × 0.25 × (1 − e^(−10/20)) = 5 × (1 − 0.60653) ≈ 1.967
effectiveMin   = 20 + 1.967 = 21.967

IU = 0.5 × 21.967 × 0.5 × (1/1.5) × 0.8 × 1500 ≈ 4,393 IU
```

---

## 14. Scientific references (as cited in app)

- Holick, M.F. (1981) — Previtamin D₃ photochemistry/saturation. _Science._
- Holick, M.F. (2007) — Vitamin D photobiology; UVB timing. _JBMR / NEJM._
- Fitzpatrick, T.B. (1988) — Skin type classification. _Arch Dermatol._
- Faurschou et al. (2012); Petersen et al. (2014) — SPF effect on UVB/vitamin D.
  _Br J Dermatol._
