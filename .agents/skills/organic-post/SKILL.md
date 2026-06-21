---
name: albert-prep-social-post
description: Generate Albert Prep organic social media posts as polished, self-contained HTML files. The visual identity is "Le Cahier" — a French exercise book. Use this skill whenever the user asks to create any social media post, Instagram post, carousel, reel mockup, or organic content for Albert Prep. Trigger even if the user says "make a post", "create a pillar 2", "génère un carrousel", "je veux un calcul du jour", "fais un reel", or just names a pillar number. This skill is the only way to create Albert Prep social content — always invoke it for any Albert Prep post request, no matter how casually phrased.
---

You are generating an organic social media post for **Albert Prep**, a mental calculation training app. The output is a complete, self-contained HTML file that renders the post at its exact social media dimensions.

Albert Prep's visual identity is **"Le Cahier"** — a French exercise book come to life. Every post feels like a page from a rigorous, beautiful school notebook: séyès-ruled paper, red margin line, numbers as protagonists, corrections in red pen.

## Workflow

### 1. Determine the pillar

If the user specified a pillar (1–4, by name in French or English, or by describing the content type), use it. If no pillar is specified and no content hint is given, default to Pilier 1.

| # | Name | Format | Slides | File type tag |
|---|------|--------|--------|---------------|
| 1 | `calcul_du_jour` | 1080×1350 portrait | 1 | `standalone` |
| 2 | `astuce` | 1080×1350 portrait | 4 | `carrousel` |
| 3 | `serie` | 1080×1350 portrait | 6 | `carrousel` |
| 4 | `reel` | 1080×1920 vertical | 1 (animated) | `reel` |

### 2. Get the content

If the user hasn't provided the specific calculation or topic, ask for it now. Don't proceed without it — the math must be real and correct.

Content needed per pillar:
- **Pilier 1**: One mental calculation with its answer (e.g., "47 × 11 = 517")
- **Pilier 2**: One technique name + a worked example (e.g., "Multiplier par 11 — 36 × 11 = 396")
- **Pilier 3**: Four calculations of the same family, with answers (e.g., 4×25=100, 8×25=200, 16×25=400, 32×25=800)
- **Pilier 4**: One quick calculation with answer (e.g., "17 × 3 = 51")

The post number (#001–#999) is optional — if not given, pick something plausible (e.g., #047 for variety).

### 3. Build the HTML

Read the reference file for the chosen pillar before writing any code. These files contain the exact HTML template structure, slide-by-slide content rules, and design notes specific to that pillar.

| Pillar | Reference file |
|--------|----------------|
| Pilier 1 | `references/pillar-1-calcul.md` |
| Pilier 2 | `references/pillar-2-astuce.md` |
| Pilier 3 | `references/pillar-3-serie.md` |
| Pilier 4 | `references/pillar-4-reel.md` |

Also read `references/design-system.md` for the shared CSS (colors, fonts, grid, visual signatures) — include this CSS verbatim in every post's `<style>` block.

### 4. Save the file

Save the output HTML to `content/organic/posts/` in this repo.

**Naming convention:** `{format}_{pillar}_{type}.html`

Examples:
- `portrait_calcul_du_jour_standalone.html`
- `portrait_astuce_carrousel.html`
- `portrait_serie_carrousel.html`
- `vertical_reel_reel.html`

For numbered series posts, append the number: `portrait_calcul_du_jour_standalone_047.html`

### 5. Present the file

Present the file using the file-sharing tool. Tell the user which pillar was created and how many slides it contains.

## Quality checks

Before saving, verify:
- The math is correct
- All Google Fonts are loaded in `<head>`
- The HTML is self-contained (no external assets other than Google Fonts)
- Each slide renders at exactly the right pixel dimensions
- Colors match the Albert Prep palette exactly (no approximations)
- Text is in French (captions, CTAs, labels)
