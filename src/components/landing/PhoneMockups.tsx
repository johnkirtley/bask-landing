const StatusBarIcons = () => (
  <span className="bask-phone-statusbar-r">
    <svg width="16" height="10" viewBox="0 0 16 10">
      <rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="currentColor" />
      <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" fill="currentColor" />
      <rect x="7" y="2" width="2.5" height="8" rx="0.5" fill="currentColor" />
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
      <rect x="2" y="2.5" width="10" height="5" rx="1" fill="currentColor" />
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
);

export function PhoneMockup({
  children,
  screenshot,
  screenshotAlt = '',
  tint = '#FFF6E6',
}: {
  children?: React.ReactNode;
  screenshot?: string;
  screenshotAlt?: string;
  tint?: string;
}) {
  return (
    <div className="bask-phone">
      <div className="bask-phone-shell">
        <div className="bask-phone-notch" />
        <div
          className={`bask-phone-screen${screenshot ? 'bask-phone-screen--screenshot' : ''}`}
          style={screenshot ? undefined : { background: tint }}
        >
          <div className="bask-phone-statusbar">
            <span>9:41</span>
            <StatusBarIcons />
          </div>
          {screenshot ? (
            <img
              src={screenshot}
              alt={screenshotAlt}
              className="bask-phone-screenshot"
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}

export function PhoneRing({ animate = true }: { animate?: boolean }) {
  const pct = 0.62;
  const R = 78;
  const C = 2 * Math.PI * R;

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
            stroke="var(--bask-sun)"
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
            fill="var(--bask-muted)"
            letterSpacing="1"
          >
            IU TODAY
          </text>
          <text
            x="100"
            y="120"
            textAnchor="middle"
            fontFamily="Bricolage Grotesque, Nunito, sans-serif"
            fontWeight="700"
            fontSize="40"
            fill="var(--bask-text)"
          >
            2,480
          </text>
          <text
            x="100"
            y="138"
            textAnchor="middle"
            fontFamily="Nunito, sans-serif"
            fontSize="11"
            fill="var(--bask-muted)"
          >
            of 4,000 goal
          </text>
        </svg>
      </div>
      <div className="bask-mock-chips">
        <div className="bask-chip">
          <span
            className="bask-chip-dot"
            style={{ background: 'var(--bask-sun)' }}
          />
          Sun · 1,480 IU
        </div>
        <div className="bask-chip">
          <span
            className="bask-chip-dot"
            style={{ background: 'var(--bask-sky)' }}
          />
          Supp · 1,000 IU
        </div>
      </div>
    </div>
  );
}

export function PhoneForecast() {
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
                background: h.on ? 'var(--bask-sun)' : 'rgba(0,0,0,0.1)',
              }}
            />
            <div className="bask-bar-lbl">{h.h}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhoneSession() {
  return (
    <div className="bask-mock bask-mock-session">
      <div className="bask-mock-header">
        <div className="bask-mock-date" style={{ color: 'var(--bask-coral)' }}>
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
          style={{ width: '62%', background: 'var(--bask-sun)' }}
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
      <button type="button" className="bask-session-stop">
        Stop session
      </button>
    </div>
  );
}

function FactIcon({ kind }: { kind: 'sunAngle' | 'window' | 'spf' | 'clock' }) {
  if (kind === 'sunAngle') {
    return (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        className="bask-fact-icon"
      >
        <circle cx="18" cy="16" r="7" fill="var(--bask-sun)" />
        <path
          d="M8 42 H48"
          fill="none"
          stroke="var(--bask-text)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M18 16 L38 42"
          fill="none"
          stroke="var(--bask-honey)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M28 42 Q30 34 38 30"
          fill="none"
          stroke="var(--bask-text)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="38" cy="42" r="3" fill="var(--bask-coral)" />
      </svg>
    );
  }

  if (kind === 'window') {
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
          stroke="var(--bask-text)"
          strokeWidth="2.5"
        />
        <line
          x1="28"
          y1="8"
          x2="28"
          y2="48"
          stroke="var(--bask-text)"
          strokeWidth="2.5"
        />
        <line
          x1="8"
          y1="28"
          x2="48"
          y2="28"
          stroke="var(--bask-text)"
          strokeWidth="2.5"
        />
        <circle cx="42" cy="14" r="5" fill="var(--bask-sun)" />
      </svg>
    );
  }

  if (kind === 'spf') {
    return (
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        className="bask-fact-icon"
      >
        <path
          d="M16 24 Q16 16 28 16 Q40 16 40 24 L40 32 L16 32 Z"
          fill="var(--bask-coral)"
        />
        <rect
          x="14"
          y="32"
          width="28"
          height="10"
          rx="2"
          fill="var(--bask-text)"
        />
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
  }

  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="bask-fact-icon">
      <circle
        cx="28"
        cy="28"
        r="18"
        fill="none"
        stroke="var(--bask-text)"
        strokeWidth="2.5"
      />
      <line
        x1="28"
        y1="28"
        x2="28"
        y2="16"
        stroke="var(--bask-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="28"
        x2="36"
        y2="32"
        stroke="var(--bask-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="28" cy="28" r="2" fill="var(--bask-text)" />
    </svg>
  );
}

export { FactIcon };

export function AppleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size + 2}
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
