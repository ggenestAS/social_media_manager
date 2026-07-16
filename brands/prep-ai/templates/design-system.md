# Prep Albert — Design System Reference

> Copied verbatim into every rendered artboard. Tokens and components are
> lifted from the live product (`platform/apps/web/src/styles/app.css` in the
> albert_prep_v2 repo) so ads are pixel-cousins of the site. Dark is the
> brand default; a light variant exists but ads ship dark unless a test says
> otherwise.

## Color palette

```
--paper:           #050505;   /* page background */
--paper-raised:    #0e0e0e;   /* cards, user bubbles */
--ink:             #fafafa;   /* primary text, accent buttons */
--ink-soft:        #a3a3a3;   /* body text */
--ink-faint:       #6b6b6b;   /* labels, hints */
--rule:            #222222;   /* hairlines, borders */
--composer:        #262626;   /* composer bar surface */
--composer-border: #424242;   /* composer border */
```

## Typography

Load Inter in every artboard head:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / headlines | Inter | 800 | letter-spacing −0.045em, line-height 0.98 |
| The greeting (one serif moment) | Iowan Old Style, Palatino, Georgia, serif | 400 | only for Prep's opening line |
| Body / bubbles | Inter | 400 | ink-soft for body, ink for bubbles |
| Eyebrow labels | Inter | 600 | 0.14em tracking, uppercase, ink-faint |

## Shared CSS block

```css
:root {
  --paper:#050505; --paper-raised:#0e0e0e; --ink:#fafafa; --ink-soft:#a3a3a3;
  --ink-faint:#6b6b6b; --rule:#222222; --composer:#262626; --composer-border:#424242;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#333; font-family:'Inter',sans-serif; }
.screen { background:var(--paper); color:var(--ink);
  position:relative; overflow:hidden; display:flex; flex-direction:column; }
.display { font-weight:800; letter-spacing:-0.045em; line-height:0.98; }
.greeting { font-family:'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif;
  font-weight:400; letter-spacing:-0.015em; line-height:1.05; }
.eyebrow { font-size:28px; font-weight:600; letter-spacing:0.14em;
  text-transform:uppercase; color:var(--ink-faint); }

/* Chat components — the brand signature */
.avatar { width:88px; height:88px; border-radius:50%;
  border:2px solid var(--rule); background:var(--paper-raised);
  display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.agent-msg { display:flex; align-items:flex-start; gap:28px; }
.agent-msg .txt { font-size:52px; line-height:1.3; color:var(--ink); padding-top:10px; }
.user-msg { display:flex; justify-content:flex-end; }
.user-msg .bubble { background:var(--paper-raised); border:2px solid var(--rule);
  border-radius:36px 36px 12px 36px; padding:28px 44px;
  font-size:48px; color:var(--ink); max-width:80%; }
.composer { background:var(--composer); border:2px solid var(--composer-border);
  border-radius:52px; box-shadow:0 24px 80px -24px rgba(0,0,0,0.7);
  display:flex; align-items:center; gap:24px; padding:20px 24px 20px 44px; }
.composer .ph { flex:1; font-size:44px; color:var(--ink-faint); }
.composer .send { width:88px; height:88px; border-radius:50%;
  background:var(--ink); color:var(--paper); display:flex; align-items:center;
  justify-content:center; font-size:44px; font-weight:600; }
.wordmark { font-weight:800; letter-spacing:-0.045em; }
.wordmark .albert { color:var(--ink-faint); }
```

## The mascot (inline SVG, use verbatim)

Round-faced graduate — always dark-faced, white eyes. Scale via width/height.

```html
<svg viewBox="0 0 96 96" width="72" height="72" aria-hidden="true">
  <rect x="22" y="34" width="52" height="50" rx="25" fill="#1a1a1a" stroke="#2e2e2e" stroke-width="2"/>
  <path d="M48 8 86 25 48 42 10 25Z" fill="#0d0d0d" stroke="#2e2e2e" stroke-width="2" stroke-linejoin="round"/>
  <path d="M48 42v6" stroke="#2e2e2e" stroke-width="2"/>
  <path d="M74 30v16" stroke="#6b6b6b" stroke-width="2" stroke-linecap="round"/>
  <circle cx="74" cy="49" r="3" fill="#fafafa"/>
  <ellipse cx="38" cy="62" rx="8" ry="9.5" fill="#fafafa"/>
  <ellipse cx="58" cy="62" rx="8" ry="9.5" fill="#fafafa"/>
  <circle cx="40" cy="60" r="3.8" fill="#050505"/>
  <circle cx="60" cy="60" r="3.8" fill="#050505"/>
</svg>
```

Note: on the site the mascot's face is dark in BOTH themes (like the favicon);
on dark artboards it reads as a silhouette with bright eyes — that's correct.

## Visual signatures (non-negotiable)

1. **The chat is the frame** — agent bubble + user bubble + composer; an ad
   is a conversation, not a poster.
2. **Strict monochrome** — no color anywhere, contrast does the work.
3. **The mascot's eyes** — white eyes on the dark face are the only "bright
   spot"; keep them visible.
4. **One serif moment max** — the greeting line only.
5. **The trust line** — « Gratuit · sans carte bancaire · 2 minutes » in
   ink-faint, small, near the CTA.

## Artboards & rendering conventions

Same conventions as the repo's tools expect: one `div.screen` per artboard
with `data-screen-label` and explicit inline `width/height`:

```html
<div data-screen-label="feed 4:5" class="screen" style="width:1080px;height:1350px;">…</div>
<div data-screen-label="story 9:16" class="screen" style="width:1080px;height:1920px;">…</div>
```

Render: `npm run html:to-image -- <source.html> --all --out <dir>`.
