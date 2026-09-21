/**
 * Press reel timeline — inlined by every press-reel source.html.
 *
 * Port of the Claude Design composition (meta-reel-1.jsx on animations-v3) to
 * CSS keyframes so the repo's exporter can seek the timeline frame by frame.
 * Every animation shares one duration (the authored loop) and encodes its
 * timing as keyframe percentages; the exporter sets `currentTime` on each.
 *
 * For each `.reel[data-screen-label]` it reads the JSON in
 * `script.reel-config`, fills the copy into the DOM, generates keyframes and
 * writes data-loop-ms / data-cta-ms / data-cover-ms for html-to-mp4.
 */
(function initPressReels() {
  const EASE = {
    outCubic: 'cubic-bezier(0.33,1,0.68,1)',
    outExpo: 'cubic-bezier(0.16,1,0.3,1)',
    outBack: 'cubic-bezier(0.34,1.56,0.64,1)',
    inOutCubic: 'cubic-bezier(0.65,0,0.35,1)',
    linear: 'linear',
    step: 'step-end',
  };
  const H = 1920;
  const FOG = '#e6e8ec';
  const MUTE = '#8b919a';

  const hexToRgb = (hex) => {
    const h = String(hex).replace('#', '');
    const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
    const n = parseInt(x.slice(0, 6), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
  };

  document.querySelectorAll('.reel[data-screen-label]').forEach((reel, idx) => {
    const cfgEl = reel.querySelector('script.reel-config');
    if (!cfgEl) return;
    const R = Object.assign(
      {
        scenes: [3.8, 2.2, 3.8, 3.2],
        mast: 'FORTUNE', mastSpacing: '0.04em', logo: null, date: '',
        headline: '', headSize: 104, headSizeSmall: 72,
        right: '', rightSize: 176, kicker: '',
        hero: '', heroSize: 100, accentFrom: null,
        cta: 'Build my plan', foot: 'Free · early access · no card', accent: '#9ec0ea',
      },
      JSON.parse(cfgEl.textContent)
    );

    const [dHead, dRight, dTurn, dCta] = R.scenes;
    const RIGHT = dHead;
    const TURN = RIGHT + dRight;
    const CTA = TURN + dTurn;
    const TOTAL = CTA + dCta;
    const rgb = hexToRgb(R.accent);

    const id = 'pr' + idx;
    const rules = [];
    let n = 0;
    const pct = (s) => ((Math.min(Math.max(s, 0), TOTAL) / TOTAL) * 100).toFixed(3) + '%';

    // stops: [[seconds, 'css declarations', easeKeyForNextSegment?], …]
    const kf = (name, stops) => {
      const nm = `${id}_${name}_${n++}`;
      const body = stops
        .map(([s, css, e]) => `${pct(s)}{${css}${e ? ';animation-timing-function:' + EASE[e] : ''}}`)
        .join('');
      rules.push(`@keyframes ${nm}{${body}}`);
      return `${nm} ${TOTAL}s linear infinite both`;
    };
    const set = (el, ...anims) => {
      if (el) el.style.animation = anims.filter(Boolean).join(', ');
    };

    // MOTION.pop — opacity reaches 1 in the first third, scale 0.6→1 with overshoot
    const pop = (s, d) => kf('pop', [
      [0, 'opacity:0;transform:scale(0.6)'],
      [s, 'opacity:0;transform:scale(0.6)', 'outBack'],
      [s + d / 3, 'opacity:1'],
      [s + d, 'opacity:1;transform:scale(1)'],
      [TOTAL, 'opacity:1;transform:scale(1)'],
    ]);
    // MOTION.enter — rise 48px + fade
    const enter = (s, d) => kf('enter', [
      [0, 'opacity:0;transform:translateY(48px)'],
      [s, 'opacity:0;transform:translateY(48px)', 'outCubic'],
      [s + d, 'opacity:1;transform:none'],
      [TOTAL, 'opacity:1;transform:none'],
    ]);
    const words = (el, text, start, stagger, d, accentFrom, accentAt) => {
      el.innerHTML = '';
      text.split(' ').forEach((w, i) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = w;
        const anims = [pop(start + i * stagger, d)];
        if (accentFrom != null && i >= accentFrom) {
          anims.push(kf('accent', [
            [0, `color:${FOG};text-shadow:0 0 0 rgba(${rgb},0)`],
            [accentAt, `color:${FOG};text-shadow:0 0 0 rgba(${rgb},0)`, 'linear'],
            [accentAt + 0.35, `color:${R.accent};text-shadow:0 0 24px rgba(${rgb},0.4)`],
            [TOTAL, `color:${R.accent};text-shadow:0 0 24px rgba(${rgb},0.4)`],
          ]));
        }
        set(span, ...anims);
        el.appendChild(span);
      });
    };

    // ── DOM fill ─────────────────────────────────────────────────────────
    const q = (sel) => reel.querySelector(sel);
    const mast = q('.mast');
    if (R.logo && R.showLogo) {
      const img = document.createElement('img');
      img.src = R.logo; img.alt = R.mast; img.className = 'mast-logo';
      mast.replaceWith(img);
    } else {
      mast.textContent = R.mast;
      mast.style.letterSpacing = R.mastSpacing;
    }
    q('.date').textContent = R.date;
    q('.right').textContent = R.right;
    q('.kicker-txt').textContent = R.kicker;
    q('.cta-txt').textContent = R.cta;
    q('.trust').textContent = R.foot;
    q('.hero').style.fontSize = R.heroSize + 'px';

    // ── Choreography (authored seconds) ──────────────────────────────────
    const zoom = q('.zoom');
    set(zoom, kf('zoom', [
      [0, 'transform:scale(1)', 'linear'],
      [RIGHT, 'transform:scale(1.05)', 'linear'],
      [RIGHT + 0.6, 'transform:scale(1)', 'linear'],
      [TURN, 'transform:scale(1)', 'linear'],
      [TOTAL, 'transform:scale(1.02)'],
    ]));

    const paper = q('.paper');
    set(paper,
      kf('wipe', [
        [0, 'clip-path:inset(0 0 100% 0)'],
        [0.1, 'clip-path:inset(0 0 100% 0)', 'outExpo'],
        [0.8, 'clip-path:inset(0 0 0% 0)'],
        [TOTAL, 'clip-path:inset(0 0 0% 0)'],
      ]),
      kf('paperH', [
        [0, `height:${H}px`],
        [RIGHT, `height:${H}px`, 'outExpo'],
        [RIGHT + 0.55, `height:${H / 2}px`],
        [TOTAL, `height:${H / 2}px`],
      ])
    );
    set(q('.mast, .mast-logo'), pop(0.45, 0.7));
    set(q('.date'), enter(0.7, 0.5));

    const headline = q('.headline');
    words(headline, R.headline, 0.95, 0.12, 0.5, null, null);
    set(headline, kf('hsize', [
      [0, `font-size:${R.headSize}px`],
      [RIGHT, `font-size:${R.headSize}px`, 'outExpo'],
      [RIGHT + 0.55, `font-size:${R.headSizeSmall}px`],
      [TOTAL, `font-size:${R.headSizeSmall}px`],
    ]));

    set(q('.panel'), kf('panel', [
      [0, `top:${H}px`],
      [RIGHT, `top:${H}px`, 'outExpo'],
      [RIGHT + 0.55, `top:${H / 2}px`],
      [TOTAL, `top:${H / 2}px`],
    ]));

    // "They're right." — big at Right, shrinks to a kicker at Turn
    set(q('.right-line'), kf('shrink', [
      [0, `font-size:${R.rightSize}px;letter-spacing:-0.035em;color:${FOG};text-transform:none`],
      [TURN, `font-size:${R.rightSize}px;letter-spacing:-0.035em;color:${FOG};text-transform:none`, 'inOutCubic'],
      [TURN + 0.3, `color:${FOG};text-transform:none`, 'linear'],
      [TURN + 0.4, `color:${MUTE};text-transform:uppercase`, 'linear'],
      [TURN + 0.7, `font-size:28px;letter-spacing:0.18em;color:${MUTE};text-transform:uppercase`],
      [TOTAL, `font-size:28px;letter-spacing:0.18em;color:${MUTE};text-transform:uppercase`],
    ]));
    set(q('.right'), pop(RIGHT + 0.45, 0.6));
    set(q('.kicker-txt'), enter(TURN + 0.5, 0.5));

    // Hero line + cursor + lift
    const heroStart = TURN + 0.9;
    words(q('.hero .words'), R.hero, heroStart, 0.14, 0.5, R.accentFrom, heroStart + 1.9);
    set(q('.hero'), kf('lift', [
      [0, 'transform:translateY(0)'],
      [CTA, 'transform:translateY(0)', 'outCubic'],
      [CTA + 0.6, 'transform:translateY(-40px)'],
      [TOTAL, 'transform:translateY(-40px)'],
    ]));
    const cursor = q('.hero .cursor');
    cursor.style.background = R.accent;
    {
      const from = heroStart + 1.6;
      const f = 2.2;
      const stops = [[0, 'opacity:0', 'step']];
      let k = Math.floor(from * f);
      let cur = k % 2 === 0 ? 1 : 0.15;
      stops.push([from, `opacity:${cur}`, 'step']);
      k += 1;
      while (k / f < TOTAL) {
        cur = k % 2 === 0 ? 1 : 0.15;
        stops.push([k / f, `opacity:${cur}`, 'step']);
        k += 1;
      }
      stops.push([TOTAL, `opacity:${cur}`]);
      set(cursor, kf('blink', stops));
    }

    set(q('.cta-wrap'), pop(CTA + 0.15, 0.6));
    set(q('.foot'), enter(CTA + 0.55, 0.6));

    // loop seam — black in/out
    set(q('.seam'), kf('seam', [
      [0, 'opacity:1', 'linear'],
      [0.15, 'opacity:0', 'linear'],
      [TOTAL - 0.4, 'opacity:0', 'linear'],
      [TOTAL, 'opacity:1'],
    ]));

    // ── Export hints for tools/html-to-mp4.mjs ───────────────────────────
    reel.dataset.loopMs = String(Math.round(TOTAL * 1000));
    reel.dataset.ctaMs = String(Math.round((CTA + 1.6) * 1000));
    reel.dataset.coverMs = String(Math.round((RIGHT - 0.2) * 1000));
    if (!reel.dataset.speed) reel.dataset.speed = '1';

    const style = document.createElement('style');
    style.id = `${id}-timeline`;
    style.textContent = rules.join('\n');
    document.head.appendChild(style);
  });
})();
