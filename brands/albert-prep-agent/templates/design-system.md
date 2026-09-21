# Albert Prep (exam agent) — Design System Reference

> Copied verbatim into every rendered artboard. Tokens are lifted from the
> Claude Design project "Hero background animation" (`Meta Ad Statics`,
> `Meta Reel 1–4`, `Prep Albert` landing) so ads, reels and organic posts are
> pixel-cousins of the site. Dark is the default; the light board is a
> deliberate contrast move, not a theme.

## Color palette

```
--ink:        #090a0b;   /* page / board background, the "black frame" */
--ink-2:      #111316;   /* raised surfaces (ad mock frame) */
--fog:        #e6e8ec;   /* primary text on ink; background of the light board */
--soft:       #a2a8b1;   /* body copy on ink */
--mute:       #8b919a;   /* eyebrows, trust line, labels on ink */
--paper:      #f4f2ec;   /* press clipping paper */
--paper-ink:  #111111;   /* text on paper */
--paper-mute: #666666;   /* dates / sources on paper */
--light-soft: #4d525a;   /* body copy on the light board */
--light-mute: #6b7078;   /* eyebrows / labels on the light board */
--accent:     hsl(210,60%,72%);  /* #9ec0ea — the typing cursor, plan bars, accent words */
--live:       hsl(150,60%,55%);  /* "Live" dot, ticks */
--hair:       rgba(255,255,255,0.12);  /* hairlines on ink */
--hair-soft:  rgba(255,255,255,0.08);
```

## Typography

System fonts only — nothing to load. Helvetica falls back to Arial (Liberation
Sans on Linux renderers, metric-compatible). Georgia is reserved for **press
clippings** (mastheads and quoted headlines): it signals "this is someone
else's newspaper", never our voice.

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / statements | Helvetica, Arial | 500 | letter-spacing −0.035em, line-height 0.98, `text-wrap:balance` |
| Body / sub-lines | Helvetica, Arial | 400 | `--soft` on ink, `--light-soft` on light |
| Eyebrow / trust line | Helvetica, Arial | 400 | 0.18em tracking, uppercase, `--mute` |
| Wordmark | Helvetica, Arial | **Albert** 600 · Prep 400 | 3×3 dot grid at left |
| Press masthead | Georgia, Times New Roman | 700 | 48px, 0.04em tracking (or the real logo) |
| Press headline | Georgia, Times New Roman | 700 | letter-spacing −0.025em, line-height 1.08 |
| Button | Helvetica, Arial | 600 | fog on ink / ink on fog |

## Shared CSS block

