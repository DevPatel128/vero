# Disaster Recovery

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: this PR's site audit (2026-09-21/22); 06_OPERATIONS/{INCIDENTS,ROLLBACKS,BACKUPS}.md

## Scope

This covers `website/site`, the only production system today. There is no other deployed system to plan around (`application/` is archived, unbuilt — see `10_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/ARCHIVED.md`).

## Failure scenarios and current readiness

| Scenario | Current readiness |
|---|---|
| Bad deploy breaks the site | Ready — Cloudflare Workers version rollback, see `06_OPERATIONS/ROLLBACKS.md` |
| Waitlist data store becomes unreachable | Detected via `/api/health`, added in this PR. Recovery depends on Cloudflare D1 (Time Travel restore, see `06_OPERATIONS/BACKUPS.md`) |
| Waitlist data is lost outright | Not ready — no confirmed backup, see `06_OPERATIONS/BACKUPS.md` |
| Cloudflare account/Worker itself is lost or locked | Not planned for — no documented secondary hosting path |
| Domain (`vero.work`) becomes unreachable | The site serves from a `*.workers.dev` URL until a custom domain is attached; `vero.work` is the canonical URL in code but is not confirmed attached to the Worker (owner action) |

## Principle

Per `05_ENGINEERING/ENGINEERING.md`'s "lowest justified cost" rule: this repo does not need enterprise-grade disaster recovery for a pre-launch waitlist site. It needs the store to be reliably backed up (not yet true) and someone to notice when it breaks (now true, via `/api/health`). Scale the plan up only when there is real user data and revenue at stake — Phase 1 launch is the natural trigger to revisit this file.

## Revisit condition

Before Phase 1 launch (real paid transactions, real user accounts), this file needs a real RTO/RPO target and a confirmed backup strategy — not just the reactive posture described above.
