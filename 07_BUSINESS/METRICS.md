# Metrics

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: Documents/6, 12, 13, 14

## North star

Percentage of active workers with at least 3 signed work records in their first 90 days (`Documents/12`). Chosen because it simultaneously captures acquisition, activation, verification working, retention, and product-market fit in one number.

**Targets (all `TARGET`, not measured):** 15% by month 3, 25% by month 6, 40% by month 12.

## Phase 1 metric set (months 1-6, Bengaluru pilot)

All figures below are `TARGET`, sourced from `Documents/12. How We Will Know We Are Succeeding.md`, unless marked otherwise.

| Category | Metric | Target |
|---|---|---|
| Acquisition | Verified workers | 250 (M1) → 1,000 (M3) → 3,000 (M6) |
| Acquisition | Verified businesses | 50 (M1) → 200 (M3) → 600 (M6) |
| Acquisition | Active campus ambassadors | 5 (M1) → 15 (M3) → 30+ (M6) |
| Activation | First-job completion rate | 35% |
| Activation | Time to first signed record (median) | Under 14 days |
| Activation | Worker profile completion rate | 70%+ |
| Engagement | Signed records per month | 30 (M1) → 250 (M3) → 1,000+ (M6) |
| Trust/quality | Dispute rate | Under 10% |
| Trust/quality | Tier-1 (direct) dispute resolution rate | 70%+ |
| Trust/quality | Fraud/fake-account incidents | Under 1% of accounts |
| Retention | Repeat hire rate (businesses hiring again within 90 days) | 25%+ |
| Retention | Worker retention (active month after first job) | 60%+ |

**CONFLICT:** `Documents/6. What We Are Building First (MVP).md` states a smaller Phase-1 success bar — 200+ signed records in 90 days and 50+ businesses — for what reads as the same milestone this table's month-3/6 figures describe. Not reconciled; see `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` item 2.

## Product-market-fit signal

Sean Ellis test: ask active workers who have completed 2+ jobs "how would you feel if you could no longer use VERO?" Threshold for a positive PMF signal: 40%+ answer "very disappointed" (`Documents/12`).

## Failure conditions

Explicitly defined in `Documents/12` — if any hold true after 6 months, the product needs fundamental rework, not a marketing push:

- Fewer than 20% of active workers have completed any verified job.
- Dispute rate consistently above 15%.
- Repeat hire rate below 10%.
- Fraud or gaming incidents are common.
- Workers do not perceive their records as genuinely valuable.

## What is deliberately not tracked

Per `Documents/12`: vanity signups (without verification or first-job completion), raw time-on-platform, engagement-at-any-cost metrics, daily active users (not meaningful for a transactional trust platform), app-store rankings (no native app in Phase 1), social-media follower counts.

## Review cadence (as specified, not yet operating)

Weekly: acquisition/activation/current-week job activity. Monthly: full dashboard, retention cohorts, dispute analysis. Quarterly: strategic review against phase targets, expansion readiness, PMF signal.

## Status

No metric in this file has a real measured value as of 2026-09-23. The product has not launched past the marketing/waitlist stage. This file exists so the measurement framework is ready before launch, not to report progress.