```css
:root {
  --ink:#090a0b; --ink-2:#111316; --fog:#e6e8ec; --soft:#a2a8b1; --mute:#8b919a;
  --paper:#f4f2ec; --paper-ink:#111111; --paper-mute:#666666;
  --light-soft:#4d525a; --light-mute:#6b7078;
  --accent:hsl(210,60%,72%); --live:hsl(150,60%,55%);
  --hair:rgba(255,255,255,0.12); --hair-soft:rgba(255,255,255,0.08);
  --font:Helvetica,Arial,sans-serif; --serif:Georgia,'Times New Roman',serif;
}
*, *::before, *::after { box-sizing:border-box; }
html, body { margin:0; }
body { background:#1a1c1f; font-family:var(--font); color:var(--fog);
  -webkit-font-smoothing:antialiased; display:flex; flex-wrap:wrap; gap:64px;
  padding:64px; align-items:flex-start; }
h1, h2, h3, p { margin:0; }

/* Artboards — one .board per [data-screen-label], explicit inline width/height */
.board { position:relative; overflow:hidden; flex:none; display:flex;
  flex-direction:column; justify-content:space-between; font-family:var(--font); }
.board--ink { background:var(--ink); color:var(--fog); }
.board--light { background:var(--fog); color:var(--ink); }
.board--feed { padding:96px; }                 /* 1080×1350 */
.board--story { padding:270px 160px 480px 96px; } /* 1080×1920 — 9:16 SAFE ZONE: top 250, bottom 480, right 160 (Reels/Stories/TikTok UI) */

/* Statement type */
.eyebrow { font-size:30px; letter-spacing:0.18em; text-transform:uppercase; color:var(--mute); }
.board--light .eyebrow { color:var(--light-mute); }
.display { font-weight:500; letter-spacing:-0.035em; line-height:0.98; text-wrap:balance; }
.board--feed .display { font-size:132px; max-width:10ch; }
.board--story .display { font-size:136px; max-width:10ch; }
.display .dim { color:var(--mute); }
.display--stack { display:flex; flex-direction:column; gap:0.1em; }
.sub { margin-top:56px; font-size:40px; line-height:1.35; color:var(--soft); max-width:24ch; text-wrap:pretty; }
.board--story .sub { margin-top:56px; font-size:40px; max-width:22ch; }
.board--light .sub { color:var(--light-soft); }
.cursor { display:inline-block; width:8px; height:0.85em; margin-left:0.06em;
  vertical-align:-0.08em; background:var(--accent); }

/* Footer: wordmark left, trust line right */
.foot { display:flex; justify-content:space-between; align-items:center; }
.wordmark { display:flex; align-items:center; gap:16px; font-size:32px; white-space:nowrap; }
.wordmark strong { font-weight:600; }
.dots { display:inline-grid; grid-template-columns:repeat(3,8px); gap:6px; }
.dots span { width:8px; height:8px; border-radius:50%; background:currentColor; }
.trust { font-size:28px; color:var(--mute); }
.board--light .trust { color:var(--light-mute); }

/* Buttons */
.btn { display:inline-flex; align-items:center; gap:18px; padding:24px 40px;
  border-radius:16px; background:var(--fog); color:var(--ink); font-size:34px; font-weight:600; }
.board--light .btn { background:var(--ink); color:var(--fog); }

/* Press split: paper (headline) on top, ink (Albert) below */
.split { padding:0; }
.split .paper { flex:1; background:var(--paper); color:var(--paper-ink); padding:88px 96px;
  display:flex; flex-direction:column; justify-content:space-between; }
.split .ink { flex:1; background:var(--ink); color:var(--fog); padding:88px 96px;
  display:flex; flex-direction:column; justify-content:space-between; }
.board--story.split .paper { padding:290px 160px 96px 96px; }
.board--story.split .ink { padding:80px 160px 480px 96px; }
.masthead { display:flex; justify-content:space-between; align-items:center; height:72px; }
.masthead .mast { font-family:var(--serif); font-weight:700; font-size:48px; letter-spacing:0.04em; }
.masthead img { height:64px; width:auto; }
.masthead .date { font-size:26px; color:var(--paper-mute); }
.headline { font-family:var(--serif); font-weight:700; font-size:66px;
  letter-spacing:-0.025em; line-height:1.08; text-wrap:balance; }
.board--story .headline { font-size:74px; }
.kicker { font-size:28px; letter-spacing:0.18em; text-transform:uppercase; color:var(--mute); line-height:1.3; }
.reply { margin-top:32px; font-size:82px; font-weight:500; letter-spacing:-0.035em; line-height:1.0; text-wrap:balance; }
.board--story .reply { font-size:84px; }
.why { margin-top:32px; font-size:34px; line-height:1.4; color:var(--soft); max-width:28ch; }

/* Carousel: clipping stack + plan card */
.clips { display:flex; flex-direction:column; gap:20px; transform:rotate(-2deg); margin:-20px -40px 0; }
.clip { background:var(--paper); color:var(--paper-ink); padding:28px 34px; border-radius:6px; }
.clip .src { font-size:20px; letter-spacing:0.1em; text-transform:uppercase; color:var(--paper-mute);
  display:flex; justify-content:space-between; }
.clip p { margin-top:10px; font-size:38px; font-weight:600; letter-spacing:-0.02em; line-height:1.1; font-family:var(--serif); }
.card-h1 { font-size:124px; font-weight:500; letter-spacing:-0.035em; line-height:0.98; max-width:11ch; text-wrap:balance; }
.card-h2 { font-size:88px; font-weight:500; letter-spacing:-0.035em; line-height:1.0; max-width:14ch; text-wrap:balance; }
.card-h3 { font-size:96px; font-weight:500; letter-spacing:-0.035em; line-height:1.0; text-wrap:balance; }
.card-hook { font-size:120px; font-weight:500; letter-spacing:-0.035em; line-height:0.98; }
.card-sub { margin-top:40px; font-size:34px; line-height:1.4; color:var(--soft); max-width:30ch; text-wrap:pretty; }
.card-sub--big { margin-top:56px; font-size:40px; line-height:1.35; max-width:24ch; }
.count { font-size:28px; color:var(--mute); white-space:nowrap; }
.board--light .count { color:var(--light-mute); }
.plan { padding:44px; border:1px solid var(--hair); border-radius:28px;
  background:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)); }
.plan .label { display:flex; justify-content:space-between; font-size:22px; letter-spacing:0.14em;
  text-transform:uppercase; color:var(--mute); }
.plan .live { display:inline-flex; align-items:center; gap:8px; }
.plan .live::before { content:''; width:10px; height:10px; border-radius:50%; background:var(--live); }
.plan .title { margin-top:24px; font-size:52px; font-weight:500; letter-spacing:-0.03em; line-height:1.05; }
.plan .meta { margin-top:12px; font-size:26px; color:var(--soft); }
.plan .weeks { margin-top:32px; display:grid; grid-template-columns:repeat(9,1fr); gap:6px; }
.plan .weeks span { height:10px; border-radius:5px; background:rgba(255,255,255,0.18); }
.plan .weeks span.done { background:var(--accent); }
.plan .weeks span.next { background:rgba(255,255,255,0.35); }
.plan .phases { margin-top:28px; display:grid; grid-template-columns:repeat(4,1fr); gap:16px; font-size:24px; }
.plan .phases span { display:flex; flex-direction:column; gap:6px; }
.plan .phases span > span:first-child { color:var(--mute); }

/* Press reel (9:16, animated — see post-types/press-reel) */
.reel { width:1080px; height:1920px; background:var(--ink); color:var(--fog); }
.reel .zoom { position:absolute; inset:0; transform-origin:50% 45%; }
.reel .paper { position:absolute; left:0; top:0; width:1080px; height:1920px; background:var(--paper);
  color:var(--paper-ink); padding:290px 185px 560px 96px; display:flex; flex-direction:column;
  justify-content:space-between; overflow:hidden; }
.reel .paper .headline { font-size:104px; line-height:1.06; }
.reel .panel { position:absolute; left:0; top:1920px; width:1080px; height:1120px; background:var(--ink);
  padding:72px 170px 504px 96px; display:flex; flex-direction:column; justify-content:space-between;
  box-shadow:0 -40px 120px rgba(0,0,0,0.6); }  /* rises to y=800; bottom padding clears the 480px caption layer */
/* .reel .paper padding-bottom is animated by reel-timeline.js (560px → 80px as the panel rises) so the headline
   never sits in the caption band; the extra top/right paper margin absorbs the 5% camera zoom. */
.reel .right-line { display:flex; flex-wrap:wrap; align-items:baseline; gap:0 0.3em; font-weight:500;
  line-height:1.15; min-height:32px; letter-spacing:-0.035em; color:var(--fog); }
.reel .right-line > span { display:inline-block; }
.reel .hero { margin-top:44px; font-size:86px; font-weight:500; letter-spacing:-0.035em; line-height:1.0; }
.reel .word { display:inline-block; margin-right:0.24em; white-space:pre; }
.reel .hero .cursor { width:8px; height:0.82em; vertical-align:-0.08em; opacity:0; }
.reel .cta-wrap { transform-origin:left center; }
.reel .btn { padding:20px 36px; border-radius:16px; font-size:32px; }
.reel .btn .arrow { font-size:42px; line-height:1; }
.reel .seam { position:absolute; inset:0; background:var(--ink); pointer-events:none; }
```

