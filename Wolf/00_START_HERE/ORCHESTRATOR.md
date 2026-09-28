# Orchestrator

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
