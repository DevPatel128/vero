# Documentation Organization System

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21
> Source: The Framework. (imported unchanged apart from this header)

## Purpose

Organize product documentation so a human or AI can find the correct information in seconds.

**Core principle:**

> I know what I need → I know exactly where it lives.

Every concept must have **one canonical home**. Other documents may reference it, but must not duplicate it.

---

## 1. Audit Everything First

Before changing the documentation:

- Scan every documentation file.
- Identify duplicate information.
- Identify conflicting information.
- Identify orphaned files.
- Identify files that are too broad.
- Identify information that belongs somewhere else.
- Identify missing navigation.
- Identify outdated information.
- Identify templates vs product-specific documents.

Create an internal map:

`Concept → Current files → Canonical file → Duplicate locations → Action`

Do not delete information simply because it looks redundant. First determine where it belongs.

---

## 2. Top-Level Information Architecture

Use only these major areas:

```text
00_START_HERE
01_PRINCIPLES
02_PRODUCT
03_RESEARCH
04_DESIGN
05_ENGINEERING
06_OPERATIONS
07_BUSINESS
08_DECISIONS
09_ARCHIVE
```

Do not create additional top-level categories unless there is a strong reason.

---

## 3. START HERE

Create:

```text
00_START_HERE/README.md
```

This is the front door.

A new human or AI should understand:

- What this documentation system is.
- What product/company it belongs to.
- Where to find each type of information.
- How the product lifecycle works.
- Which documents are authoritative.
- What to read first depending on the task.

Use a simple navigation table:

| Need to understand | Go here |
|---|---|
| What is this product? | `02_PRODUCT/PRODUCT.md` |
| Why does it exist? | `02_PRODUCT/THESIS.md` |
| How should it feel? | `02_PRODUCT/EXPERIENCE.md` |
| What did we research? | `03_RESEARCH/RESEARCH.md` |
| Why did we make this decision? | `08_DECISIONS/DECISIONS.md` |
| How do we build it? | `05_ENGINEERING/` |
| Something broke | `06_OPERATIONS/` |
| Investor information | `07_BUSINESS/INVESTOR.md` |
| Rejected idea | `09_ARCHIVE/REJECTED-IDEAS/` |

---

## 4. Principles

Create:

```text
01_PRINCIPLES/PRINCIPLES.md
```

This is the product/company constitution.

It contains only durable principles.

Do not put temporary plans, feature specifications, implementation details, current metrics, or research findings inside it.

Principles should change rarely.

---

## 5. Product

Create:

```text
02_PRODUCT/
├── PRODUCT.md
├── THESIS.md
└── EXPERIENCE.md
```

Responsibilities:

- `PRODUCT.md` → What the product is.
- `THESIS.md` → Why it should exist.
- `EXPERIENCE.md` → How the user should experience it.

Do not duplicate these responsibilities.

---

## 6. Research

Create:

```text
03_RESEARCH/
├── RESEARCH.md
├── SOURCES.md
└── ARCHIVE/
```

- `RESEARCH.md` → Current conclusions and evidence.
- `SOURCES.md` → Source index and references.
- `ARCHIVE/` → Superseded research.

Every important external claim must be traceable to research.

Research should clearly distinguish:

`FACT` · `EVIDENCE` · `INFERENCE` · `ASSUMPTION` · `HYPOTHESIS` · `PROJECTION` · `UNKNOWN`

---

## 7. Design

Create:

```text
04_DESIGN/
├── EXPERIENCE.md
├── DESIGN-SYSTEM.md
├── ACCESSIBILITY.md
├── RESPONSIVE.md
└── CONTENT.md
```

Do not duplicate the product experience here.

`EXPERIENCE.md` explains the product experience.

`DESIGN-SYSTEM.md` explains reusable visual/interface rules.

---

## 8. Engineering

The existing Engineering Framework is the source of truth for building software.

Do not copy its contents into product documentation.

Organize it under:

```text
05_ENGINEERING/
├── README.md
├── FOUNDATION/
├── DEVELOPMENT/
├── ARCHITECTURE/
├── INFRASTRUCTURE/
├── SECURITY/
├── AI/
├── CI-CD/
├── DATA/
├── RELIABILITY/
├── PERFORMANCE/
├── COST/
└── DEVELOPER-EXPERIENCE/
```

The Engineering README must explain where everything belongs.

---

## 9. Operations

Create:

```text
06_OPERATIONS/
├── OBSERVABILITY.md
├── INCIDENTS.md
├── RUNBOOKS/
├── BACKUPS.md
├── DISASTER-RECOVERY.md
└── ROLLBACKS.md
```

