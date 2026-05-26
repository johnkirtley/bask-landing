type Expression = 'happy' | 'cheer' | 'squint' | 'sleepy';

interface SunMascotProps {
  size?: number;
  expression?: Expression;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  shadow?: boolean;
}

export function SunMascot({
  size = 200,
  expression = 'happy',
  animate = true,
  className = '',
  style = {},
  shadow = true,
}: SunMascotProps) {
  const animClass = animate
    ? expression === 'cheer'
      ? 'bask-mascot-cheer'
      : expression === 'squint'
        ? 'bask-mascot-pulse'
        : 'bask-mascot-bob'
    : '';

  return (
    <div
      className={`bask-mascot ${animClass} ${className}`.trim()}
      style={{ width: size, height: size, ...style }}
    >
      <img
        src="/images/sun-mascot.png"
        alt="Bask sun mascot"
        width={size}
        height={size}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
          filter: shadow
            ? 'drop-shadow(0 12px 24px rgba(232, 155, 44, 0.25))'
            : 'none',
        }}
      />
    </div>
  );
}

interface SunGlyphProps {
  size?: number;
  color?: string;
  faceColor?: string;
}

export function SunGlyph({
  size = 28,
  color = '#FFC93C',
  faceColor = '#2A1F12',
}: SunGlyphProps) {
  const rays = 14;
  const innerR = 9;
  const tipR = 14;
  const bumpR = 2.2;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {Array.from({ length: rays }).map((_, i) => {
        const a = (i / rays) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={20 + Math.cos(a) * tipR}
            cy={20 + Math.sin(a) * tipR}
            r={bumpR}
            fill={color}
          />
        );
      })}
      <circle cx="20" cy="20" r={innerR + 2} fill={color} />
      <circle cx="17.4" cy="19.5" r="1.2" fill={faceColor} />
      <circle cx="22.6" cy="19.5" r="1.2" fill={faceColor} />
      <path
        d="M17.5 22 Q20 24 22.5 22"
        stroke={faceColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="15.5" cy="22.2" r="1.3" fill="#FF9DAD" opacity="0.7" />
      <circle cx="24.5" cy="22.2" r="1.3" fill="#FF9DAD" opacity="0.7" />
    </svg>
  );
}

interface CloudProps {
  size?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

export function Cloud({
  size = 60,
  color = '#FFFFFF',
  opacity = 0.9,
  style,
}: CloudProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20 50 Q5 50 5 38 Q5 26 18 26 Q22 12 38 14 Q48 4 62 12 Q80 10 84 26 Q98 28 95 42 Q92 50 80 50 Z"
        fill={color}
        opacity={opacity}
      />
    </svg>
  );
}
