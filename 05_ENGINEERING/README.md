# Engineering

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21

**Purpose:** build secure, simple, reliable, observable, fast and cheap software. This is the source of truth for how software is built here.
**Belongs here:** the engineering framework, architecture, security, data, CI/CD, reliability, performance, cost, developer setup, AI agent contracts.
**Does not belong here:** product scope (`02_PRODUCT`), visual rules (`04_DESIGN`), live-incident steps (`06_OPERATIONS`), decisions (`08_DECISIONS`).

The original `ENGINEERING.md` was split without rewording. Section numbers are unchanged. Use this table to resolve any reference such as "ENGINEERING.md §16".

| Old section | Topic | File |
|---|---|---|
| Preamble, §1, §21 | Decision framework, principles, quality gate | `FOUNDATION/ENGINEERING-FOUNDATION.md` |
| §2, §6-§12, §19 | Repository security, authentication, authorization, RLS, least privilege, auditability, CIA, data minimization, incident response | `SECURITY/SECURITY.md` |
| §3 | Architecture | `ARCHITECTURE/ARCHITECTURE.md` |
| §4 | Cloudflare | `INFRASTRUCTURE/CLOUDFLARE.md` |
| §5 | Supabase and data | `DATA/SUPABASE-AND-DATA.md` |
| §13 | Performance | `PERFORMANCE/PERFORMANCE.md` |
| §14 | Cost optimization | `COST/COST-OPTIMIZATION.md` |
| §15 | Testing | `DEVELOPMENT/TESTING.md` |
| §16, §20 | Deployment, production approval | `CI-CD/DEPLOYMENT.md` |
| §17, §18 | Observability, failure and recovery | `RELIABILITY/OBSERVABILITY-AND-RECOVERY.md` |
| n/a | AI operating rules, agent contracts, product creation system | `AI/` |
| n/a | How to run, test and ship this repo | `DEVELOPER-EXPERIENCE/` |

Vero-specific facts (current stack, endpoints, limits, known gaps) are recorded next to the generic rule in the same folder, in a file named `VERO-*.md`. The generic rule stays unchanged.

**Source-of-truth rule:** the framework files here define the standard. Vero files describe how this repo meets it. If they disagree, open an entry in `08_DECISIONS/ENGINEERING/`. Do not silently edit the standard.
