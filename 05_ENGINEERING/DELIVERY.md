# Software Delivery System

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Sources: Wolf v3 framework, `05_ENGINEERING/DELIVERY.md`; `.github/workflows/ci.yml`, this branch's commit history

Track where useful:
deployment frequency, lead time for changes, change failure rate, time to restore and rework.

Never optimize a delivery metric at the expense of reliability, security or user value.

Requirement → small change → review → automated checks → deploy → observe → learn.

## Applied in this repo

No DORA metrics are currently measured — there was no CI before this PR, so nothing was instrumented (`05_ENGINEERING/CI-CD.md`). This PR is itself a delivery-system baseline: one branch, one PR, one human review gate, with `typecheck → lint → Playwright → build → npm audit → gitleaks` as the automated-checks step and Cloudflare Workers version rollback as the time-to-restore path (`06_OPERATIONS/ROLLBACKS.md`). Deployment frequency and change-failure rate have no history to report yet; revisit once `main` has a run of merges to measure.
