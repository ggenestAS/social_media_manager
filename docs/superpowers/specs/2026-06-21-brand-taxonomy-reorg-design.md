# Brand Taxonomy Reorg — Design

**Date:** 2026-06-21
**Status:** Draft for review
**Goal:** Restructure the repo from a single-brand ("Albert Prep") layout into a
multi-tenant "content factory" with a clean, agent-proof taxonomy. Build the
*seams* for multi-brand without building a brand registry — one brand exists
today; adding a second must be "copy a folder and fill it in."

## Principles

The taxonomy is optimized so an autonomous agent never gets lost:

1. **One obvious home.** Every artifact has exactly one correct location.
2. **Source vs generated is unambiguous.** Hand-authored *inputs* live at the
   brand root; everything regenerable lives under a single `output/` sink.
3. **Names are the contract.** Folder and file names tell the agent what to do
   without reading internals (`post-types/` listing = the menu; fixed leaf file
   names = no guessing).
4. **Convention over schema.** No JSON manifests or validation; the agent reads
   markdown specs and prose. Smart agent, dumb structure.
5. **Stable identity, mutable state.** Paths never encode status; state lives in
   metadata so nothing gets renamed across its lifecycle.

## Three layers

- **Generic tooling (account-independent):** `tools/`, `scripts/`,
  `.agents/skills/`, root config. Shared by all brands.
- **Brand inputs (hand-authored):** mission/tone/design brief, channel aliases,
  assets, context, templates (design system + post-types).
- **Brand outputs (generated):** organic post plans + bundles, paid campaign
  plans + creative bundles.

## Target tree

```text
Albert Prep/                      # repo root = content factory
├── README.md                     # 3-layer map (orientation anchor)
├── AGENTS.md
├── package.json
├── .env                          # SHARED POSTIZ_API_KEY (generic, all brands)
├── tools/                        # GENERIC engine: html-render, html-to-image, html-to-mp4
├── scripts/                      # GENERIC: resolve-channels.mjs
├── .agents/skills/               # GENERIC skills: organic-post, postiz, postiz-plan
├── docs/superpowers/specs/       # design docs
└── brands/
    ├── _template/                # skeleton brand — copy to add a brand (the seam)
    │   └── (same shape as a real brand, with empty/placeholder files)
    └── albert-prep/
        ├── README.md             # per-brand anchor (agent reads first)
        ├── brand.md              # mission, tone, voice, design brief
        ├── channels.json         # which shared-workspace aliases belong to this brand
        ├── assets/               # banner, profile pic
        ├── context/              # app-product.md, other product context
        ├── templates/            # INPUTS
        │   ├── design-system.md          # shared CSS, palette, fonts, signatures
        │   ├── content-calendar.template.md
        │   └── post-types/               # this directory listing IS the menu
        │       ├── calcul-du-jour/  { template.html, spec.md }
        │       ├── astuce/          { template.html, spec.md }
        │       ├── serie/           { template.html, spec.md }
        │       └── reel/            { template.html, spec.md }
        └── output/               # everything generated
            ├── organic/
            │   ├── calendar/             # YYYY-MM-DD.md plan files (temporal)
            │   └── posts/
            │       └── 2026-06-21-calcul-du-jour-047/   # leaf bundle
            │           ├── post.md       # frontmatter + caption body
            │           ├── source.html
            │           └── export/       # 047.png / 047.mp4
            └── paid/
                └── campaigns/
                    └── 2026-06-18-meta/
                        ├── campaign.md   # objective, budget, audience, status
                        └── creatives/
                            └── <slug>/   # SAME leaf shape as organic post
                                ├── post.md
                                ├── source.html
                                └── export/
```

## The leaf bundle (organic post = paid creative)

Every deliverable is a folder with three fixed names so the generic skill never
branches on context:

- `source.html` — the renderable (single or multi-slide; reels are animated).
- `post.md` — YAML frontmatter + caption body:
  ```yaml
  ---
  type: calcul-du-jour        # matches a templates/post-types/<name>
  channels: [ig, fb]          # aliases from the brand's channels.json
  schedule: 2026-06-22T09:00
  status: draft               # draft | scheduled | published
  postiz_id: null             # filled after publish
  ---
  Caption text in the brand's voice…
  ```
- `export/` — rendered artifacts (`.png`, `.mp4`) produced by `tools/`.

Bundle naming: `<date>-<type>-<nnn>` (e.g. `2026-06-21-calcul-du-jour-047`).
Status changes edit `post.md`; the folder is never renamed.

## Skill changes (genericization)

- **`organic-post`**: remove all Albert specifics ("Le Cahier", pillars,
  palette, French). New flow: resolve active brand → enumerate
  `brands/<b>/templates/post-types/*` → read chosen type's `spec.md` +
  `design-system.md` → build `source.html` → save bundle → write `post.md` →
  export. The skill knows no brand vocabulary.
- **`scripts/resolve-channels.mjs`**: read `brands/<active>/channels.json` and
  filter the shared workspace `integrations:list` by that brand's alias set.
- **`postiz-plan`**: read brand channels; write plans to the brand's
  `output/organic/calendar/`.
- **`AGENTS.md` + `package.json`**: update hardcoded paths (notably
  `capture:reels`, which points at `content/paid/meta/2026-06-18/...`).

## Brand resolution

Convention, no registry. With one brand, that folder is active. When a second
exists, the agent resolves the brand from the user's request / the bundle it is
working on. No global "current brand" state.

## Migration map (use `git mv` — confirmed git repo)

| Today | New location |
|---|---|
| `content/organic/brief/designer-brief.html` | `brands/albert-prep/templates/design-system.md` (+ identity → `brand.md`) |
| `content/organic/assets/*` | `brands/albert-prep/assets/` |
| `context/brand/app-product.md` | `brands/albert-prep/context/app-product.md` |
| `social.channels.json` | `brands/albert-prep/channels.json` |
| `.agents/skills/organic-post/references/{pillar-*.md, design-system.md}` | `brands/albert-prep/templates/{post-types/<name>/spec.md, design-system.md}` |
| `content/organic/posts/*.html` | `brands/albert-prep/output/organic/posts/<date>-<type>-<nnn>/source.html` |
| `content/organic/posts/export/*` | each bundle's `export/` |
| `planner/calendars/*` | `brands/albert-prep/output/organic/calendar/` |
| `planner/campaigns/*` + `content/paid/meta/2026-06-18/` | `brands/albert-prep/output/paid/campaigns/2026-06-18-meta/` |
| `planner/content-calendar.template.md` | `brands/albert-prep/templates/content-calendar.template.md` |

Stays put (generic): `tools/`, `scripts/`, `.agents/skills/` (genericized in
place), `.env`, `AGENTS.md`, `README.md`, `package.json`.

## Risks / open notes

1. **Path breakage must be atomic.** `npm run capture:reels` and the skills'
   read/write targets hardcode `content/...`; update them in the same change set
   as the moves or the pipeline half-works.
2. **Calendar template is brand-coupled** (references post-types), so it lives in
   brand `templates/`, not in generic tooling. Minor taxonomy imperfection,
   accepted.
3. **`_template/` must stay in sync** with the real brand shape over time; treat
   it as the canonical skeleton when the structure evolves.

## Out of scope (YAGNI)

Brand registry, `brand.json` schema/validation, per-brand Postiz auth, a
"current brand" CLI, repo rename.