## The wordmark (use verbatim)

```html
<div class="wordmark"><span class="dots"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span><span><strong>Albert</strong> Prep</span></div>
```

Dots inherit `currentColor`: fog on ink boards, ink on light boards. A standalone
SVG lives in [`../assets/wordmark.svg`](../assets/wordmark.svg).

## Visual signatures (non-negotiable)

1. **The black frame, one sentence.** Statements are typographic; no product
   UI, no photos, no illustration. The stillness is the point on a loud feed.
2. **The typing cursor.** An accent-blue block after the last word of a
   statement (`.cursor`) — lifted from the site's hero. Use once per board.
3. **Paper vs ink.** Press clippings sit on `--paper` in Georgia; Albert
   always answers on `--ink` in Helvetica. The material contrast *is* the
   argument ("they say / we do").
4. **The wordmark + trust line footer.** Every board ends with the dot-grid
   wordmark bottom-left and the trust line bottom-right
   (« Gratuit · accès anticipé · sans carte » / "Free · early access · no card").
5. **The plan card.** Where the product appears it is the plan card: label +
   Live dot, "Your exam is in 9 weeks.", 9 week-bars (3 accent, 4 mid, 2 faint),
   four phases. Nothing else from the UI.
6. **Accent is scarce.** Cursor, plan bars, the last words of a reel hero line.
   Never backgrounds, never buttons.

