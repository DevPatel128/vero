# Engineering

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-28
> Source: adapted for the Wolf v3 layout (flat, no subfolders); supersedes the v2 subfolder index this file held before

**Purpose:** build secure, simple, reliable, observable, fast and cheap software. This is the source of truth for how software is built here.
**Belongs here:** the engineering framework, architecture, security, identity, data, networking, CI/CD, delivery, reliability, performance, cost, quality, developer experience, AI-in-product.
**Does not belong here:** product scope (`02_PRODUCT`), visual rules (`04_DESIGN`), live-incident steps (`06_OPERATIONS`), decisions (`08_DECISIONS`), legal/compliance (`07_BUSINESS/LEGAL-COMPLIANCE.md`).

Wolf keeps this folder flat — no subfolders. The original v2 `ENGINEERING-FOUNDATION.md` split (by section number) is preserved inside each file's header; section numbers are unchanged so an old "ENGINEERING.md §16" reference still resolves.

| File | Topic |
|---|---|
| `ENGINEERING.md` | Decision framework, principles, quality gate |
| `ARCHITECTURE.md` | Architecture |
| `ARCHITECTURE-REVIEW.md` | Architecture review checklist |
| `SECURITY.md` | Repository security, authentication, authorization, least privilege, auditability, CIA, data minimization, incident response |
| `SECURITY-ASSURANCE.md` | Security requirement → control → evidence → residual-risk chain |
| `THREAT-MODEL.md` | STRIDE + agentic threats, applied to `website/site` |
| `IDENTITY.md` | Identity, authentication, authorization |
| `NETWORKING.md` | Infrastructure / networking (Cloudflare) |
| `DATA.md` | Data platform, schema |
| `COST.md` | Cost optimization |
| `QUALITY.md` | Testing |
| `PERFORMANCE.md` | Performance |
| `SRE.md` | SLI/SLO/error budget, observability and recovery |
| `CI-CD.md` | Continuous integration and delivery pipeline |
| `DELIVERY.md` | Software delivery metrics (DORA) |
| `DEPLOYMENT.md` | Deployment and production approval |
| `DEVELOPER-EXPERIENCE.md` | Local setup, scripts, code ownership |
| `AI.md` | AI systems inside the product (not the AI building the product — see `00_START_HERE/AI_OPERATING_RULES.md` for that) |

Vero-specific facts (current stack, endpoints, limits, known gaps) are recorded inline in each file's "Applied in this repo" section rather than in a separate `VERO-*.md`, since Wolf's flat layout has no subfolder to hold a paired file in.

**Source-of-truth rule:** the framework text in each file defines the standard. The "Applied in this repo" sections describe how this repo meets it. If they disagree, open an entry in `08_DECISIONS/ENGINEERING/`. Do not silently edit the standard.
