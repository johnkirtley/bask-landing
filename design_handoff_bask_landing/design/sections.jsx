// sections.jsx — All Bask landing page sections.

// ─── Stylized phone mockup ──────────────────────────────────────────────────
const PhoneMockup = ({ children, tint = '#FFF6E6', style = {}, scale = 1 }) => (
  <div
    className="bask-phone"
    style={{ ...style, transform: `scale(${scale})` }}
  >
    <div className="bask-phone-shell">
      <div className="bask-phone-notch"></div>
      <div className="bask-phone-screen" style={{ background: tint }}>
        <div className="bask-phone-statusbar">
          <span>9:41</span>
          <span className="bask-phone-statusbar-r">
            <svg width="16" height="10" viewBox="0 0 16 10">
              <rect
                x="0"
                y="6"
                width="2.5"
                height="4"
                rx="0.5"
                fill="currentColor"
              />
              <rect
                x="3.5"
                y="4"
                width="2.5"
                height="6"
                rx="0.5"
                fill="currentColor"
              />
              <rect
                x="7"
                y="2"
                width="2.5"
                height="8"
                rx="0.5"
                fill="currentColor"
              />
              <rect
                x="10.5"
                y="0"
                width="2.5"
                height="10"
                rx="0.5"
                fill="currentColor"
              />
            </svg>
            <svg width="18" height="10" viewBox="0 0 18 10">
              <rect
                x="0.5"
                y="1"
                width="14"
                height="8"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <rect
                x="2"
                y="2.5"
                width="10"
                height="5"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="15.5"
                y="3.5"
                width="1.5"
                height="3"
                rx="0.5"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
        {children}
      </div>
    </div>
  </div>
);

