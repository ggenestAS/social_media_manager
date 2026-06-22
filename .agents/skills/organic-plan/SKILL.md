---
name: organic-plan
description: Produce a daily (or multi-day) organic content brief for the active brand at content-factory volume. The agent plans slots, math, fan-out, and timing — then authors each post via organic-post. Scripts only verify math and stage exports/Postiz drafts. Use when the user asks to plan a day/week, fill the calendar, hit daily volume targets (8–10 assets × cross-post), or orchestrate a batch of organic posts.
---

You **plan and orchestrate** organic content for the active brand. You do **not**
fill template holes or run deterministic generators. Each post is still authored
with full judgment via the **organic-post** skill.

Scripts handle only:
- `npm run verify:math` — arithmetic seatbelt before save
- `npm run stage:day` — batch export + Postiz drafts from existing bundles

## When to use

- User asks to plan today / tomorrow / a week
- User sets volume targets (8–10/day per channel)
- User wants a calendar or brief before authoring
- Batch orchestration after several posts are written

## Workflow

### 1. Resolve brand + read constraints

- Brand folder: `brands/<brand>/` (same rules as organic-post)
- **Volume & fan-out:** `brands/<brand>/content-engine.config.json`
- **What to say:** `templates/content-guide.md`
- **Post types:** `templates/post-types/*/spec.md`
- **Existing numbering:** scan `output/organic/posts/` for latest `<type>-NNN`

### 2. Write the daily brief (agent-authored)

Create `brands/<brand>/output/organic/briefs/YYYY-MM-DD.md` from
`templates/daily-brief.template.md`.

The brief is the **executable plan**. Include for each slot:

| Field | Purpose |
|---|---|
| Time | Spaced across posting window (default 10 min cadence) |
| Type | calcul-du-jour · astuce · serie · reel · qcm |
| Difficulty | easy \| medium \| hard |
| Family / angle | CORE theme or expression family from content-guide |
| Math (verified) | Exact problem + answer **before** HTML exists |
| Fan-out | Which channels/placements (cross-post model) |
| Stable vs experimental | Recurring format vs novelty test |

**Enforce in the brief (self-check before saving):**

- 8–10 unique assets/day (from config)
- ~8–10 channel-posts each on IG, FB, TikTok after fan-out
- **≤ 2 IG feed carousels/day** (astuce, serie, qcm-post)
- Surplus volume → Reels + IG Stories + TikTok
- Rotate families; don't repeat the same skill twice in a row

Also write/update roll-up: `output/organic/calendar/YYYY-MM-DD.md` (can be shorter — table + link to brief).

### 3. Author posts (organic-post skill)

For each brief slot, in order:

1. Invent original operands calibrated to content-guide (not copied verbatim)
2. **Verify math** before writing HTML:
   ```bash
   npm run verify:math -- --expr "48*11" --expect 528
   # QCM:
   npm run verify:math -- --qcm '{"A":0.6,"B":0.625,"C":0.62}' --correct A
   ```
3. Author `source.html` + `post.md` using post-type templates as **reference**
   (copy structure, rewrite content — never `{{TOKEN}}` fill-forms)
4. Set frontmatter:
   ```yaml
   channels: [ig, fb, tiktok]   # as needed
   schedule: YYYY-MM-DDTHH:MM
   status: draft
   placements:                  # explicit fan-out
     - { channel: ig, post_type: post }
     - { channel: ig, post_type: story }
     - { channel: fb, post_type: post }
     - { channel: tiktok, post_type: post }
   verify:                      # optional but recommended at volume
     answer: 528
     exprs: ["48*11"]
   ```
5. Mark brief row `ready` when bundle exists + verify passed

**Caption overrides:** same visual asset everywhere; tweak caption per platform
only when the CTA differs (e.g. don't say "swipe" on TikTok).

### 4. Export + stage (scripts)

```bash
eval "$(npm run -s social:resolve)"
npm run stage:day -- --date YYYY-MM-DD --export-missing
# promote when approved:
# npx postiz posts:status <id> --status schedule
```

Update brief + calendar statuses and `postiz_id` fields in each `post.md`.

### 5. Report

Summarize: assets planned vs authored, channel-post count, IG feed cap usage,
Postiz draft IDs, anything skipped or failed verify.

## Division of labour

| Agent | Scripts |
|---|---|
| Daily brief + calendar | — |
| Original HTML + captions | — |
| Math invention + distractor design | `verify:math` confirms |
| Placement decisions in brief | `stage:day` executes fan-out |
| — | Export PNG/MP4, Postiz upload, draft creation |

## References

- Authoring: `.agents/skills/organic-post/SKILL.md`
- Publishing: `.agents/skills/postiz-plan/SKILL.md`
- Postiz CLI: `.agents/skills/postiz/skills/postiz/SKILL.md`
- Albert Prep volume config: `brands/albert-prep/content-engine.config.json`
