# RUNBOOK.md

## Deploy
`npm run check` → PR → CI green → merge → deploy job (smoke + 10 min Sentry watch) → done.

## Rollback
- App: `npx wrangler rollback` (or redeploy previous sha).
- DB: forward-fix migration; restore from D1 Time Travel: `npx wrangler d1 time-travel restore <db> --timestamp=<iso>`.
- Flag: turn off in PostHog.

## Alerts → first move
| Alert | First move |
|---|---|
| Health check down | Check Cloudflare status, then `wrangler tail`, then roll back |
| Sentry error spike | Find the release, roll back if new, then let `fix` take it |
| Free-tier headroom <20% | Run `wolf-stats`, find the top consumer, record a decision |

## Incidents
`detect → assess → contain → fix → verify → communicate → learn` → entry in `MISTAKES.md`.

## Backups
What: D1 (Time Travel) + R2. Restore tested on: <date>. RPO/RTO: <values>.

## Monthly
- [ ] Run `wolf-stats` and `wolf-cost`; write down the trends.
- [ ] Free-tier headroom per service.
- [ ] Restore test every quarter.
- [ ] Ask 10 buyer questions in the AI search engines and log citations in `GROWTH.md`.
