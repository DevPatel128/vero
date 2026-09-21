# Product Framework — Summary

## Purpose

A simple system for turning an idea into a researched, documented, securely engineered, tested, approved, deployed, and continuously improved product.

## The whole system

```text
                              PRODUCT FRAMEWORK
                                      │
                                      ▼
                                  INTERVIEW
                                      │
                                      ▼
                                  RESEARCH
                                      │
                                      ▼
                               VIABILITY DECISION
                                      │
                                      ▼
                                   PRODUCT
                                      │
                         ┌────────────┼────────────┐
                         ▼            ▼            ▼
                      THESIS      EXPERIENCE     INVESTOR
                         │            │            │
                         └────────────┼────────────┘
                                      ▼
                                    DESIGN
                                      │
                                      ▼
                                ENGINEERING
                                      │
                   ┌──────────────────┼──────────────────┐
                   ▼                  ▼                  ▼
                GITHUB            CLOUDFLARE          SUPABASE
                Security          Infrastructure      Data
                   │                  │                  │
                   └──────────────────┼──────────────────┘
                                      ▼
                                    TEST
                                      │
                                      ▼
                                    REVIEW
                                      │
                                      ▼
                              HUMAN APPROVAL
                                      │
                                      ▼
                                 PRODUCTION
                                      │
                                      ▼
                                  OBSERVE
                                      │
                                      ▼
                                  IMPROVE
                                      │
                                      └──────────► UPDATE
                                                     │
                                                     ▼
                                                 DECISIONS
```

## What each file does

| File | Purpose |
|---|---|
| `PRINCIPLES.md` | Rules everything follows |
| `PRODUCT_CREATION_SYSTEM.md` | Overall lifecycle and governance |
| `AI_OPERATING_RULES.md` | How AI may reason and act |
| `INTERVIEW.md` | Discover the idea |
| `RESEARCH.md` | Establish evidence |
| `PRODUCT.md` | Define what is being built |
| `THESIS.md` | Explain why it should exist |
| `EXPERIENCE.md` | Define how it should feel and behave |
| `INVESTOR.md` | Build an evidence-based business narrative |
| `DECISIONS.md` | Preserve important decisions |
| `ENGINEERING.md` | Build securely, efficiently, reliably and cheaply |
| `DOCUMENT_AGENT.md` | Keep product documents coherent |
| `RESEARCH_AGENT.md` | Produce decision-grade research |
| `REVIEW_AGENT.md` | Try to break the work |
| `UPDATE_AGENT.md` | Keep documentation synchronized |

## Universal change framework

Every meaningful change, feature, architecture decision, infrastructure decision, or technical choice should answer:

```text
WHY?
Why should we make this change?

        ↓

IMPACT?
What will change?
What results should it yield?
What are the risks and trade-offs?

        ↓

HOW?
How will we implement it?
What dependencies or prerequisites exist?

        ↓

COST?
How much will it cost?
Can the same result be achieved more cheaply?

        ↓

JUSTIFICATION
Is the cost justified?

        ↓

DECISION
Approve / Reject / Research more
```

### Cost rule

Always aim for the **lowest-cost solution that satisfies the required security, reliability, performance, compliance, and user-value requirements**.

Do not add infrastructure or complexity without proportional value.

## Security model

```text
                     SECURITY
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
 Confidentiality     Integrity    Availability
          │             │             │
      Who can       Can data      Can service
      access?       be trusted?   remain usable?
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                 LEAST PRIVILEGE
                        │
                        ▼
               ACCOUNTABILITY / AUDIT
```

Security is not one stage. It is considered throughout the lifecycle.

## Engineering model

```text
Public-safe source code
        +
Secure infrastructure
        +
Secure data
        +
Least privilege
        +
Testing
        +
Observability
        +
Recovery
        =
Production-ready system
```

## Human authority

AI can investigate, reason, prepare, review, document and assist with implementation.

Humans retain final authority over product, legal, financial, safety, privacy, security exceptions and production decisions.
