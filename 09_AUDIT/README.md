# Audit

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `09_AUDIT/README.md` structure; content is this repo's actual history, manually reconstructed (no automated event logger exists — see `00_START_HERE/AI_AUDIT_ENGINE.md` "Applied in this repo")

**Purpose:** reconstruct what actually happened, who authorized it, and whether it can be trusted or reversed.

**Does not belong here:** what was decided and why (`08_DECISIONS/`) — this folder records what was *done* about a decision, not the decision itself.

**Important files:** `ACTIONS.md`, `AI_GOVERNANCE.md`, `APPROVALS.md`, `DECISIONS.md`, `DEPLOYMENTS.md`, `ERRORS.md`, `FILE_CHANGES.md`, `RESEARCH.md`, `REVIEWS.md`, `SECURITY.md`

## Audit model

```text
IDENTITY
  ↓
INTENT
  ↓
EVIDENCE
  ↓
AUTHORIZATION
  ↓
ACTION
  ↓
RESULT
  ↓
VALIDATION
  ↓
AUDIT TRAIL
```

## How to read this folder

Every file here is a manually-maintained ledger for one branch of work: this branch, `chore/framework-alignment`, from its start (`main` at `551e2cb`) through the PR that follows. Git commits are the authoritative `files_changed`/timestamp/actor record; these files are the human-readable narrative layered on top, answering the accountability questions in `00_START_HERE/AI_AUDIT_ENGINE.md`: who acted, what, when, why, under what evidence, who approved it, what changed, what was tested, what happened, can it be reversed.
