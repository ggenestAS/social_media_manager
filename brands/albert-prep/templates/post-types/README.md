# Albert Prep — post types

Each subfolder is one organic post type. The **directory listing is the menu**
the organic-post skill reads.

## Format matrix

| Post type | Slides | Aspect | Size | Channel | Export |
|---|---|---|---|---|---|
| `calcul-du-jour` | 1 | **4:5** feed | 1080×1350 | IG + FB feed | `html:to-image --all` |
| `astuce` | 4 | **4:5** feed carousel | 1080×1350 | IG feed | `html:to-image --all` |
| `serie` | 6 | **4:5** feed carousel | 1080×1350 | IG feed | `html:to-image --all` |
| `reel` | 1 (animated) | **9:16** | 1080×1920 | IG Reels (+ Story optional) | `html:to-mp4` |

**Do not use 1:1 or 9:16 for organic feed carousels.** The `reel` type is
9:16 video for Reels; the same export can be cross-posted as an IG Story — see
[`reel/spec.md`](reel/spec.md). Paid static 9:16 assets live under
`output/paid/campaigns/`.

## HTML conventions (all feed types)

Every slide is one export-native artboard:

```html
<div data-screen-label="Type NN/MM 4:5"
     class="screen bg-paper"
     style="width:1080px;height:1350px;">
  <div class="inner">…</div>
</div>
```

- **`data-screen-label`** — required; used by `html:to-image --all` for filenames.
- **Dimensions** — always `1080×1350` inline on the screen element (not half-scale).
- **Padding** — `.inner` uses `padding: 56px 72px 64px 208px` on paper (clears séyès margin); navy slides use `.inner-navy` with less left padding.
- **Handle** — `@albert.prep` (from `channels.json`; see `content-guide.md`).

Export:

```bash
npm run html:to-image -- path/to/source.html --all --out path/to/export/
```

## Slide-count rationale

| Type | Count | Why |
|---|---|---|
| **astuce** | 4 | Hook → method → worked example → save/follow. Minimum viable teach arc. |
| **serie** | 6 | Intro → 4 rapid-fire questions → score + all answers. Batch reveal keeps swipe count ≤6 (IG engagement drops after ~7). |
| **calcul-du-jour** | 1 | One calc, one comment prompt. |
| **reel** | 1 screen | Animated loop (~8 s); not a carousel. |
