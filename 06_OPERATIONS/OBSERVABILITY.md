# Observability

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: website/site (verified 2026-09-22); 08_DECISIONS/ENGINEERING/2026-09-remove-sentry-posthog.md

## Current state

`website/site` has no error-tracking or analytics provider wired in. `@sentry/nextjs` and `posthog-js` were present as dependencies with unused configuration (never mounted into `layout.tsx`) and were removed in this PR — see `08_DECISIONS/ENGINEERING/2026-09-remove-sentry-posthog.md` for why.

## What exists today

- **`GET /api/health`** — checks the waitlist store is reachable. Returns `{ok: true}` (200) or `{ok: false}` (503). No user data. Added in this PR specifically because the incident in `06_OPERATIONS/INCIDENTS.md` went undetected for an unknown period with nothing checking it.
- **Cloudflare Workers Observability (logs and traces, enabled in `wrangler.jsonc`)** — available in the Cloudflare dashboard; not actively monitored by any alert as of this PR.
- **Server-side `console.error`/`console.warn`** in the two API routes and the email helper — visible in Workers logs, not aggregated or alerted on.

## What does not exist

- No uptime monitor or alert on `/api/health`.
- No error tracking (Sentry or equivalent).
- No product analytics (PostHog or equivalent) — also consistent with `/legal/cookies`' current claim of no third-party analytics.
- No log aggregation beyond Workers Observability.

## Logging discipline

Per this PR's reliability fixes: never log a user's email, a waitlist token, or an email provider's raw response body — `src/lib/email.ts` was fixed specifically because it logged the recipient and a personal token URL when `RESEND_API_KEY` was unset in production. Any future logging addition should be checked against this before shipping.

## Recommended next step (not done in this PR)

A free uptime check against `/api/health` (e.g. a Cloudflare Cron Trigger or Health Check hitting it, or an external monitor) would close the gap that let the incident in `06_OPERATIONS/INCIDENTS.md` go unnoticed. Deferred here because it is a new piece of infrastructure needing its own decision in `08_DECISIONS/ENGINEERING/`, not a code fix.
