# 07 — Change Policy

## Rule
Any AI-driven repo change should trigger a context-pack update according to this pack.

## Update behavior
- Update the relevant context-pack file in the same change set whenever feasible.
- If that is not possible, create a log entry immediately.
- Follow up with a pack update before or with the next related change.

## What must be logged
- Agent name
- Timestamp
- Files changed
- Summary of edits
- Reason for edits
- Relevant context-pack section
- Verification status

## Anti-patterns
- Silent AI edits
- Untracked drift between code and documentation
- Leaving the pack outdated after a product change

