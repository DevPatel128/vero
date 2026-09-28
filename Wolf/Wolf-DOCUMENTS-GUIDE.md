# WOLF — Documents Guide & Navigation

> **Purpose:** A simple human-facing map of the WOLF framework.
>
> **Primary rule:** You should not need to understand the entire framework before using it. Start with what you are trying to accomplish, open the relevant canonical document, then follow its references.

---

## 1. Start Here

If you are new to WOLF, read these in order:

1. [`00_START_HERE/README.md`](00_START_HERE/README.md) — What WOLF is and the overall lifecycle.
2. [`00_START_HERE/V3_FRAMEWORK.md`](00_START_HERE/V3_FRAMEWORK.md) — The operating architecture and framework selection.
3. [`00_START_HERE/AI_OPERATING_RULES.md`](00_START_HERE/AI_OPERATING_RULES.md) — How AI is allowed to operate.
4. [`00_START_HERE/ORCHESTRATOR.md`](00_START_HERE/ORCHESTRATOR.md) — How work is routed between humans, agents and tools.
5. [`00_START_HERE/DOCUMENTATION_SYSTEM.md`](00_START_HERE/DOCUMENTATION_SYSTEM.md) — How the documentation itself is organized.

**If you only have 5 minutes:** read `README.md` → `V3_FRAMEWORK.md` → `DOCUMENTATION_SYSTEM.md`.

---

## 2. The Framework in One View

```text
FOUNDER / OWNER
      ↓
ORCHESTRATOR
      ↓
SPECIALIZED AGENTS
      ↓
POLICY + PERMISSION
      ↓
TOOLS / EXECUTION
      ↓
VALIDATION
      ↓
DOCUMENTATION
      ↓
AUDIT
```

### Product lifecycle

```text
IDEA
 ↓
INTERVIEW
 ↓
RESEARCH
 ↓
VIABILITY
 ↓
THESIS
 ↓
PRODUCT
 ↓
EXPERIENCE / DESIGN
 ↓
ARCHITECTURE
 ↓
ENGINEERING
 ↓
SECURITY
 ↓
TEST
 ↓
APPROVAL
 ↓
DEPLOY
 ↓
OBSERVE
 ↓
LEARN
 ↓
UPDATE
```

The framework is organized so the documentation follows this lifecycle while keeping decisions, evidence and history traceable.

---

# 3. Find a Document by What You Need

