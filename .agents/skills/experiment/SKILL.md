---
name: experiment
description: Design a content experiment for the active brand and produce shippable post drafts that deliberately break OUT of the brand's existing post-types while staying on-brand. Use whenever the user wants to experiment, try a new format, test a new angle/hook/modality, "break out of templates", or explore content ideas beyond the current post-type menu. This is the only skill that creates content outside templates/post-types/ — organic-post stays inside them; this skill leaves them on purpose.
---

You design **one experiment** for the active brand and produce **N post drafts**
that test it. The whole point is to escape the brand's existing post-types while
staying unmistakably on-brand (voice + visual identity). An experiment is a
hypothesis plus the posts that probe it — not "another post".

This skill knows the *process*. All brand identity, voice, and look live in the
brand folder and are read at runtime. Never hardcode brand specifics here.

## Inputs

- `brand` — the active brand (resolve as in organic-post §1).
- `--seed "<text>"` — optional angle/question/theme to bias the hypothesis toward.
- `--n <int>` — number of drafts (default 3).
- `--platform <tiktok|ig|fb>` — optional; bias the format to one platform's norms.

## Workflow

### 1. Resolve the active brand

Same rule as organic-post §1 (named brand → else the single real brand → else ask).

### 2. Read the brand DNA (what must stay constant)

- `brands/<brand>/LOG.md` (if present) — the decision log: prior experiment
  readouts and running tests. Don't relaunch a logged loser or duplicate a
  live experiment's slot/variable.
- `brands/<brand>/brand.md` — mission, audience, voice, language, CTA rules.
- `brands/<brand>/templates/content-guide.md` — what to say, hooks, hashtags, CTA.
- `brands/<brand>/templates/design-system.md` — palette, fonts, CSS. Used **verbatim**
  in any HTML you render, so experiments look on-brand even when the format is new.
- `brands/<brand>/context/*` — product/offer facts for accurate, non-generic copy.

### 3. Map the boundary (what you must break)

Enumerate `brands/<brand>/templates/post-types/` — **this is the boundary**.
For each existing type, note its structural signature so your deviation is
deliberate, not accidental: slide count, aspect/format, the *mechanic* (e.g.
"drill a calc", "4-slide teach arc"), the *voice move* (expert tutor), and the
*modality* (static carousel / animated reel).

A draft only qualifies as an experiment if it differs from **every** existing
type on at least one of the deviation axes below.

### 4. Form ONE hypothesis (the experiment)

Pick a single **deviation axis** and commit to it. The taxonomy:

| Axis | Existing default (typical) | Example deviation to test |
|---|---|---|
| **Modality** | static carousel / branded reel | talking-head, screen-record, raw phone-cam, meme, text-only |
| **POV / voice** | expert tutor authority | student confession, parent POV, "we got it wrong" |
| **Structure** | fixed slide arc | open loop, duet/stitch bait, single punchline, list-of-7 |
| **Hook style** | calc/stat hook | question hook, contrarian claim, story cold-open |
| **Content angle** | drill / method | emotion, social proof, behind-the-scenes, day-in-the-life |
| **Platform-native** | one asset cross-posted | TikTok-native cut vs IG-native cut of the same idea |

State the hypothesis in one sentence ("X will outperform the current format on
Y because Z"), grounded in the brand's audience and wedge — not a generic
growth platitude. The N drafts are variations that all execute this one
hypothesis (so the test is coherent), differing only in the sub-variable you're
probing (e.g. three different question-hooks).

### 5. Produce N shippable drafts

For each draft, decide if it's **renderable** (a CSS artboard the repo's
HTML→media tools can capture) or **capture-based** (needs real video/photo,
e.g. talking-head, day-in-the-life):

- **Renderable** → author `source.html` from scratch (no post-type template
  exists — that's the point), reusing `design-system.md` CSS **verbatim** so it's
  on-brand. Follow the brand's HTML conventions (artboard dimensions,
  `data-screen-label`) so `html:to-image`/`html:to-mp4` work unchanged.
- **Capture-based** → skip `source.html`; write a tight production/shot brief in
  `post.md` (script, shots, on-screen text, sound) so it can actually be filmed.

Every draft also gets a `post.md` with the caption in the brand's voice + the
experiment metadata (frontmatter below).

Brand guardrails (non-negotiable, even when breaking format):
- Brand language and tone per `brand.md`.
- Any factual/quantitative claim verified (recompute every number).
- Visuals derive from `design-system.md` — new layout, same design tokens.
- Respect the brand's handle/CTA rules; no sibling/parent brand references.

### 6. Write the experiment bundle

Self-contained and throwaway-friendly:

```
brands/<brand>/output/organic/experiments/EXP-YYYY-MM-DD-<slug>/
├── experiment.md          # hypothesis + rationale + deviation + draft index
└── drafts/
    ├── 01-<slug>/{source.html?, post.md}
    ├── 02-<slug>/{source.html?, post.md}
    └── 03-<slug>/{source.html?, post.md}
```

`experiment.md` structure (plain markdown, no schema):

```markdown
# EXP-YYYY-MM-DD-<slug>

**Hypothesis:** <one sentence: X beats current format on Y because Z>
**Deviation axis:** <modality | POV | structure | hook | angle | platform-native>
**Breaks from:** <which existing post-types, and on what>
**What "worked" would look like:** <the informal signal you'll watch — saves,
  sends, completion, comment quality, DMs — judged by eye, no formal stats>
**Platform(s):** <tiktok | ig | fb>

## Drafts
1. <slug> — <one-line concept> — <renderable | capture-based>
2. …
```

Each experimental `post.md` frontmatter (compatible with postiz-plan; uses an
`x-` prefix so it never collides with a real post-type):

```yaml
---
type: x-<slug>                 # experimental — intentionally NOT in post-types/
experiment: EXP-YYYY-MM-DD-<slug>
channels: [ig, tiktok]         # aliases from channels.json
schedule: null
status: draft
postiz_id: null
---
Caption in the brand's voice…
```

### 7. Present

Show `experiment.md` and each draft's `source.html` (or brief). State: the
hypothesis, which post-types it breaks and how, and how to ship the test.

## Shipping the test (reuse existing pipeline)

These drafts are normal bundles, just located under `experiments/`. Point the
existing tools at the explicit path — nothing new needed:

```bash
SLUG=brands/<brand>/output/organic/experiments/EXP-…/drafts/01-…
npm run html:to-image -- "$SLUG/source.html" --all --out "$SLUG/export"   # or html:to-mp4
```

Then schedule via the **postiz-plan** skill (it locates bundles by path).

## Graduation

If an experiment wins, promote its format into a real, reusable type: create
`brands/<brand>/templates/post-types/<name>/{spec.md, template.html}` from the
winning draft. That — not this skill — is where a proven experiment becomes part
of the brand's permanent menu. Losers: just delete the experiment folder.

Either way, **record the verdict in `brands/<brand>/LOG.md`** (if the brand
keeps one): launch entries when the test ships, a readout entry when it's
judged. A deleted loser folder with no log entry will be re-invented.
