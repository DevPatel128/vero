# RIE — CLAUDE.md

## Project Overview

**RIE** ("The Discipline App") is a cryptographic proof-of-discipline platform. Users submit verifiable proofs of activity across three domains — **Fitness**, **Content Creation**, and **Gaming** — and earn trust-weighted scores that feed into global leaderboards.

**Stack:** Next.js 16 (website) · Expo (mobile) · Express + TypeScript (API) · PostgreSQL 16 + Prisma · Redis · S3/MinIO

---

## Monorepo Structure

```
RIE/
├── apps/
│   ├── api/          # Express API — entry: src/server.ts
│   ├── website/      # Next.js landing + dashboard — entry: src/app/page.tsx
│   └── mobile/       # Expo React Native — entry: app/_layout.tsx
├── packages/
│   ├── crypto/       # AES-256-GCM, Argon2id, ECDSA, JWT RS256
│   ├── shared/       # Types, design tokens, activity catalogs
│   └── i18n/         # 11-language locale files
├── docker-compose.yml
└── turbo.json
```

Key entry points:
- API server: `apps/api/src/server.ts`
- Score calculation: `apps/api/src/services/score.engine.ts`
- Trust scoring: `apps/api/src/services/trust.engine.ts`
- Crypto primitives: `packages/crypto/src/` (always use this, never inline crypto)
- Shared types: `packages/shared/src/types/index.ts`

---

## Agent Rules

### Token Usage — Minimal
- **Request targeted diffs only.** Never generate full files when a partial edit suffices.
- Read only the files relevant to the task. Do not explore the entire repo for simple changes.
- Ask one clarifying question before assuming intent, rather than generating multiple alternatives speculatively.
- Prefer editing existing files over creating new ones.

### Output Quality — High Standard
- Every code change must be production-ready: no `TODO`, no `console.log` stubs, no placeholder values in new code.
- Do not add speculative features, extra error handling for impossible cases, or backwards-compat shims unless asked.
- Do not add comments to unchanged code.
- Match existing code style exactly (spacing, naming, import order).
- If a fix requires touching security-critical code, state that explicitly before making changes.

---

## Running the Project

```bash
# Start infrastructure
docker-compose up -d          # PostgreSQL, Redis, MinIO

# Install all dependencies
npm install

# Run database migrations
cd apps/api && npx prisma migrate dev

# Start all apps (via Turbo)
npm run dev

# Start individually
cd apps/api     && npm run dev    # http://localhost:3001
cd apps/website && npm run dev    # http://localhost:3000
cd apps/mobile  && npm run start  # Expo dev server
```

---

## Critical Environment Variables

`apps/api/.env` (copy from `.env.example`):

```
# Database
DATABASE_URL=postgresql://rie:rie_dev@localhost:5432/rie_db?connection_limit=10&pool_timeout=30

# Redis
REDIS_URL=redis://localhost:6379

# JWT — must be RS256 key pair (generate with: openssl genrsa -out private.pem 2048)
JWT_PRIVATE_KEY=<RS256 PEM private key>
JWT_PUBLIC_KEY=<RS256 PEM public key>

# Encryption — 32-byte hex key for AES-256-GCM
ENCRYPTION_KEY=<64-char hex>

# S3 / MinIO
S3_ENDPOINT=http://localhost:9000
S3_BUCKET=rie-proofs
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_REGION=us-east-1

# Email (pick one)
RESEND_API_KEY=<key>
# or
AWS_SES_REGION=us-east-1
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
EMAIL_FROM=noreply@rie.app

# Push notifications
FCM_SERVER_KEY=<Firebase Cloud Messaging server key>

# Integrations (OAuth)
GITHUB_CLIENT_ID=<id>
GITHUB_CLIENT_SECRET=<secret>
STRAVA_CLIENT_ID=<id>
STRAVA_CLIENT_SECRET=<secret>
CHESS_CLIENT_ID=<id>
CHESS_CLIENT_SECRET=<secret>

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://rie.app
```

---

## Coding Conventions

- **TypeScript strict mode** everywhere. No `any`, no `as unknown as X`.
- **Prisma singleton** — never instantiate `new PrismaClient()` inside a handler or service. Import from `apps/api/src/lib/prisma.ts`.
- **Crypto must come from `@rie/crypto`** — never use `crypto` stdlib or inline `Buffer.from(...).toString('base64')` for sensitive data.
- **Error handling** — throw typed errors at service boundaries; let `error-handler.ts` middleware handle HTTP responses. Don't catch-and-swallow.
- **Route handlers are thin** — business logic lives in `services/`. Routes validate input, call service, return response.
- **No raw SQL** — use Prisma query API. Raw queries require explicit sign-off.

---

## Security Mandates

1. **JWT** — All token creation/verification must go through `packages/crypto/src/tokens.ts` (`createTokenPair`, `verifyToken`). RS256 only.
2. **Passwords** — Use `hashPassword()` / `verifyPassword()` from `packages/crypto/src/hashing.ts` (Argon2id). Never SHA256 + salt.
3. **PII encryption** — Email, display name, and other PII must be encrypted with `encrypt()` / `decrypt()` from `packages/crypto/src/encryption.ts` (AES-256-GCM) before writing to DB.
4. **OAuth state** — Generate state, store in Redis with TTL, validate on callback. Never skip state validation.
5. **No secrets in code** — All keys/credentials via environment variables. No hardcoded fallbacks beyond localhost dev values.
6. **CSRF** — All cookie-authenticated POST/PUT/DELETE routes must validate `Origin` header or use double-submit cookie pattern.

