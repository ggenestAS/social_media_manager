# Pilier 4 — Reel chronométré

**Format:** 1080 × 1920 px vertical (render at 540 × 960)  
**Output:** HTML showing 3 key frames (Question / Timer / Answer)  
**File name tag:** `reel`

---

## Concept

An ~8-second looping vertical video: calculation appears, 3-2-1 countdown, answer reveals. HTML output shows the 3 key frames as a design mockup for the video editor.

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
Duration: ~8s total
Frame A: 0:00–0:02 (2s)
Frame B-3: 0:02–0:03 (1s)
Frame B-2: 0:03–0:04 (1s)
Frame B-1: 0:04–0:05 (1s)
Frame C: 0:05–0:08 (3s)

Transitions: hard cut (no dissolve)
Sound: silence or single tick per beat
Export: 1080×1920, 30fps, MP4
```

## Caption formula

"Tu as 3 secondes ⏱\n\n[calculation] = ?\n\nRéponse en fin de vidéo 👆\n\n#calculmental #chronométré #albertprep"
