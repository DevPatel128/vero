# RUNBOOK.md

All commands run from `website/site/`. Owner and only responder: Dev Patel (no on-call rotation).

## Deploy
1. Branch, then run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` locally.
2. Open a PR. CI (`.github/workflows/ci.yml`, only for changes under `website/site/**` or the workflow) runs: typecheck, lint, Playwright, `next build`, `npx opennextjs-cloudflare build`, `npm audit --omit=dev --audit-level=high` (non-blocking), gitleaks.
3. A human merges to `main`. Merging is a production decision.
4. Deploy: `npm run deploy` (OpenNext build plus wrangler deploy to Worker `vero`). As of 2026-09-29 deploys are manual; Workers Builds (auto-deploy on push to `main`, root `website/site`) is not connected yet. Confirm the current state in the Cloudflare dashboard before relying on either.
5. Verify: `GET /api/health` is 200 and `/status` shows Operational.
- After changing `wrangler.jsonc`, run `npm run cf-typegen`. Local Workers runtime: `npx wrangler d1 migrations apply vero-waitlist --local` once, then `npm run preview`.
- Live URL: https://vero.dvpatel.workers.dev. Canonical domain `vero.work` is in code but not confirmed attached to the Worker (owner action).

## Rollback
- App, cheapest first: `npx wrangler rollback` or dashboard (Worker `vero`, Deployments, Rollback). Cloudflare keeps the 100 most recent versions; rollback is immediate with no rebuild. Then `git revert` the bad commit, or revert the merge commit as a last resort.
- A rollback changes code only. D1 data and bindings are untouched, and Cloudflare refuses to roll back to a version whose bindings no longer exist.
- DB: forward-fix migration; restore with D1 Time Travel: `npx wrangler d1 time-travel restore vero-waitlist --timestamp=<iso>` (retention window UNKNOWN).
- Flag: none (no feature-flag provider).
- Before rolling back, check whether the cause is the last deploy or something external (expired credential, third party) that a rollback will not fix.

## Alerts → first move
No alert exists. Nothing monitors `/api/health` yet (a free Cron Trigger or external monitor is the recommended next step, needs a decision).
| Signal | First move |
|---|---|
| `/api/health` 503 or `/status` Degraded | Check Cloudflare status and Workers Observability logs for Worker `vero` (enabled in `wrangler.jsonc`), then roll back if the last deploy caused it |
| `/api/waitlist/stats` 503 | Same as above; D1 binding or database problem |
| Free-tier headroom <20% | Run `scripts/wolf-stats.sh`, find the top consumer, record a decision |

## Incidents
`detect → assess → contain → fix → verify → communicate → learn`, then a row in `MISTAKES.md`. Logging rule: never log an email, a waitlist token or an email provider's raw response body.

## Backups
What: code in git (GitHub `DevPatel128/vero`); data in D1 `vero-waitlist` (waitlist entries and rate-limit counters), covered by D1 Time Travel. No export outside Cloudflare. Restore tested on: never. RPO/RTO: UNKNOWN (not defined). Upstash-era waitlist data (before 2026-09-29) is lost.
Not planned for: loss or lock of the Cloudflare account. Revisit before Phase 1 launch (real accounts and payments): set RPO/RTO, confirm retention, decide on a periodic `wrangler d1 export`.
Single points of failure accepted at this scale: Cloudflare, Resend.

## Monthly
- [ ] Run `wolf-stats` and `wolf-cost`; write down the trends.
- [ ] Free-tier headroom per service.
- [ ] Restore test every quarter.
- [ ] Ask 10 buyer questions in the AI search engines and log citations in `GROWTH.md`.