## 9:16 safe zone (Reels · Stories · TikTok)

Vertical placements overlay their own UI on the video: the account row and
sound on top, the caption, CTA bar and progress on the bottom, the
like/comment/share column on the right (TikTok). Everything that must be read
stays inside the safe zone; the background may fill the frame.

| Edge | Covered | Rule |
|---|---|---|
| Top | 250 px | first text line at y ≥ 270 |
| Bottom | 480 px | last text line at y ≤ 1440 (footer, CTA, trust line) |
| Right | 160 px | text and right-aligned elements end at x ≤ 920 |
| Left | — | 96 px page margin |

Encoded in `.board--story`, `.board--story.split .paper/.ink`, `.reel .paper`
and `.reel .panel` above. The reel needs two extras the static boards don't:
its camera zoom (×1.05 in the headline scene) scales content outward from the
centre, so the paper margins are 290 / 185 instead of 270 / 160; and while the
paper is full-height its bottom padding is 560 so the headline builds above
the caption band, shrinking to 80 as the panel rises. The brand browser (`npm run browse`) has a **safe
zones** toggle on every 9:16 preview that draws the covered bands in red;
check any frame against it before exporting. Feed 4:5 and carousel boards
have no overlay and keep their 96 px frame.

## Artboards & rendering conventions

One `.board` per artboard with `data-screen-label` and explicit inline
`width/height` so the repo's tools discover and isolate it:

```html
<div data-screen-label="Statement · 4:5"  class="board board--ink board--feed"  style="width:1080px;height:1350px">…</div>
<div data-screen-label="Statement · 9:16" class="board board--ink board--story" style="width:1080px;height:1920px">…</div>  <!-- padding = the 9:16 safe zone -->
```

Render: `npm run html:to-image -- <source.html> --all --out <dir>/export`.
Reels: `npm run html:to-mp4 -- <source.html> --out <dir>/export` (the reel
declares `data-speed="1"` — its pacing is authored, don't time-stretch it).

## HTML scaffold

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Albert Prep — <asset></title>
<style>
/* paste the Shared CSS block verbatim */
</style>
</head>
<body>
<!-- .board artboards -->
</body>
</html>
```