| If you want to... | Start here |
|---|---|
| Understand WOLF | `00_START_HERE/README.md` |
| Understand the complete operating model | `00_START_HERE/PRODUCT_CREATION_SYSTEM.md` |
| Understand the V3 system | `00_START_HERE/V3_FRAMEWORK.md` |
| Understand AI rules | `00_START_HERE/AI_OPERATING_RULES.md` |
| Understand AI accountability | `00_START_HERE/AI_AUDIT_ENGINE.md` |
| Understand orchestration | `00_START_HERE/ORCHESTRATOR.md` |
| Create or organize documents | `00_START_HERE/DOCUMENTATION_SYSTEM.md` |
| Understand the document agent | `00_START_HERE/DOCUMENT_AGENT.md` |
| Research something | `03_RESEARCH/RESEARCH.md` |
| Define the product | `02_PRODUCT/PRODUCT.md` |
| Validate the product thesis | `02_PRODUCT/THESIS.md` |
| Run discovery | `02_PRODUCT/DISCOVERY.md` |
| Conduct interviews | `02_PRODUCT/INTERVIEW.md` |
| Build the roadmap | `02_PRODUCT/ROADMAP.md` |
| Define the experience | `04_DESIGN/EXPERIENCE.md` |
| Define the design system | `04_DESIGN/DESIGN-SYSTEM.md` |
| Check accessibility | `04_DESIGN/ACCESSIBILITY.md` |
| Review design quality | `04_DESIGN/DESIGN_QUALITY_SYSTEM.md` |
| Build the architecture | `05_ENGINEERING/ARCHITECTURE.md` |
| Review architecture | `05_ENGINEERING/ARCHITECTURE-REVIEW.md` |
| Build software | `05_ENGINEERING/ENGINEERING.md` |
| Handle security | `05_ENGINEERING/SECURITY.md` |
| Build a threat model | `05_ENGINEERING/THREAT-MODEL.md` |
| Handle AI systems | `05_ENGINEERING/AI.md` |
| Handle data | `05_ENGINEERING/DATA.md` |
| Improve performance | `05_ENGINEERING/PERFORMANCE.md` |
| Handle reliability / SRE | `05_ENGINEERING/SRE.md` |
| Deploy | `05_ENGINEERING/DEPLOYMENT.md` |
| Run CI/CD | `05_ENGINEERING/CI-CD.md` |
| Manage operations | `06_OPERATIONS/OPERATIONS.md` |
| Handle incidents | `06_OPERATIONS/INCIDENTS.md` |
| Handle observability | `06_OPERATIONS/OBSERVABILITY.md` |
| Handle backups | `06_OPERATIONS/BACKUPS.md` |
| Handle disaster recovery | `06_OPERATIONS/DISASTER-RECOVERY.md` |
| Handle rollback | `06_OPERATIONS/ROLLBACKS.md` |
| Manage cloud/operating cost | `06_OPERATIONS/FINOPS.md` |
| Define business model | `07_BUSINESS/BUSINESS-MODEL.md` |
| Define strategy | `07_BUSINESS/STRATEGY.md` |
| Define the market | `07_BUSINESS/MARKET.md` |
| Define GTM | `07_BUSINESS/GTM.md` |
| Plan launch | `07_BUSINESS/LAUNCH.md` |
| Plan growth | `07_BUSINESS/GROWTH.md` |
| Define customers | `07_BUSINESS/CUSTOMER.md` |
| Define metrics | `07_BUSINESS/METRICS.md` |
| Build a metric tree | `07_BUSINESS/METRIC_TREE.md` |
| Prepare investor material | `07_BUSINESS/INVESTOR.md` |
| Prepare presentations | `07_BUSINESS/PRESENTATIONS.md` |
| Plan social media | `07_BUSINESS/SOCIAL_MEDIA.md` |
| Review legal/compliance | `07_BUSINESS/LEGAL-COMPLIANCE.md` |
| Make a decision | `08_DECISIONS/DECISIONS.md` |
| Understand decision rules | `08_DECISIONS/DECISION-RULES.md` |
| Audit decisions | `08_DECISIONS/DECISION_AUDIT.md` |
| Review what happened | `09_AUDIT/README.md` |
| Audit AI activity | `09_AUDIT/AI_GOVERNANCE.md` |
| Audit security | `09_AUDIT/SECURITY.md` |
| Audit deployments | `09_AUDIT/DEPLOYMENTS.md` |
| Review file changes | `09_AUDIT/FILE_CHANGES.md` |
| Preserve old material | `10_ARCHIVE/README.md` |

---

# 4. Folder Map

## `00_START_HERE` — Orientation & Control Center

**Use this folder when you are new, unsure where to go, or need to understand how WOLF operates.**

- `README.md` — Framework introduction and first navigation.
- `V3_FRAMEWORK.md` — Integrated operating system.
- `PRODUCT_CREATION_SYSTEM.md` — End-to-end creation system.
- `AI_OPERATING_RULES.md` — AI behavior and guardrails.
- `ORCHESTRATOR.md` — Work routing and orchestration.
- `AI_AUDIT_ENGINE.md` — AI accountability.
- `DOCUMENTATION_SYSTEM.md` — Documentation rules.
- `DOCUMENT_AGENT.md` — Documentation-agent responsibilities.
- `RESEARCH_AGENT.md` — Research-agent responsibilities.
- `REVIEW_AGENT.md` — Review-agent responsibilities.
- `UPDATE_AGENT.md` — Update-agent responsibilities.
- `ORGANIZATION.md` — Human + AI organization.
- `FRAMEWORK_BENCHMARK.md` — Framework benchmarking.
- `FRAMEWORK_RESEARCH.md` — Framework research.
- `VERSION.md` — Framework version information.

---

## `01_PRINCIPLES` — Permanent Rules

**Use this folder for principles that should guide the entire system.**

- `PRINCIPLES.md` — Core principles.

---

## `02_PRODUCT` — What You Are Building

**Use this folder for product definition, discovery, thesis and planning.**

- `PRODUCT.md` — Product definition.
- `THESIS.md` — Product thesis.
- `DISCOVERY.md` — Product discovery.
- `INTERVIEW.md` — User/customer interviews.
- `PRODUCT_OPERATING_MODEL.md` — Product operating model.
- `ROADMAP.md` — Product roadmap.

**Typical path:**

`DISCOVERY → INTERVIEW → THESIS → PRODUCT → ROADMAP`

---

## `03_RESEARCH` — Evidence Before Confidence

**Use this folder when the work requires research, sources or evidence.**

- `RESEARCH.md` — Main research system.
- `RESEARCH_AGENT.md` — Research-agent operating guidance.
- `RESEARCH_OPERATING_SYSTEM.md` — Research operating model.
- `SOURCES.md` — Source management.

**Typical path:**

`QUESTION → RESEARCH → SOURCES → EVIDENCE → DECISION`

