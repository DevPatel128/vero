# Adopt The Framework and the numbered documentation system

> Status: Proposed · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-22

**Status:** Proposed

**Decision**

Replace the ad-hoc documentation (root `CLAUDE.md` at 1,150 lines, untracked `Context/` and `Documents/`, a 153-file `docs/` tree, and a never-committed v1 framework) with `The Framework.` split into the ten-area layout defined by `00_START_HERE/Documentation_Organization_System.md`.

**Why should we make this change?**

An audit of the pre-existing state found around ten competing front doors, four directories with no git history at all, contradictory content across files (roadmap phase numbering, pricing tiers, DPDP grievance SLA, `@rie/crypto` vs. direct libraries, Next 15 vs. 16), and every framework template (`PRODUCT`, `THESIS`, `EXPERIENCE`, `RESEARCH`, `INVESTOR`) left blank. `Documentation_Organization_System.md` §20 gives a concrete test this repo was failing: for each of twelve basic questions, there should be exactly one obvious starting location.

**Impact**

Every concept gets one canonical home; agents and humans navigate from `00_START_HERE/README.md` instead of guessing between ~10 files. No code path referenced the old `docs/` tree (grepped), so this is a documentation-only change with zero effect on `website/site`, the only deployed code.

**Evidence**

Full inventory in this PR's two research passes (docs inventory, site audit). Every claim above is grep-verified, not inferred.

**Alternatives**

Leave the old structure and add `The Framework.` alongside it (rejected: adds an eleventh front door instead of resolving the ambiguity). Delete the old material outright (rejected: `Documentation_Organization_System.md` §12 requires archiving, not deleting, to preserve historical reasoning).

**How**

`git mv` old material into `09_ARCHIVE/SUPERSEDED-DOCUMENTS/` with a README explaining what replaced it; move framework files into `00`-`08`; split `ENGINEERING.md` verbatim by section; fill Vero-specific content from `Documents/1-15` and the old `CLAUDE.md`, never inventing facts; replace root `CLAUDE.md` with a thin router.

**Cost**

Engineering/AI time only; no new infrastructure, no recurring cost.

**Lower-cost alternatives**

None meaningfully cheaper that also resolve the ambiguity; a partial reorg would leave some concepts without a canonical home.

**Cost justification**

Low one-time cost against a documentation system that was actively misleading (contradictory facts, dead links, blank strategy docs) for both humans and AI agents working in this repo.

**Reason**

`The Framework.` is the newer, more complete governance model (explicit AI operating rules, decision framework, engineering standard) and is what the user asked to be adopted.

**Consequences**

Root `CLAUDE.md` becomes a router; all Vero-specific strategic content now lives under `02_PRODUCT`, `04_DESIGN`, `05_ENGINEERING`, `07_BUSINESS`; every new document defaults to `Status: Draft` until a human approves it.

**Revisit condition**

If the ten-area layout proves to make navigation harder in practice (the opposite of its intent), or if a concept genuinely needs a home the taxonomy does not provide.

**Approved by**

(pending)

**Date**

(pending)
