---
name: postiz-plan
description: Plan and schedule Albert Prep organic social posts using the content calendar, HTML export tools, and Postiz CLI. Use when filling planner calendars, scheduling IG/FB posts, uploading exported PNGs/MP4s, or batch-creating Postiz drafts from content/organic/.
---

# Postiz planning — Albert Prep

Plan editorial slots, export assets from HTML, and push **drafts or scheduled posts** to Instagram/Facebook via [Postiz CLI](https://docs.postiz.com/cli/introduction).

Postiz MCP (`.cursor/mcp.json`) is for interactive scheduling in chat. This skill is for **scriptable, repeatable** calendar → export → upload → schedule workflows.

## When to use

- Filling `planner/calendars/` from [`planner/content-calendar.template.md`](../../planner/content-calendar.template.md)
- Scheduling organic pillars (P1 calcul · P2 astuce · P3 série · P4 reel)
- Batch-creating Postiz **drafts** for human review before going live
- Uploading PNG/MP4 assets produced by repo tools

## Prerequisites

```bash
npm install -g postiz          # or: npx postiz …
export POSTIZ_API_KEY=…        # from .env — or postiz auth:login
postiz auth:status
postiz integrations:list       # note IG/FB integration IDs
```

Repo setup: [`README.md`](../../README.md) · organic posts skill: [`.agents/skills/organic-post/`](organic-post/SKILL.md)

## Workflow

### 1. Plan the calendar

Copy [`planner/content-calendar.template.md`](../../planner/content-calendar.template.md) → `planner/calendars/YYYY-MM.md`.

For each row, set:

| Column | Example |
|---|---|
| Day / Channel | Mon · IG organic |
| Pillar | P1 calcul |
| Topic | 47 × 11 |
| Asset path | `content/organic/posts/portrait_calcul_du_jour_047.html` |
| Status | `planned` → `draft` → `scheduled` → `live` |

Status key: `planned` → `draft` → `review` → `scheduled` → `live` → `done`

### 2. Generate or locate HTML

Organic HTML lives in `content/organic/posts/` (see organic-post skill).  
Naming: `{format}_{pillar}_{type}_{number}.html`

Paid assets: `content/paid/meta/<date>/` — use paid brief + upload checklist when layering paid flights.

### 3. Export media (repo tools)

**Static post (PNG):**

```bash
npm run html:to-image -- content/organic/posts/portrait_calcul_du_jour_047.html \
  --width 1080 --height 1350 \
  --out content/organic/posts/export
```

**Design-export artboards (all static sizes):**

```bash
npm run html:to-image -- path/to/design-export.html --all --out ./output
```

**Animated reel (MP4):**

```bash
npm run html:to-mp4 -- path/to/reels.html --all --out ./output
```

### 4. Upload media to Postiz

**Rule:** never pass raw local paths to `-m`. Always upload first.

```bash
RESULT=$(postiz upload content/organic/posts/export/portrait_calcul_du_jour_047.png)
MEDIA_URL=$(echo "$RESULT" | jq -r '.path')
```

### 5. Create posts

**Draft first (recommended)** — review in Postiz before scheduling:

```bash
postiz posts:create \
  -c "Caption from brief — French, Albert Prep tone. CTA: prep.albertschool.com" \
  -s "2026-06-23T08:00:00Z" \
  -t draft \
  -m "$MEDIA_URL" \
  -i "<instagram-integration-id>"
```

**Schedule when approved:**

```bash
postiz posts:create \
  -c "…" \
  -s "2026-06-23T08:00:00Z" \
  -m "$MEDIA_URL" \
  -i "<instagram-integration-id>,<facebook-page-id>"
```

Promote an existing draft:

```bash
postiz posts:status <post-id> --status schedule
```

### 6. Verify queue

```bash
postiz posts:list --startDate "2026-06-01T00:00:00Z" --endDate "2026-06-30T23:59:59Z"
```

Update the calendar row status to `scheduled` or `live`.

## Batch week (shell sketch)

```bash
#!/usr/bin/env bash
# planner/calendars/2026-06-week1.sh — adapt IDs and paths

INTEGRATION_ID="your-ig-id"
EXPORT_DIR="content/organic/posts/export"
mkdir -p "$EXPORT_DIR"

declare -A SLOTS=(
  ["2026-06-23T08:00:00Z"]="content/organic/posts/portrait_calcul_du_jour_047.html|47 × 11 — calculez en 30 s"
  ["2026-06-24T08:00:00Z"]="content/organic/posts/portrait_astuce_011.html|Astuce ×11"
)

for ISO_DATE in "${!SLOTS[@]}"; do
  IFS='|' read -r HTML CAPTION <<< "${SLOTS[$ISO_DATE]}"
  BASE=$(basename "$HTML" .html)

  npm run html:to-image -- "$HTML" --width 1080 --height 1350 --out "$EXPORT_DIR"
  MEDIA=$(postiz upload "$EXPORT_DIR/${BASE}.png" | jq -r '.path')

  postiz posts:create \
    -c "$CAPTION" \
    -s "$ISO_DATE" \
    -t draft \
    -m "$MEDIA" \
    -i "$INTEGRATION_ID"

  echo "Draft created for $ISO_DATE"
done
```

For complex carousels or threads, use JSON mode: `postiz posts:create --json path/to/post.json` ([examples](https://github.com/gitroomhq/postiz-app/blob/main/apps/cli/examples/EXAMPLES.md)).

## Agent checklist

When the user asks to plan or schedule posts:

1. Read active calendar in `planner/calendars/` or create from template
2. Confirm `postiz auth:status` and list integrations
3. Identify HTML assets (or invoke organic-post skill to generate)
4. Export PNG/MP4 with `npm run html:to-image` / `html:to-mp4`
5. Upload each file with `postiz upload`
6. Create **drafts** unless user explicitly asks to schedule live
7. Update calendar status and report post IDs + scheduled times

## References

- Product copy truth: [`context/brand/app-product.md`](../../context/brand/app-product.md)
- Organic pillars & naming: [`content/organic/README.md`](../../content/organic/README.md)
- Postiz CLI docs: https://docs.postiz.com/cli/managing-posts
- Upstream Postiz agent skill: `npx skills add gitroomhq/postiz-agent` (full command reference)
