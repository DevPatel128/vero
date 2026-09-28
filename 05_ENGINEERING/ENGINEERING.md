# Engineering foundation

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21
> Source: The Framework. (imported unchanged apart from this header)
> Split from `ENGINEERING.md`: preamble, decision framework, section 1 (principles) and section 21 (quality gate). Section numbers are unchanged so old references still resolve.

## Purpose

Build products that are secure, simple, reliable, observable, performant and cost-efficient without unnecessary infrastructure or complexity.

Engineering exists to turn an approved product and experience into a production system.

## Engineering decision framework

Every meaningful technical change must answer:

### Why should we make this change?

What requirement, problem, risk or opportunity requires it?

### What impact will it have?

Describe:
- expected user impact
- security impact
- reliability impact
- performance impact
- operational impact
- maintenance impact
- expected measurable results
- risks and trade-offs

### How will we do it?

Describe:
- architecture
- implementation
- dependencies
- migration requirements
- testing
- deployment
- rollback/recovery

### How much will it cost?

Consider:
- compute
- database
- storage
- network
- third-party services
- developer time
- maintenance
- operational complexity

### Is the cost justified?

Compare expected value against total cost.

Always prefer the lowest-cost approach that satisfies required security, reliability, performance, compliance and product requirements.

Do not pay for complexity that does not produce proportional value.

## 1. Engineering principles

- Secure by default.
- Least privilege.
- Public-repository safe.
- Smallest practical architecture.
- One source of truth.
- Measure before optimizing.
- Fail safely.
- Recover deliberately.
- Observe production.
- Automate repetitive work.
- Minimize sensitive data.
- Minimize infrastructure.
- Lowest justified cost.
- Human approval for consequential production decisions.


## 21. Engineering quality gate

A system is engineering-complete when:

- source can safely be public
- secrets are protected
- authentication is correct
- authorization is explicit
- least privilege is applied
- data access is appropriately protected
- CIA risks are considered
- important actions are auditable
- performance is measured where material
- cost is justified
- appropriate tests pass
- failure/recovery is understood
- production is observable
- human approval requirements are satisfied
