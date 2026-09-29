# Security Audit

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-28
> Source: this session's own security-review pass (complete — see `REVIEWS.md`), `09_AUDIT/FILE_CHANGES.md`

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

Complete. Scope: the full `551e2cb...HEAD` diff for `website/site/` and `.github/`, excluding the documentation reorganization (docs-only, no product impact). Method: identify → filter false positives → report only confidence ≥ 0.8.

**Result: no high-confidence, newly-introduced vulnerability found beyond what this branch's own audit already documented and fixed (the 7 items above).**

Checked and explicitly ruled out:
- `clientIp()` (`src/lib/ratelimit.ts`) trusts `x-forwarded-for`'s first entry, which is client-spoofable — a rate-limiting concern, not reported (matches this file's existing acceptance that rate limiting is fail-open by design).
- A theoretical timing side-channel between the `created`/`!created` join response paths (welcome email only sent on create) — confidence too low to report (network-jitter-dependent, low severity for a public waitlist).
- `isSameOrigin()` (`src/lib/same-origin.ts`): correctly compares Origin/Referer host against the request's own Host header; no bypass found.
- `upstash-store.ts`'s `SET NX` claim-and-retry: correctly atomic; no double-entry or token-leak path; `findByEmail`/`findByCode` are not exposed via any route, so no enumeration endpoint exists.
- `email.ts`: never logs response bodies or PII-bearing tokens; fails closed (logging-only) when no Resend key is set in production.
- CSP is report-only as documented — no enforcement, so no regression risk; no `report-uri` configured, so no new exfiltration path.
- `.github/workflows/ci.yml`: SHA-pinned actions, `permissions: {}` default with per-job `contents: read`, no `pull_request_target`, no injectable untrusted input into `run:` steps.
- `/waitlist/[token]` page: 144-bit random token, not brute-forceable; correctly `noindex`; GET-only, no CSRF surface.

This satisfies the plan's step 15 requirement. See the PR body for the same summary.

## Local verification (CI unavailable)

GitHub Actions could not run on PR #15 — "recent account payments have failed or your spending limit needs to be increased" (a GitHub billing issue, unrelated to this PR's content). Every check CI would have run was reproduced locally on a clean install (`rm -rf node_modules .next && npm ci`), against this branch's actual `HEAD`:

| Check | CI job it stands in for | Result |
|---|---|---|
| `npm ci` (clean install) | — | 0 vulnerabilities reported during install |
| `npm run typecheck` | Typecheck, lint, test, build | Clean |
| `npm run lint` | Typecheck, lint, test, build | Clean |
| `npm test` (Playwright, 27 tests) | Typecheck, lint, test, build | 27/27 passed |
| `npm run build` | Typecheck, lint, test, build | Succeeded, route table unchanged |
| `npm audit --omit=dev` | npm audit (production dependencies) | 0 vulnerabilities |
| `gitleaks git --log-opts="HEAD"` (v8.21.2, downloaded directly from the gitleaks GitHub releases, not from an unverified source) | Secret scan | 0 leaks — see below |

**Secret scan detail:** a full-history scan restricted to this branch's actual ancestry (47 commits reachable from `HEAD`, matching what a PR checkout with `fetch-depth: 0` would see — verified this excludes commits from unrelated sibling branches, which a broader unscoped local scan incorrectly included at first) found 4 findings, all pre-existing in `main`'s history from commits `e6948c9` and `90748e6` (2026-05-20/21, months before this PR), in files removed from the tree entirely in a later `main` commit (`7365eb7`, "remove non-website products"). Each was manually inspected and confirmed to be a placeholder, not a real secret: an `.env.example` containing the literal string a literal PEM-header placeholder with no key material, an an `ENCRYPTION_KEY` set to a sequential-hex example sequential-hex example value, and a SwiftUI `Label`'s descriptive text naming a hashing algorithm that gitleaks' generic-api-key rule false-positived on. These are recorded by exact fingerprint in `.gitleaksignore` (added this branch) so the CI job can actually pass once GitHub Actions billing is restored, instead of being permanently red on pre-existing false positives unrelated to any PR's content. With that file in place, the scan is clean: 0 leaks.

**Not verified locally** (both require a live preview deploy, not just a local build): the waitlist join flow against a real Upstash instance, and `/api/health`'s 200/503 behavior. Both are already listed as pending in the PR's test plan, blocked on human action #1 (restore Upstash credentials).
