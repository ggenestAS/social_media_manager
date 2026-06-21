/**
 * Injected inline by reel source.html. Reads data-timer-sec (3|5|10|15) on .reel,
 * writes data-loop-ms / data-cta-ms, generates @keyframes, fills countdown digits.
 */
(function initReelTimeline() {
  const reel = document.querySelector('.reel[data-timer-sec]');
  if (!reel) return;

  const ALLOWED = [3, 5, 10, 15];
  let timerSec = parseInt(reel.dataset.timerSec, 10);
  if (!ALLOWED.includes(timerSec)) timerSec = 3;

  const INTRO = 2;
  const REVEAL = 3;
  const total = INTRO + timerSec + REVEAL;
  const revealStart = INTRO + timerSec;
  const loopMs = total * 1000;
  const loopS = total + 's';

  reel.dataset.loopMs = String(loopMs);
  reel.dataset.ctaMs = String(Math.round((revealStart + REVEAL * 0.62) * 1000));

  const p = (sec) => ((sec / total) * 100).toFixed(3);

  const lines = [];

  lines.push(
    `@keyframes r_brand{0%{opacity:0;transform:translateY(-10px)}${p(0.2)}%{opacity:1;transform:none}${p(total - 0.4)}%{opacity:1}100%{opacity:0}}`,
    `@keyframes r_eyebrow{0%,${p(0.15)}%{opacity:0;transform:translateY(12px)}${p(0.35)}%{opacity:1;transform:none}${p(total - 0.5)}%{opacity:1}100%{opacity:0}}`,
    `@keyframes r_eq{0%,${p(INTRO * 0.35)}%{opacity:0;transform:scale(.9)}${p(INTRO * 0.55)}%{opacity:1;transform:scale(1)}${p(revealStart - 0.12)}%{opacity:1;transform:scale(1)}${p(revealStart)}%{opacity:0;transform:scale(.96)}100%{opacity:0}}`,
    `@keyframes r_ring{0%,${p(INTRO)}%{stroke-dashoffset:0}${p(revealStart)}%{stroke-dashoffset:540}100%{stroke-dashoffset:540}}`,
    `@keyframes r_qmark{0%,${p(INTRO * 0.45)}%{opacity:0}${p(INTRO * 0.6)}%{opacity:1}${p(revealStart - 0.08)}%{opacity:1}${p(revealStart)}%{opacity:0}100%{opacity:0}}`,
    `@keyframes r_reveal{0%,${p(revealStart - 0.06)}%{opacity:0}${p(revealStart + 0.06)}%{opacity:1}100%{opacity:1}}`,
    `@keyframes r_answer{0%,${p(revealStart + 0.12)}%{opacity:0;transform:scale(.4)}${p(revealStart + 0.38)}%{opacity:1;transform:scale(1.12)}${p(revealStart + 0.55)}%{opacity:1;transform:scale(1)}100%{opacity:1;transform:scale(1)}}`,
    `@keyframes r_check{0%,${p(revealStart + 0.28)}%{opacity:0;transform:scale(.2) rotate(-25deg)}${p(revealStart + 0.48)}%{opacity:1;transform:scale(1) rotate(0)}100%{opacity:1}}`,
    `@keyframes r_cta{0%,${p(revealStart + REVEAL * 0.52)}%{opacity:0;transform:translateY(22px)}${p(revealStart + REVEAL * 0.68)}%{opacity:1;transform:none}100%{opacity:1}}`
  );

  for (let n = timerSec; n >= 1; n--) {
    const start = INTRO + (timerSec - n);
    const end = start + 1;
    lines.push(
      `@keyframes r_cd_${n}{0%,${p(start)}%{opacity:0}${p(start + 0.12)}%{opacity:1}${p(end - 0.12)}%{opacity:1}${p(end)}%,100%{opacity:0}}`
    );
  }

  document.getElementById('reel-timeline')?.remove();
  const style = document.createElement('style');
  style.id = 'reel-timeline';
  style.textContent = lines.join('\n');
  document.head.appendChild(style);

  const timerNumEl = reel.querySelector('.timer-num');
  if (timerNumEl) {
    timerNumEl.innerHTML = '';
    for (let n = timerSec; n >= 1; n--) {
      const span = document.createElement('span');
      span.textContent = String(n);
      span.style.animation = `r_cd_${n} ${loopS} linear infinite`;
      if (n >= 10) span.classList.add('timer-num--wide');
      timerNumEl.appendChild(span);
    }
  }

  reel.querySelectorAll('.js-timer-sec').forEach((el) => {
    el.textContent = String(timerSec);
  });

  reel.querySelectorAll('[data-anim]').forEach((el) => {
    el.style.animation = `${el.dataset.anim} ${loopS} linear infinite`;
  });

  const ring = reel.querySelector('[data-ring]');
  if (ring) ring.style.animation = `r_ring ${loopS} linear infinite`;
})();
