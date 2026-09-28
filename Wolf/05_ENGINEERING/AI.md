# AI Systems

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
