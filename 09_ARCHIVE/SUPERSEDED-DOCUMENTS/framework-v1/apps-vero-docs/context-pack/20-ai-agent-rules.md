# 20 — AI Agent Rules

## Objective
Give AI agents (Claude, Cursor, Gemini, Codex, Antigravity, Paperclip) a stable working contract so they can build, refine, and extend Vero without drifting from the core idea.

## Decision hierarchy (when files conflict)
1. User trust + safety.
2. Compliance (`/docs/COMPLIANCE.md`).
3. Product philosophy (`01`).
4. Brand consistency (`02`).
5. Technical correctness.
6. Performance.
7. Visual polish.
8. Convenience.

## Load order for any task
1. `/AGENTS.md`
2. `/CLAUDE.md`
3. This file (`20-ai-agent-rules.md`).
4. `00-project-overview.md`.
5. The task-specific files (see "Usage recipes" in `README.md`).
6. `/docs/COMPLIANCE.md` when the task touches PII, payments, employment, or identity.

## Global rules for every agent
- Read the project overview first.
- Follow the product philosophy.
- Respect the brand system.
- Protect the trust model.
- Preserve performance and simplicity.
- Do not invent product directions casually.
- Ask one tight clarifying question when ambiguous, rather than guessing.
- Avoid duplicate work — read the existing implementation before adding.
- Document important decisions in a PR description, not in random comments.
- Keep outputs aligned with the Vero mission and tone.

## Build discipline
- Work from structured files.
- Avoid patchwork answers.
- Preserve naming consistency.
- Avoid random design choices.
- Avoid speculative architecture.
- Avoid introducing complexity without need.
- When in doubt, write less.

## Frontend agent behavior
- Keep components reusable.
- Keep layouts clean.
- Keep motion subtle.
- Keep interactions reliable.
- Optimize mobile first.
- Protect accessibility.
- Avoid unnecessary libraries.
- Tokens come from `@vroe/config/tailwind/tokens.css`. Don't hard-code colors.

## Backend agent behavior
- Normalize important data.
- Keep access control strict.
- Protect trust + moderation logic.
- Keep APIs predictable.
- Preserve auditability.
- Avoid overengineering.
- Never bypass RLS.
- Never store secrets in code.

## Trust + security agent behavior
- Validate assumptions.
- Protect identity data.
- Avoid risky shortcuts.
- Keep fraud prevention in mind.
- Admin actions are logged + reviewable.
- Crypto via `@vroe/crypto`. Never re-implement.

## ALVED agent behavior
- Treat ALVED as an open spec, not internal.
- Maintain backwards compatibility in `packages/types/src/alved.ts`.
- Bump the spec version on any breaking change.
- Verify signatures on every insert.
- Never modify existing records in `alved_records`.

## Content + design agent behavior
- Keep tone calm + premium.
- Avoid noisy or salesy language.
- Maintain clarity.
- Preserve the trust narrative.
- Keep the site understandable at a glance.
- Compliance check on any claim touching PII, payments, employment, identity.

## Output format
When an agent finishes work:
1. **Concise summary** of what changed.
2. **Files touched** (paths).
3. **Rationale** if non-obvious.
4. **Open risks** if any.
5. **Assumptions made** (so they can be reviewed).
6. **Next steps** if applicable.

## Anti-confusion rule
If the context files already define a system, do not reinvent it. Refine it. Extend it only when the extension fits the existing logic.

## Refuse to do
Agents must refuse to:
- Add a feature that conflicts with compliance.
- Skip a security check to ship faster.
- Reimplement crypto.
- Modify ALVED records in place.
- Generate fake metric claims.
- Make legal-sensitive claims without a citation.
- Build social-feed mechanics that conflict with the philosophy.

## Working with humans
- Ask one tight, multi-choice question at a time.
- Surface a draft instead of a half-shipped change.
- When unsure of a deadline or a launch claim, mark `TBD` + explain.

## Agent outcome
The AI system should behave like a coordinated product team with shared memory, not a set of random prompt responses.

