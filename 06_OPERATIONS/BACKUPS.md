# Backups

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: this PR's site audit (2026-09-21/22)

## Code

Git, hosted on GitHub (`DevPatel128/vero`, private). Every commit is a recoverable point. This is sufficient backup for code; no additional code backup exists or is needed.

## Data

`website/site`'s only production data store is Upstash Redis, holding waitlist entries (email, name, role, city, free-text use-case, referral data). As of this PR, **no backup strategy for this data has been confirmed** — Upstash's own backup/export capabilities for this database have not been checked as part of this PR. Given the incident in `06_OPERATIONS/INCIDENTS.md` (the database appears to have been deleted or become unreachable), whatever waitlist data existed before that point may not be recoverable.

## Documentation

This documentation system lives in git alongside the code — the same backup guarantee applies. `10_ARCHIVE/` preserves superseded material rather than deleting it, per `00_START_HERE/DOCUMENTATION_SYSTEM.md`.

## Gaps

- No confirmed backup/export schedule for the Upstash waitlist data.
- No documented recovery time objective (RTO) or recovery point objective (RPO) for any system.

## Recommended next step (not done in this PR)

Once the Upstash database is restored (see `06_OPERATIONS/INCIDENTS.md`), confirm whether Upstash's plan includes automatic backups, and if not, add a scheduled export of the waitlist data. This is a decision with a real cost trade-off (Upstash plan tier) and belongs in `08_DECISIONS/ENGINEERING/` once scoped.
