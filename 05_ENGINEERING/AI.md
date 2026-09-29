# AI Systems

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `05_ENGINEERING/AI.md` (imported unchanged apart from this header and "Applied in this repo")

## AI architecture
Model → policy layer → tools → data → validation → audit.

## Requirements
- model/provider registry
- prompts as versioned artifacts
- model/version tracking
- input/output controls
- grounding where needed
- evaluation datasets
- hallucination/uncertainty handling
- prompt injection defense
- tool permissions
- cost/token budgets
- latency budgets
- fallback behavior
- human escalation
- monitoring
- auditability
- privacy controls

Never use the LLM itself as the final authorization boundary.

## Applied in this repo

`website/site` has no AI feature in production today. `PRODUCT.md`'s capabilities table lists "AI-assisted job matching" as P2+ (after Phase 1), not yet built or scoped — this file's requirements apply once that ships, not before. The only AI system currently operating on this repo is the development-time coding assistant, governed by `00_START_HERE/AI_OPERATING_RULES.md` (policy layer), `00_START_HERE/ORCHESTRATOR.md` (agent roles/permissions) and `09_AUDIT/AI_GOVERNANCE.md` (audit), not by this file, which describes an AI feature inside the product itself.
