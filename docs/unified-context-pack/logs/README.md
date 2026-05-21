# Logs

This folder stores edit history for the unified context pack.

## Structure
- `global/` — cross-product and umbrella change logs
- `products/vero/` — Vero-specific change logs
- `products/rie/` — RIE-specific change logs
- `products/trove/` — Trove-specific change logs
- `shared/` — shared-system change logs
- `website/` — marketing and public-content change logs

## Log policy
- Append-only in practice.
- Each entry should record who changed what, when, and why.
- Log the context-pack section that governs the change.
- If the pack could not be updated immediately, the gap must be recorded here.

## Entry fields
- Agent
- Timestamp
- Files changed
- Summary
- Reason
- Context-pack section
- Verification status