When something breaks, a developer should know exactly where to go.

---

## 10. Business

Create:

```text
07_BUSINESS/
├── INVESTOR.md
├── BUSINESS-MODEL.md
├── MARKET.md
├── GTM.md
└── METRICS.md
```

Do not put business claims into random product documents.

Every investor-facing claim must have a traceable source.

---

## 11. Decisions

Create:

```text
08_DECISIONS/
├── DECISIONS.md
├── PRODUCT/
├── DESIGN/
├── ENGINEERING/
└── BUSINESS/
```

Use `DECISIONS.md` as the index.

Every important decision should have:

- Decision
- Context
- Evidence
- Alternatives
- Reason
- Consequences
- Status
- Date
- Owner
- Revisit condition

Never silently reverse an important decision.

---

## 12. Archive

Create:

```text
09_ARCHIVE/
├── REJECTED-IDEAS/
├── SUPERSEDED-DOCUMENTS/
├── OLD-RESEARCH/
└── OLD-DECISIONS/
```

Archive rather than delete important historical reasoning.

The archive should never compete with current documentation.

---

## 13. One Canonical Source Rule

For every concept ask:

> Where is the ONE place someone should go to understand this?

That becomes the canonical source.

Examples:

| Concept | Canonical location |
|---|---|
| Product definition | `PRODUCT.md` |
| Product philosophy | `PRINCIPLES.md` |
| Research evidence | `RESEARCH.md` |
| User experience | `EXPERIENCE.md` |
| Architecture | Engineering Architecture |
| Security | Engineering Security |
| Investor narrative | `INVESTOR.md` |
| Decision history | `DECISIONS.md` |

Other files reference it. They do not copy it.

---

## 14. AI Navigation Rule

Every AI agent must:

1. Read `START_HERE`.
2. Identify the task.
3. Navigate only to relevant canonical documents.
4. Never search the entire documentation tree unnecessarily.
5. Never create a new document if an existing canonical document owns the concept.
6. Never modify an approved document without checking `DECISIONS.md`.
7. Check `RESEARCH.md` before making consequential external claims.
8. Check `PRINCIPLES.md` before making product decisions.
9. Check the Engineering Framework before changing architecture or implementation.
10. Report which canonical documents were consulted.

---

## 15. Document Creation Rule

Before creating a new file, ask:

> Does a canonical document for this concept already exist?

If **YES** → update that document.

If **NO** → determine which existing category owns the concept.

Only create a new document when:

- the concept is genuinely distinct,
- it will be referenced repeatedly,
- keeping it elsewhere would make that document harder to understand.

---

## 16. Document Size Rule

A document should answer one coherent class of questions.

If a file becomes a dumping ground:

1. Identify its concepts.
2. Assign each concept to its correct home.
3. Split only when navigation becomes easier.

Do not split documents merely to create more files.

**Goal: fewer meaningful places, not more files.**

---

## 17. Folder README Rule

Each major folder should contain a short README explaining:

- purpose
- what belongs here
- what does not belong here
- important files
- source-of-truth rules

Keep these READMEs short.

---

## 18. Automatic Documentation Maintenance

When code, product requirements, research, design, business assumptions, architecture or policies change, AI must determine:

1. What changed?
2. Which documents are affected?
3. Is new research required?
4. Is an existing decision affected?
5. Does privacy/terms/security documentation change?
6. What exact updates are proposed?

Then show:

```text
CHANGE
WHY
FILES AFFECTED
EVIDENCE
RISKS
```

Ask for human approval before changing approved strategic documents.

---

## 19. Document Status

Every major document should have:

```text
Status:
Draft / Review / Approved / Superseded / Archived

Last updated:
Owner:
Version:
```

Never treat an archived or superseded document as current truth.

---

## 20. Final Quality Test

Test the documentation system with these questions:

- What is the product?
- Why does it exist?
- What did we research?
- Should we build this feature?
- How should it feel?
- How do we build it?
- How is it secured?
- How do we deploy it?
- Something broke. What do I do?
- Why did we make this decision?
- What is our business model?
- What do we tell investors?

For every question, there must be **exactly one obvious starting location**.

If there are two equally obvious answers, the documentation is not organized well enough.

---

## Final Principle

> **Do not optimize documentation for the number of files.**

Optimize it for:

**FIND → UNDERSTAND → DECIDE → ACT**

The best documentation system should feel almost invisible.

A human should not think:

> Where is that information?

They should think:

> I know exactly where that lives.
