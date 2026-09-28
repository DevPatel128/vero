# AI Audit Engine

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `00_START_HERE/AI_AUDIT_ENGINE.md` (imported unchanged apart from this header and the "Applied in this repo" section)

## Mission
Create end-to-end accountability for AI work across every agent, file, tool, decision and consequential execution.

## Audit chain
INTENT → CONTEXT → RESEARCH → PROPOSAL → POLICY CHECK → APPROVAL → ACTION → VALIDATION → RESULT → DOCUMENTATION → AUDIT

## Minimum event schema
```yaml
action_id:
timestamp:
session_id:
task_id:
parent_action_id:
agent:
agent_version:
action_type:
target:
operation:
reason:
evidence_refs: []
decision_id:
approval_id:
policy_version:
risk_level:
permissions_used: []
tools_used: []
input_refs: []
before_state_hash:
after_state_hash:
files_changed: []
resources_changed: []
tests_run: []
result:
error:
rollback_ref:
human_review:
```

## Required controls
- Append-only audit storage.
- Tamper-evident event chaining where practical.
- Unique event IDs.
- UTC timestamps.
- Actor and agent identity.
- Tool-call records.
- File change records.
- Decision and approval linkage.
- Policy version linkage.
- Validation/test linkage.
- Rollback linkage.
- Retention policy.
- Access control for audit logs.
- Alerts for suspicious behavior.

## High-impact action rule
For destructive, financial, administrative, privileged, externally visible or production actions:
1. preview exact action;
2. bind approval to exact actor/tool/target/parameters;
3. use short-lived authorization where practical;
4. prevent replay;
5. execute idempotently where possible;
6. validate result;
7. log outcome.

## Audit integrity
The AI must not be able to erase or rewrite its own historical audit trail through ordinary agent permissions.

## Accountability questions
The system must be able to answer:
- Who acted?
- What did it do?
- When?
- Why?
- Based on what evidence?
- Under what policy?
- With what permissions?
- Who approved it?
- What changed?
- What tests ran?
- What happened?
- Can it be reversed?

## Applied in this repo

There is no automated event-schema logger today — `09_AUDIT/` is a manually maintained ledger (git commits are the `files_changed`/`before_state_hash`/`after_state_hash` record; CI runs are the `tests_run` record; `08_DECISIONS/` entries are the `decision_id`/`approval_id` record). Building the automated version described above is not scoped or costed; it would be a `08_DECISIONS/ENGINEERING/` proposal once there is more than one agent or a production system with real user data to justify it, per the lowest-justified-cost principle.
