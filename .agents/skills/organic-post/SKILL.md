---
name: organic-post
description: Generate an organic social media post as a polished, self-contained HTML file for the active brand. Brand-agnostic — all visual identity, post types, palette, and copy rules live in the brand folder under brands/<brand>/templates/. Use this skill whenever the user asks to create any social media post, Instagram post, carousel, reel mockup, or organic content. Trigger even if the user phrases it casually ("make a post", "génère un carrousel", "fais un reel") or just names a post type. This is the only way to create organic social content — always invoke it, then read the active brand's templates for the specifics.
---

You generate an organic social media post for the **active brand**. The output is
a complete, self-contained HTML file that renders the post at its exact social
dimensions, plus a `post.md` metadata/caption file.

This skill knows the *process*. It knows nothing about any specific brand's
identity, palette, post types, or language — all of that lives in the brand
folder and is read at runtime. Never hardcode brand details here.

## Workflow

### 1. Resolve the active brand

Brands live in `brands/<brand>/`. To pick the active one:

- If the user named a brand, use it.
- Else if exactly one real brand folder exists (ignore `_template` and any
  `.`/`_`-prefixed folder), use it.
- Else ask which brand.

Read these orientation files first:
- `brands/<brand>/README.md` — what's where for this brand.
- `brands/<brand>/brand.md` — mission, tone, voice, language.
- `brands/<brand>/templates/design-system.md` — palette, fonts, shared CSS,
  visual signatures. Its CSS goes verbatim into every post.

### 2. Determine the post type

The brand's post types ARE the directory listing of
`brands/<brand>/templates/post-types/`. Enumerate that folder — each subfolder
is one post type (e.g. `calcul-du-jour/`, `astuce/`, `serie/`, `reel/`).

- If the user named a type (or described the content), match it to a folder.
- If none given, pick the brand's default (the simplest single-slide type) or ask.

Each post-type folder contains:
- `spec.md` — format, slide count, dimensions, content rules, caption formula.
- `template.html` — a proven, ready-to-copy starting skeleton for this type.

Read both before writing any code.

### 3. Get the content

If the user hasn't provided the concrete content (the calculation, technique,
topic…), ask for it now. Don't invent facts — anything factual (e.g. math) must
be real and correct. Follow the `spec.md` for exactly what content each slide
needs.

### 4. Build the HTML

Start from the post type's `template.html`, apply the `design-system.md` CSS
verbatim, and fill in the content per `spec.md`. Keep it self-contained (no
external assets beyond fonts the design system loads).

### 5. Save the post bundle

Save to:

```
brands/<brand>/output/organic/posts/<date>-<type>-<nnn>/
├── source.html   # the renderable
├── post.md       # YAML frontmatter + caption body (see below)
└── export/       # PNG/MP4 produced later by the tools (gitignored)
```

- `<date>` = the planned publish date (`YYYY-MM-DD`), or today if none.
- `<type>` = the post-type folder name.
- `<nnn>` = the post number (zero-padded), if the brand uses numbering.

`post.md` frontmatter (state lives here, never in the folder name):

```yaml
---
type: <post-type>            # matches a templates/post-types/<name>
channels: [ig, fb]           # aliases from brands/<brand>/channels.json
schedule: 2026-06-22T09:00    # local time, or null
status: draft                # draft | scheduled | published
postiz_id: null              # filled after publishing
---
Caption text in the brand's voice…
```

### 6. Present the file

Present `source.html` with the file-sharing tool. State which brand + post type
was created and how many slides it contains.

## Quality checks

Before saving, verify against the brand's design system and the type's spec:
- Any factual content (math, claims) is correct.
- All fonts required by `design-system.md` are loaded in `<head>`.
- The HTML is self-contained.
- Each slide renders at exactly the dimensions in `spec.md`.
- Colors match the brand palette exactly (no approximations).
- Copy is in the brand's language and tone (per `brand.md`).

## Exporting

Render the bundle to PNG/MP4 with the generic tools, writing into the bundle's
`export/`:

```bash
npm run html:to-image -- brands/<brand>/output/organic/posts/<slug>/source.html \
  --width 1080 --height 1350 --out brands/<brand>/output/organic/posts/<slug>/export
npm run html:to-mp4   -- brands/<brand>/output/organic/posts/<slug>/source.html \
  --out brands/<brand>/output/organic/posts/<slug>/export
```
