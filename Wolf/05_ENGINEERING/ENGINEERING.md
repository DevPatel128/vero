# Engineering Framework

## Goal
Secure, simple, reliable, observable, performant and cost-efficient systems without unnecessary infrastructure or complexity.

## Technical change framework
WHY → IMPACT/RESULTS → HOW → COST → JUSTIFICATION → ALTERNATIVES → RISKS → APPROVAL → AUDIT

## Principles
- secure by default
- least privilege
- public-repository safe
- smallest practical architecture
- one source of truth
- measure before optimizing
- fail safely
- recover deliberately
- observe production
- automate repetitive work
- minimize sensitive data
- minimize infrastructure
- lowest justified total cost
- human approval for consequential production decisions

## Public repository
Never commit secrets, private keys, credentials, production datasets or unnecessary sensitive data. Use secret management, scanning, dependency controls, branch protection and credential rotation.

## Architecture
Prefer the simplest architecture that satisfies requirements.
Before adding a service ask why, requirement, existing alternative, cost, complexity, security boundary, failure mode and operational burden.

## Microservices/Kubernetes
They are optional scaling tools, not default architecture.
Start with a modular monolith unless requirements justify service separation.
Introduce services when independent scaling, isolation, team boundaries, deployment independence, reliability or security boundaries create measurable value.
Use Kubernetes only when orchestration requirements justify its operational cost and complexity.
Always compare against simpler alternatives.

## Performance
Correctness → Security → Reliability → Measure → Optimize → Re-measure.

## Code minimization
Write the minimum necessary code and dependencies to solve the requirement correctly and securely.
Remove duplication, dead code, unnecessary abstraction, unnecessary state, redundant requests, unnecessary libraries and premature frameworks.
Do not minimize line count when doing so harms readability, security, correctness, testability or maintainability.

## Quality gate
Public-safe, authenticated, authorized, least privilege, secure data access, appropriate tests, measured material performance, justified cost, recovery path, observable production, documented and audited consequential changes.
