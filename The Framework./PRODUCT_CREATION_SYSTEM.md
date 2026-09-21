# Product Creation System

## Purpose

A reusable AI-assisted system for turning an idea into a researched, validated, documented, built, approved, and continuously improved product.

## Lifecycle

IDEA → INTERVIEW → RESEARCH → VIABILITY DECISION → PRODUCT → THESIS → EXPERIENCE → INVESTOR → DESIGN → ENGINEERING → TEST → PREVIEW → HUMAN APPROVAL → PRODUCTION → OBSERVE → IMPROVE

## Core rule

AI does the investigation and preparation. Humans retain final authority over product, legal, financial, safety, privacy, security exceptions, and production decisions.

## Source of truth

- `PRINCIPLES.md`: immutable product/company rules.
- `RESEARCH.md`: evidence and current external knowledge.
- `PRODUCT.md`: what is being built and why.
- `THESIS.md`: why the product/company should exist.
- `EXPERIENCE.md`: how the product should feel and behave.
- `INVESTOR.md`: evidence-based investment narrative.
- `DECISIONS.md`: accepted/rejected decisions and rationale.
- `INTERVIEW.md`: founder discovery protocol.
- `ENGINEERING.md`: implementation, security, infrastructure, data, testing, deployment, operations, performance and cost.
- Agent files: operating instructions for AI work.
- `SUMMARY.md`: human-readable map of the system.

## Universal change framework

Every meaningful change must answer:

1. **Why should we make this change?**
2. **What impact will it have, and what results should it yield?**
3. **How will we do it?**
4. **How much will it cost?**
5. **Is the cost justified?**

Always seek the lowest-cost solution that still meets required security, reliability, performance, compliance and user-value requirements.

## Approval states

`DRAFT → REVIEW → APPROVED → SUPERSEDED → ARCHIVED`

Never silently overwrite an approved decision. Create a proposed change and request approval.

## Evidence hierarchy

Prefer primary sources, then authoritative secondary sources, then credible independent reporting, then community evidence. Label the source type.

## Claim discipline

Every consequential external claim must be traceable to evidence. Separate:

- Fact
- Evidence-backed inference
- Assumption
- Hypothesis
- Projection
- Unknown

Never fabricate evidence, metrics, customers, revenue, market size, quotes, or technical capability.

## Change protocol

When a product or engineering change occurs:

1. Identify affected documents.
2. Determine whether new research is required.
3. Research only what changed or became uncertain.
4. Apply the universal change framework.
5. Propose exact document changes.
6. Explain why.
7. Request human approval when required.
8. Update approved documents.
9. Record the decision.

## Legal and security impact check

For changes involving personal data, payments, AI, analytics, sharing, financial recommendations, external APIs, children, biometrics, location, regulated activity, authentication, authorization, infrastructure, secrets or production access, flag relevant privacy, terms, consent, disclosure, security and compliance implications for human/legal review.

## Engineering boundary

Use `ENGINEERING.md` for implementation lifecycle, architecture, repository security, Cloudflare, Supabase, data security, testing, deployment, observability, cost, performance and operations. Do not duplicate those rules here.
