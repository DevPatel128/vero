# 05 — Backend Architecture

## Strategy
**Serverless-first.** Edge functions, Supabase, managed services. No bespoke backend instance until the data model demands it.

## Services
| Concern               | Service                                                       |
| --------------------- | ------------------------------------------------------------- |
| Auth                  | Supabase Auth + MSG91 phone OTP via webhook                   |
| Database              | Supabase Postgres 16 (managed) with RLS                       |
| ALVED minting         | Node service (Vercel function) calling `@vroe/crypto`         |
| Storage (media)       | Cloudflare R2                                                 |
| Payments / escrow     | Razorpay Smart Collect (PA pattern — Vero never holds funds)  |
| Email                 | Resend                                                        |
| SMS / OTP             | MSG91 (India)                                                 |
| KYC                   | DigiLocker e-KYC                                              |
| Cache / rate-limit    | Upstash Redis                                                 |
| Background jobs       | Inngest                                                       |
| Search                | Postgres FTS first; Typesense if needed at scale              |

## API surfaces
- **Edge** — `apps/vero/src/app/api/*` for OTP, ALVED export, public profile, search auto-suggest.
- **Server actions** — for authenticated mutations.
- **Supabase RPCs** — for trust score calculation, leaderboards, search joins.

## Data flow — a job from post to proof
1. Business posts a job (server action → Postgres insert).
2. Workers see it in `discover` (RLS-filtered query + neighborhood index).
3. Worker applies (server action). Job state moves to `pending_acceptance`.
4. Business accepts. Escrow init via Razorpay Smart Collect virtual account.
5. Worker performs the job.
6. Both parties confirm completion in the app. Each signs an ALVED attestation client-side with `@vroe/crypto`.
7. Edge function `mintAlved` verifies signatures, computes hash chain, inserts into `alved_records` append-only table, releases escrow.
8. Public JSON-LD becomes available at `/u/{handle}.jsonld` via ISR.

## Database — see `16-database-schema.md`

## Auth flow
1. User submits phone (worker) or email (business).
2. Edge route hits MSG91 / Resend, OTP cached in Upstash.
3. User submits OTP. Edge route verifies, mints RS256 JWT signed by KMS-managed private key.
4. JWT placed in `HttpOnly; Secure; SameSite=lax` cookie.
5. Middleware verifies JWT on every protected route.

## Cryptographic boundary
- **Public key** lives in env + at a public JWKS endpoint for verifiers.
- **Private key** lives in KMS only. Edge functions sign via KMS call.
- **User attestation keys** live on the user's device (Web Crypto API). The server holds only the public attestation key.

## Idempotency
- All mutating edge routes accept `Idempotency-Key` headers.
- Stored in Redis with 24h TTL.
- Replays return the cached response.

## Rate limiting
- OTP request: 5 / hour per phone, 50 / hour per IP.
- Login attempts: 10 / hour per identifier.
- Search: 60 / minute per session.
- Job posting: 20 / day per business.
- Enforced via Upstash sliding window.

## Webhooks (inbound)
- Razorpay payment events → mark escrow state.
- MSG91 delivery receipts → log.
- DigiLocker e-KYC callback → KYC attestation record.
- All inbound webhooks verify signatures + timestamp window.

## Webhooks (outbound)
- ALVED record minted → optional partner webhook (signed by Vero edge key).
- Job state changes → business notification webhook (signed).

## Audit logging
- Every trust-affecting action writes a row to `audit_log` table (immutable, partitioned by month).
- 7-year retention for financial events. 1-year for non-financial.
- Available to admins via the admin panel.

## Background jobs
- **Trust score recompute** — nightly per active user.
- **Streak protection** — on every session ingest, validate chain.
- **Notification dispatch** — Inngest fan-out.
- **Search index rebuild** — debounced after job mutations.

## Failure modes
- **Razorpay down** — job moves to `pending_escrow_init`. Worker is informed. Retried for 1 hour. Beyond that, business is asked to retry.
- **MSG91 down** — fallback to email OTP. Logged and surfaced in admin.
- **DigiLocker down** — KYC step deferred. User can complete other onboarding first.
- **Supabase RLS misconfigured** — middleware refuses to serve; alert.

## Observability
- Sentry for errors.
- PostHog for product events.
- Vercel Analytics for RUM.
- Postgres slow query log → Logflare.

## Anti-patterns we reject
- Holding funds on the platform.
- Storing OTPs in Postgres.
- Bypassing RLS via service-role from a client context.
- Calling KMS for every request instead of caching the public key.
- Long-running compute in edge functions (>10s).

