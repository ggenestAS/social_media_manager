# Planner

Cross-channel planning for Albert Prep social content — paid flights and organic editorial rhythm.

## Files

| File | Use |
|---|---|
| [`content-calendar.template.md`](content-calendar.template.md) | Copy for each month/week; slot organic pillars + paid bursts |
| [`campaigns/`](campaigns/) | One doc per paid flight or major push — links briefs, dates, KPIs |

## Workflow

1. **Plan** — fill a calendar from the template; add a campaign doc if running paid.
2. **Generate** — paid assets in `content/paid/`, organic posts via `.agents/skills/organic-post/`.
3. **Ship** — paid: `upload-checklist.md` → Meta Ads Manager. Organic: `npm run html:to-image` → Postiz (see `.agents/skills/postiz-plan/`).

Organic runs continuously (4 pillars). Paid runs as time-boxed campaigns layered on top.
