# Operations

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `06_OPERATIONS/OPERATIONS.md` (imported unchanged apart from this header); this is now the folder's entry point — see `README.md` for the file index

Production readiness:
ownership, on-call, monitoring, alerting, runbooks, backups, recovery, incident response, change management, capacity, cost monitoring, vendor dependencies and service-level objectives where justified.

Operational loop:
DETECT → CONTAIN → RECOVER → VERIFY → DOCUMENT → IMPROVE

## Applied in this repo

On-call: none — Dev Patel is the only person who can respond, and there is no rotation to define at this scale. Change management: `08_DECISIONS/` for anything meaningful, PR review (`.github/CODEOWNERS`) for code. The operational loop above is the same loop `INCIDENTS.md` and `ROLLBACKS.md` apply to real events; this file is the entry point, those are where it is actually exercised.
