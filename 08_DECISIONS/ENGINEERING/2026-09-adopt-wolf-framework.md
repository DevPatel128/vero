# Adopt the Wolf v3 framework, replacing the v2 framework adopted 2026-09-22

> Status: Proposed · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28

**Status:** Proposed

**Decision**

Restructure this repo's documentation from the v2 ten-area layout (`00_START_HERE`–`09_ARCHIVE`, adopted in `2026-09-adopt-framework.md`) onto Wolf v3's eleven-area layout (`00_START_HERE`–`10_ARCHIVE`, adding `09_AUDIT`), per the user's direct instruction to use Wolf as this project's framework going forward.

**Why should we make this change?**

The user added a `Wolf/` folder (90 files, MANIFEST-declared v3.0) mid-session and asked for the repo to be restructured onto it. Wolf is a superset of the v2 layout already adopted: it flattens `05_ENGINEERING` (no subfolders), adds an explicit `09_AUDIT` area with no v2 equivalent, and splits several v2 files more finely (e.g. `SECURITY.md` into `SECURITY.md` + `SECURITY-ASSURANCE.md` + `THREAT-MODEL.md` + `IDENTITY.md`; `07_BUSINESS` gains `CUSTOMER`, `GROWTH`, `LAUNCH`, `STRATEGY`, `PORTFOLIO`, `METRIC_TREE`, `SOCIAL_MEDIA`, `SOCIAL_BENCHMARK`, `PRESENTATIONS`).

**Impact**

Every doc-path reference in the repo changes for files that moved. No effect on `website/site` — this is a documentation-only restructure, same as the v2 adoption was; `website/site/` was not moved, renamed or referenced by build tooling from the doc tree.

**Evidence**

`Wolf/MANIFEST.json` lists 90 files across the 11 areas; diffed against the repo's existing 00–09 structure to build the file-by-file move/merge/new-file plan this decision implements.

**Alternatives**

Keep the v2 layout and treat `Wolf/` as reference material only (rejected: the user explicitly asked for the repo to be restructured onto it, not merely informed by it). Run both layouts side by side (rejected: violates the framework's own "one canonical source" principle, #13 in `01_PRINCIPLES/PRINCIPLES.md`).

**How**

`git mv` v2 files onto Wolf's paths and names (flattening `05_ENGINEERING`, renumbering `09_ARCHIVE`→`10_ARCHIVE`); commit `Wolf/` verbatim first for its own history; fill the files Wolf's layout adds that had no v2 equivalent, sourced from the same material the v2 pass used (`Documents/1-15`, the archived `CLAUDE.md`, this PR's own audit findings), marking genuine gaps "Not defined in the source" per Wolf's own rule rather than inventing content; populate `09_AUDIT/` with this repo's actual history (commits, decisions, security-review findings, human approvals already given via the plan-approval and the three `AskUserQuestion` answers earlier in this session).

**Cost**

Engineering/AI time only; no new infrastructure, no recurring cost. Meaningfully larger one-time cost than the v2 adoption (90 files vs. the v2 layout's file count) because Wolf is more granular.

**Lower-cost alternatives**

None that also satisfy the user's explicit instruction to use Wolf.

**Cost justification**

One-time documentation-restructure cost against the user's direct, explicit request; no recurring cost; zero risk to the deployed product since `website/site/` is untouched.

**Consequences**

All v2 doc-path references across the repo (README tables, `SUMMARY.md`, cross-links) need updating to the new paths — done as part of this same change, verified by a repo-wide broken-link check before the PR is opened. The v2 restructure commits remain in git history and are not reverted; this is an additional restructure on top of them, not a rollback.

**Revisit condition**

If a future framework version supersedes Wolf, or if Wolf's finer-grained split proves to fragment concepts that worked better consolidated under v2's simpler layout.

**Approved by**

(pending — the user's instruction to "make the changes according to the Wolf framework plan" authorizes doing the restructure; formal `Approved` status on this decision record is still the owner's to mark)

**Date**

(pending)
