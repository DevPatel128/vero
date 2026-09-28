# 17 — API Architecture

## Style
- REST first, OpenAPI 3.1 spec at `/api/openapi.json`.
- Versioned via URL prefix: `/api/v1/...`.
- Edge functions for hot endpoints. Node functions for heavier ops.
- Server actions inside the App Router for auth-walled mutations.

## Surfaces

### Public (no auth)
- `GET /api/v1/health` — liveness.
- `GET /u/{handle}.jsonld` — public ALVED profile.
- `GET /api/v1/profiles/{handle}` — public profile JSON.
- `GET /api/v1/jobs/{id}/public` — sanitized public job view.
- `POST /api/v1/waitlist` — email-only.

### Auth (worker / business / admin)
- `POST /api/v1/auth/otp/start` — request OTP.
- `POST /api/v1/auth/otp/verify` — verify OTP, issue JWT cookie.
- `POST /api/v1/auth/logout` — revoke session.
- `GET /api/v1/me` — current user.
- `PATCH /api/v1/me` — profile update.
- `POST /api/v1/me/kyc/start` — DigiLocker init.
- `POST /api/v1/me/kyc/callback` — DigiLocker callback.

### Worker
- `GET /api/v1/jobs?neighborhood=&category=&q=` — discover.
- `POST /api/v1/applications` — apply.
- `POST /api/v1/jobs/{id}/sign` — sign completion.
- `GET /api/v1/me/records` — list of own ALVED records.
- `GET /api/v1/me/wallet` — balance + payout history.

### Business
- `POST /api/v1/jobs` — post.
- `PATCH /api/v1/jobs/{id}` — edit while in `draft` or `open`.
- `POST /api/v1/jobs/{id}/applications/{worker_id}/accept`.
- `POST /api/v1/jobs/{id}/sign` — sign completion.
- `POST /api/v1/jobs/{id}/disputes`.

### Admin
- `GET /api/v1/admin/users`.
- `GET /api/v1/admin/disputes`.
- `POST /api/v1/admin/disputes/{id}/resolve`.
- `GET /api/v1/admin/audit-log`.

### Webhooks (inbound)
- `POST /api/v1/webhooks/razorpay`.
- `POST /api/v1/webhooks/msg91`.
- `POST /api/v1/webhooks/digilocker`.
- `POST /api/v1/webhooks/resend`.

## Auth model
- Cookie-based session (`HttpOnly; Secure; SameSite=lax`) carrying RS256 JWT.
- Server-to-server: bearer token signed by KMS, issued via developer console (post-GA).
- All cookie-authenticated mutations require CSRF token (double-submit).

## Error format (RFC 7807-ish)
```json
{
  "type": "https://vroe.app/errors/invalid-input",
  "title": "Invalid input",
  "status": 422,
  "detail": "Phone number is not a valid E.164 value.",
  "instance": "req_01HXY..."
}
```

## Idempotency
- All mutating endpoints accept `Idempotency-Key`.
- Stored in Redis 24h.

## Rate limits
- Per-IP + per-user where applicable.
- Returned as `X-RateLimit-*` headers and `Retry-After` on 429.

## Pagination
- Cursor-based for large lists.
- `limit` capped at 100.
- Cursors are opaque opaque base64 strings.

## Versioning policy
- Backwards-compatible additions are non-breaking.
- Breaking changes get a new version path (`/api/v2`).
- Old versions deprecated with 6 months notice + `Sunset` header.

## OpenAPI
- Spec at `/api/openapi.json`.
- Swagger UI at `/docs/api` (developer surface).
- SDKs generated from the spec (`@vroe/sdk-ts`, `@vroe/sdk-py` post-GA).

## Webhooks (outbound, signed)
- ALVED record minted → `record.minted`.
- Job state changes → `job.state_changed`.
- Escrow events → `escrow.event`.
- Signed via ECDSA P-256 with a per-tenant key. Replay-protected with timestamp + nonce.

## Documentation
- Per-endpoint Markdown in `apps/vero/docs/api/`.
- Examples in `curl` and TypeScript.
- Postman / Insomnia collection auto-generated.

## SLOs
- 99.9% availability for read endpoints.
- 99.5% for write endpoints.
- p95 latency: 200ms (edge), 500ms (node).
- p99 latency: 800ms (edge), 1.5s (node).

