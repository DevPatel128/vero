# Launch

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Sources: Wolf v3 framework, `07_BUSINESS/LAUNCH.md`; this PR's own site audit

Checklist:
product readiness, security, privacy/terms, support, analytics, observability, performance, accessibility, pricing, payments, rollback, incident readiness, GTM, communications and approvals.

Launch is a controlled release, not merely a deployment.

## Applied in this repo — Phase 1 (Bengaluru pilot) launch readiness

| Item | Status |
|---|---|
| Product readiness | Not ready — job posting, escrow, dual-signature records are unbuilt in production (`PRODUCT.md` constraints) |
| Security | This PR's fixes close the known gaps for the current (waitlist-only) surface; Phase 1's payment/escrow surface is unreviewed because it doesn't exist yet |
| Privacy/terms | Held — draft `/privacy`, `/terms`, `/delete` pages archived, not shipped, pending legal review (`08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` item 4) |
| Observability | `/api/health` exists; no alerting, no SLO (`05_ENGINEERING/SRE.md`) |
| Rollback | Ready — Cloudflare Workers version rollback (`06_OPERATIONS/ROLLBACKS.md`) |
| Payments | Razorpay integration is prototyped in the archived `application/`, not deployed |
| GTM | `GTM.md` describes the plan; not executed |

Phase 1 is not launch-ready. This table exists so readiness is checked against evidence at the time, not assumed.
