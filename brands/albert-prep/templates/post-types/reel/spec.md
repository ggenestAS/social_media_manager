# Pilier 4 — Reel chronométré

**Format:** **9:16** — 1080 × 1920 px (not 4:5, not 1:1)  
**Slides:** 1 animated screen (not a carousel)  
**Export:** `npm run html:to-mp4 -- source.html --out export/`

## Distribution

Same MP4 works for **IG Reels** (primary) and **IG Story** (optional cross-post).
No re-export — only the Postiz `post_type` changes.

| Placement | Postiz `--settings` | Notes |
|---|---|---|
| **Reels** (default) | `'{"post_type":"post"}'` | Permanent; discovery tab |
| **Story** (optional) | `'{"post_type":"story"}'` | 24 h; good for same-day boost |

Upload the exported MP4 once, then create one or two Postiz posts (Reels only, or
Reels + Story same day). Top padding in the template clears Instagram UI on both.

Record intended placements in `post.md` → `placements` (see organic-post skill).

---

## Concept

A looping vertical video: question appears (2 s) → countdown (**3, 5, 10, or 15 s**
— matched to the calc) → paper reveal + answer (3 s). Total loop =
`2 + timer_sec + 3` seconds (auto-computed by `reel-timeline.js`).

Set **`data-timer-sec`** on the `.reel` element (see template). Record the same
value in `post.md` → `timer_sec`.

---

## Timer calibration

Pick **`timer_sec`** from how long a Première/Terminale student needs *in their
head*, not how long the video should feel. Only four values are allowed:
**3 · 5 · 10 · 15**.

| `timer_sec` | Mental target | Typical calcs | Loop total |
|---|---|---|---|
| **3** | instant recall, one step | `17 × 3`, `7²`, `12 × 5` | 8 s |
| **5** | one clean step | `18 × 6`, `15 % de 80` | 10 s |
| **10** | named trick / 2-digit square | `19²`, `47 × 11` | 15 s |
| **15** | stretch but still head-doable | `23²`, `49 × 21` | 20 s |

When unsure, **round up** — an easy solve beats an impossible clock.

The on-slide label shows « N secondes »; the caption must use the same N
(« Tu as N secondes ⏱ »).

---

## Frame A — Question (navy, 2s)

```
│  REEL #005             (top, small, 40% opacity)
│
│
│  Fais-le               ← Fraunces 300 italic, --sky, 28px
│  de tête
│
│
│  17 × 3                ← HERO CALC, Spline Mono 600, ~110px
│
│  = ?                   ← --red-pen, 72px
│
│
│  ⏱ 3 secondes          ← bottom, Spline Mono, 60% opacity
```

---

## Frame B — Timer (navy, 3×1s)

Show 3 sub-frames side by side (180×320 each in HTML mockup):

```
 ┌──────┐  ┌──────┐  ┌──────┐
 │  3   │  │  2   │  │  1   │
 │      │  │      │  │      │
 └──────┘  └──────┘  └──────┘
  t=0s      t=1s      t=2s
  --paper   --gold    --red-pen
```

Numbers at ~280px, full width, centered on navy bg.

---

## Frame C — Answer reveal (paper, 3s)

```
│  17 × 3        ← question repeated, small (48px, 40% opacity)
│
│  ─────────────
│
│  51            ← ANSWER HERO, Spline Mono 600, ~180px, --navy
│
│  ✓             ← --good, 80px
│
│  @albert.prep  ← handle, bottom
│  Suis-nous ↑
```

---

## Production notes (comment in HTML)

```
Duration: 2s intro + timer_sec countdown + 3s reveal
timer_sec: 3 | 5 | 10 | 15  (data-timer-sec on .reel)
Export: npm run html:to-mp4 — loop-ms read from data-loop-ms automatically
Transitions: hard cut (no dissolve)
Sound: silence or single tick per beat
Export: 1080×1920, 30fps, MP4

## Cover / miniature (profile grid)

IG and TikTok pick a **video frame** for the profile grid. Frame 0 used to be
the intro fade → blank navy thumbnails.

On export, `html-to-mp4` now also writes:

| File | Use |
|---|---|
| `cover-<slug>.png` | Full 9:16 — manual cover upload in IG/TikTok app |
| `cover-<slug>-1x1.png` | Center crop — approximates IG profile grid |
| `preview-<slug>.png` | Same as cover (QA) |

The MP4 **prepends ~1 s** of the cover frame (`data-cover-ms`, default 2.5 s
into the loop) so auto-thumbnails show the question + ring even when Postiz
cannot attach a separate cover image.

Timeline: `data-cover-ms` is set by `reel-timeline.js` at `INTRO + 0.5 s`.
Paid ads use the same pattern in `reels/covers/` (static PNG paired with MP4).
```

## Caption formula

"Tu as [N] secondes ⏱\n\n[calculation] = ?\n\nRéponse en fin de vidéo 👆\n\n#calculmental #chronométré #albertprep"

(`[N]` must match `timer_sec` / `data-timer-sec`.)
