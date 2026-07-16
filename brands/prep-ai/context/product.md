# Prep — product context for copy

**What it is.** Prep ("Prep Albert") is the exam agent at
<https://prepai.albertschool.com>. The visitor tells it which exam they're
sitting (free text or chips), the date, their level and weekly hours — in a
chat, not a form — and it builds a revision plan sequenced backwards from
exam day: diagnostic → rebuild foundations → targeted practice → exam
simulation, plus a week-1 day-by-day. Creating a free account (email +
password, no card) saves the plan; daily training "opens in waves" (early
access). The plan builder is real; the daily training engine is what early
access is building — copy must not promise features beyond: plan to day J,
short daily sessions, real-format mock exams, error-driven review.

**Pricing story.** Free during early access, no credit card, early members
keep access. Later: subscription.

**The one-liner vs ChatGPT.** "Use ChatGPT to do your homework for you. Use
Prep to be ready when it counts." / FR: ChatGPT fait tes devoirs à ta place ;
Prep te rend prêt le jour où ça compte. On exam day there are no tabs and no
chatbot — Prep trains, it doesn't replace.

## Destinations & attribution (critical for ads)

Every paid click must land on a campaign LP, never the bare homepage. The
funnel records `src` on every lead and event, so cost-per-account splits by
angle and by page style with zero extra tracking:

| Angle | Editorial LP | Chat LP (page IS the agent) |
|---|---|---|
| Bac général | `/lp-bac` | `/lp-bac-chat` |
| Parents | `/lp-parents` | `/lp-parents-chat` |
| Mention | `/lp-mention` | `/lp-mention-chat` |
| Bac blanc | `/lp-bac-blanc` | `/lp-bac-blanc-chat` |

The LP stamps `src=lp-<slug>[-chat]` + `audience=highschool` into the plan
chat; sign-up happens at the plan reveal, so `funnel.lead.src` = per-angle
*account* conversion (not just clicks). Add Meta-side UTMs on top for Ads
Manager reporting; they don't affect the funnel.

Conversion readout (whoever has DB access):
`select src, count(*) from funnel.lead group by 1 order by 2 desc;`

## Product facts safe to use in copy

- Plan built back from the real exam date; honest warning when hours don't
  match the runway.
- Sessions ~15–45 min depending on declared weekly hours; 5–6 sessions/week.
- Mock exams in the real format of the declared exam (chronomètre, barème).
- Any exam: bac (spé, tronc commun, français 1re, Grand oral), brevet,
  SAT/IB/entrance tests. Custom exams via provided course context.
- Free early access, no credit card, 2 minutes to a plan, account keeps it.

## Never claim

- Grade guarantees, "mention garantie", success statistics (none exist yet).
- User counts or testimonials (none exist yet).
- That the daily training is already open (it opens in waves).
- Anything about sibling brands (Albert Prep mental-math is a separate brand
  in this repo — never cross-reference).
