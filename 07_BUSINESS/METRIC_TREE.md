# Company Metric Tree

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Sources: Wolf v3 framework, `07_BUSINESS/METRIC_TREE.md`; `METRICS.md`

Company outcome
├── Product outcome: adoption, activation, retention, task success
├── Business outcome: revenue, margin, customer value
└── System outcome: reliability, security, performance, cost

Use HEART-style UX measures where useful: Happiness, Engagement, Adoption, Retention, Task Success.

Every metric has definition, formula, source, owner, freshness, target and guardrails.

## Applied in this repo

`METRICS.md` already defines the north-star and guardrail metrics (percentage of active workers with 3+ signed work records in their first 90 days, targets 15%/25%/40% at months 3/6/12). This file is the tree those sit inside: north star = product outcome (activation/task success); the business outcome branch (revenue, margin) is UNKNOWN until Phase 1 pricing goes live (`BUSINESS-MODEL.md`); the system outcome branch is `05_ENGINEERING/SRE.md` (no SLO defined yet) and `06_OPERATIONS/FINOPS.md` (no cost tracking yet). No metric here has a defined formula/owner/freshness cadence beyond what `METRICS.md` states — building that instrumentation is unscoped, not done in this PR.
