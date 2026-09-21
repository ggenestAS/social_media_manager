// Meta reel — "Students can't reason" → Albert. 1080×1920, built on animations-v3.
const { CompositionStage, useComposition, Easing, animate, clamp, useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor, TweakRadio } = window;

const MOTION = {
  enter: (T, start, dur = 0.6) => {
    const u = clamp((T - start) / dur, 0, 1), e = Easing.easeOutCubic(u);
    return { opacity: e, transform: `translateY(${(1 - e) * 48}px)` };
  },
  pop: (T, start, dur = 0.55) => {
    const u = clamp((T - start) / dur, 0, 1), e = Easing.easeOutBack(u);
    return { opacity: Math.min(1, u * 3), transform: `scale(${0.6 + 0.4 * e})` };
  },
  slide: (T, start, dur, from, to) => animate({ from, to, start, end: start + dur, ease: Easing.easeOutExpo })(T),
};

const W = 1080, H = 1920, PAD = 96;
const INK = '#090a0b', PAPER = '#f4f2ec', FOG = '#e6e8ec', MUTE = '#8b919a';
const FONT = 'Helvetica, Arial, sans-serif', SERIF = 'Georgia, "Times New Roman", serif';
const DEFAULT_REEL = { mast: 'FORTUNE', logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Fortune_magazine_logo_2016.svg', date: 'February 24, 2026', tag: '9 weeks to go',
  headline: '‘Students can’t reason’: Teachers warn AI is fueling a crisis in kids’ ability to think', headSize: 104, headSizeSmall: 72,
  right: 'They’re right.', kicker: 'So we built the other kind.', hero: 'Albert is the AI that makes you do the thinking.', accentFrom: 6,
  cta: 'Build my plan', foot: 'Free · early access · no card' };
const getReel = (variant) => { const base = Object.assign({}, DEFAULT_REEL, window.REEL_CONFIG || {}); return variant === 'B' && base.b ? Object.assign({}, base, base.b) : base; };

function Words({ text, start, stagger = 0.11, style, accentFrom, accent, accentAt, T }) {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline', ...style }}>
      {words.map((w, i) => {
        const m = MOTION.pop(T, start + i * stagger, 0.5);
        const hot = accentFrom != null && i >= accentFrom && accentAt != null && T >= accentAt;
        const glow = hot ? clamp((T - accentAt) / 0.35, 0, 1) : 0;
        return (
          <span key={i} style={{ display: 'inline-block', marginRight: '0.24em', whiteSpace: 'pre', ...m, color: hot ? accent : undefined, transition: 'none', textShadow: glow ? `0 0 ${24 * glow}px ${accent}66` : 'none' }}>{w}</span>
        );
      })}
    </span>
  );
}

