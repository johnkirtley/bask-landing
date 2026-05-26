// app.jsx — Bask landing page root. Wires Tweaks + composes sections.

const PALETTES = {
  Sunshine: {
    bg: '#FFF6E6',
    bgAlt: '#FFEFD3',
    card: '#FFFDF7',
    sun: '#FFC93C',
    honey: '#E89B2C',
    coral: '#FF7B5C',
    sky: '#7BC4DB',
    text: '#2A1F12',
    muted: '#6B5D4A',
    line: '#E8DCC2',
  },
  Sunset: {
    bg: '#FFEFE3',
    bgAlt: '#FFD9C2',
    card: '#FFFAF4',
    sun: '#FF9E5C',
    honey: '#E26B45',
    coral: '#E84A6E',
    sky: '#FFC56A',
    text: '#3A1B14',
    muted: '#7E5A4A',
    line: '#F0D1B6',
  },
  SkySun: {
    bg: '#EEF6FA',
    bgAlt: '#DCEBF3',
    card: '#FFFFFF',
    sun: '#FFCB47',
    honey: '#E59A2A',
    coral: '#FF8A6E',
    sky: '#4FA8C8',
    text: '#1A2A35',
    muted: '#5A6F7C',
    line: '#D0E2EC',
  },
  Earthy: {
    bg: '#F4ECD8',
    bgAlt: '#E7DAB6',
    card: '#FBF6E8',
    sun: '#E8A53A',
    honey: '#B86A1F',
    coral: '#C9512C',
    sky: '#7A9A6E',
    text: '#2C1F0E',
    muted: '#6C5A3A',
    line: '#D8C699',
  },
  Dusk: {
    bg: '#1F1A2E',
    bgAlt: '#15111F',
    card: '#2A2440',
    sun: '#FFCB47',
    honey: '#FF9E3A',
    coral: '#FF7AA8',
    sky: '#8FA8E8',
    text: '#FFF6E6',
    muted: '#A99FB8',
    line: '#39314F',
  },
};

const HEADLINES = [
  "You're outside. You're getting zero vitamin D.",
  "The sun is medicine. Most of yours doesn't count.",
  'Stop guessing whether your sun is doing anything.',
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  palette: 'Sunshine',
  headlineIdx: 1,
  animate: true,
  showFloaters: true,
}; /*EDITMODE-END*/

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[t.palette] || PALETTES.Sunshine;
  const headline = HEADLINES[t.headlineIdx % HEADLINES.length];

  const mascotProps = {};

  // Inject CSS variables for the palette
  React.useEffect(() => {
    const r = document.documentElement;
    Object.entries(palette).forEach(([k, v]) =>
      r.style.setProperty(`--bask-${k}`, v),
    );
  }, [palette]);

  return (
    <div
      className="bask-root"
      style={{ background: palette.bg, color: palette.text }}
    >
      <Nav palette={palette} />
      <Hero
        palette={palette}
        headline={headline}
        mascotProps={mascotProps}
        animate={t.animate}
        showFloaters={t.showFloaters}
      />
      <Hook palette={palette} animate={t.animate} />
      <HowItWorks palette={palette} animate={t.animate} />
      <Features palette={palette} />
      <Compare palette={palette} animate={t.animate} />
      <FAQ palette={palette} />
      <CTA palette={palette} mascotProps={mascotProps} animate={t.animate} />
      <Footer palette={palette} />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakSelect
          label="Color theme"
          value={t.palette}
          options={Object.keys(PALETTES)}
          onChange={(v) => setTweak('palette', v)}
        />
        <TweakSection label="Mascot" />
        <TweakToggle
          label="Animation"
          value={t.animate}
          onChange={(v) => setTweak('animate', v)}
        />
        <TweakToggle
          label="Hero floaters"
          value={t.showFloaters}
          onChange={(v) => setTweak('showFloaters', v)}
        />
        <TweakSection label="Copy" />
        <TweakSelect
          label="Hero headline"
          value={String(t.headlineIdx)}
          options={['0', '1', '2']}
          onChange={(v) => setTweak('headlineIdx', parseInt(v))}
        />
        <div
          style={{ fontSize: 10, color: 'rgba(0,0,0,0.5)', padding: '4px 2px' }}
        >
          {HEADLINES[t.headlineIdx]}
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
