# Readout protocol — 2026-09 Meta launch (EXP-2026-09-20-meta-directions)

Written 2026-09-22 at activation, after auditing what the pixel, GTM, the
landing and the database actually record. Read this before drawing any
conclusion from the campaign; the experiment doc's original metric list
assumed events that do not exist.

## 1. What is live

| | |
|---|---|
| Campaign | `52626090874065` · Leads · auction · ABO |
| Ad sets | `52626097319265` UK 16–18 €60/day (16 ads) · `52626097343065` FR 16–18 €40/day (4 ads) |
| Optimisation | pixel `936385079418303` · standard event `Lead` · 7-day click / 1-day view |
| Activated | 2026-09-22 evening (UTC+2) — day 1 = 2026-09-23 |

## 1b. Audience caveat — FR serves to 18+ only

Meta no longer shows ads to under-18s in the EU/EEA/Switzerland, whatever the
ad set says. Ads Manager flags the FR ads "Audience limitée"; the set still
delivers, to 18-year-olds. The bac 2027 cohort is mostly born 2008, so by
late September roughly two thirds of terminale students are already 18 and
the share rises through the year. The FR read is therefore "18-year-old
terminale students", not 16–18. The UK is outside the EU: the UK set reaches
16–17 as targeted. Keep this in mind when comparing the two markets.

## 2. Where the data lives, and what each source can and cannot tell you

**Meta (ad-attributed).** The only per-creative signal. Pull at `level=ad`
for the two ad sets with `ads_get_ad_entities`, fields:
`amount_spent, impressions, reach, frequency, cpm, link_click,
omni_landing_page_view, video_thruplay_watched_actions, lead, cost_per_lead,
results, cost_per_result`. In Ads Manager add the columns *3-second video
plays* (thumb-stop) and *Instagram profile visits* — the API tool does not
expose them.

**Pixel `Albert Prep Data` is shared.** It fires on `www.albertschool.com`
and a dozen school subdomains. In the 28 days before launch it recorded
15 000 PageViews and 443 `Lead`s, of which **one** `Lead` and ~20 PageViews
came from `prep.albertschool.com`. Consequences:
- Pixel-level counts in Events Manager are meaningless for this campaign.
  Only ad-attributed numbers count.
- Meta's `Lead` model on this pixel was trained on school-site leads. Expect
  a slow, noisy first week regardless of creative.
- An ad-clicker who later fires a `Lead` on `www.albertschool.com` counts as
  our conversion. Small but non-zero contamination.
- **Fix (owner, Events Manager → Custom conversions):** create
  `Prep Lead` = event `Lead`, URL contains `prep.albertschool.com`, and
  `Prep FunnelStarted` = custom event `FunnelStarted`, same URL rule. Then
  the ad sets are re-pointed at `Prep Lead` (resets learning — do it on day
  1 or not at all).

**GTM `GTM-K7VPGZ55` on the landing.** Verified wiring:
`funnel_step_completed{label:date}` → `FunnelStarted`;
`funnel_step_completed{label:placement_3}` → `PlacementCompleted`;
`email_submitted{method}` → **`Lead`**; `account_created` →
`CompleteRegistration`. The landing pushes the first three. **It never
pushes `account_created`** (not in the bundle, not in the first-party event
table), so `CompleteRegistration` will read zero forever. Do not use it.

**First-party (Neon project `albert-prep`, production branch, read-only).**
`analytics.event` records `funnel_step_viewed`, `funnel_step_completed`,
`email_submitted`, `magic_link_opened`, `waitlist_action_completed` with
`anonymous_id`, `path`, `props{step,label,method,action}`. `prep.brief` holds
every funnel submission with `status` `draft` | `claimed`, `exam_name`,
`locale`. Baseline 2026-09-18 → 22: 122 drafts, 6 claimed (5 %).
**Nothing stores `utm_*` or `fbclid`**, so first-party rows cannot be joined
to a creative. They give the campaign-level quality read only.

## 3. The metrics, in order of authority

| # | Metric | Source | Reads |
|---|---|---|---|
| 1 | Cost per attributed `Lead` per ad | Meta | The decision metric |
| 2 | Attributed `Lead`s per ad set per 7 days | Meta | ≥ 50 = out of learning; < 20 = do not read cost per Lead at all |
| 3 | Claimed / drafts, campaign period vs baseline 5 % | Neon `prep.brief` | Quality of the traffic as a whole |
| 4 | Link CTR, landing page views / link clicks | Meta | Creative pull, landing loss |
| 5 | ThruPlays / impressions (reels only), 3-s plays in Ads Manager | Meta | Thumb-stop for the reel mechanic |
| 6 | `funnel_step_completed` by `label` per day | Neon `analytics.event` | Where the funnel leaks (exam → date → hours → placement 1–3 → email) |
| 7 | `email_submitted` by `method` | Neon | Magic link vs Google; magic-link `Lead`s that never open the link are soft |

## 4. Decision rules (from `experiment.md`, restated for what is measurable)

- Read at day 7 and day 14. Day 3 is a sanity check only (delivery, CPM,
  CTR, zero-Lead ads).
- Mechanic comparison = ad-level cost per Lead within each market set,
  **weighted by spend**: statement ads vs press-split ads vs press-reel ads.
  Meta rotates budget toward early winners, so treat differences under 30 %
  as noise.
- Cut an ad only after ≥ €40 spent with zero Leads, or a cost per Lead
  ≥ 2× the set median after ≥ 5 Leads.
- The week-3 70 / 30 shift is between mechanics inside a set (pause ads),
  never between the market sets.
- Quality gate: if claimed / drafts during the campaign falls below the
  5 % baseline by more than a third, the ads buy the wrong people; stop and
  rework the funnel or the hook before spending week 2.

## 5. Pull recipes

Meta, both sets, last 7 days, per ad:

```
ads_get_ad_entities(ad_account_id=1334262842179873, level=ad,
  filtering=[{field:"adset.id", operator:"IN", value:["52626097319265","52626097343065"]}],
  fields=[amount_spent, impressions, reach, frequency, cpm, link_click,
          omni_landing_page_view, video_thruplay_watched_actions, lead, cost_per_lead],
  date_preset=last_7d, sort=cost_per_lead_ascending)
```

Neon (read-only), funnel by step, last 7 days:

```sql
select props->>'label' as step, count(*) from analytics.event
where name = 'funnel_step_completed' and created_at > now() - interval '7 days'
group by 1 order by 2 desc;
```

Neon, quality vs baseline:

```sql
select status::text, count(*) from prep.brief
where deleted_at is null and created_at > '2026-09-23' group by 1;
```

## 6. Gaps that need a landing change (owner / product)

1. Capture `utm_source`, `utm_campaign`, `utm_content` and `fbclid` on the
   first `funnel_step_viewed` and store them in `analytics.event.props` and
   on `prep.brief`. Without it, "which creative produced the claimed
   briefs" is unanswerable.
2. Push `account_created` (or rename the GTM trigger to whatever fires when
   a brief is claimed) so `CompleteRegistration` reaches Meta and becomes a
   usable quality event and, later, an optimisation event.
3. Conversions API for `Lead` and the claim event. Not needed for flight 1.
