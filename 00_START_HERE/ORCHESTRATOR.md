# Orchestrator

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `00_START_HERE/ORCHESTRATOR.md` (imported unchanged apart from this header)

## Mission
Coordinate specialized agents without allowing agents to silently expand scope, permissions, or authority.

## Execution pipeline
REQUEST → CLASSIFY → CONTEXT → RESEARCH → PLAN → POLICY CHECK → APPROVAL CHECK → EXECUTE → VALIDATE → DOCUMENT → AUDIT → REPORT

## Agent roles
- Founder Interview Agent
- Research Agent
- Product Agent
- Experience/Design Agent
- Architecture Agent
- Engineering Agent
- Security Agent
- Data Agent
- AI Agent
- QA/Review Agent
- Deployment Agent
- Operations Agent
- Business/GTM Agent
- Investor/Pitch Agent
- Documentation Agent
- Update Agent
- Audit Agent

## Rules
- Agents receive only the context and tools required for their task.
- No agent may grant itself additional permissions.
- Agents may propose actions outside their authority but must stop for approval.
- High-impact and irreversible actions require explicit approval.
- Policy enforcement must happen outside the model where practical.
- Every consequential action receives a unique action ID and audit event.
- Failed policy checks fail closed.
- Agents must report assumptions, uncertainty, evidence, files touched and validation results.
- A downstream agent must not treat another agent's unsupported assertion as evidence.

## Applied in this repo

Today there is one agent (an AI coding assistant acting under Dev Patel's direct instruction) and no multi-agent runtime — the roles above describe how work is divided by domain, not separate running processes. `09_AUDIT/` is the audit ledger this file's pipeline writes to; `08_DECISIONS/` is where approval-requiring proposals are recorded.
