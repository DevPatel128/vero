# 19 — Deployment System

## Hosting
- **Vercel** for all web surfaces (`marketing`, `vero`, `rie`, `trove`).
- Region `bom1` (Mumbai) for India proximity.
- Each app is a separate Vercel project, linked to a folder root.

## Domains
| App        | Domain                  | Vercel project    |
| ---------- | ----------------------- | ----------------- |
| marketing  | `vroe.app`              | `vroe-marketing`  |
| vero       | `vero.app`              | `vroe-vero`       |
| rie        | `rie.app`               | `vroe-rie`        |
| trove      | `trove.vroe.app`        | `vroe-trove`      |

DNS via Cloudflare. CAA records pinned. HSTS preload.

## Environments
- `preview` — every PR auto-deploys.
- `staging` — `develop` branch, used for QA + stakeholder review.
- `production` — `main` branch, protected.

## CI/CD
GitHub Actions:

- **`ci.yml`** — lint + typecheck + build + audit + unit tests on every PR.
- **`preview.yml`** — Vercel preview deploy.
- **`production.yml`** — production deploy on push to `main`.
- **`e2e.yml`** — Playwright on staging.
- **`security.yml`** — CodeQL + npm audit + Snyk (post-launch).
- **`chromatic.yml`** — visual regression for `@vroe/ui` changes.

Branch protection on `main` + `develop`: required reviews, required checks, no force-push.

## Env vars
- **Public** — `NEXT_PUBLIC_*` only. No secrets.
- **Server** — managed in Vercel's encrypted env store.
- **Local dev** — `.env.local` from `.env.example`.

### Sensitive envs
- `SUPABASE_SERVICE_ROLE_KEY` — server-only.
- `MSG91_AUTH_KEY` — server-only.
- `RAZORPAY_KEY_SECRET` — server-only.
- `DIGILOCKER_CLIENT_SECRET` — server-only.
- `KMS_SIGNING_KEY_ARN` — server-only.
- `SENTRY_AUTH_TOKEN` — CI only.

## Secrets management
- All real secrets stored in 1Password vault for the team + mirrored to Vercel env via the CLI.
- Key rotation quarterly. Documented runbook.
- No secrets in code. Lint enforces it.

## Database
- Supabase project per environment.
- Migrations applied via `supabase migration up` in CI.
- Production migrations require manual approval + maintenance window if locking.

## Rollback
- Vercel one-click rollback to prior deployment.
- DB migrations include `down`. Rollback within 24h supported.
- Static assets versioned by hash — no cache poisoning during rollback.

## Monitoring + alerts
- **Sentry** — errors. PagerDuty escalation.
- **PostHog** — funnel anomaly detection.
- **Vercel** — function timeouts, deploy failures.
- **Statuspage** — public status (`status.vroe.app`).
- **Better Uptime** — synthetic checks every 60s on critical routes.

## Disaster recovery
- Daily Postgres snapshot + WAL streaming.
- R2 cross-region replication.
- Tested restore monthly.
- RTO 4 hours. RPO 15 minutes.

## Cost discipline
- Vercel team plan.
- Supabase compute scales tier-by-tier.
- Cloudflare R2 + Images for static + media (egress-free).
- Upstash Redis for low-cost rate limit + cache.

## Compliance touchpoints in deployment
- DPDP: data residency reviewed. Critical PII data tier is in India (Supabase Mumbai region or equivalent).
- GDPR: encryption + access controls; data export endpoints available.
- 72-hour breach notice prep — runbook in `/docs/INCIDENT.md`.

## Pre-launch checklist (per release)
- [ ] All migrations applied.
- [ ] Env vars updated.
- [ ] Sentry release tagged.
- [ ] PostHog feature flags reviewed.
- [ ] Bundle budget passed.
- [ ] Lighthouse passed on the routes touched.
- [ ] axe-playwright passed.
- [ ] OWASP ZAP smoke against staging.
- [ ] Changelog updated.
- [ ] Status page note (if customer-visible).