---

## Testing

- Test runner: **Jest + ts-jest**
- Test files: co-located at `*.test.ts` or in `__tests__/` beside the file under test
- Minimum coverage targets (enforce in CI):
  - `auth.service.ts` — 80%
  - `score.engine.ts` — 80%
  - `trust.engine.ts` — 80%
  - `submission.service.ts` — 70%
- Run tests: `cd apps/api && npm test`

---

## Gap Tracker

Gaps found via codebase audit. Ordered by severity. Remove entries as they are resolved.

### CRITICAL — Block Production

| # | File(s) | Issue | Fix |
|---|---------|-------|-----|
| 1 | `apps/api/src/middleware/auth.ts:25-26`<br>`apps/api/src/services/auth.service.ts:269-274` | JWT is base64url JSON, not RS256 — forgeable | Use `verifyToken()` / `createTokenPair()` from `packages/crypto/src/tokens.ts` |
| 2 | `apps/api/src/services/auth.service.ts:80,170` | Password hashed with `SHA256 + static salt` instead of Argon2id | Use `hashPassword()` / `verifyPassword()` from `packages/crypto/src/hashing.ts` |
| 3 | `apps/api/src/services/auth.service.ts:87-88,211` | PII "encrypted" with `Buffer.from().toString('base64')` — no encryption | Use `encrypt()` / `decrypt()` from `packages/crypto/src/encryption.ts` |
| 4 | `apps/api/src/services/email.service.ts:115,126` | Email sends are `console.log` stubs | Integrate Resend SDK (`resend.emails.send()`) or `@aws-sdk/client-ses` |
| 5 | `apps/api/src/services/media-storage.ts:57` | S3 presigned URL is a string template, not a real signed URL | Use `@aws-sdk/s3-request-presigner` `getSignedUrl()` with `PutObjectCommand` |
| 6 | `.github/workflows/ci.yml:134-137` | API deploy step is a `# TODO` comment — API never deploys | Add `fly deploy` / `railway up` / `render deploy` command |

### HIGH — Fix Before Beta

| # | File(s) | Issue | Fix |
|---|---------|-------|-----|
| 7 | `apps/api/src/routes/submissions.ts:75-76` | `new PrismaClient()` inside route handler — connection pool leak | Create singleton at `apps/api/src/lib/prisma.ts`; import everywhere |
| 8 | Whole codebase | Zero test files | Add Jest + ts-jest; cover auth, score engine, trust engine |
| 9 | `apps/api/src/services/integration.service.ts:119` | OAuth `state` generated but never validated on callback — CSRF risk | Store state in Redis with 10-min TTL; validate before code exchange |
| 10 | `apps/api/src/services/submission.service.ts:232-235` | Grace days checked but `GraceDay` record never written — infinite grace | Insert `GraceDay` row on use; count against user's grace day limit |
| 11 | `apps/api/src/routes/` (all POST routes) | No CSRF protection | Validate `Origin` / `Referer` header on all cookie-authenticated mutations |
| 12 | `apps/api/src/services/push.service.ts:24,163-165` | FCM push is a `console.log` stub | Implement `firebase-admin` SDK or FCM HTTP v1 API |
| 13 | `apps/api/prisma/schema.prisma:10` | No DB connection pool config | Append `?connection_limit=10&pool_timeout=30` to `DATABASE_URL` |
| 14 | `apps/api/src/server.ts` | Missing env vars fail silently at runtime | Add startup guard: check required env vars and `process.exit(1)` if absent |

### MEDIUM — Quality / Correctness

| # | File(s) | Issue | Fix |
|---|---------|-------|-----|
| 15 | `apps/api/src/services/content-filter.ts:89-92` | MP4 magic bytes `[0x00,0x00,0x00]` too generic — passes non-MP4 files | Check `ftyp` atom at byte offset 4, or use `file-type` npm package |
| 16 | `apps/api/src/routes/rankings.ts:45-49` | Full user join on every leaderboard row (N+1 risk) | Use narrow `select`; add cursor-based pagination |
| 17 | `apps/api/src/services/trust.engine.ts:99` | Single submission → variance = 0 → trust score inflated | Guard: `if hours.length < 3` return neutral consistency `0.5` |
| 18 | Prisma schema — `Badge` / `UserBadge` | Badge criteria JSON never evaluated; badges never auto-earned | Create `badge.engine.ts` triggered after score recalculation |
| 19 | Prisma schema — `AuditLog` | No retention policy; table grows unbounded | Scheduled job: archive/delete logs older than 90 days (GDPR) |
| 20 | `apps/website/src/app/page.tsx:20-21` | Sign In / Sign Up buttons have no href or onClick | Wrap with `<Link href="/auth/login">` / `<Link href="/auth/register">` |
| 21 | `packages/shared/src/design/tokens.ts` | Tokens defined but not consumed by website or mobile | Export as CSS variables in `globals.css`; use in Expo `StyleSheet` |

### LOW — Post-Launch Features

- No password reset endpoint (email template exists, no route or token flow)
- No account deletion / GDPR right-to-erasure endpoint
- No subscription tier enforcement (`subscriptionTier` field exists, never checked)
- No badge auto-unlock engine
- No admin moderation dashboard (submit penalties, review flagged submissions)
- No notification preference settings (opt-out of email/push)
- No data export endpoint (GDPR right to portability)
- Mobile app screens (`dashboard.tsx`, `profile.tsx`, `verify.tsx`) have no API integration
