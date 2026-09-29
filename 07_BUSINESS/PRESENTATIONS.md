# Presentation / PPT Building System

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `07_BUSINESS/PRESENTATIONS.md` (imported unchanged apart from this header)

## Purpose
Generate investor, customer, product, strategy, board, sales and internal presentations from canonical company evidence without inventing claims.

## Presentation workflow
BRIEF → AUDIENCE → OBJECTIVE → STORY → EVIDENCE MAP → SLIDE PLAN → VISUAL SYSTEM → BUILD → CLAIM AUDIT → DESIGN REVIEW → FINAL QA

## Required inputs
- audience
- objective
- duration
- format
- source documents
- approved claims
- metrics
- desired CTA
- brand/design rules

## Slide prompt template
Use this prompt structure:

"Create a presentation for [AUDIENCE] whose objective is [OBJECTIVE].
Read and use only the supplied canonical documentation.
Before drafting, identify missing/contradictory evidence and ask for clarification if it materially affects the narrative.
Build a slide-by-slide story with:
1. slide purpose
2. headline
3. one key message
4. evidence/source
5. visual concept
6. speaker notes
7. CTA where relevant.
Do not fabricate metrics, quotes, market sizes, customer logos, traction or projections.
Label assumptions and projections.
Keep one idea per slide.
Prefer diagrams, product screenshots, charts and concise evidence over paragraphs.
Run a claim audit and contradiction check before final output."

## Investor deck structure
1. Title
2. Problem
3. User/customer
4. Insight
5. Product
6. Why now
7. Market
8. Business model
9. Traction/evidence
10. GTM
11. Competition/alternatives
12. Differentiation
13. Technology/moat
14. Roadmap
15. Team/founder advantage
16. Economics
17. Risks
18. Ask/use of funds
19. Closing

Adapt slide count to the actual evidence.

## Sales deck
Problem → current workflow → solution → product → proof → implementation → security → economics → next step.

## Product demo deck
Context → user → workflow → product walkthrough → key outcomes → architecture/trust where relevant → next step.

## Board/strategy deck
Objective → current state → metrics → changes → risks → options → recommendation/decision request → execution plan.

## PPT quality gate
No unsupported claims, no visual clutter, readable at presentation distance, consistent hierarchy, source traceability, accessible charts, correct numbers, clear narrative and explicit decision/CTA.

## Applied in this repo

No presentation has been built from this system yet. `INVESTOR.md` is the canonical evidence source an investor deck would draw from — it already carries the same claim discipline (labelled facts/projections/unverified) this file's "claim audit" step requires, so building a deck from it is a matter of applying the workflow above, not gathering new evidence.
