# Backups

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: this PR's site audit (2026-09-21/22)

## Code

Git, hosted on GitHub (`DevPatel128/vero`, private). Every commit is a recoverable point. This is sufficient backup for code; no additional code backup exists or is needed.

## Data

`website/site`'s only production data store is Cloudflare D1 (database `vero-waitlist`), holding waitlist entries (email, name, role, city, free-text use-case, referral data) and rate-limit counters. D1 offers Time Travel point-in-time restore for its databases. The retention window on this account's plan has not been confirmed in this repo, so do not rely on a specific number until it is checked in the Cloudflare dashboard. No off-Cloudflare export exists.

The earlier Upstash Redis database was unreachable when the site was audited (see `06_OPERATIONS/INCIDENTS.md`), and whatever waitlist data it held is not recoverable. The D1 database started empty.

## Documentation

This documentation system lives in git alongside the code — the same backup guarantee applies. `10_ARCHIVE/` preserves superseded material rather than deleting it, per `00_START_HERE/DOCUMENTATION_SYSTEM.md`.

## Gaps

- No scheduled export of the D1 waitlist data outside Cloudflare, and the Time Travel retention window is unconfirmed.
- No documented recovery time objective (RTO) or recovery point objective (RPO) for any system.

## Recommended next step

Confirm the D1 Time Travel retention window for this account, and decide whether a periodic `wrangler d1 export` to storage outside Cloudflare is worth it once there are real signups. That is a cost decision for `08_DECISIONS/ENGINEERING/`.
