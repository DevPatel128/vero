# Design Quality System

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `04_DESIGN/DESIGN_QUALITY_SYSTEM.md` (imported unchanged apart from this header and "Applied in this repo")

## Apple-inspired baseline
Purpose, clarity, hierarchy, simplicity, familiarity, consistency, agency, feedback, accessibility, craft and delight.

## Beyond-Apple extension
1. Predictive simplicity without removing control.
2. Self-explaining states: what happened, why, what next.
3. Progressive simplification of repetitive work.
4. Context preservation.
5. Recovery-first interaction.
6. Intelligent restraint: AI disappears when unnecessary.

## Loop
Discover → Define → Develop → Deliver → Measure → Learn.

## Applied in this repo

No formal design-quality review has run against `website/site` using this checklist. The closest existing evidence is this PR's own audit: the hero text was SSR-invisible (violates "clarity" and "feedback" — a real user saw nothing until JS loaded), and `/for-workers` vs `/for-professionals` carry inconsistent terminology (violates "consistency" — `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` item 5). Both are logged, not silently fixed by inventing a resolution.
