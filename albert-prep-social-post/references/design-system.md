# Albert Prep — Design System Reference

This file contains the shared CSS and design rules that apply to **all** Albert Prep social posts. Copy the CSS block verbatim into every HTML file you generate.

---

## Color Palette

```
--navy:      #212449   /* Primary backgrounds (dark slides), body text on paper */
--paper:     #faf6ee   /* Primary backgrounds (light slides), text on dark */
--red-pen:   #e7545b   /* Margin rule, corrections, strikethrough answers, CTA accent */
--blue-pen:  #2f6fb7   /* Italic emphasis in headings, technique labels */
--sky:       #71c0f3   /* Highlights, pill tags, swipe indicators */
--good:      #2e9e83   /* ✓ checkmarks, correct answer accents */
--gold:      #d9a13b   /* Score stars, premium accent */
--chalk:     #131a17   /* Chalkboard backgrounds (rare) */
```

## Typography

Load these fonts from Google Fonts in every HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Style |
|------|------|--------|-------|
| Display / headings | Fraunces | 700 | Normal |
| Italic emphasis in headings | Fraunces | 300 | Italic |
| Numbers, labels, counters | Spline Sans Mono | 600 | Normal |
| Body text, captions | system-ui, -apple-system, sans-serif | 400 | Normal |

**Key rule:** Fraunces headings often pair a bold word with a light italic word. Example: "**Calcul** *du jour*" — "Calcul" is Fraunces 700, "du jour" is Fraunces 300 italic.

---

## Shared CSS Block

Include this in every post's `<style>` tag:

```css
/* ─── Reset ─────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ─── Color tokens ───────────────────────────────────── */
:root {
  --navy:     #212449;
  --paper:    #faf6ee;
  --red-pen:  #e7545b;
  --blue-pen: #2f6fb7;
  --sky:      #71c0f3;
  --good:     #2e9e83;
  --gold:     #d9a13b;
  --chalk:    #131a17;
}

/* ─── Séyès grid background (paper slides) ──────────── */
.bg-paper {
  background-color: var(--paper);
  background-image:
    /* Vertical margin rule — red, 80px from left */
    linear-gradient(to right, transparent 78px, var(--red-pen) 78px, var(--red-pen) 80px, transparent 80px),
    /* Horizontal rules — light blue, every 32px */
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 30px,
      rgba(33, 36, 73, 0.10) 30px,
      rgba(33, 36, 73, 0.10) 32px
    );
}

/* ─── Navy background (dark slides) ─────────────────── */
.bg-navy {
  background-color: var(--navy);
}

/* ─── Slide container ────────────────────────────────── */
.slide {
  position: relative;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--navy);
}

/* Portrait (feed) 1080 × 1350 — rendered at 50% = 540 × 675 */
.slide-portrait {
  width: 540px;
  height: 675px;
}

/* Vertical (reels/stories) 1080 × 1920 — rendered at 50% = 540 × 960 */
.slide-vertical {
  width: 540px;
  height: 960px;
}

/* ─── Number hero ────────────────────────────────────── */
.number-hero {
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  color: var(--navy);
  line-height: 1;
}
.number-hero.on-navy { color: var(--paper); }

/* ─── Fraunces display heading ───────────────────────── */
.display {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  line-height: 1.1;
}
.display em {
  font-weight: 300;
  font-style: italic;
  color: var(--blue-pen);
}
.display.on-navy { color: var(--paper); }
.display.on-navy em { color: var(--sky); }

/* ─── Correction gesture ─────────────────────────────── */
.correction {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.correction .wrong {
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  color: var(--navy);
  text-decoration: line-through;
  text-decoration-color: var(--red-pen);
  text-decoration-thickness: 3px;
  opacity: 0.5;
}
.correction .right {
  font-family: 'Fraunces', serif;
  font-weight: 300;
  font-style: italic;
  color: var(--red-pen);
}
.correction .check {
  font-size: 1.4em;
  color: var(--good);
}

/* ─── Ink-block button (hard shadow) ────────────────── */
.btn-ink {
  display: inline-block;
  background: var(--navy);
  color: var(--paper);
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 10px 24px;
  border: none;
  box-shadow: 4px 4px 0 var(--red-pen);
  cursor: default;
}
.btn-ink.on-navy {
  background: var(--paper);
  color: var(--navy);
  box-shadow: 4px 4px 0 var(--sky);
}

/* ─── Pill tag ───────────────────────────────────────── */
.pill {
  display: inline-block;
  background: var(--sky);
  color: var(--navy);
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 0;
}

/* ─── Slide counter ──────────────────────────────────── */
.slide-counter {
  font-family: 'Spline Sans Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  color: var(--navy);
  opacity: 0.4;
  letter-spacing: 0.1em;
}
.slide-counter.on-navy { color: var(--paper); }

/* ─── Post number badge ──────────────────────────────── */
.post-number {
  font-family: 'Spline Sans Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  opacity: 0.45;
}
```

---

## Visual Signatures

### 1. Séyès grid
The `.bg-paper` class renders the authentic French notebook grid: faint horizontal rules every 32px with a red vertical margin at 80px from the left. This is the single most important brand signal — every "paper" slide must use it.

### 2. Italic blue emphasis
In Fraunces headings, secondary words are wrapped in `<em>` and rendered in light italic blue-pen color.

### 3. Correction gesture
When showing a worked example: wrong answer struck through in red → correct answer in Fraunces light italic red-pen → green ✓.

### 4. Numbers as heroes
Calculations are displayed at large scale using Spline Sans Mono 600. Minimum 80px for any hero calculation.

### 5. Hard-shadow ink button
CTAs use `.btn-ink`: square-cornered, 4px offset solid shadow in red-pen (on paper) or sky-blue (on navy).

---

## HTML scaffold

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Albert Prep — [Pillar Name] #[Number]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    /* paste the full shared CSS block here */
    body {
      background: #e8e4dc;
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    .slide-label {
      font-family: 'Spline Sans Mono', monospace;
      font-size: 11px;
      color: #888;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: -24px;
      align-self: flex-start;
    }
  </style>
</head>
<body>
  <!-- slides go here, each preceded by a .slide-label -->
</body>
</html>
```