---

## `04_DESIGN` — Experience & Interface

**Use this folder for product experience, content, visual systems and accessibility.**

- `EXPERIENCE.md` — Product experience.
- `DESIGN-SYSTEM.md` — Design system.
- `DESIGN_QUALITY_SYSTEM.md` — Design quality.
- `ACCESSIBILITY.md` — Accessibility.
- `CONTENT.md` — Product/content guidance.

**Typical path:**

`PRODUCT → EXPERIENCE → CONTENT → DESIGN SYSTEM → ACCESSIBILITY → QUALITY REVIEW`

---

## `05_ENGINEERING` — Build the Product

**Use this folder for architecture, implementation, security, reliability and delivery.**

### Core engineering
- `ENGINEERING.md`
- `ARCHITECTURE.md`
- `ARCHITECTURE-REVIEW.md`
- `DEVELOPER-EXPERIENCE.md`

### Security
- `SECURITY.md`
- `SECURITY-ASSURANCE.md`
- `THREAT-MODEL.md`
- `IDENTITY.md`

### Infrastructure & data
- `NETWORKING.md`
- `DATA.md`
- `COST.md`

### Quality & reliability
- `QUALITY.md`
- `PERFORMANCE.md`
- `SRE.md`

### Delivery
- `CI-CD.md`
- `DELIVERY.md`
- `DEPLOYMENT.md`

### AI
- `AI.md`

### Folder entry point
- `README.md`

**Typical path:**

`ARCHITECTURE → ENGINEERING → SECURITY → QUALITY → DELIVERY → DEPLOYMENT`

---

## `06_OPERATIONS` — Run the Product

**Use this folder after the system exists and must be operated safely.**

- `OPERATIONS.md` — Main operations system.
- `OPERATING_SYSTEM.md` — Operating model.
- `OBSERVABILITY.md` — Monitoring and observability.
- `INCIDENTS.md` — Incident handling.
- `BACKUPS.md` — Backups.
- `ROLLBACKS.md` — Rollbacks.
- `DISASTER-RECOVERY.md` — Disaster recovery.
- `FINOPS.md` — Financial/cloud cost operations.
- `README.md` — Folder entry point.

**Typical path:**

`DEPLOY → OBSERVE → OPERATE → INCIDENT / RECOVERY → LEARN`

---

## `07_BUSINESS` — Turn the Product Into a Business

**Use this folder for strategy, customers, economics, distribution and company growth.**

### Strategy & market
- `STRATEGY.md`
- `MARKET.md`
- `BUSINESS-MODEL.md`
- `PORTFOLIO.md`

### Customer & distribution
- `CUSTOMER.md`
- `GTM.md`
- `LAUNCH.md`
- `GROWTH.md`
- `SOCIAL_MEDIA.md`
- `SOCIAL_BENCHMARK.md`

### Measurement
- `METRICS.md`
- `METRIC_TREE.md`

### Capital & communication
- `INVESTOR.md`
- `PRESENTATIONS.md`

### Governance
- `LEGAL-COMPLIANCE.md`

**Typical path:**

`STRATEGY → MARKET → CUSTOMER → BUSINESS MODEL → GTM → LAUNCH → GROWTH → METRICS`

---

## `08_DECISIONS` — What Was Decided

**Use this folder whenever a meaningful decision needs to be recorded or reviewed.**

- `DECISIONS.md` — Decision record.
- `DECISION-RULES.md` — Decision-making rules.
- `DECISION_AUDIT.md` — Decision audit.

**Rule:** Important decisions should be traceable to their evidence, authorization and resulting action.

---

## `09_AUDIT` — What Actually Happened

**Use this folder to reconstruct consequential activity and verify accountability.**

- `README.md` — Audit system.
- `ACTIONS.md` — Actions.
- `AI_GOVERNANCE.md` — AI governance.
- `APPROVALS.md` — Approvals.
- `DECISIONS.md` — Decision history.
- `DEPLOYMENTS.md` — Deployment history.
- `ERRORS.md` — Errors.
- `FILE_CHANGES.md` — File changes.
- `RESEARCH.md` — Research audit.
- `REVIEWS.md` — Reviews.
- `SECURITY.md` — Security audit.

**Audit model:**

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

---

## `10_ARCHIVE` — Preserve History

**Use this folder for superseded material that should remain available for historical context.**

- `README.md` — Archive rules and organization.

**Do not silently delete important history.**

---

# 5. Which Document Is the Canonical Source?

WOLF follows a **single canonical source** principle.

That means:

> **One concept → one authoritative document.**

Other documents may reference it, but they should not create competing versions of the same truth.