// ─── D-Engine mockup (ring + IU readout) ────────────────────────────────────
const PhoneRing = ({ palette, animate }) => {
  const pct = 0.62;
  const R = 78,
    C = 2 * Math.PI * R;
  return (
    <div className="bask-mock bask-mock-ring">
      <div className="bask-mock-header">
        <div className="bask-mock-date">TUE · MAY 26</div>
        <div className="bask-mock-temp">72°</div>
      </div>
      <div className="bask-ring-wrap">
        <svg viewBox="0 0 200 200" width="200" height="200">
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="14"
          />
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke={palette.sun}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${C * pct} ${C}`}
            transform="rotate(-90 100 100)"
            className={animate ? 'bask-ring-anim' : ''}
          />
          <text
            x="100"
            y="92"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="13"
            fill={palette.muted}
            letterSpacing="1"
          >
            IU TODAY
          </text>
          <text
            x="100"
            y="120"
            textAnchor="middle"
            fontFamily="Fraunces, serif"
            fontWeight="600"
            fontSize="40"
            fill={palette.text}
          >
            2,480
          </text>
          <text
            x="100"
            y="138"
            textAnchor="middle"
            fontFamily="Nunito, sans-serif"
            fontSize="11"
            fill={palette.muted}
          >
            of 4,000 goal
          </text>
        </svg>
      </div>
      <div className="bask-mock-chips">
        <div className="bask-chip">
          <span className="bask-chip-dot" style={{ background: palette.sun }} />
          Sun · 1,480 IU
        </div>
        <div className="bask-chip">
          <span className="bask-chip-dot" style={{ background: palette.sky }} />
          Supp · 1,000 IU
        </div>
      </div>
    </div>
  );
};

// ─── D-Window forecast mockup ───────────────────────────────────────────────
const PhoneForecast = ({ palette }) => {
  const hours = [
    { h: '10a', v: 0.15, on: false },
    { h: '11a', v: 0.4, on: false },
    { h: '12p', v: 0.78, on: true },
    { h: '1p', v: 0.92, on: true },
    { h: '2p', v: 0.7, on: true },
    { h: '3p', v: 0.45, on: false },
    { h: '4p', v: 0.18, on: false },
  ];
  return (
    <div className="bask-mock bask-mock-forecast">
      <div className="bask-mock-header">
        <div className="bask-mock-date">TOMORROW · MAY 27</div>
        <div className="bask-mock-temp">☀ Clear</div>
      </div>
      <div className="bask-window-card">
        <div className="bask-window-label">Your D-window</div>
        <div className="bask-window-time">
          12:40 – 1:25 <span>pm</span>
        </div>
        <div className="bask-window-sub">
          22 min outside hits your daily goal
        </div>
      </div>
      <div className="bask-bars">
        {hours.map((h, i) => (
          <div className="bask-bar-col" key={i}>
            <div
              className="bask-bar"
              style={{
                height: `${h.v * 100}%`,
                background: h.on ? palette.sun : 'rgba(0,0,0,0.1)',
              }}
            />
            <div className="bask-bar-lbl">{h.h}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Live Session mockup ────────────────────────────────────────────────────
const PhoneSession = ({ palette, animate }) => (
  <div className="bask-mock bask-mock-session">
    <div className="bask-mock-header">
      <div className="bask-mock-date" style={{ color: palette.coral }}>
        ● LIVE SESSION
      </div>
      <div className="bask-mock-temp">12:48 pm</div>
    </div>
    <div className="bask-session-big">
      <div className="bask-session-iu">
        <span className="bask-session-num">847</span>
        <span className="bask-session-unit">IU</span>
      </div>
      <div className="bask-session-time">14:22 elapsed</div>
    </div>
    <div className="bask-session-meter">
      <div
        className="bask-session-meter-fill"
        style={{ width: animate ? '62%' : '62%', background: palette.sun }}
      />
    </div>
    <div className="bask-session-stats">
      <div>
        <div className="bask-stat-lbl">UV NOW</div>
        <div className="bask-stat-val">7.2</div>
      </div>
      <div>
        <div className="bask-stat-lbl">BURN IN</div>
        <div className="bask-stat-val">38m</div>
      </div>
      <div>
        <div className="bask-stat-lbl">PACE</div>
        <div className="bask-stat-val">59/min</div>
      </div>
    </div>
    <button className="bask-session-stop">Stop session</button>
  </div>
);

// ─── HERO ───────────────────────────────────────────────────────────────────
const Hero = ({
  palette,
  headline,
  mascotProps,
  animate,
  showFloaters = true,
}) => (
  <section className="bask-hero" data-screen-label="01 Hero">
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
        <div className="bask-eyebrow">
          <span
            className="bask-eyebrow-dot"
            style={{ background: palette.coral }}
          />
          New · Now on the App Store
        </div>
        <h1 className="bask-h1">{headline}</h1>
        <p className="bask-sub">
          Bask reads the UV index, your skin, your clothing, and the angle of
          the sun — then tells you exactly when stepping outside actually
          produces vitamin D, and when it's just light.
        </p>
        <div className="bask-cta-row">
          <a className="bask-cta-primary" href="#download">
            <svg
              width="18"
              height="20"
              viewBox="0 0 384 512"
              fill="currentColor"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
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
          <span>4.8 · 2,400+ reviews</span>
          <span className="bask-meta-dot">·</span>
          <span>Data stays on your iPhone</span>
        </div>
      </div>
      <div className="bask-hero-mascot">
        {showFloaters && (
          <div className="bask-floaters">
            <div className="bask-floater bask-floater-1">
              <div className="bask-floater-num">+12 IU</div>
              <div className="bask-floater-lbl">per minute</div>
            </div>
            <div className="bask-floater bask-floater-2">
              <span style={{ color: palette.coral }}>●</span> Live · 14:22
            </div>
            <div className="bask-floater bask-floater-3">☁ 22% clouds</div>
          </div>
        )}
        <SunMascot
          {...mascotProps}
          size={360}
          expression="happy"
          animate={animate}
        />
      </div>
    </div>
  </section>
);

// ─── HOOK ────────────────────────────────────────────────────────────────────
const Hook = ({ palette, animate }) => {
  const facts = [
    {
      icon: 'window',
      title: 'Sunny window. Zero IU.',
      copy: "UVB doesn't pass through glass. That 9am desk sun? Light, not synthesis.",
    },
    {
      icon: 'spf',
      title: 'SPF 30 blocks 95%.',
      copy: "Most sunscreens cut UVB synthesis to almost nothing. Bask knows where you're covered.",
    },
    {
      icon: 'clock',
      title: '4pm in November. Zero IU.',
      copy: "North of 37°N, the sun's angle blocks UVB for half the year. You can't tell. We can.",
    },
  ];
  return (
    <section className="bask-section bask-hook" data-screen-label="02 Hook">
      <div className="bask-section-inner">
        <div className="bask-section-head bask-hook-head">
          <div className="bask-eyebrow">
            <span
              className="bask-eyebrow-dot"
              style={{ background: palette.sun }}
            />{' '}
            The problem
          </div>
          <h2 className="bask-h2">
            Most people think <em>sun = vitamin D</em>. It's not that simple.
          </h2>
          <p className="bask-lede">
            An estimated <strong>42% of US adults</strong> are vitamin D
            deficient. Most don't know it. Most are getting sun and assuming it
            counts.
          </p>
        </div>
        <div className="bask-hook-grid">
          {facts.map((f, i) => (
            <div className="bask-fact" key={i}>
              <FactIcon kind={f.icon} palette={palette} />
              <h3 className="bask-fact-title">{f.title}</h3>
              <p className="bask-fact-copy">{f.copy}</p>
            </div>
          ))}
        </div>
        <div className="bask-hook-pull">
          <SunMascot
            variant="round"
            size={88}
            expression="squint"
            animate={animate}
            shadow={false}
            bodyColor={palette.sun}
          />
          <div>
            <div className="bask-pull-kicker">
              Bask doesn't just track sunlight.
            </div>
            <div className="bask-pull-line">
              It tracks <em>synthesis</em>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FactIcon = ({ kind, palette }) => {
  if (kind === 'window')
    return (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        className="bask-fact-icon"
      >
        <rect
          x="8"
          y="8"
          width="40"
          height="40"
          rx="3"
          fill="none"
          stroke={palette.text}
          strokeWidth="2.5"
        />
        <line
          x1="28"
          y1="8"
          x2="28"
          y2="48"
          stroke={palette.text}
          strokeWidth="2.5"
        />
        <line
          x1="8"
          y1="28"
          x2="48"
          y2="28"
          stroke={palette.text}
          strokeWidth="2.5"
        />
        <circle cx="42" cy="14" r="5" fill={palette.sun} />
      </svg>
    );
  if (kind === 'spf')
    return (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        className="bask-fact-icon"
      >
        <path
          d="M16 24 Q16 16 28 16 Q40 16 40 24 L40 32 L16 32 Z"
          fill={palette.coral}
        />
        <rect x="14" y="32" width="28" height="10" rx="2" fill={palette.text} />
        <text
          x="28"
          y="40"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="7"
          fill="#fff"
          fontWeight="700"
        >
          SPF 30
        </text>
      </svg>
    );
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="bask-fact-icon">
      <circle
        cx="28"
        cy="28"
        r="18"
        fill="none"
        stroke={palette.text}
        strokeWidth="2.5"
      />
      <line
        x1="28"
        y1="28"
        x2="28"
        y2="16"
        stroke={palette.text}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="28"
        x2="36"
        y2="32"
        stroke={palette.text}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="28" cy="28" r="2" fill={palette.text} />
    </svg>
  );
};

Object.assign(window, {
  PhoneMockup,
  PhoneRing,
  PhoneForecast,
  PhoneSession,
  Hero,
  Hook,
});
