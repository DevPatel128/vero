# Open contradictions found while adopting the framework

> Status: Proposed · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-22
> Source: docs-inventory audit performed for this PR

**Status:** Proposed for each item below (not resolved; recorded so they are visible and not silently picked one way by whichever document is read next)

This is one file covering several small, independent contradictions surfaced while filling `02_PRODUCT`, `04_DESIGN`, and `07_BUSINESS` from the old source documents. Each needs a human call, not an AI-picked default, per `05_ENGINEERING/AI/AI_OPERATING_RULES.md` ("the AI is not the final authority for product strategy").

---

## 1. Roadmap phase numbering

**Conflict:** the archived root `CLAUDE.md` §19 numbers Phase 1 = pre-launch website, Phase 2 = Bengaluru pilot. `Documents/13. VERO Roadmap.md` numbers Phase 0 = pre-launch, Phase 1 = pilot — every phase after is off by one between the two documents. `Context/03` and `Context/08` (already flagged superseded) use a third numbering built around a "Verified Student Identity" phase 1 that contradicts the worker/business marketplace framing everywhere else.

**Why it matters:** `02_PRODUCT/PRODUCT.md`'s "Product lifecycle" section needs one canonical numbering.

**Options:** adopt `Documents/13`'s 0-indexed numbering (more recent per file dates); adopt the old `CLAUDE.md`'s 1-indexed numbering; renumber fresh.

**Recommendation (not a decision):** `Documents/13` is the more detailed and recent source; the archived root `CLAUDE.md`'s §19 should probably be read as the earlier draft it numbered differently. No action taken.

## 2. Phase 1 targets

**Conflict:** `Documents/6. What We Are Building First (MVP).md` states 200+ verified records and 50+ businesses as the Phase 1/pilot target. `Documents/13` and `Documents/14. VERO Investor Summary.md` state 3,000 workers, 600 businesses, and 1,000 verified records for the same phase.

**Why it matters:** these are materially different scale claims for the same milestone; using the wrong one in an investor conversation is a credibility risk.

**Options:** confirm which is current with the founder; treat the smaller number as the conservative/near-term target and the larger as a stretch goal, explicitly labeled as such.

## 3. Pricing tiers

**Conflict:** `Documents/8. How VERO Makes Money.md` describes three tiers (Starter, Growth, Studio) with specific ₹ ranges. The archived root `CLAUDE.md` §25 and the live `website/site` pricing page show a single Business plan at a flat price plus a custom Studio tier — no Starter/Growth split.

**Why it matters:** `07_BUSINESS/BUSINESS-MODEL.md` needs one source of truth, and it should match what the live site actually charges.

**Options:** treat the live site as current truth (it is what a prospective customer actually sees) and mark `Documents/8`'s three-tier structure as superseded; or confirm the three-tier plan is the intended near-term direction and update the site to match.

## 4. DPDP grievance and rights-response timelines

**Conflict:** `website/site/src/app/legal/grievance` and `website/shared/CLAUDE.md` state a 15-day grievance response SLA. `Documents/15. VERO Privacy and Compliance Summary.md` states 30 days. The (archived, unshipped) draft `/privacy` page found under `website/site/src` during this audit stated a 30-day grievance response and a 7-day rights-request response, differing from both.

**Why it matters:** this is a compliance commitment under DPDP Act 2023, not just marketing copy — the live site's stated number is what the company is actually bound to today.

**Options:** this needs legal review, not an AI default. Flagging for `05_ENGINEERING/SECURITY/VERO-COMPLIANCE-DPDP.md` and human/legal sign-off before any of these pages are edited.

## 5. "For workers" vs. "For professionals"

**Conflict:** the repo is mid-migration from "worker" to "professional" language (the now-deleted `website/site/replace.js` codemod was a one-off attempt at this rename). `/for-workers` and `/for-professionals` are both live, both linked from different places (main nav and homepage use "professionals"; `/use-cases`, `/help`, and `llms.txt` use "workers"), and — confirmed by diffing both files in this PR — carry substantially different copy for different audience framings, not duplicate content.

**Why it matters:** this is a brand-voice and information-architecture decision (which term the product uses going forward), not a technical duplicate-route bug. An earlier pass in this PR's planning had assumed these were duplicates and planned to collapse them via redirect; diffing the actual content showed that assumption was wrong, and no redirect was applied.

**Options:** pick one term and consolidate the content (preserving the more complete/accurate copy from either page); keep both if they genuinely serve different audiences and cross-link them clearly; leave as-is until the terminology question is settled.

## 6. Verified-student-identity framing (`Context/`)

**Conflict:** `09_ARCHIVE/SUPERSEDED-DOCUMENTS/Context-student-identity-framing/` frames Vero's Phase 1 as "Verified Student Identity" and an AI-powered employability network — at odds with the worker/business, dual-signature, escrow marketplace described everywhere else, and with `website/CLAUDE.md`'s explicit ban on the phrase "AI-powered."

**Decision:** treated as superseded, not current, and archived rather than merged into `02_PRODUCT/PRODUCT.md`. Recorded here in case this framing reflects a real, more recent pivot rather than an abandoned draft — if so, this archiving should be reversed and the current `02_PRODUCT/PRODUCT.md` revised instead.

---

**Revisit condition:** any of the above, on new founder input or evidence.

**Approved by:** (pending, per item)

**Date:** (pending)
