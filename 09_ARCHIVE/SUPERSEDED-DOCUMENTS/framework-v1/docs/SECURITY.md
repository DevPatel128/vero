# Security posture

VROE Labs builds verification infrastructure. Security is the product, not a checklist.

## Cryptography

- **Passwords** — Argon2id only. Tunable memory + parallelism. No SHA + salt anywhere.
- **JWT** — RS256 with rotated keys. No HS256 fallback. Short-lived access + refresh-aware.
- **PII at rest** — AES-256-GCM with per-tenant DEKs wrapped by KMS-managed KEKs.
- **ALVED records** — ECDSA P-256 detached signatures. Multi-attester from day one.
- **Trove vault** — vault-key derived client-side via Argon2id from a user-chosen passphrase. Server stores only ciphertext + minimal metadata required to chain.
- **Transport** — TLS 1.3 only. HSTS preload. CAA records pinned.

## Authentication

| Product | Primary             | Two-factor                | Notes                                                  |
| ------- | ------------------- | ------------------------- | ------------------------------------------------------ |
| Vero    | Phone OTP (MSG91)   | Optional 2FA, mandatory for SMB admins | India-first; WhatsApp deep-link receipts |
| RIE     | Email OTP           | Optional 2FA              | International audience                                  |
| Trove   | Email OTP + vault   | Mandatory vault passphrase | Zero-knowledge — server cannot decrypt vault           |

Cookies are `HttpOnly`, `SameSite=lax`, `Secure`. CSRF protection via double-submit cookie on cookie-authenticated mutations.

## Headers (per `next.config.ts`)

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(...), microphone=(), geolocation=(self)
Content-Security-Policy: default-src 'self'; ...  (per app)
```

## Operational

- Append-only audit log for all trust-affecting actions. 7-year retention for financial events.
- Quarterly key rotation. Documented runbook.
- Backups encrypted, geo-redundant, PITR tested monthly.
- Least privilege via IAM roles + scoped service tokens.
- No secrets in code. All credentials via env or KMS.

## Compliance

| Framework             | Scope                                                         |
| --------------------- | ------------------------------------------------------------- |
| DPDP Act 2023 (India) | Consent management, data principal rights, 72h breach notice  |
| GDPR / CCPA           | Data export + erasure across all three products               |
| IT Rules 2021 (India) | Grievance officer disclosure (live on `/legal/grievance`)     |
| SOC 2 Type I          | In scope post-launch                                          |
| PCI                   | Outsourced (Razorpay / Stripe). We never touch card data.     |

## Responsible disclosure

Report to `security@vroe.app`. 48-hour acknowledgement. Pre-launch we credit but don't pay bounties; we will once GA.

PGP fingerprint at `/.well-known/security.txt`.

## Known gaps (pre-launch)

The dev API routes (`/api/auth/otp`, `/api/auth/verify`, etc.) are **mocks** that issue demo sessions for local-development only. Production rollout sequence:

1. Wire MSG91 (Vero) / Resend (RIE, Trove) for real OTP issuance.
2. Move session issuance to RS256 JWT cookies via Supabase service-role + custom claims.
3. Move waitlist storage from no-op to Resend Audiences / Loops / Supabase.
4. Lock CSP nonces once real script origins stabilize.
5. Add SAST + DAST to CI (CodeQL + ZAP).

Tracked as P1 in the `vero` / `rie` / `trove` issues at launch.

