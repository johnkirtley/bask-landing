// sections-2.jsx — How it works, Features, Compare, FAQ, Footer

const HowItWorks = ({ palette, animate }) => {
  const items = [
    {
      tag: '01 · D-Engine',
      title: 'From UV to IU.',
      copy: "Most apps show you UV. Bask shows you the vitamin D you're actually making — translated from UV, your skin type (Fitzpatrick I–VI), age, clothing, cloud cover, and biological saturation.",
      Mock: PhoneRing,
    },
    {
      tag: '02 · D-Window Forecast',
      title: 'Know when to step outside.',
      copy: 'Bask reads tomorrow\'s UV and cloud forecast and finds the exact window when synthesis is possible. "Step outside between 12:40 and 1:25pm — 22 minutes hits your daily goal."',
      Mock: PhoneForecast,
    },
    {
      tag: '03 · Live Bask Sessions',
      title: 'Track sun like a workout.',
      copy: 'Start a session, pocket your phone. Bask tracks IU gained, time elapsed, and burn risk in real time — on your Lock Screen and Dynamic Island.',
      Mock: PhoneSession,
    },
  ];
  return (
    <section
      id="how"
      className="bask-section bask-how"
      data-screen-label="03 How it works"
    >
      <div className="bask-section-inner">
        <div className="bask-section-head">
          <div className="bask-eyebrow">
            <span
              className="bask-eyebrow-dot"
              style={{ background: palette.coral }}
            />{' '}
            How Bask works
          </div>
          <h2 className="bask-h2">
            Three systems, one question: <em>is it counting?</em>
          </h2>
        </div>
        <div className="bask-how-stack">
          {items.map((it, i) => (
            <div key={i} className={`bask-how-row ${i % 2 ? 'rev' : ''}`}>
              <div className="bask-how-copy">
                <div className="bask-how-tag">{it.tag}</div>
                <h3 className="bask-h3">{it.title}</h3>
                <p className="bask-body">{it.copy}</p>
              </div>
              <div className="bask-how-mock">
                <PhoneMockup>
                  <it.Mock palette={palette} animate={animate} />
                </PhoneMockup>
                <SunMascot
                  variant="round"
                  size={70}
                  expression={i === 2 ? 'cheer' : 'happy'}
                  animate={animate}
                  shadow={false}
                  bodyColor={palette.sun}
                  className={`bask-how-mascot bask-how-mascot-${i}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = ({ palette }) => {
  const features = [
    {
      k: '🎯',
      t: 'One ring, one goal',
      d: 'Sun and supplements counted toward the same daily target — not separate dashboards.',
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
      d: 'Magnesium and K2 logged alongside D — because D alone is half the picture.',
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
      d: 'Pro users get notified 15 minutes before each optimal window opens.',
    },
    {
      k: '🔒',
      t: 'Lives on your phone',
      d: 'Data stays local. No accounts, no cloud, no tracking, no selling.',
    },
  ];
  return (
    <section
      className="bask-section bask-features"
      data-screen-label="04 Features"
    >
      <div className="bask-section-inner">
        <div className="bask-section-head">
          <div className="bask-eyebrow">
            <span
              className="bask-eyebrow-dot"
              style={{ background: palette.sky }}
            />{' '}
            Everything inside
          </div>
          <h2 className="bask-h2">What you get with Bask</h2>
        </div>
        <div className="bask-feature-grid">
          {features.map((f, i) => (
            <div className="bask-feature" key={i}>
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
};

const Compare = ({ palette, animate }) => {
  const rows = [
    ['Shows you UV index', 'Translates UV into estimated IU'],
    ['Generic timer', 'Personalized to your skin, age & clothing'],
    ['Tracks sun OR supplements', 'Tracks both, toward one daily goal'],
    ['Tells you to "get sun"', "Tells you when sun doesn't count"],
    ['Treats sun as risk-only', 'Balances synthesis with burn risk'],
  ];
  return (
    <section
      className="bask-section bask-compare"
      data-screen-label="05 Compare"
    >
      <div className="bask-section-inner">
        <div className="bask-section-head">
          <div className="bask-eyebrow">
            <span
              className="bask-eyebrow-dot"
              style={{ background: palette.sun }}
            />{' '}
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
              <SunMascot
                variant="round"
                size={36}
                expression="happy"
                animate={animate}
                shadow={false}
                bodyColor="#fff"
                faceColor={palette.text}
                rayColor="#fff"
              />
              Bask
            </div>
          </div>
          {rows.map(([a, b], i) => (
            <div className="bask-compare-row" key={i}>
              <div className="bask-compare-cell bask-compare-other">
                <span className="bask-compare-x">✕</span>
                {a}
              </div>
              <div className="bask-compare-cell bask-compare-us">
                <span className="bask-compare-check">✓</span>
                {b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ palette }) => {
  const items = [
    {
      q: 'Can I actually get vitamin D from the sun in winter?',
      a: "Depends on latitude. North of about 37°N, UVB often doesn't reach the surface from November to March. Bask shows you exactly when synthesis is possible — and when it isn't, recommends supplementation.",
    },
    {
      q: 'Does sunscreen block vitamin D?',
      a: 'SPF 30 blocks roughly 95% of UVB. Bask factors clothing and sunscreen coverage into your IU estimate, so the number on your ring matches what you actually made.',
    },
    {
      q: "Isn't this just another UV app?",
      a: "No. UV apps tell you when you'll burn. Bask tells you when sun produces vitamin D — a different (and often much shorter) window.",
    },
    {
      q: 'Is my data shared?',
      a: 'No. Bask stores your data locally on your device. No cloud, no accounts, no selling. HealthKit sync is opt-in and stays inside Apple Health.',
    },
    {
      q: 'Does Bask diagnose deficiency?',
      a: 'No. Bask is an educational and tracking tool. It helps you have informed conversations with your doctor and supports better habits over time. For diagnosis, get a 25(OH)D blood test.',
    },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="bask-section bask-faq" data-screen-label="06 FAQ">
      <div className="bask-section-inner bask-faq-inner">
        <div className="bask-faq-side">
          <div className="bask-eyebrow">
            <span
              className="bask-eyebrow-dot"
              style={{ background: palette.coral }}
            />{' '}
            FAQ
          </div>
          <h2 className="bask-h2">Questions, answered.</h2>
          <p className="bask-body" style={{ maxWidth: '34ch' }}>
            Bask is built by people who think sun deserves the same precision as
            sleep, glucose, and HRV. If you've got a question we missed,
            <a href="mailto:support@getbask.app"> support@getbask.app</a>.
          </p>
        </div>
        <div className="bask-faq-list">
          {items.map((it, i) => (
            <div
              className={`bask-faq-item ${open === i ? 'open' : ''}`}
              key={i}
              onClick={() => setOpen(open === i ? -1 : i)}
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
};

const CTA = ({ palette, mascotProps, animate }) => (
  <section
    id="download"
    className="bask-section bask-cta-section"
    data-screen-label="07 Download"
  >
    <div className="bask-section-inner bask-cta-inner">
      <div className="bask-cta-mascots">
        <SunMascot
          {...mascotProps}
          size={140}
          expression="cheer"
          animate={animate}
        />
      </div>
      <h2 className="bask-h2 bask-cta-h">
        The sun is your most powerful, free, undertracked input.
      </h2>
      <p className="bask-body bask-cta-body">
        Download Bask and start counting what counts.
      </p>
      <div className="bask-cta-row" style={{ justifyContent: 'center' }}>
        <a className="bask-cta-primary bask-cta-big" href="#">
          <svg width="20" height="22" viewBox="0 0 384 512" fill="currentColor">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          Download — Free on iOS
        </a>
      </div>
      <div className="bask-cta-note">
        Free to use · iPhone · iOS 17+ · No account needed
      </div>
    </div>
  </section>
);

const Footer = ({ palette }) => (
  <footer className="bask-footer">
    <div className="bask-section-inner bask-footer-inner">
      <div className="bask-footer-brand">
        <SunGlyph size={32} color={palette.honey} faceColor={palette.text} />
        <span>Bask</span>
      </div>
      <div className="bask-footer-tag">
        Sunlight intelligence for vitamin D.
      </div>
      <div className="bask-footer-cols">
        <div>
          <div className="bask-footer-h">App</div>
          <a href="#how">How it works</a>
          <a href="#">Features</a>
          <a href="#">Pro</a>
        </div>
        <div>
          <div className="bask-footer-h">Company</div>
          <a href="#">About</a>
          <a href="#">Press</a>
          <a href="mailto:support@getbask.app">Contact</a>
        </div>
        <div>
          <div className="bask-footer-h">Legal</div>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Health disclaimer</a>
        </div>
      </div>
      <div className="bask-footer-bottom">
        <span>© 2026 Bask, Inc.</span>
        <span>
          Educational tool — not a diagnostic device. For deficiency testing,
          see your doctor.
        </span>
      </div>
    </div>
  </footer>
);

const Nav = ({ palette }) => (
  <nav className="bask-nav">
    <div className="bask-nav-inner">
      <a className="bask-nav-brand" href="#">
        <SunGlyph size={28} color={palette.honey} faceColor={palette.text} />
        <span>Bask</span>
      </a>
      <div className="bask-nav-links">
        <a href="#how">How it works</a>
        <a href="#features">Features</a>
        <a href="#faq">FAQ</a>
      </div>
      <a className="bask-nav-cta" href="#download">
        Download
      </a>
    </div>
  </nav>
);

Object.assign(window, { HowItWorks, Features, Compare, FAQ, CTA, Footer, Nav });
