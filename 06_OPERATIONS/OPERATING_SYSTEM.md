# Operations Operating System

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `06_OPERATIONS/OPERATING_SYSTEM.md` (imported unchanged apart from this header and "Applied in this repo")

Build → Release → Observe → SLO → Error Budget → Incident/Learning → Corrective Action → Documentation → Architecture/Product Update.

Readiness:
ownership, SLOs, monitoring, alerts, runbooks, backups, recovery, rollback, capacity, cost, vendor dependencies, communication and audit.

Identify toil and remove, simplify, automate or safely delegate it.

## Applied in this repo

Readiness checklist for `website/site` today: ownership (Dev Patel, sole owner) — yes. SLOs — no, see `05_ENGINEERING/SRE.md`. Monitoring/alerts — partial: `/api/health` exists, no alert wired to it (`OBSERVABILITY.md` "recommended next step"). Runbooks — `RUNBOOKS/README.md`, empty by design until a procedure repeats. Backups — no (`BACKUPS.md`). Recovery — Vercel Instant Rollback for code, none for data (`DISASTER-RECOVERY.md`). Rollback — yes (`ROLLBACKS.md`). Capacity — not applicable at current scale. Cost — Vercel/Upstash free-tier usage, not separately tracked (`FINOPS.md`). Vendor dependencies — Vercel, Upstash, Resend, all single points of failure with no fallback vendor, accepted at this scale. Communication — none needed yet (no users). Audit — `09_AUDIT/`.
