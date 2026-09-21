# 12 — Security Rules

## Objective
Protect users, data, identity, money, reputation. Security is not a feature — it is the product.

## Cryptography
- **Passwords:** Argon2id only. Memory ≥ 19456 KiB, iterations ≥ 2, parallelism 1. No SHA-only password hashing anywhere.
- **JWT:** RS256, rotated quarterly, signed by KMS. Short-lived access (≤ 15m) + refresh-aware cookie.
- **PII at rest:** AES-256-GCM with per-tenant DEK wrapped by KMS-managed KEK.
- **ALVED attestations:** ECDSA P-256 detached signatures over canonical `bodyHash`.
- **Transport:** TLS 1.3 only. HSTS preload. CAA records pinned.
- **Crypto package:** `@vroe/crypto` is the single dependency for crypto. Reuses RIE's audited primitives. **Never re-implement.**

## Authentication
| Surface     | Primary auth         | Second factor                            |
| ----------- | -------------------- | ---------------------------------------- |
| Worker      | Phone OTP (MSG91)    | Optional 2FA                             |
| Business    | Email OTP (Resend)   | Optional 2FA, mandatory for admins       |
| Admin       | Email OTP            | Mandatory TOTP, hardware-key-eligible    |

- Cookies: `HttpOnly`, `Secure`, `SameSite=lax`.
- CSRF: double-submit cookie on all cookie-authenticated mutations.
- Session rotation on privilege escalation.

## Headers (per `next.config.ts`)
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(self), microphone=(), geolocation=(self), payment=(self)
Content-Security-Policy: default-src 'self'; img-src 'self' data: https://*.vroe.app https://*.r2.cloudflarestorage.com; script-src 'self' 'nonce-{nonce}'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.vroe.app https://*.supabase.co https://api.razorpay.com; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
```

## Input validation
- All inputs validated server-side with Zod 4 schemas.
- File uploads: MIME sniffed (not extension), size capped, ClamAV-scanned post-upload.
- Profile fields: length-capped, HTML-stripped, URL-sanitized.
- Razorpay metadata: validated against allowlist.

## XSS / injection
- React + server components handle escaping.
- `dangerouslySetInnerHTML` is banned outside `@vroe/ui` and only for sanitized markdown via DOMPurify on a server context.
- All SQL goes through Supabase or parameterized queries.

## CSRF + session
- State-changing routes require:
  - Cookie auth + matching CSRF token (double-submit), or
  - Bearer token (server-to-server).
- Sessions invalidated on password change, role change, MFA enroll, KMS key rotation.

## Upload security
- Type-allowlist (image/jpeg, image/png, image/heic, application/pdf).
- Size limit per surface (5MB profile, 25MB record evidence).
- Stored in R2 under per-tenant key path.
- Public access via signed URL with 5-minute TTL.
- Sensitive uploads (KYC documents) — encrypted DEK per upload.

## Trust abuse prevention
Cover the same surfaces listed in `06-trust-system.md`:
- fake accounts → phone + DigiLocker
- review abuse → only counterparties of real jobs
- collusion → loop detection
- trust farming → minimum-effort threshold
- duplicate identity → DigiLocker dedup
- spam referrals → credit only after activation
- malicious uploads → scanning + signed URLs
- dispute manipulation → admin review, both heard

## Payment security
- Razorpay handles cards. **Vero never sees a card number.**
- Razorpay Smart Collect virtual accounts mean Vero never holds funds.
- Webhook signatures verified on every event.
- Idempotency keys on every payout attempt.
- Audit log entry on every money-moving event.

## Admin security
- Admin routes auth-walled + role-walled.
- Mandatory 2FA + IP allowlist.
- All admin actions audit-logged.
- Bulk operations require a second-admin co-sign within 1 hour.

## Privacy
- Public ALVED records: only what the user opted to publish.
- Private fields: never shown via API, even to admins, except via the audited "support access" flow.
- `Right to be forgotten` — full PII deletion within 30 days of request. ALVED records: anonymized handle but content preserved for counterparties (per DPDP rationale).

## Principle of least privilege
- Service-role keys scoped per function via IAM.
- Worker tokens scoped to their handle.
- Admin tokens scoped to role.

## Security incident response
- Severity scale 1–4.
- 24/7 oncall pre-GA.
- Incident channel + post-mortem requirement.
- 72-hour breach notification (DPDP) — pre-prepared template.

## Known gaps (pre-launch, tracked)
- Mock OTP routes in dev only. **Never deployed to production.**
- SAST + DAST land in CI before GA (CodeQL + ZAP).
- SOC 2 Type I scope kicks off post-launch.

## Threat model
- **External attacker** — credential stuffing, scraping, SSRF, IDOR.
- **Malicious worker** — fake completions, KYC bypass.
- **Malicious business** — wage withholding, escrow abuse.
- **Insider** — admin abuse → audit + co-sign.
- **Supply chain** — npm dependency compromise → renovate + Snyk.