function Piece({ accent, showLogo, variant }) {
  const R = getReel(variant);
  const { T, CUES, authoredTotal } = useComposition();
  const c = CUES;

  // paper wipes down at open
  const wipe = MOTION.slide(T, 0.1, 0.7, 0, 1);
  // ink panel rises from bottom at Right
  const panelTop = MOTION.slide(T, c.Right, 0.55, H, H / 2);
  const paperH = panelTop;
  // headline size compresses as the panel rises
  const hSize = animate({ from: R.headSize, to: R.headSizeSmall, start: c.Right, end: c.Right + 0.55, ease: Easing.easeOutExpo })(T);
  // camera drift
  const zoom = 1 + 0.05 * clamp((T - 0) / (c.Right), 0, 1) - 0.05 * clamp((T - c.Right) / 0.6, 0, 1) + 0.02 * clamp((T - c.Turn) / (authoredTotal - c.Turn), 0, 1);
  // "They're right." : big at Right, shrinks to kicker at Turn
  const rightU = Easing.easeInOutCubic(clamp((T - c.Turn) / 0.7, 0, 1));
  const rightSize = (R.rightSize || 176) - ((R.rightSize || 176) - 28) * rightU;
  const rightY = 0; // handled by layout: it stays first in the column, size shrink does the move
  const kickerTail = MOTION.enter(T, c.Turn + 0.5, 0.5);
  // hero line + cta
  const heroStart = c.Turn + 0.9;
  const cursorOn = T > heroStart + 1.6 ? (Math.floor(T * 2.2) % 2 === 0 ? 1 : 0.15) : 0;
  const ctaM = MOTION.pop(T, c.CTA + 0.15, 0.6);
  const footM = MOTION.enter(T, c.CTA + 0.55, 0.6);
  const heroLift = animate({ from: 0, to: -40, start: c.CTA, end: c.CTA + 0.6, ease: Easing.easeOutCubic })(T);
  // loop seam: black in/out
  const fade = Math.min(clamp(T / 0.15, 0, 1), clamp((authoredTotal - T) / 0.4, 0, 1));

  return (
    <div data-screen-label={`t=${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, background: INK, overflow: 'hidden', fontFamily: FONT, color: FOG }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '50% 45%' }}>
        {/* PAPER */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: paperH, background: PAPER, color: '#111', clipPath: `inset(0 0 ${(1 - wipe) * 100}% 0)`, boxSizing: 'border-box', padding: `${PAD * 2.2}px ${PAD}px ${PAD}px`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 72 }}>
            {showLogo && R.logo ? <img src={R.logo} alt={R.mast} style={{ height: 64, width: 'auto', ...MOTION.pop(T, 0.45, 0.7) }} /> : <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 48, letterSpacing: R.mastSpacing || '0.04em', ...MOTION.pop(T, 0.45, 0.7) }}>{R.mast}</span>}
            <span style={{ fontSize: 26, color: '#666', ...MOTION.enter(T, 0.7, 0.5) }}>{R.date}</span>
          </div>
          <p style={{ margin: 0, fontFamily: SERIF, fontWeight: 700, fontSize: hSize, letterSpacing: '-0.025em', lineHeight: 1.06 }}>
            <Words T={T} text={R.headline} start={0.95} stagger={0.12} />
          </p>
        </div>

        {/* INK PANEL */}
        <div style={{ position: 'absolute', left: 0, top: panelTop, width: W, height: H - H / 2, background: INK, boxSizing: 'border-box', padding: `${PAD}px ${PAD}px ${PAD * 2.4}px`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 -40px 120px rgba(0,0,0,0.6)' }}>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0 0.3em', fontSize: rightSize, fontWeight: 500, letterSpacing: rightU > 0.5 ? '0.18em' : '-0.035em', textTransform: rightU > 0.5 ? 'uppercase' : 'none', color: rightU > 0.5 ? MUTE : FOG, lineHeight: 1.0, minHeight: 32 }}>
              <span style={{ display: 'inline-block', ...MOTION.pop(T, c.Right + 0.45, 0.6) }}>{R.right}</span>
              <span style={{ display: 'inline-block', ...kickerTail }}>{R.kicker}</span>
            </div>
            <h1 style={{ margin: 0, marginTop: 40, fontSize: R.heroSize || 100, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.0, transform: `translateY(${heroLift}px)` }}>
              <Words T={T} text={R.hero} start={heroStart} stagger={0.14} accentFrom={R.accentFrom} accent={accent} accentAt={heroStart + 1.9} />
              <span style={{ display: 'inline-block', width: 8, height: '0.82em', marginLeft: '0.06em', verticalAlign: '-0.08em', background: accent, opacity: cursorOn }} />
            </h1>
          </div>
          <div style={{ ...ctaM, transformOrigin: 'left center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 18, padding: '26px 44px', borderRadius: 18, background: FOG, color: INK, fontSize: 38, fontWeight: 600 }}>{R.cta} <span style={{ fontSize: 42, lineHeight: 1 }}>↑</span></span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...footM }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32 }}>
              <span style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3,8px)', gap: 6 }}>{Array.from({ length: 9 }).map((_, i) => <span key={i} style={{ width: 8, height: 8, background: FOG, borderRadius: '50%' }} />)}</span>
              <span><strong style={{ fontWeight: 600 }}>Albert</strong> Prep</span>
            </div>
            <span style={{ fontSize: 28, color: MUTE }}>{R.foot}</span>
          </div>
        </div>
      </div>
      {/* loop seam */}
      <div style={{ position: 'absolute', inset: 0, background: INK, opacity: 1 - fade, pointerEvents: 'none' }} />
    </div>
  );
}

window.MetaReel1 = function MetaReel1() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#1a1c1f">
        <Piece accent={t.accent} showLogo={t.showLogo} variant={t.variant} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Copy" />
        <TweakRadio label="Variant" value={t.variant} options={['A', 'B']} onChange={(v) => setTweak('variant', v)} />
        <TweakSection label="Reel" />
        <TweakColor label="Accent" value={t.accent} options={['#9ec0ea', '#6fd39a', '#f2c96b', '#e6e8ec']} onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Masthead logo" value={t.showLogo} onChange={(v) => setTweak('showLogo', v)} />
        <TweakSection label="Editor" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </div>
  );
};
