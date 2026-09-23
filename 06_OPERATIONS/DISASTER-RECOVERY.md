# Disaster Recovery

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: this PR's site audit (2026-09-21/22); 06_OPERATIONS/{INCIDENTS,ROLLBACKS,BACKUPS}.md

## Scope

This covers `website/site`, the only production system today. There is no other deployed system to plan around (`application/` is archived, unbuilt — see `09_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/ARCHIVED.md`).

## Failure scenarios and current readiness

| Scenario | Current readiness |
|---|---|
| Bad deploy breaks the site | Ready — Vercel Instant Rollback, see `06_OPERATIONS/ROLLBACKS.md` |
| Waitlist data store becomes unreachable | Detected via `/api/health`, added in this PR. Recovery depends on Upstash support/console access, which is outside this repo's control |
| Waitlist data is lost outright | Not ready — no confirmed backup, see `06_OPERATIONS/BACKUPS.md` |
| Vercel account/project itself is lost or locked | Not planned for — no documented secondary hosting path |
| Domain (`vero.work`) becomes unreachable | Not applicable to the current deployment, which serves from a `*.vercel.app` domain; `vero.work` is referenced in code as the canonical URL but is not yet confirmed attached to this Vercel project (see `00_START_HERE/README.md`'s code map and this PR's open human-action items) |

## Principle

Per `05_ENGINEERING/FOUNDATION/ENGINEERING-FOUNDATION.md`'s "lowest justified cost" rule: this repo does not need enterprise-grade disaster recovery for a pre-launch waitlist site. It needs the store to be reliably backed up (not yet true) and someone to notice when it breaks (now true, via `/api/health`). Scale the plan up only when there is real user data and revenue at stake — Phase 1 launch is the natural trigger to revisit this file.

## Revisit condition

Before Phase 1 launch (real paid transactions, real user accounts), this file needs a real RTO/RPO target and a confirmed backup strategy — not just the reactive posture described above.
