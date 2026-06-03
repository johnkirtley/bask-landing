import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Cloud, SunGlyph, SunMascot } from './Mascot';
import { AppleLogo, FactIcon, PhoneMockup } from './PhoneMockups';

export const APP_STORE_URL =
  'https://apps.apple.com/us/app/bask-vitamin-d-sun-tracker/id6758405235';

const navLinks = [
  { href: '#quiz', label: 'Risk quiz' },
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#faq', label: 'FAQ' },
  { href: '/leaderboard', label: 'Leaderboard' },
];

const tickerMessages = [
  '2,400+ sun sessions tracked this week',
  'Live forecasts for 50+ cities',
  'More than 4 in 10 adults are low on Vitamin D',
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
            Tired all the time, low mood, and no idea why?
          </h1>
          <p className="bask-sub">
            Low Vitamin D could be part of it. Your body only makes Vitamin D
            when the sun is strong enough. Bask tells you when to step outside.
          </p>
          <div className="bask-cta-row">
            <a
              className="bask-cta-primary"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppleLogo />
              Download free for iOS
            </a>
            <a className="bask-cta-ghost" href="#quiz">
              See if this is you
              <span>→</span>
            </a>
          </div>
          <div className="bask-hero-meta">
            <span>Free</span>
            <span className="bask-meta-dot">·</span>
            <span>iPhone</span>
            <span className="bask-meta-dot">·</span>
            <span>No account needed</span>
          </div>
        </div>
        <div className="bask-hero-mascot">
          <div className="bask-floaters">
            <div className="bask-floater bask-floater-1">
              <div className="bask-floater-num">Great time for sun</div>
              <div className="bask-floater-lbl">20 min to Vitamin D goal</div>
            </div>
            <div className="bask-floater bask-floater-2">
              <span style={{ color: 'var(--bask-coral)' }}>●</span> Window ·
              1:22pm to 4:00pm
            </div>
            <div className="bask-floater bask-floater-3">
              ☁ Light clouds · UV reduced by 25%
            </div>
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
      icon: 'sunAngle' as const,
      title: "Sunny doesn't mean useful.",
      copy: 'Vitamin D needs strong enough UVB (the sun rays that make Vitamin D) at the right sun angle. If the sun is low, it can be bright outside and still make little to none.',
    },
    {
      icon: 'window' as const,
      title: "Sun through a window doesn\'t make Vitamin D.",
      copy: 'Glass blocks the UVB your body needs for Vitamin D, so desk sunlight feels good but does not count toward production.',
    },
    {
      icon: 'clock' as const,
      title: 'Winter sun barely works.',
      copy: 'Depending on where you live, the sun can sit too low for months to help your body make much Vitamin D.',
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
            You eat well. You sleep enough. So why are you still dragging?
          </h2>
          <p className="bask-lede">
            It might be low Vitamin D. Your body makes it from sunlight, but
            most of what you actually get doesn&apos;t count.
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
              Bask makes sure your sun <em>actually counts.</em>
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
      tag: '01 · Best time',
      title: 'Know the best time to go outside.',
      copy: 'Bask checks the weather and finds your window. "Head out around 1:00. Twenty minutes covers you today." No more wondering if it\'s even worth it.',
      screenshot: '/images/landing/1.png',
      screenshotAlt:
        'Bask forecast showing today and tomorrow best sunlight windows',
      mascotExpression: 'happy' as const,
      mascotClass: 'bask-how-mascot-0',
    },
    {
      tag: '02 · Sun that counts',
      title: 'Know if your sun actually counted.',
      copy: "Most apps just show you the weather. Bask tells you whether you really got what you needed, based on your skin, what you're wearing, and the clouds.",
      screenshot: '/images/landing/2.png',
      screenshotAlt: 'Bask home screen with daily IU progress ring',
      mascotExpression: 'happy' as const,
      mascotClass: 'bask-how-mascot-1',
    },
    {
      tag: '03 · Live sessions',
      title: 'Track your time outside like a workout.',
      copy: "Tap start, put your phone away. Bask keeps time and gives you a heads-up before you've had too much.",
      screenshot: '/images/landing/3.png',
      screenshotAlt: 'Bask live session tracker with UV and burn risk',
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
            The easiest way to make sunlight work for you.
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
                <PhoneMockup
                  screenshot={it.screenshot}
                  screenshotAlt={it.screenshotAlt}
                />
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
      t: 'One simple goal',
      d: 'Sun and any Vitamin D supplements both count toward the same daily target.',
    },
    {
      k: '🔮',
      t: 'Plan ahead',
      d: 'See whether tomorrow looks like a good sun day, or whether logging supplements may make more sense.',
    },
    {
      k: '⏱',
      t: 'Real-time sessions',
      d: 'Get a heads-up when it may be time to head back in.',
    },
    {
      k: '💊',
      t: 'Took a supplement? Log it',
      d: 'Bask adds it to your day automatically.',
    },
    {
      k: '🧂',
      t: 'The helpers that matter',
      d: 'Track magnesium and K2, the two things that help your body actually use Vitamin D.',
    },
    {
      k: '❤',
      t: 'Works with Apple Health',
      d: 'Sync Vitamin D supplements and Time in Daylight with Apple Health.',
    },
    {
      k: '📊',
      t: 'See your progress',
      d: 'Streaks, weekly averages, and longer trends on Pro.',
    },
    {
      k: '🔔',
      t: 'Never miss a good window',
      d: 'Pro nudges you before the best time each day.',
    },
    {
      k: '🔒',
      t: 'Stays on your phone',
      d: "No account, no cloud, and nothing's ever sold.",
      hideOnMobile: true,
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
            What you get
          </div>
          <h2 className="bask-h2">What you get with Bask</h2>
        </div>
        <div className="bask-feature-grid">
          {features.map((f) => (
            <div
              className={`bask-feature ${f.hideOnMobile ? 'bask-feature--mobile-hidden' : ''}`}
              key={f.t}
            >
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
        { label: 'South or sunny most of the year', score: 0 },
        { label: 'Mixed seasons, sun varies by month', score: 1 },
        { label: 'Farther north, long winters or weak sun', score: 2 },
      ],
    },
    {
      id: 'sunscreen' as const,
      q: 'When you are outside, how much uncovered skin gets direct sun?',
      options: [
        { label: 'Plenty, usually arms or legs uncovered', score: 0 },
        { label: 'Some, usually face and hands only', score: 1 },
        { label: 'Very little, covered up or SPF 30+ most days', score: 2 },
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
      copy: "Your habits look decent, but even sunny days can produce zero Vitamin D if the angle is wrong or you're behind glass. Bask shows you exactly when your sun actually counts.",
    },
    {
      max: 4,
      level: 'moderate' as const,
      title: 'Moderate risk, your sun may not be enough',
      copy: 'A few factors are working against you. You might be outside daily and still miss the right sunlight window. Bask forecasts when to step out, and when to supplement instead.',
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
            Could low Vitamin D be why you feel this way?
          </h2>
          <p className="bask-lede">
            You&apos;re not alone. <strong>More than 4 in 10 adults</strong> are
            running low. Answer three quick questions to see your Vitamin D risk
            score.
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
                Find my optimal window in Bask
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
      q: 'Can I really get Vitamin D from the sun in winter?',
      a: "It depends on where you live. For a good chunk of the year in many places, the sun sits too low to make much Vitamin D. Bask shows you when it's actually working, and when you're better off taking a supplement.",
    },
    {
      q: "Isn't this just another UV app?",
      a: 'UV apps tell you how strong the sun is. Bask tells you something more useful: whether the sun is actually doing anything for you, based on your skin, your clothes, and the clouds. It also tells you the best time to step out.',
    },
    {
      q: 'Is my data shared?',
      a: 'By default, no. Everything stays on your phone, with no account and nothing sold. If you opt in to the community leaderboard, Bask sends limited leaderboard data only: a random public user ID, your anonymous display name, completed sun-session IU and duration, and optional coarse location labels you enter yourself. No HealthKit data, supplement logs, precise GPS, real name, email, skin type, or blood test results are sent.',
    },
    {
      q: 'Does Bask diagnose deficiency?',
      a: 'No. Bask is an educational tool, not a medical device. If you think you might be low, a simple blood test from your doctor is the only way to know for sure.',
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
            Clear answers on sunlight, Vitamin D, privacy, and what Bask can and
            can&apos;t tell you. If you&apos;ve got a question we missed,{' '}
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
          The easiest fix for feeling tired might be free.
        </h2>
        <p className="bask-body bask-cta-body">
          It&apos;s sunlight, and most people just don&apos;t get it right. Bask
          helps you change that, starting today.
        </p>
        <div className="bask-cta-row" style={{ justifyContent: 'center' }}>
          <a
            className="bask-cta-primary bask-cta-big"
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppleLogo size={20} />
            Download free for iOS
          </a>
        </div>
        <div className="bask-cta-note">Free · iPhone · No account needed</div>
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
            The easiest way to make sunlight count.
          </div>
        </div>
        <div className="bask-footer-cols">
          <div>
            <div className="bask-footer-h">App</div>
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="/leaderboard">Leaderboard</a>
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
