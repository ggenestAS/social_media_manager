# Daily brief — template (agent-authored)

Copy to `output/organic/briefs/YYYY-MM-DD.md` **before** generating posts.
The agent writes this brief; scripts only execute it (`stage-day`, Postiz).

Read constraints from [`content-engine.config.json`](../../content-engine.config.json):
~8–10 **unique assets**/day → ~8–10 posts **per channel** (IG / FB / TikTok) via cross-post.
**IG feed carousel cap: 2/day** — surplus volume → Reels + Stories.

---

## YYYY-MM-DD · Albert Prep

**Timezone:** Europe/Paris  
**Target:** 10 unique assets · ~30 channel-posts (after fan-out)  
**Theme / rotation note:** _(agent picks — e.g. "CORE theme 2 ops + 1 QCM probe")_

### Volume check (fill before authoring)

| Metric | Target | Planned |
|---|---|---|
| Unique assets | 8–10 | |
| IG channel-posts | 8–10 | |
| FB channel-posts | 8–10 | |
| TikTok channel-posts | 8–10 | |
| IG feed carousels (astuce/serie/qcm-post) | ≤ 2 | |

### Slot table

One row per **unique asset**. Fan-out columns describe where the same export goes.
Math must be verified (`npm run verify:math`) before marking `ready`.

| # | Time | Type | Difficulty | Family / angle | Math (verified) | Bundle path | Fan-out | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | 08:00 | reel | easy | ×11 drill | `36×11=396` | `../posts/<date>-reel-NNN/` | IG Reel + IG Story + FB + TikTok | planned |
| 2 | 08:10 | calcul-du-jour | medium | % of | `15% de 80 = 12` | `../posts/<date>-calcul-du-jour-NNN/` | IG + FB feed | planned |
| … | | | | | | | | |

**Status key:** `planned` → `ready` (verified + exported) → `draft` (Postiz) → `scheduled` → `live`

### Authoring notes (optional)

- Stable vs experimental slots today
- QCM probe slot (if any) + which misconception you're testing
- Caption overrides per platform (only when needed — asset stays identical)

### After authoring

```bash
# per post, before save:
npm run verify:math -- --expr "36*11" --expect 396

# batch export + Postiz drafts for the day:
eval "$(npm run -s social:resolve)"
npm run stage:day -- --date YYYY-MM-DD --export-missing
```

Update roll-up calendar: `output/organic/calendar/YYYY-MM-DD.md`
