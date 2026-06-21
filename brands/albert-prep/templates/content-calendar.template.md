# Content calendar — template

Copy this file to `output/organic/calendar/YYYY-MM-DD.md` and fill in slots.

**Organic post types:** calcul-du-jour · astuce · série · reel
(folders in `../post-types/`)
**Paid:** reference a campaign folder under `output/paid/campaigns/<date>-<channel>/`

## Week of YYYY-MM-DD

| Day | Channel | Type | Difficulty | Topic / Angle | Asset (bundle path) | Status |
|---|---|---|---|---|---|---|
| Mon | IG organic | calcul-du-jour | medium | e.g. 47 × 11 | `../posts/<date>-calcul-du-jour-<nnn>/` | draft |
| Tue | IG organic | astuce | medium | ×11 trick | | planned |
| Wed | Meta paid | reel | — | Première · La correction | `../../paid/campaigns/2026-06-18-meta/` | live |
| Thu | IG organic | serie | easy | ×25 family | | planned |
| Fri | IG organic | reel | easy | quick drill | | planned |
| Sat | — | — | rest | | — |
| Sun | FB organic | calcul-du-jour | | | planned |

## Paid flight (if active)

| Campaign | Start | End | Budget note | Plan |
|---|---|---|---|---|
| 2026-06-18 Meta | | | | [`campaign.md`](../../paid/campaigns/2026-06-18-meta/campaign.md) |

## Status key

`planned` → `draft` → `review` → `scheduled` → `live` → `done`
(per-post state lives in each bundle's `post.md` frontmatter)
