# Security Audit

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: this session's own security-review pass (pending completion — see `REVIEWS.md`), `09_AUDIT/FILE_CHANGES.md`

This file records the outcome of the `/security-review` pass this branch's plan requires before opening a PR (step 15). It is being filled in as that pass completes, per `05_ENGINEERING/SECURITY-ASSURANCE.md`'s "security claims must point to verifiable evidence" rule — not written speculatively ahead of the actual findings.

## Vulnerabilities fixed on this branch (already shipped in commits, ahead of the formal review)

These were found by this branch's own audit (`09_AUDIT/RESEARCH.md`), not by an external report:

1. Waitlist `join` route returned the private signup token on a duplicate-email submission — email enumeration plus token/PII exposure. Fixed in `c6e7624`.
2. No rate limiting on either public `POST` endpoint. Fixed in `c00ec9d`.
3. No Origin/Referer check — cross-site POSTs to both public form endpoints were accepted. Fixed in `7bdc5c6`.
4. Non-atomic waitlist signup/referral counting — a check-then-act race could duplicate a signup or miscount referrals. Fixed in `dd7e1b8`.
5. Investor auto-reply throttled only per-IP, not per-email — abusable from multiple IPs against one target inbox. Fixed in `d7971d3`.
6. Waitlist email passed in a URL query string — logged in browser history, referrers, and server access logs. Fixed in `07aae59`.
7. No Content-Security-Policy. Added report-only in `7a6e2cb` (enforcement deferred — see `05_ENGINEERING/SECURITY.md` and `08_DECISIONS/` for why enforcing it is out of scope here).

## Formal `/security-review` pass

Pending — see `REVIEWS.md`. Result will be appended here and to the PR body once complete.
