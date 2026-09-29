# AI Governance

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: `00_START_HERE/AI_OPERATING_RULES.md`, `00_START_HERE/ORCHESTRATOR.md`, this session's actual record

## What governed this session's AI work

`00_START_HERE/AI_OPERATING_RULES.md` (development-time policy — what the AI may reason and act on) and `00_START_HERE/ORCHESTRATOR.md` (agent-role framing, though this session ran as a single agent, not a multi-agent pipeline).

## Human oversight actually exercised

- Plan mode: a full plan was written and submitted for approval before any code or doc change began. The first submission was rejected (no stated reason); the plan was then explicitly approved by instruction ("Go ahead with the plan you suggested in auto mode") before work started.
- Three scoped questions asked via `AskUserQuestion` before touching security fixes, the archived app, or the draft legal pages (`09_AUDIT/APPROVALS.md`).
- Mid-session scope change: the user directly instructed a switch from the v2 framework to Wolf v3, which this file's restructure implements.
- No credentials, secrets, or production access were used or requested by the AI at any point (`01_PRINCIPLES/PRINCIPLES.md`'s public-safe-by-design principle).
- No merge to `main` was performed or attempted by the AI.

## Tool/permission boundaries observed

Only explicit path-scoped `git add` was used throughout (never a bare `git add .` or `git add -A` without path arguments), specifically so the untracked `Wolf/` directory (and, earlier, the unexplained `.claude/worktrees/**` gitlinks) could not be accidentally swept into a commit before being reviewed. `git status` was checked before any action that could discard uncommitted work, per this session's standing auto-mode safety rule.

## Known gap

No automated AI-audit-event schema (`00_START_HERE/AI_AUDIT_ENGINE.md`'s YAML event format) is running — this file and the rest of `09_AUDIT/` are a manual reconstruction from the session transcript and git history, not an automated log. Building the automated version is unscoped (`00_START_HERE/AI_AUDIT_ENGINE.md` "Applied in this repo").
