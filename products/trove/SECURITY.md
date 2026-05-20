# Security

## Reporting a vulnerability

Please email **security@trove.vroelabs.com** with:

- A description of the issue.
- Steps to reproduce.
- Impact (what an attacker could do).
- (Optional) a suggested fix.

We respond within 24 hours and aim to resolve within 7 days for high-severity issues. We credit researchers publicly once a patch ships. No bug bounty, but Pro for life.

## Scope

- Production: `https://trove.vroelabs.com` and `https://*.trove.vroelabs.com`.
- API: `/api/*` on the above hosts.

## Out of scope

- Denial-of-service / volumetric attacks.
- Social engineering of Vroe Labs staff.
- Third-party services (report directly to them: Supabase, Stripe, Resend, etc.).
- Self-XSS, missing best-practice headers without a working PoC.
- Vulnerabilities in unmodified dependencies (please file with the upstream project).

## Our practices

- Bug fixes for critical issues ship within 24 hours.
- All admin actions logged.
- Service-role keys server-only, rotated quarterly.
- Stripe webhooks signature-verified.
- Rate limiting on every public endpoint.
- CSP with strict-dynamic + per-request nonce.

## Disclosure

We follow coordinated disclosure. Please give us 90 days (or until a patch is available, whichever is sooner) before public disclosure.
