# Architecture

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21
> Source: The Framework. (imported unchanged apart from this header)
> Split from `ENGINEERING.md`: section 3. Section numbers are unchanged so old references still resolve.

## 3. Architecture

Choose the simplest architecture that satisfies the product requirements.

Before adding a service ask:

- Why does it exist?
- What requirement does it satisfy?
- Can an existing component do the job?
- What does it add to cost?
- What does it add to operational complexity?
- What new security boundary does it create?
- What happens if it fails?

Prefer fewer components when they provide the required result.

### Architecture flow

```text
Requirement
    ↓
Simplest viable design
    ↓
Security review
    ↓
Performance review
    ↓
Cost review
    ↓
Implementation
```
