# Site Reliability Engineering

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-28
> Sources: Wolf v3 framework, `05_ENGINEERING/SRE.md`; the v2 "Observability, failure and recovery" content this file held before (kept below — `06_OPERATIONS/OBSERVABILITY.md` and `06_OPERATIONS/DISASTER-RECOVERY.md` now own the operational detail, this file owns the SLO framing)

Reliability is a product feature.

SLI = what we measure.
SLO = reliability target.
SLA = external commitment when applicable.
Error budget = tolerated unreliability implied by the SLO.

Track availability, latency, correctness, freshness and successful transactions where relevant.

Healthy budget → normal release velocity.
Budget under pressure → investigate risky changes.
Budget exhausted → prioritize reliability.

Measure → Alert → Diagnose → Mitigate → Recover → Learn → Change → Re-measure.

## Applied in this repo

No SLI/SLO/error budget is defined for `website/site` yet — per `01_PRINCIPLES/PRINCIPLES.md`'s lowest-justified-cost rule, a pre-launch waitlist site with no paying users does not need a formal error budget before it has real usage to set one from. `/api/health` (added this PR) is the first SLI candidate (store reachability); once there is traffic data, set an availability SLO from it — not done in this PR. `06_OPERATIONS/DISASTER-RECOVERY.md`'s "revisit condition" (before Phase 1 launch) is also the natural trigger for this.

### Minimum useful observability (v2, still applies)

logs, metrics, errors, health, alerts. Observability must not become a source of data leakage — never log passwords, tokens, private keys, unnecessary personal data, or sensitive payloads without a justified need. `06_OPERATIONS/OBSERVABILITY.md`'s "logging discipline" section is the canonical rule; `src/lib/email.ts` was fixed in this PR specifically because it violated it.

### Failure and recovery (v2, still applies)

For important components ask: What can fail? How will we detect it? What happens to the user? Can the system fail safely? How do we recover? How do we verify recovery?

`Detect → Contain → Recover → Verify → Document → Improve`. `06_OPERATIONS/INCIDENTS.md` and `06_OPERATIONS/ROLLBACKS.md` are where this loop is applied for real incidents.
