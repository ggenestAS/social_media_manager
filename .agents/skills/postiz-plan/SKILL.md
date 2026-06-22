---
name: postiz-plan
description: Plan and schedule a brand's organic social posts using its content calendar, the HTML export tools, and the Postiz CLI. Brand-agnostic — calendars, posts, and channel aliases live under brands/<brand>/. Use when filling a brand calendar, scheduling IG/FB/TikTok posts, uploading exported PNGs/MP4s, or batch-creating Postiz drafts from a brand's post bundles.
---

# Postiz planning

Plan editorial slots, export assets from HTML, and push **drafts or scheduled
posts** to Instagram/Facebook/TikTok via the [Postiz CLI](https://docs.postiz.com/cli/introduction).

This skill is brand-agnostic. Resolve the active brand first (see organic-post
skill §1), then operate entirely inside `brands/<brand>/`. The Postiz workspace
is **shared across all brands** — `POSTIZ_API_KEY` is global, but each brand's
`channels.json` declares which connected channels belong to it.

## When to use

- **Daily volume planning** — use **organic-plan** first (agent-authored brief);
  this skill handles export + Postiz after bundles exist.
- Filling `brands/<brand>/output/organic/calendar/` from
  `brands/<brand>/templates/content-calendar.template.md` or
  `templates/daily-brief.template.md`
- Scheduling a brand's organic posts (whatever post types it defines)
- Batch-creating Postiz **drafts** for human review before going live
- Uploading PNG/MP4 assets produced by the repo tools

## Prerequisites

```bash
export POSTIZ_API_KEY=…        # shared workspace key, from .env
npx postiz auth:status
eval "$(npm run -s social:resolve)"   # resolves THIS brand's aliases → IG_ID/FB_ID/…
```

`npm run social:resolve` reads the active brand's `channels.json` and filters the
shared workspace's `integrations:list`. With one brand it's automatic; with
several, set `BRAND=<name>`.

## Workflow

### 1. Plan the calendar

Copy `brands/<brand>/templates/content-calendar.template.md` →
`brands/<brand>/output/organic/calendar/YYYY-MM-DD.md`. For each row set day,
channel, post type, topic, the asset path (the post bundle), and status.

Status key: `planned` → `draft` → `review` → `scheduled` → `live` → `done`.
Track per-post status in each bundle's `post.md` frontmatter — the calendar is
the temporal roll-up, `post.md` is the source of truth for one post.

### 2. Generate or locate the post bundle

Each post is a bundle: `brands/<brand>/output/organic/posts/<date>-<type>-<nnn>/`
containing `source.html`, `post.md`, and `export/`. Generate new ones via the
organic-post skill.

### 3. Export media (repo tools)

Single bundle:

```bash
SLUG=brands/<brand>/output/organic/posts/<date>-<type>-<nnn>
npm run html:to-image -- "$SLUG/source.html" --all --out "$SLUG/export"
# animated reel:
npm run html:to-mp4   -- "$SLUG/source.html" --out "$SLUG/export"
```

Full day (after agent authored all bundles):

```bash
eval "$(npm run -s social:resolve)"
npm run stage:day -- --date YYYY-MM-DD --export-missing
```

### 4. Upload media to Postiz

**Rule:** never pass raw local paths to `-m`. Upload first; the upload prints a
banner line before the JSON, so strip it:

```bash
MEDIA_URL=$(npx postiz upload "$SLUG/export/<file>.png" | tail -n +2 | jq -r '.path')
```

### 5. Create posts

**Draft first (recommended):**

```bash
npx postiz posts:create \
  -c "Caption from post.md — brand voice + CTA" \
  -s "2026-06-23T08:00:00Z" \
  -t draft \
  -m "$MEDIA_URL" \
  --settings '{"post_type":"post"}' \
  -i "$IG_ID"
```

Instagram requires media + `--settings '{"post_type":"post"}'` (or `"story"`).
Facebook accepts text-only. `-s <ISO-date>` is required even for drafts.

Promote a draft when approved: `npx postiz posts:status <post-id> --status schedule`.

### 6. Verify queue

```bash
npx postiz posts:list --startDate "…" --endDate "…"
```

Then update the calendar row and the bundle's `post.md` (`status`, `postiz_id`).

## Agent checklist

1. Resolve active brand; read its calendar or create from template.
2. `npx postiz auth:status`; `eval "$(npm run -s social:resolve)"`.
3. Identify post bundles (or invoke organic-post to generate them).
4. Export PNG/MP4 into each bundle's `export/`.
5. Upload each file with `npx postiz upload` (strip the banner).
6. Create **drafts** unless the user explicitly asks to schedule live.
7. Update calendar status + `post.md` (`status`, `postiz_id`) and report IDs/times.

## References

- Product/brand voice: `brands/<brand>/brand.md` and `brands/<brand>/context/`
- Post types & design system: `brands/<brand>/templates/`
- Channel aliases: `brands/<brand>/channels.json` (resolve via `npm run social:resolve`)
- Postiz CLI docs: https://docs.postiz.com/cli/managing-posts
