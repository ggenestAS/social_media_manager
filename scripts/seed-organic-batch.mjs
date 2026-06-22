#!/usr/bin/env node
/**
 * Generate 5× each organic post type + seed calendar (10-min cadence).
 * Usage: node scripts/seed-organic-batch.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BRAND = join(ROOT, 'brands/albert-prep');
const TPL = join(BRAND, 'templates/post-types');
const POSTS = join(BRAND, 'output/organic/posts');
const DATE = '2026-06-22';
const START = `${DATE}T10:00`;

const REEL_SCRIPT = readFileSync(join(TPL, 'reel/reel-timeline.js'), 'utf8')
  .replace(/^\/\*\*[\s\S]*?\*\/\n/, '')
  .trim();

const CDJ_CSS = readFileSync(join(TPL, 'calcul-du-jour/template.html'), 'utf8')
  .match(/<style>[\s\S]*?<\/style>/)[0];

const CALCULS = [
  { n: '050', bg: 'paper', calc: '14 × 6', difficulty: 'easy', caption: 'Calcul du jour #050\n\n14 × 6 = ?\n\nPose ta réponse en commentaire.\n\n#calculmental #albertprep #mathsrapides' },
  { n: '051', bg: 'navy', calc: '15 % de 80', difficulty: 'easy', caption: 'Calcul du jour #051\n\n15 % de 80 = ?\n\nCommentaire ↓\n\n#calculmental #albertprep #révisions' },
  { n: '052', bg: 'paper', calc: '7²', difficulty: 'easy', caption: 'Calcul du jour #052\n\n7² = ?\n\nPause, calcule, vérifie en commentaire.\n\n#calculmental #albertprep' },
  { n: '053', bg: 'navy', calc: '33 × 3', difficulty: 'easy', caption: 'Calcul du jour #053\n\n33 × 3 = ?\n\nTa réponse en commentaire ↓\n\n#calculmental #albertprep #mathsrapides' },
  { n: '054', bg: 'paper', calc: '996 + 1004', difficulty: 'easy', caption: 'Calcul du jour #054\n\n996 + 1004 = ?\n\nPose ta réponse en commentaire.\n\n#calculmental #albertprep #astucemaths' },
];

const ASTUCES = [
  {
    n: '013', title: 'multiplier<br><em>par</em> 25 ?', teaser: '16 × 25 = ?', example: '16 × 25',
    steps: ['❶ &nbsp;÷ 4 puis × 100', '❷ &nbsp;16 ÷ 4 = <span class="hl">4</span>', '❸ &nbsp;4 × 100 = 400 <span class="ok">✓</span>'],
    wrong: '1600', right: '400', recap: '16 ÷ 4 = 4 → 4 × 100 = 400',
    next: 'Prochaine astuce : les carrés en 5',
    caption: 'Astuce #013 — Multiplier par 25 ⏱\n\n16 × 25 = ?\n\nSwipe pour la méthode. Enregistre ce carrousel.\n\n#astucemaths #calculmental #albertprep',
  },
  {
    n: '014', title: 'multiplier<br><em>par</em> 5 ?', teaser: '24 × 5 = ?', example: '24 × 5',
    steps: ['❶ &nbsp;Divise par 2', '❷ &nbsp;24 ÷ 2 = <span class="hl">12</span>', '❸ &nbsp;12 × 10 = 120 <span class="ok">✓</span>'],
    wrong: '240', right: '120', recap: '24 ÷ 2 = 12 → 12 × 10 = 120',
    next: 'Prochaine astuce : priorité des opérations',
    caption: 'Astuce #014 — Multiplier par 5 en un clin d\'œil\n\n24 × 5 = ?\n\nGlisse → méthode complète.\n\n#astucemaths #calculmental #albertprep',
  },
  {
    n: '015', title: 'priorité<br>des <em>opérations</em> ?', teaser: '8 + 3 × 5 = ?', example: '8 + 3 × 5',
    steps: ['❶ &nbsp;× avant +', '❷ &nbsp;3 × 5 = <span class="hl">15</span>', '❸ &nbsp;8 + 15 = 23 <span class="ok">✓</span>'],
    wrong: '55', right: '23', recap: '3 × 5 = 15 → 8 + 15 = 23',
    next: 'Prochaine astuce : +20 %',
    caption: 'Astuce #015 — × avant +\n\n8 + 3 × 5 = ?\n\nPiège classique. Swipe pour la méthode.\n\n#astucemaths #calculmental #albertprep #spémaths',
  },
  {
    n: '016', title: 'augmenter<br>de <em>20 %</em> ?', teaser: '+20 % de 50 = ?', example: '+20 % de 50',
    steps: ['❶ &nbsp;20 % = 1/5', '❷ &nbsp;50 ÷ 5 = <span class="hl">10</span>', '❸ &nbsp;50 + 10 = 60 <span class="ok">✓</span>'],
    wrong: '70', right: '60', recap: '50 ÷ 5 = 10 → 50 + 10 = 60',
    next: 'Prochaine astuce : compensation',
    caption: 'Astuce #016 — +20 % sans calculatrice\n\n+20 % de 50 = ?\n\nEnregistre pour réviser.\n\n#astucemaths #calculmental #albertprep',
  },
  {
    n: '017', title: 'multiplier<br><em>49 × 21</em> ?', teaser: '49 × 21 = ?', example: '49 × 21',
    steps: ['❶ &nbsp;50 × 21 = 1050', '❷ &nbsp;− 21 = <span class="hl">1029</span>', '❸ &nbsp;Compensation <span class="ok">✓</span>'],
    wrong: '1050', right: '1029', recap: '50 × 21 − 21 = 1029',
    next: 'Prochaine astuce : les fractions',
    caption: 'Astuce #017 — Compensation (50 − 1)\n\n49 × 21 = ?\n\nMéthode rapide en 3 slides.\n\n#astucemaths #calculmental #albertprep #mathsrapides',
  },
];

const SERIES = [
  {
    n: '009', family: '× 5', calcs: ['14 × 5', '22 × 5', '30 × 5', '18 × 5'],
    answers: ['70', '110', '150', '90'],
    caption: 'Série #009 — Calculs rapides × 5\n\n4 calculs, 3 s chacun. Note ton score (/4) en commentaire.\n\n#calculmental #albertprep #mathsrapides',
  },
  {
    n: '010', family: 'carrés', calcs: ['15²', '25²', '35²', '45²'],
    answers: ['225', '625', '1225', '2025'],
    caption: 'Série #010 — Carrés qui finissent par 5\n\n4 carrés en chaîne. Score en commentaire ↓\n\n#calculmental #albertprep #spémaths',
  },
  {
    n: '011', family: '% de', calcs: ['10 % de 60', '20 % de 40', '25 % de 80', '15 % de 200'],
    answers: ['6', '8', '20', '30'],
    caption: 'Série #011 — Pourcentages mentaux\n\n4 % à calculer de tête. Ton score ?\n\n#calculmental #albertprep #révisions',
  },
  {
    n: '012', family: '× 2', calcs: ['17 × 2', '23 × 2', '31 × 2', '29 × 2'],
    answers: ['34', '46', '62', '58'],
    caption: 'Série #012 — Doubler vite\n\n4 multiplications × 2. Commentaire avec ton score.\n\n#calculmental #albertprep',
  },
  {
    n: '013', family: '× 25', calcs: ['8 × 25', '6 × 25', '14 × 25', '22 × 25'],
    answers: ['200', '150', '350', '550'],
    caption: 'Série #013 — Famille × 25\n\n4 calculs, même réflexe. Score (/4) en commentaire.\n\n#calculmental #albertprep #mathsrapides',
  },
];

const REELS = [
  { n: '017', accroche: 'Fais-le de tête', calc: '18 × 6', calcRepeat: '18 × 6', answer: '108', timer: 3, difficulty: 'easy',
    caption: 'Tu as 3 secondes ⏱\n\n18 × 6 = ?\n\nRéponse en fin de vidéo 👆\n\n#calculmental #chronométré #albertprep' },
  { n: '018', accroche: 'Sans calculatrice', calc: '12 × 5', calcRepeat: '12 × 5', answer: '60', timer: 3, difficulty: 'easy',
    caption: 'Tu as 3 secondes ⏱\n\n12 × 5 = ?\n\nPause, calcule, vérifie en commentaire.\n\n#calculmental #chronométré #albertprep' },
  { n: '019', accroche: 'Tu connais la méthode ?', calc: '47 × 11', calcRepeat: '47 × 11', answer: '517', timer: 10, difficulty: 'medium',
    caption: 'Tu as 10 secondes ⏱\n\n47 × 11 = ?\n\nRéponse en fin de vidéo 👆\n\n#calculmental #chronométré #albertprep #astucemaths' },
  { n: '020', accroche: 'Carré parfait', calc: '15²', calcRepeat: '15²', answer: '225', timer: 5, difficulty: 'easy',
    caption: 'Tu as 5 secondes ⏱\n\n15² = ?\n\nVérifie en commentaire.\n\n#calculmental #chronométré #albertprep' },
  { n: '021', accroche: 'Piège classique', calc: '8 + 3 × 5', calcRepeat: '8 + 3 × 5', answer: '23', timer: 5, difficulty: 'medium',
    caption: 'Tu as 5 secondes ⏱\n\n8 + 3 × 5 = ?\n\nRéponse en fin de vidéo 👆\n\n#calculmental #chronométré #albertprep #spémaths' },
];

function pad(n) { return String(n).padStart(3, '0'); }
function slug(type, n) { return `${DATE}-${type}-${pad(n)}`; }
function bundlePath(type, n) { return join(POSTS, slug(type, n)); }

function writePostMd(dir, meta, caption) {
  const yaml = [
    '---',
    `type: ${meta.type}`,
    `difficulty: ${meta.difficulty}`,
    ...(meta.timer_sec ? [`timer_sec: ${meta.timer_sec}`] : []),
    `channels: [${meta.channels.join(', ')}]`,
    ...(meta.placements ? ['placements:', ...meta.placements.map((p) => `  - { channel: ${p.channel}, post_type: ${p.post_type} }`)] : []),
    `schedule: ${meta.schedule}`,
    'status: planned',
    'postiz_id: null',
    '---',
    caption,
    '',
  ].join('\n');
  writeFileSync(join(dir, 'post.md'), yaml);
}

function genCdj(c) {
  const bgClass = c.bg === 'navy' ? 'bg-navy' : 'bg-paper';
  const innerClass = c.bg === 'navy' ? 'inner inner-navy' : 'inner';
  const displayClass = c.bg === 'navy' ? 'display on-navy eyebrow' : 'display eyebrow';
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Albert Prep — Calcul du jour #${c.n}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ${CDJ_CSS}
</head>
<body>
  <div data-screen-label="Calcul ${c.n} 4:5" class="screen ${bgClass}" style="width:1080px;height:1350px;">
    <div class="${innerClass}">
      <div class="head">
        <span class="post-number">#${c.n}</span>
        <span class="brand-tag">Albert&nbsp;Prep</span>
      </div>
      <div class="body">
        <div class="${displayClass}">Calcul <em>du jour</em></div>
        <div class="hero-calc">${c.calc}</div>
        <div class="hero-result">= ?</div>
      </div>
      <div class="foot">
        <p class="prompt">Pose ta réponse en commentaire ↓</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function genAstuce(a) {
  const steps = a.steps.map((s) => `<p class="step">${s}</p>`).join('\n        ');
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Albert Prep — Astuce #${a.n}</title>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ${readFileSync(join(TPL, 'astuce/template.html'), 'utf8').match(/<style>[\s\S]*?<\/style>/)[0]}
</head>
<body>
  <div data-screen-label="Astuce ${a.n} 01/04" class="screen bg-paper" style="width:1080px;height:1350px;">
    <div class="inner"><div class="head"><span class="post-number">#${a.n}</span><span class="slide-counter">01/04</span><span class="brand-tag">Albert&nbsp;Prep</span></div>
    <div class="body"><div style="margin-bottom:48px;"><span class="pill">Astuce</span></div>
    <div class="display" style="font-size:108px;">Comment<br>${a.title}</div></div>
    <div class="foot"><div class="separator"></div><p class="lead" style="margin-bottom:20px;">${a.teaser}</p><p class="hint">Passe au slide →</p></div></div></div>
  <div data-screen-label="Astuce ${a.n} 02/04" class="screen bg-navy" style="width:1080px;height:1350px;">
    <div class="inner inner-navy"><div class="head"><span class="post-number">#${a.n}</span><span class="slide-counter">02/04</span><span class="brand-tag">Albert&nbsp;Prep</span></div>
    <div class="body"><div class="display on-navy" style="font-size:84px;margin-bottom:48px;">La <em>méthode</em></div>
    <p class="lead" style="margin-bottom:40px;">Pour ${a.example} :</p>${steps}</div>
    <div class="foot"><p class="hint">→ Slide suivant</p></div></div></div>
  <div data-screen-label="Astuce ${a.n} 03/04" class="screen bg-paper" style="width:1080px;height:1350px;">
    <div class="inner"><div class="head"><span class="post-number">#${a.n}</span><span class="slide-counter">03/04</span><span class="brand-tag">Albert&nbsp;Prep</span></div>
    <div class="body"><p class="lead" style="margin-bottom:36px;">Essaie avec…</p><div class="hero-calc">${a.example}</div><div class="separator"></div>
    <div class="correction"><span class="wrong">${a.wrong}</span><span class="arrow">→</span><span class="right">${a.right}</span><span class="check">✓</span></div>
    <p class="recap">${a.recap}</p></div><div class="foot"><p class="hint">Enregistre pour t'entraîner →</p></div></div></div>
  <div data-screen-label="Astuce ${a.n} 04/04" class="screen bg-navy" style="width:1080px;height:1350px;">
    <div class="inner inner-navy"><div class="head"><span class="post-number">#${a.n}</span><span class="slide-counter">04/04</span><span class="brand-tag">Albert&nbsp;Prep</span></div>
    <div class="body"><div class="display on-navy" style="font-size:104px;margin-bottom:64px;">Enregistre<br>pour ne<br><em>pas oublier</em></div>
    <div><span class="btn-ink">Suivre @albert.prep</span></div></div>
    <div class="foot"><p class="teaser">${a.next}</p></div></div></div>
</body></html>`;
}

function genSerie(s) {
  const css = readFileSync(join(TPL, 'serie/template.html'), 'utf8').match(/<style>[\s\S]*?<\/style>/)[0];
  const calcSlides = s.calcs.map((calc, i) => {
    const sn = String(i + 2).padStart(2, '0');
    return `  <div data-screen-label="Serie ${s.n} ${sn}/06" class="screen bg-paper" style="width:1080px;height:1350px;">
    <div class="inner"><div class="head"><span class="slide-counter">${sn}/06</span><span class="brand-tag">Albert&nbsp;Prep</span></div>
    <div class="body"><p class="calc-label">Calcul ${i + 1} / 4</p><div class="hero-calc">${calc}</div><div class="hero-result">= ?</div></div>
    <div class="foot"><p class="hint">→ Réponses à la fin</p></div></div></div>`;
  }).join('\n');
  const answerLines = s.calcs.map((calc, i) =>
    `${calc} = <span class="res">${s.answers[i]}</span>`
  ).join('<br>\n          ');
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Albert Prep — Série #${s.n}</title>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ${css}
</head>
<body>
  <div data-screen-label="Serie ${s.n} 01/06" class="screen bg-navy" style="width:1080px;height:1350px;">
    <div class="inner inner-navy"><div class="head"><span class="slide-counter">SÉRIE #${s.n} · 01/06</span><span class="brand-tag">Albert&nbsp;Prep</span></div>
    <div class="body"><div style="margin-bottom:48px;"><span class="pill">Série</span></div>
    <div class="display" style="font-size:128px;">Calculs<br>rapides<br><em>${s.family}</em></div></div>
    <div class="foot"><div class="separator"></div><p class="lead" style="margin-bottom:16px;">3 secondes par calcul · 4 calculs</p><p class="hint">Prêt ? →</p></div></div></div>
${calcSlides}
  <div data-screen-label="Serie ${s.n} 06/06" class="screen bg-navy" style="width:1080px;height:1350px;">
    <div class="inner inner-navy"><div class="head"><span class="slide-counter">06/06</span><span class="brand-tag">Albert&nbsp;Prep</span></div>
    <div class="body"><div class="display" style="font-size:96px;margin-bottom:28px;">Ton score ?</div>
    <div class="stars" style="margin-bottom:16px;">★ ★ ★ ★</div><p class="range" style="margin-bottom:48px;">0/4 → 4/4</p>
    <div class="answers">${answerLines}</div></div>
    <div class="foot"><div style="margin-bottom:32px;"><span class="btn-ink">Commente ton score</span></div>
    <p class="handle">@albert.prep · Suis-nous pour la suite</p></div></div></div>
</body></html>`;
}

function genReel(r) {
  const tpl = readFileSync(join(TPL, 'reel/template.html'), 'utf8');
  let html = tpl
    .replace(/Reel #015/g, `Reel #${r.n}`)
    .replace(/Reel 015 9:16/g, `Reel ${r.n} 9:16`)
    .replace(/Calcul du jour · #015/g, `Calcul du jour · #${r.n}`)
    .replace(/data-timer-sec="3"/g, `data-timer-sec="${r.timer}"`)
    .replace(/Fais-le de tête/g, r.accroche)
    .replace(/17 × 3/g, r.calcRepeat)
    .replace(/<span>17 × 3<\/span>/g, `<span>${r.calc}</span>`)
    .replace(/answer-hero">51/g, `answer-hero">${r.answer}`);
  if (r.calc !== r.calcRepeat) {
    html = html.replace(`<span>${r.calcRepeat}</span>`, `<span>${r.calc}</span>`);
  }
  return html;
}

function addMinutes(isoLocal, mins) {
  const [date, time] = isoLocal.split('T');
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${date}T${String(nh).padStart(2, '0')}:${String(nm).padStart(2, '0')}`;
}

const bundles = [];
let slot = 0;

function scheduleAt(offsetMin) {
  return addMinutes(START, offsetMin);
}

function saveBundle(type, n, html, meta, caption) {
  const dir = bundlePath(type, n);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'source.html'), html);
  writePostMd(dir, meta, caption);
  bundles.push({ type, n, dir, slug: slug(type, n), ...meta });
  console.log(`  ✓ ${slug(type, n)}`);
}

console.log('Generating post bundles…');

CALCULS.forEach((c) => {
  saveBundle('calcul-du-jour', c.n, genCdj(c), {
    type: 'calcul-du-jour', difficulty: c.difficulty,
    channels: ['ig', 'fb'], schedule: null,
  }, c.caption);
});

ASTUCES.forEach((a, i) => {
  saveBundle('astuce', a.n, genAstuce(a), {
    type: 'astuce', difficulty: 'medium', channels: ['ig'], schedule: null,
  }, a.caption);
});

SERIES.forEach((s) => {
  saveBundle('serie', s.n, genSerie(s), {
    type: 'serie', difficulty: 'easy', channels: ['ig'], schedule: null,
  }, s.caption);
});

REELS.forEach((r) => {
  saveBundle('reel', r.n, genReel(r), {
    type: 'reel', difficulty: r.difficulty, timer_sec: r.timer,
    channels: ['ig'],
    placements: [{ channel: 'ig', post_type: 'post' }],
    schedule: null,
  }, r.caption);
});

// Build interleaved 10-min schedule: CDJ, Reel, Story, Astuce, Serie × 5
const scheduleRows = [];
slot = 0;
for (let round = 0; round < 5; round++) {
  const cdj = CALCULS[round];
  const ast = ASTUCES[round];
  const ser = SERIES[round];
  const rel = REELS[round];
  const t0 = scheduleAt(slot * 10); slot++;
  const t1 = scheduleAt(slot * 10); slot++;
  const t2 = scheduleAt(slot * 10); slot++;
  const t3 = scheduleAt(slot * 10); slot++;
  const t4 = scheduleAt(slot * 10); slot++;

  const cdjDir = `../posts/${slug('calcul-du-jour', cdj.n)}/`;
  const astDir = `../posts/${slug('astuce', ast.n)}/`;
  const serDir = `../posts/${slug('serie', ser.n)}/`;
  const relDir = `../posts/${slug('reel', rel.n)}/`;

  scheduleRows.push({ time: t0, channel: 'IG + FB', placement: 'feed', type: 'calcul-du-jour', n: cdj.n, path: cdjDir });
  scheduleRows.push({ time: t1, channel: 'IG Reels', placement: 'reel', type: 'reel', n: rel.n, path: relDir });
  scheduleRows.push({ time: t2, channel: 'IG Story', placement: 'story', type: 'reel (story)', n: rel.n, path: relDir });
  scheduleRows.push({ time: t3, channel: 'IG', placement: 'carousel', type: 'astuce', n: ast.n, path: astDir });
  scheduleRows.push({ time: t4, channel: 'IG', placement: 'carousel', type: 'serie', n: ser.n, path: serDir });

  writePostMd(bundlePath('calcul-du-jour', cdj.n), {
    type: 'calcul-du-jour', difficulty: cdj.difficulty, channels: ['ig', 'fb'], schedule: t0,
  }, cdj.caption);
  writePostMd(bundlePath('astuce', ast.n), {
    type: 'astuce', difficulty: 'medium', channels: ['ig'], schedule: t3,
  }, ast.caption);
  writePostMd(bundlePath('serie', ser.n), {
    type: 'serie', difficulty: 'easy', channels: ['ig'], schedule: t4,
  }, ser.caption);
  writePostMd(bundlePath('reel', rel.n), {
    type: 'reel', difficulty: rel.difficulty, timer_sec: rel.timer, channels: ['ig'],
    placements: [
      { channel: 'ig', post_type: 'post' },
      { channel: 'ig', post_type: 'story' },
    ],
    schedule: t1,
  }, rel.caption + `\n\n(story repost @ ${t2})`);
}

const endTime = scheduleAt((slot - 1) * 10);
const calPath = join(BRAND, 'output/organic/calendar/2026-06-22-seed.md');
const table = scheduleRows.map((r) =>
  `| ${r.time.replace('T', ' ')} | ${r.channel} | ${r.type} #${r.n} | ${r.placement} | \`${r.path}\` | planned |`
).join('\n');

const calendar = `# Seed calendar — ${DATE} (account bootstrap)

**Goal:** seed @albert.prep with 5× each organic type + story cross-posts for every reel.  
**Cadence:** one publish every **10 minutes** · Europe/Paris local times.  
**Window:** ${START.replace('T', ' ')} → ${endTime.replace('T', ' ')} (~${(slot - 1) * 10} min)

## Schedule (${scheduleRows.length} slots)

| Time (Paris) | Channel | Post | Placement | Bundle | Status |
|---|---|---|---|---|---|
${table}

## Inventory generated

| Type | IDs | Count |
|---|---|---|
| calcul-du-jour | 050–054 | 5 |
| astuce | 013–017 | 5 |
| serie | 009–013 | 5 |
| reel | 017–021 | 5 |
| story | same MP4 as reels 017–021 | 5 |

## Production

\`\`\`bash
# Export all feed posts
for d in brands/albert-prep/output/organic/posts/${DATE}-*/; do
  if [[ -f "$d/source.html" ]] && grep -q '4:5\\|Astuce\\|Serie' "$d/source.html" 2>/dev/null; then
    npm run html:to-image -- "$d/source.html" --all --out "$d/export"
  fi
done

# Export all reels
for d in brands/albert-prep/output/organic/posts/${DATE}-reel-*/; do
  npm run html:to-mp4 -- "$d/source.html" --out "$d/export"
done
\`\`\`

## Postiz (after export)

1. \`eval "$(npm run -s social:resolve)"\`
2. Upload each PNG/MP4 → \`postiz upload\`
3. Reels: \`--settings '{"post_type":"post"}'\`
4. Stories: same MP4, \`--settings '{"post_type":"story"}'\`
5. Carousels: upload all slide PNGs, comma-separated \`-m\`

Status key: \`planned\` → \`draft\` → \`scheduled\` → \`live\`
`;

writeFileSync(calPath, calendar);
console.log(`\nCalendar → ${calPath}`);
console.log(`Done: ${bundles.length} bundles, ${scheduleRows.length} scheduled slots.`);
