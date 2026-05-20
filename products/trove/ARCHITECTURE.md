# Architecture

> A short tour of how Trove is built and why.

## Goals

1. **Boring infrastructure.** Vercel + Supabase + Stripe. No bespoke ops.
2. **Static / serverless-first.** Marketing renders at build time; product is RSC + edge where it helps.
3. **Strict TypeScript.** `noUncheckedIndexedAccess` on. Zod at every boundary.
4. **Security by default.** RLS on every table. No client-side service-role calls. Sanitize inputs.
5. **Accessible by default.** WCAG AA, keyboard navigation, reduced-motion respected.

## Runtime topology

```
              ┌──────────────────────────────────────────┐
              │              Vercel (edge)               │
              │                                          │
   ┌────────┐ │   ┌───────────────┐  ┌──────────────┐    │
   │ Users  │─┼──▶│ Next.js App   │◀▶│  Edge funcs  │    │
   └────────┘ │   │ (RSC + ISR)   │  │  middleware  │    │
              │   └───────┬───────┘  └──────┬───────┘    │
              │           │                 │            │
              └───────────┼─────────────────┼────────────┘
                          ▼                 ▼
            ┌──────────────────┐  ┌───────────────────┐
            │     Supabase     │  │   Stripe / Resend │
            │ (Postgres + Auth │  │   PostHog / Gemini│
            │   + Storage)     │  │   Upstash Redis   │
            └──────────────────┘  └───────────────────┘
```

## Route map

| Group | Path prefix | Auth | Notes |
|-------|-------------|------|-------|
| Marketing | `/`, `/features`, `/pricing`, `/about`, `/blog/*`, `/docs/*`, `/contact`, `/security`, `/integrations`, `/case-studies`, `/changelog` | Public | Statically rendered + ISR for content |
| Legal | `/privacy`, `/terms`, `/cookies`, `/accessibility` | Public | Static |
| Auth | `/login`, `/register`, `/forgot-password`, `/auth/callback`, `/auth/signout` | Public / handler | Supabase SSR cookie session |
| Product | `/dashboard`, `/transactions`, `/analytics`, `/subscriptions`, `/budgets`, `/goals`, `/reports`, `/notifications`, `/search`, `/support/*`, `/settings/*` | Required | Middleware enforces |
| Admin | `/admin/*` | Admin / Owner | Role gate in middleware + layout |
| API | `/api/*` | Mixed | Each route declares its own auth |

## Auth flow

1. User signs up via `/register` → Supabase Auth → confirmation email (Resend).
2. `auth/callback` exchanges the code for a session, redirects to `/onboarding`.
3. `handle_new_user()` trigger seeds `profiles` and `subscriptions_billing` rows.
4. `middleware.ts` refreshes the session on every request and enforces protected routes.

## Data model

See [supabase/schema.sql](supabase/schema.sql). Highlights:

- **profiles** keyed to `auth.users`. Mirror of identity + preferences + role.
- **accounts** — bank/credit/investment/cash containers.
- **transactions** — the primary data table. Indexed on `(user_id, occurred_at desc)`.
- **subscriptions** — recurring spend, auto-detected nightly.
- **budgets / goals / monthly_income** — user-configured targets.
- **insights** — cached AI summaries with 30-day window.
- **notifications** — in-app inbox.
- **audit_logs** — every write action.
- **api_keys** — Pro+ programmatic access. Hashed (Argon2id), prefix indexed.
- **teams + team_members** — shared workspaces (Team plan).
- **subscriptions_billing** — Stripe state mirror.
- **feature_flags** — server-side toggles with rollout %.
- **support_tickets** — in-app help.

All tables have row-level security with the `auth.uid() = user_id` pattern.

## Server boundary

- All server-only modules import `server-only` at the top to prevent accidental client bundling.
- Service-role keys live only in `src/lib/supabase/server.ts` and never escape.
- The browser uses the anon key + RLS.

## API conventions

- JSON in / JSON out.
- Standard HTTP status codes.
- Errors: `{ error: { code, message, details } }`.
- Rate limits returned via Upstash analytics + `X-RateLimit-*` headers.
- All bodies validated with Zod via `lib/api.ts` `validate(schema, req)`.

## Security model

- CSP with `strict-dynamic` + per-request nonce (middleware).
- HSTS, no `X-Frame-Options` allowance, `frame-ancestors 'none'`.
- Stripe webhook signature verified via `STRIPE_WEBHOOK_SECRET`.
- AI prompts sanitized — merchant names stripped of control characters and length-capped.
- Audit log on every write action.
- RBAC via `lib/rbac.ts` (also enforced by RLS).

## Performance

- Marketing pages: static generation (`output = "default"` + per-page revalidation).
- Product pages: RSC with parallel `Promise.all` data fetches.
- Charts: Recharts, dynamic imports where above-the-fold.
- Images: next/image with AVIF/WebP, responsive sizes.
- Fonts: `next/font/google` with `display=swap`, two families only.

## Observability

- **PostHog** — pageviews, autocapture, session replay (PII masked), feature flags.
- **Sentry** — error tracking on client/server/edge.
- **Vercel Analytics + Speed Insights** — Web Vitals.
- **Audit log** — application-level events.

## Cron jobs (Vercel)

| Path | Schedule | Purpose |
|------|----------|---------|
| `/api/cron/refresh-subscriptions` | `0 6 * * *` | Detect new recurring charges |
| `/api/cron/digest-emails` | `0 13 * * 1` | Weekly Monday digest |
| `/api/cron/cleanup-sessions` | `0 3 * * *` | Session/cache hygiene |

All cron handlers require `Authorization: Bearer ${CRON_SECRET}`.
