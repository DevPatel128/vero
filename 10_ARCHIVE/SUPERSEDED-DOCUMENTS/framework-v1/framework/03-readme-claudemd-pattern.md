# 03 — README.md + CLAUDE.md Pattern

Every folder in the monorepo gets two files: **README.md** for humans, **CLAUDE.md** for agents. Both are short, single-purpose, and link to each other.

## Why two files

- **README** is forgiving — it explains, persuades, links.
- **CLAUDE** is contract-like — it constrains, refuses, prescribes.
- They serve different readers. Mixing them produces files no one likes.

## Coverage rule — "max depth"

- Every **app** has both.
- Every **package** has both.
- Every **top-level folder** has both.
- Every **subfolder with content** has at least a README (and a CLAUDE if behavior is sensitive).
- Folders that are pure source code (e.g., `src/components/forms/`) can skip both if the parent's CLAUDE covers them.

## README.md template

```markdown
# {{folder name}} — {{one-line purpose}}

> Optional pull-quote that captures the spirit of the folder.

## What this folder does
...

## What this folder does **not** do
...

## Layout
...

## How to use
...

## Where to read next
- [...](...)
```

## CLAUDE.md template

```markdown
# CLAUDE.md — {{folder name}} agent contract

Inherits `/CLAUDE.md`, `/AGENTS.md` (and any deeper file).

## Mission
{{one-paragraph mission}}

## Source of truth
1. {{path to root contract}}
2. {{path to product context-pack files}}
3. {{path to compliance if relevant}}

## Hard rules
1. ...
2. ...

## Workflow per task
1. ...
2. ...

## Refuse to
- ...
- ...
```

## Hierarchical precedence (when files conflict)

The framework uses **deepest-wins**:

```
root  →  app  →  app subfolder  →  context-pack rules  →  this folder
```

A folder-level CLAUDE.md beats a root-level rule when they conflict.

## Quality bar for these files

- Both files are < 200 lines each.
- Every link works.
- The CLAUDE refuses to repeat the README; the README refuses to constrain agents.
- A new reader (human or agent) can become productive after reading just the README + CLAUDE for that folder.

## Why this scales

The pattern looks redundant on day one. On day 90, when a new contributor (or an agent) is dropped into a random folder, they have everything they need without backtracking. The cost is small files. The payoff is fewer questions and fewer breakages.

## Anti-patterns

- A README that is a 5,000-word essay nobody reads.
- A CLAUDE that hedges ("try to keep the code clean").
- Duplicating the context pack inside CLAUDE.
- A folder with no README and no CLAUDE — invisible to readers and agents.

## Audit

Quarterly check that every folder either has both files or has a parent that covers it. A lint rule can enforce this.

