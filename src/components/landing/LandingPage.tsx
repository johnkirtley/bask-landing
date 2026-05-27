import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Cloud, SunGlyph, SunMascot } from './Mascot';
import {
  AppleLogo,
  FactIcon,
  PhoneForecast,
  PhoneMockup,
  PhoneRing,
  PhoneSession,
} from './PhoneMockups';

export const APP_STORE_URL =
  'https://apps.apple.com/us/app/bask-vitamin-d-sun-tracker/id6758405235';

const navLinks = [
  { href: '#quiz', label: 'Risk quiz' },
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#faq', label: 'FAQ' },
];

const tickerMessages = [
  '2,400+ sun sessions tracked this week',
  'Live D-window forecasts for 50+ cities',
  '42% of adults may be vitamin D deficient',
];

function SocialProofTicker() {
  const items = [...tickerMessages, ...tickerMessages];

  return (
    <div className="bask-ticker" aria-label="Live activity">
      <div className="bask-ticker-track">
        {items.map((msg, i) => (
          <span className="bask-ticker-item" key={`${msg}-${i}`}>
            <span className="bask-ticker-dot" aria-hidden="true" />
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bask-nav">
      <div className="bask-nav-inner">
        <a className="bask-nav-brand" href="/">
          <SunGlyph size={28} color="var(--bask-sun)" />
          <span>Bask</span>
        </a>
        <div className="bask-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <a
          className="bask-nav-cta"
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
        <button
          type="button"
          className="bask-nav-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`bask-nav-mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bask-nav-cta"
        >
          Download
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="bask-hero">
      <div className="bask-hero-bg">
        <Cloud
          size={120}
          opacity={0.7}
          style={{ position: 'absolute', top: '18%', left: '6%' }}
        />
        <Cloud
          size={90}
          opacity={0.55}
          style={{ position: 'absolute', top: '34%', right: '10%' }}
        />
        <Cloud
          size={70}
          opacity={0.4}
          style={{ position: 'absolute', top: '60%', left: '14%' }}
        />
      </div>
      <div className="bask-hero-grid">
        <div className="bask-hero-copy">
          <div className="bask-eyebrow bask-eyebrow--green">
            <span className="bask-eyebrow-dot" />
            Touch grass, but make it science
          </div>
          <h1 className="bask-h1">
            The sun is medicine. Most of yours <em>doesn&apos;t count.</em>
          </h1>
          <p className="bask-sub">
            Bask reads the UV index, your skin, your clothing, and the angle of
            the sun, then tells you exactly when stepping outside actually
            produces vitamin D, and when it&apos;s just light.
          </p>
          <div className="bask-cta-row">
            <a
              className="bask-cta-primary"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppleLogo />
              Download for iOS
            </a>
            <a className="bask-cta-ghost" href="#how">
              See how it works
              <span>→</span>
            </a>
          </div>
          <div className="bask-hero-meta">
            <div className="bask-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span>4.8</span>
            <span className="bask-meta-dot">·</span>
            <span>Data stays on your iPhone</span>
          </div>
        </div>
        <div className="bask-hero-mascot">
          <div className="bask-floaters">
            <div className="bask-floater bask-floater-1">
              <div className="bask-floater-num">+12 IU</div>
              <div className="bask-floater-lbl">per minute</div>
            </div>
            <div className="bask-floater bask-floater-2">
              <span style={{ color: 'var(--bask-coral)' }}>●</span> Live · 14:22
            </div>
            <div className="bask-floater bask-floater-3">☁ 22% clouds</div>
          </div>
          <SunMascot size={360} expression="happy" />
        </div>
      </div>
    </section>
  );
}

function Hook() {
  const facts = [
    {
      icon: 'window' as const,
      title: 'Sunny window. Zero IU.',
      copy: "UVB doesn't pass through glass. That 9am desk sun? Light, not synthesis.",
    },
    {
      icon: 'spf' as const,
      title: 'SPF 30 blocks 95%.',
      copy: "Most sunscreens cut UVB synthesis to almost nothing. Bask knows where you're covered.",
    },
    {
      icon: 'clock' as const,
      title: '4pm in November. Zero IU.',
      copy: "North of 37°N, the sun's angle blocks UVB for half the year. You can't tell. We can.",
    },
  ];

  return (
    <section className="bask-section bask-hook">
      <div className="bask-section-inner">
        <div className="bask-section-head bask-hook-head">
          <div className="bask-eyebrow">
            <span className="bask-eyebrow-dot" />
            The problem
          </div>
          <h2 className="bask-h2">
            Most people think <em>sun = vitamin D</em>. It&apos;s not that
            simple.
          </h2>
          <p className="bask-lede">
            An estimated <strong>42% of US adults</strong> are vitamin D
            deficient. Most don&apos;t know it. Most are getting sun and
            assuming it counts.
          </p>
        </div>
        <div className="bask-hook-grid">
          {facts.map((f) => (
            <div className="bask-fact" key={f.title}>
              <FactIcon kind={f.icon} />
              <h3 className="bask-fact-title">{f.title}</h3>
              <p className="bask-fact-copy">{f.copy}</p>
            </div>
          ))}
        </div>
        <div className="bask-hook-pull">
          <SunMascot size={88} expression="squint" shadow={false} />
          <div>
            <div className="bask-pull-kicker">
              Bask doesn&apos;t just track sunlight.
            </div>
            <div className="bask-pull-line">
              It tracks <em>synthesis</em>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const items = [
    {
      tag: '01 · D-Window Forecast',
      title: 'Know when to step outside.',
      copy: 'Bask reads tomorrow\'s UV and cloud forecast and finds the exact window when synthesis is possible. "Step outside between 12:40 and 1:25pm: 22 minutes hits your daily goal."',
      Mock: PhoneForecast,
      mascotExpression: 'happy' as const,
      mascotClass: 'bask-how-mascot-0',
    },
    {
      tag: '02 · D-Engine',
      title: 'From UV to IU.',
      copy: "Most apps show you UV. Bask shows you the vitamin D you're actually making, translated from UV, your skin type (Fitzpatrick I–VI), age, clothing, cloud cover, and biological saturation.",
      Mock: PhoneRing,
      mascotExpression: 'happy' as const,
      mascotClass: 'bask-how-mascot-1',
    },
    {
      tag: '03 · Live Bask Sessions',
      title: 'Track sun like a workout.',
      copy: 'Start a session, pocket your phone. Bask tracks IU gained, time elapsed, and burn risk in real time, on your Lock Screen and Dynamic Island.',
      Mock: PhoneSession,
      mascotExpression: 'cheer' as const,
      mascotClass: 'bask-how-mascot-2',
    },
  ];

  return (
    <section id="how" className="bask-section bask-how">
      <div className="bask-section-inner">
        <div className="bask-section-head">
          <div className="bask-eyebrow">
            <span
              className="bask-eyebrow-dot"
              style={{ background: 'var(--bask-coral)' }}
            />
            How Bask works
          </div>
          <h2 className="bask-h2">
            Three systems, one question: <em>is it counting?</em>
          </h2>
        </div>
        <div className="bask-how-stack">
          {items.map((it, i) => (
            <div key={it.tag} className={`bask-how-row ${i % 2 ? 'rev' : ''}`}>
              <div className="bask-how-copy">
                <div className="bask-how-tag">{it.tag}</div>
                <h3 className="bask-h3">{it.title}</h3>
                <p className="bask-body">{it.copy}</p>
              </div>
              <div className="bask-how-mock">
                <PhoneMockup>
                  <it.Mock />
                </PhoneMockup>
                <SunMascot
                  size={70}
                  expression={it.mascotExpression}
                  shadow={false}
                  className={`bask-how-mascot ${it.mascotClass}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      k: '🎯',
      t: 'One ring, one goal',
      d: 'Sun and supplements counted toward the same daily target, not separate dashboards.',
    },
    {
      k: '🔮',
      t: 'Forecast before you commit',
      d: 'See whether tomorrow is worth planning around, or whether you should just supplement.',
    },
    {
      k: '⏱',
      t: 'Real-time sessions',
      d: 'Track sun like a workout. Know when to stop before you burn.',
    },
    {
      k: '💊',
      t: 'Context-aware supplements',
      d: 'Log 1,000 / 2,000 / 5,000 IU doses. Bask reconciles them against your sun progress.',
    },
    {
      k: '🧂',
      t: 'Cofactor tracking',
      d: 'Magnesium and K2 logged alongside D, because D alone is half the picture.',
    },
    {
      k: '❤',
      t: 'HealthKit integration',
      d: 'Pulls Time in Daylight from Apple Health. Writes supplement logs back.',
    },
    {
      k: '📊',
      t: 'History & insights',
      d: 'Streaks, weekly averages, calendar view, 30-day and 90-day trends on Pro.',
    },
    {
      k: '🔔',
      t: 'Pre-window pings',
      d: 'Pro users get notified before each optimal window opens.',
    },
    {
      k: '🔒',
      t: 'Lives on your phone',
      d: 'Data stays local. No accounts, no cloud, no tracking, no selling.',
    },
  ];

  return (
    <section id="features" className="bask-section bask-features">
      <div className="bask-section-inner">
        <div className="bask-section-head">
          <div className="bask-eyebrow">
            <span
              className="bask-eyebrow-dot"
              style={{ background: 'var(--bask-sky)' }}
            />
            Everything inside
          </div>
          <h2 className="bask-h2">What you get with Bask</h2>
        </div>
        <div className="bask-feature-grid">
          {features.map((f) => (
            <div className="bask-feature" key={f.t}>
              <div className="bask-feature-k" aria-hidden="true">
                {f.k}
              </div>
              <div className="bask-feature-t">{f.t}</div>
              <div className="bask-feature-d">{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compare() {
  const rows = [
    ['Shows you UV index', 'Translates UV into estimated IU'],
    ['Generic timer', 'Personalized to your skin, age & clothing'],
    ['Tracks sun OR supplements', 'Tracks both, toward one daily goal'],
    ['Tells you to "get sun"', "Tells you when sun doesn't count"],
    ['Treats sun as risk-only', 'Balances synthesis with burn risk'],
  ];

  return (
    <section className="bask-section bask-compare">
      <p className="bask-compare-hint">Swipe to compare</p>
      <div className="bask-section-inner">
        <div className="bask-section-head">
          <div className="bask-eyebrow">
            <span className="bask-eyebrow-dot" />
            Why Bask wins
          </div>
          <h2 className="bask-h2">The same sun. A very different answer.</h2>
        </div>
        <div className="bask-compare-card">
          <div className="bask-compare-head">
            <div className="bask-compare-cell bask-compare-other">
              Other sun &amp; UV apps
            </div>
            <div className="bask-compare-cell bask-compare-us">
              <SunMascot size={36} shadow={false} />
              Bask
            </div>
          </div>
          {rows.map(([a, b]) => (
            <div className="bask-compare-row" key={a}>
              <div className="bask-compare-cell bask-compare-other">
                <span className="bask-compare-x" aria-hidden="true">
                  ✕
                </span>
                {a}
              </div>
              <div className="bask-compare-cell bask-compare-us">
                <span className="bask-compare-check" aria-hidden="true">
                  ✓
                </span>
                {b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeficiencyQuiz() {
  type QuizAnswers = {
    location: number | null;
    sunscreen: number | null;
    indoor: number | null;
  };

  const questions = [
    {
      id: 'location' as const,
      q: 'Where do you live?',
      options: [
        { label: 'South, below 37°N (LA, Miami, Phoenix)', score: 0 },
        { label: 'Mid-latitude, around 37°N (SF, DC, Madrid)', score: 1 },
        { label: 'North, above 45°N (Seattle, NYC, London)', score: 2 },
      ],
    },
    {
      id: 'sunscreen' as const,
      q: 'How often do you wear sunscreen outside?',
      options: [
        { label: 'Rarely or never', score: 0 },
        { label: 'Sometimes, face only or partial coverage', score: 1 },
        { label: 'Always, full coverage, SPF 30+', score: 2 },
      ],
    },
    {
      id: 'indoor' as const,
      q: 'How much time do you spend indoors on weekdays?',
      options: [
        { label: 'Under 4 hours, mostly outside', score: 0 },
        { label: '4–8 hours, mix of inside and out', score: 1 },
        { label: '8+ hours (desk job, commute, indoors)', score: 2 },
      ],
    },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    location: null,
    sunscreen: null,
    indoor: null,
  });
  const [showResult, setShowResult] = useState(false);

  const current = questions[step];
  const currentAnswer = answers[current?.id ?? 'location'];
  const totalScore =
    (answers.location ?? 0) + (answers.sunscreen ?? 0) + (answers.indoor ?? 0);

  const results = [
    {
      max: 2,
      level: 'low' as const,
      title: 'Lower risk, but windows still matter',
      copy: "Your habits look decent, but even sunny days can produce zero IU if the angle is wrong or you're behind glass. Bask shows you exactly when your sun actually counts.",
    },
    {
      max: 4,
      level: 'moderate' as const,
      title: 'Moderate risk, your sun may not be enough',
      copy: 'A few factors are working against you. You might be outside daily and still miss the narrow D-window. Bask forecasts when to step out, and when to supplement instead.',
    },
    {
      max: 6,
      level: 'high' as const,
      title: 'Higher risk, worth paying attention',
      copy: "Latitude, coverage, and indoor time stack up fast. Most people in your profile assume their sun counts. It often doesn't. Bask tells you the exact minutes that do.",
    },
  ];

  const result =
    results.find((r) => totalScore <= r.max) ?? results[results.length - 1];

  function selectOption(score: number) {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: score }));
  }

  function next() {
    if (currentAnswer === null) return;
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function back() {
    if (showResult) {
      setShowResult(false);
      setStep(questions.length - 1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({ location: null, sunscreen: null, indoor: null });
    setShowResult(false);
  }

  return (
    <section id="quiz" className="bask-section bask-quiz">
      <div className="bask-section-inner">
        <div className="bask-section-head bask-hook-head">
          <div className="bask-eyebrow bask-eyebrow--green">
            <span className="bask-eyebrow-dot" />
            60-second check
          </div>
          <h2 className="bask-h2">
            Could you be <em>vitamin D deficient?</em>
          </h2>
          <p className="bask-lede">
            Three quick questions. No blood test required, just an honest look
            at your sun habits.
          </p>
        </div>

        <div className="bask-quiz-card">
          {!showResult ? (
            <>
              <div className="bask-quiz-progress" aria-hidden="true">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`bask-quiz-step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}
                  />
                ))}
              </div>
              <p className="bask-quiz-q">
                {step + 1}. {current.q}
              </p>
              <div className="bask-quiz-options" role="radiogroup">
                {current.options.map((opt, i) => (
                  <button
                    key={opt.label}
                    type="button"
                    className={`bask-quiz-opt ${currentAnswer === opt.score ? 'selected' : ''}`}
                    onClick={() => selectOption(opt.score)}
                    role="radio"
                    aria-checked={currentAnswer === opt.score}
                  >
                    <span className="bask-quiz-opt-key">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="bask-quiz-actions">
                {step > 0 ? (
                  <button
                    type="button"
                    className="bask-quiz-back"
                    onClick={back}
                  >
                    ← Back
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  className="bask-quiz-next"
                  onClick={next}
                  disabled={currentAnswer === null}
                >
                  {step < questions.length - 1 ? 'Next →' : 'See my score'}
                </button>
              </div>
            </>
          ) : (
            <div className="bask-quiz-result">
              <div className="bask-quiz-score">
                <span
                  className={`bask-quiz-score-num bask-quiz-score-num--${result.level}`}
                >
                  {totalScore}
                </span>
                <span className="bask-quiz-score-label">/ 6 risk score</span>
              </div>
              <h3 className="bask-quiz-result-title">{result.title}</h3>
              <p className="bask-quiz-result-copy">{result.copy}</p>
              <a
                className="bask-cta-primary"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppleLogo />
                Find your D-window for free
              </a>
              <p className="bask-quiz-disclaimer">
                Educational estimate only, not a diagnosis. For blood levels,
                ask your doctor for a 25(OH)D test.
              </p>
              <button type="button" className="bask-quiz-retry" onClick={reset}>
                Retake quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FounderStory() {
  return (
    <section id="founder" className="bask-section bask-founder">
      <div className="bask-section-inner">
        <div className="bask-section-head bask-hook-head">
          <div className="bask-eyebrow">
            <span
              className="bask-eyebrow-dot"
              style={{ background: 'var(--bask-honey)' }}
            />
            Why I built this
          </div>
        </div>
        <div className="bask-founder-card">
          <div className="bask-founder-photo" aria-hidden="true">
            ?
          </div>
          <div>
            <p className="bask-founder-name">Founder Name</p>
            <p className="bask-founder-role">Creator of Bask · Placeholder</p>
            <p className="bask-founder-quote">
              I was depressed. I got bloodwork back at <em>18 ng/mL</em>. I was
              outside every day. It helped, but I had no idea how much of that
              sun actually counted. So I built Bask to answer the one question
              no other app could: <em>is it counting?</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: 'Can I actually get vitamin D from the sun in winter?',
      a: "Depends on latitude. North of about 37°N, UVB often doesn't reach the surface from November to March. Bask shows you exactly when synthesis is possible, and when it isn't, recommends supplementation.",
    },
    {
      q: 'Does sunscreen block vitamin D?',
      a: 'SPF 30 blocks roughly 95% of UVB. Bask factors clothing and sunscreen coverage into your IU estimate, so the number on your ring matches what you actually made.',
    },
    {
      q: "Isn't this just another UV app?",
      a: "No. UV apps tell you when you'll burn. Bask tells you when sun produces vitamin D, a different (and often much shorter) window.",
    },
    {
      q: 'Is my data shared?',
      a: 'No. Bask stores your data locally on your device. HealthKit sync is opt-in and stays inside Apple Health.',
    },
    {
      q: 'Does Bask diagnose deficiency?',
      a: 'No. Bask is an educational and tracking tool. It helps you have informed conversations with your doctor and supports better habits over time. For diagnosis, get a 25(OH)D blood test.',
    },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bask-section bask-faq">
      <div className="bask-section-inner bask-faq-inner">
        <div className="bask-faq-side">
          <div className="bask-eyebrow">
            <span
              className="bask-eyebrow-dot"
              style={{ background: 'var(--bask-coral)' }}
            />
            FAQ
          </div>
          <h2 className="bask-h2">Questions, answered.</h2>
          <p className="bask-body" style={{ maxWidth: '34ch' }}>
            Bask is built by people who think sun deserves the same precision as
            sleep, glucose, and HRV. If you&apos;ve got a question we missed,{' '}
            <a href="mailto:support@getbask.app">support@getbask.app</a>.
          </p>
        </div>
        <div className="bask-faq-list">
          {items.map((it, i) => (
            <div
              key={it.q}
              className={`bask-faq-item ${open === i ? 'open' : ''}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(open === i ? -1 : i);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={open === i}
            >
              <div className="bask-faq-q">
                <span>{it.q}</span>
                <span className="bask-faq-plus">{open === i ? '–' : '+'}</span>
              </div>
              {open === i && <div className="bask-faq-a">{it.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="download" className="bask-section bask-cta-section">
      <div className="bask-section-inner bask-cta-inner">
        <div className="bask-cta-mascots">
          <SunMascot size={140} expression="cheer" />
        </div>
        <h2 className="bask-h2 bask-cta-h">
          The sun is your most powerful, free, undertracked input.
        </h2>
        <p className="bask-body bask-cta-body">
          Download Bask and start counting what counts.
        </p>
        <div className="bask-cta-row" style={{ justifyContent: 'center' }}>
          <a
            className="bask-cta-primary bask-cta-big"
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppleLogo size={20} />
            Download free on iOS
          </a>
        </div>
        <div className="bask-cta-note">
          Free to use · iPhone · iOS 17+ · No account needed
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bask-footer">
      <div className="bask-section-inner bask-footer-inner">
        <div>
          <div className="bask-footer-brand">
            <SunGlyph
              size={32}
              color="var(--bask-honey)"
              faceColor="var(--bask-bg)"
            />
            <span>Bask</span>
          </div>
          <div className="bask-footer-tag">
            Sunlight intelligence for vitamin D.
          </div>
        </div>
        <div className="bask-footer-cols">
          <div>
            <div className="bask-footer-h">App</div>
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#download">Download</a>
          </div>
          <div>
            <div className="bask-footer-h">Company</div>
            <a href="/blog">Blog</a>
            <a href="mailto:support@getbask.app">Contact</a>
          </div>
          <div>
            <div className="bask-footer-h">Legal</div>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
        <div className="bask-footer-bottom">
          <span>© 2026 Bask</span>
          <span>
            Educational tool, not a diagnostic device. For deficiency testing,
            see your doctor.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="bask-root">
      <SocialProofTicker />
      <Navigation />
      <Hero />
      <Hook />
      <DeficiencyQuiz />
      <HowItWorks />
      <Features />
      {/* <Compare /> */}
      <FAQ />
      {/* <FounderStory /> */}
      <CTA />
      <Footer />
    </div>
  );
}
