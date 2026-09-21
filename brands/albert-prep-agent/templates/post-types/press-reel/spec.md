# Press reel

**Format:** **9:16** — 1080 × 1920 px · 1 animated board per copy variant ·
~13 s authored loop.
**Export:** `npm run html:to-mp4 -- source.html --out export/`
(the board declares `data-speed="1"`; do not pass `--speed`).

## Concept

A newspaper wipes down and a real headline about AI and students types itself
in, word by word. An ink panel slams up from the bottom: two words that
*agree* ("They’re right."). They shrink into a kicker; Albert's hero line
builds word by word and its last words turn accent blue, cursor blinking.
The button pops, wordmark and trust line settle, fade to black.

## Safe zone

The reel is a Reels/Stories/TikTok placement: the top 250 px, bottom 480 px
and right 160 px are covered by platform UI. The paper starts its text at
y = 290 and keeps the headline above y = 1360 while it is full-height, the
ink panel rises to y = 800 and pads 504 px at the bottom, all text ends at
x ≤ 910 (the camera zoom scales edges outward by up to 5 %). Type is scaled to fit (hero × 0.86, right line × 0.85,
compressed headline × 0.82). Check any frame with the safe-zones toggle in
`npm run browse` (see `design-system.md` § 9:16 safe zone).

## Timeline (authored seconds, from `scenes` = [Headline, Right, Turn, CTA])

| Scene | Default | What happens |
|---|---|---|
| Headline | 3.8 s | paper wipe 0.1→0.8 · masthead pops 0.45 · date 0.7 · headline words from 0.95, stagger 0.12 |
| Right | 2.2 s | panel rises to y = 800 in 0.55 s · headline compresses to 0.82 × `headSizeSmall` · `right` pops at +0.45 |
| Turn | 3.8–4.0 s | `right` shrinks to a 28px uppercase kicker over 0.7 s · `kicker` enters at +0.5 · hero words from +0.9, stagger 0.14 · accent words from +2.8 · cursor blinks from +2.5 |
| CTA | 3.2 s | hero lifts 40px · button pops at +0.15 · footer enters at +0.55 · fade to black over the last 0.4 s |

`reel-timeline.js` derives every keyframe from `scenes`, writes
`data-loop-ms`, `data-cta-ms` (CTA + 1.6 s hold frame) and `data-cover-ms`
(the full headline, 0.2 s before the panel) so `html-to-mp4` needs no flags.

## Config (JSON in `<script type="application/json" class="reel-config">`)

```json
{ "scenes":[3.8,2.2,4,3.2], "mast":"Le Monde", "mastSpacing":"0.04em",
  "date":"18 septembre 2026", "headline":"…", "headSize":92, "headSizeSmall":64,
  "right":"L’IA fait les maths.", "rightSize":150, "kicker":"Toi, tu passes le bac.",
  "hero":"Le jour J, tu es le seul modèle dans la salle.", "heroSize":96, "accentFrom":5,
  "cta":"Construire mon plan", "foot":"Gratuit · accès anticipé · sans carte", "accent":"#9ec0ea" }
```

`accentFrom` = index of the first hero word that turns blue. Size the
headline so it fits the paper at `headSize` in ≤ 4 lines and at
`headSizeSmall` in ≤ 3.

## Content needed

Verified headline (masthead, date, exact wording, link), `right` (≤ 4 words,
agrees), `kicker` (≤ 8 words), `hero` (≤ 10 words, the turn), language.

## Caption formula

Quote the headline with credit, one line that agrees, one that turns, product
line, trust line, "Link in bio." Sound: none authored — silent or a low
ambient bed; do not add ticks.
