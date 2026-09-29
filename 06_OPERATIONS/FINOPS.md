# FinOps

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `06_OPERATIONS/FINOPS.md` (imported unchanged apart from this header and "Applied in this repo")

Goal: maximize business value from technology spend.

Loop: Inform → Optimize → Operate.

Track unit cost, cost by workload/feature, idle resources, database/storage/network cost, AI model/token cost, third-party cost, forecast vs actual and cost per useful outcome.

Do not reduce cost blindly; optimize reliability-adjusted value.

## Applied in this repo

`website/site` runs on Vercel's and Upstash's free tiers today (`08_DECISIONS/ENGINEERING/2026-09-stay-on-vercel-upstash.md`: $0 new spend was part of that decision's justification). No paid usage exists yet, so there is no unit cost or cost-per-outcome to track — this becomes live scope at Phase 1 launch when there is real traffic and, per `06_OPERATIONS/BACKUPS.md`, a likely Upstash plan-tier decision to make (backups may require a paid tier). `05_ENGINEERING/COST.md` is the engineering-side cost-optimization rule this file's tracking would feed.