When two documents appear to conflict:

1. Check the canonical document.
2. Check the relevant decision record.
3. Check supporting research/evidence.
4. Check whether one document is newer or explicitly superseded.
5. If the conflict remains unresolved, record it rather than silently choosing a version.

---

# 6. How Humans Should Navigate WOLF

### If you are building a product

```text
START HERE
→ PRODUCT
→ RESEARCH
→ DESIGN
→ ENGINEERING
→ SECURITY
→ TEST / REVIEW
→ DEPLOY
→ OPERATIONS
→ BUSINESS
```

### If you are making a decision

```text
QUESTION
→ RESEARCH
→ DECISION
→ AUTHORIZE
→ ACT
→ VALIDATE
→ AUDIT
```

### If something broke

```text
OPERATIONS
→ INCIDENTS
→ OBSERVABILITY
→ SECURITY / ENGINEERING
→ ROOT CAUSE
→ DECISION
→ FIX
→ VALIDATE
→ AUDIT
```

### If you want to change the product

```text
CURRENT STATE
→ RESEARCH
→ PRODUCT / DESIGN / ENGINEERING
→ DECISION
→ IMPLEMENT
→ TEST
→ DOCUMENT
→ AUDIT
```

---

# 7. How AI Should Navigate WOLF

AI should **not** read every document for every task.

Use this sequence:

```text
1. Identify the task
        ↓
2. Identify the domain
        ↓
3. Open the domain's canonical document
        ↓
4. Follow only the necessary references
        ↓
5. Check relevant decisions / research
        ↓
6. Perform authorized work
        ↓
7. Validate the result
        ↓
8. Update documentation
        ↓
9. Audit consequential actions
```

### AI source priority

1. Canonical document for the task.
2. Relevant supporting documents.
3. Recorded decisions.
4. Research/evidence.
5. Explicit owner/founder instructions.
6. New proposal or inference — clearly labeled as such.

**Never invent missing facts, evidence, decisions, metrics, capabilities or outcomes.**

---

# 8. Explanation Rule

When WOLF recommends an action, explanation should be proportional to the decision.

Use:

**Action** → What should happen.

**Why** → Why it is necessary.

**Impact** → What it will improve, enable, prevent or change.

**Alternatives** → Whether another meaningful approach exists and its trade-offs.

Do not provide long explanations when a short rationale is sufficient.

If no meaningful alternative exists, say so.

If the source does not define the answer, state:

> **Not defined in the source.**

Do not fill the gap with an invented fact or decision.

---

# 9. Framework Selection

WOLF uses established frameworks where they solve a real problem.

Examples include:

| Problem | Framework / System |
|---|---|
| Customer ambiguity | JTBD + Continuous Discovery |
| Opportunity prioritization | Opportunity Solution Tree |
| Design | Double Diamond + Apple HIG + usability/accessibility |
| Architecture | Well-Architected + ADR |
| Reliability | SRE / SLO / Error Budget |
| Delivery | DORA |
| Security | NIST SSDF + OWASP ASVS/SAMM + threat modeling |
| AI risk | NIST AI RMF + agent-security controls |
| Strategy | Strategy Choice Cascade |
| Business model | Business Model Canvas + Value Proposition Canvas |
| UX measurement | HEART-style measures |
| Economics | FinOps |
| Organization | Team Topologies |

> **Golden rule:** Use a framework because it solves a problem, not because it is famous.

---

# 10. Quick Navigation Cheat Sheet

```text
NEW TO WOLF?
→ 00_START_HERE/README.md

WHAT ARE WE BUILDING?
→ 02_PRODUCT/

WHAT DO WE KNOW?
→ 03_RESEARCH/

WHAT SHOULD THE USER EXPERIENCE?
→ 04_DESIGN/

HOW DO WE BUILD IT?
→ 05_ENGINEERING/

HOW DO WE RUN IT?
→ 06_OPERATIONS/

HOW DO WE GROW IT?
→ 07_BUSINESS/

WHAT DID WE DECIDE?
→ 08_DECISIONS/

WHAT ACTUALLY HAPPENED?
→ 09_AUDIT/

WHAT DID WE REPLACE?
→ 10_ARCHIVE/
```

---

## 11. The Core Mental Model

WOLF is not a folder collection.

It is a traceable operating loop:

```text
RESEARCH
   ↓
DECIDE
   ↓
AUTHORIZE
   ↓
BUILD
   ↓
TEST
   ↓
RELEASE
   ↓
MEASURE
   ↓
LEARN
   ↓
UPDATE
   ↺
```

The documentation exists to make that loop **findable, understandable, actionable and auditable**.
