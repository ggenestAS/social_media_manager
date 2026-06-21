# Pilier 1 — Calcul du jour

**Format:** 1080 × 1350 px portrait (render at 540 × 675)  
**Slides:** 1 (single image)  
**File name tag:** `standalone`

---

## Concept

A single bold image posing one mental calculation. The reader does it in their head and posts the answer in comments. The number is the star — everything else steps back.

Alternate between paper and navy backgrounds for variety. Default: **paper** background.

---

## Slide structure

```
┌─────────────────────────────┐  540px wide
│  #047           ALBERT PREP │  ← top bar
│─────────────────────────────│
│                             │
│  Calcul du jour             │  ← Fraunces heading, "du jour" in italic blue
│                             │
│  47 × 11                    │  ← HERO CALC — Spline Sans Mono 600, ~100px
│                             │
│  = ?                        │  ← red-pen color, 64px
│                             │
│  ─────────────              │
│  💬 Pose ta réponse         │
│     en commentaire          │
└─────────────────────────────┘
```

---

## Layout details

**Top bar:** Post number `#047` (left) + `ALBERT PREP` brand tag (right), both Spline Sans Mono 600, 40% opacity.

**Hero calculation:** Center-aligned, Spline Sans Mono 600. Size: 96–104px for short expressions. Left padding of 100px clears the red margin rule.

**"= ?" line:** Spline Sans Mono 600, 64px, `var(--red-pen)` color.

**Caption prompt:** "💬 Pose ta réponse en commentaire" — body text, 65% opacity.

---

## Complete HTML example

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Albert Prep — Calcul du jour #047</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    /* [paste full shared CSS from design-system.md] */

    body {
      background: #dedad2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      gap: 12px;
    }
    .slide-label {
      font-family: 'Spline Sans Mono', monospace;
      font-size: 11px; color: #888;
      letter-spacing: 0.1em; text-transform: uppercase;
      align-self: flex-start;
    }
    .s1 {
      display: flex;
      flex-direction: column;
      padding: 28px 40px 32px 104px;
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-tag {
      font-family: 'Spline Sans Mono', monospace;
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--navy); opacity: 0.38;
    }
    .pillar-label { margin-top: 36px; margin-bottom: 40px; }
    .hero-calc {
      font-family: 'Spline Sans Mono', monospace;
      font-weight: 600; font-size: 100px;
      line-height: 1; color: var(--navy); letter-spacing: -0.025em;
    }
    .hero-result {
      font-family: 'Spline Sans Mono', monospace;
      font-weight: 600; font-size: 64px;
      line-height: 1; color: var(--red-pen);
      margin-top: 28px; letter-spacing: -0.02em;
    }
    .separator {
      width: 100%; max-width: 320px; height: 1px;
      background: var(--navy); opacity: 0.14;
      margin: 40px 0 20px;
    }
    .prompt {
      font-size: 15px; color: var(--navy); opacity: 0.60; line-height: 1.4;
    }
  </style>
</head>
<body>
  <p class="slide-label">Pilier 1 — Portrait 1080×1350 (50%)</p>
  <div class="slide slide-portrait bg-paper s1">
    <div class="top-bar">
      <span class="post-number">#047</span>
      <span class="brand-tag">Albert Prep</span>
    </div>
    <div class="pillar-label">
      <div class="display" style="font-size: 26px;">
        Calcul <em>du jour</em>
      </div>
    </div>
    <div class="hero-calc">47 × 11</div>
    <div class="hero-result">= ?</div>
    <div class="separator"></div>
    <p class="prompt">💬 Pose ta réponse en commentaire</p>
  </div>
</body>
</html>
```

---

## Customization notes

- **Navy background:** add `bg-navy` class, set text colors to `var(--paper)`, keep `--red-pen` for "= ?"
- **Long calculations (> 8 chars):** reduce to 72–80px or break into two lines
- **Answer reveal variant:** use `.correction` block — show wrong answer struck through, then correct in red italic
