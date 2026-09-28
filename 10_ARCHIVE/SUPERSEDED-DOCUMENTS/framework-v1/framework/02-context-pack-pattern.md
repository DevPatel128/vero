# 02 — Context Pack Pattern

The **context pack** is a folder of 21 single-purpose Markdown files (numbered 00–20) that fully describes a product. It is the **product-side source of truth** and the input to every AI agent that touches the product.

## Why 21 files

Twenty-one is what we landed on after compressing real product systems. Each file answers exactly one question. Fewer files leak concerns. More files create navigation pain.

## The file map

| #   | Topic                          | Why this file                                                  |
| --- | ------------------------------ | -------------------------------------------------------------- |
| 00  | Project overview               | The 60-second pitch + ICP + non-negotiables                    |
| 01  | Product philosophy             | The decision filter for every feature                          |
| 02  | Brand system                   | Voice + palette + type + motion + co-marks                     |
| 03  | UI / UX rules                  | Layout + states + accessibility + microcopy                    |
| 04  | Frontend architecture          | Stack + routing + components + rendering strategy              |
| 05  | Backend architecture           | Services + data flows + idempotency + rate limits              |
| 06  | Trust system                   | Signals + display + abuse prevention + dispute flow            |
| 07  | Chain / signing system         | Record shape + flow + visibility + verification                |
| 08  | Career / household / pattern   | The progression a user goes through                            |
| 09  | Growth engine                  | North star + loops + SEO + AEO + LLMO                          |
| 10  | Onboarding system              | First-time flow + recovery + accessibility                     |
| 11  | Design system                  | Tokens + components + states (links into `@<org>/ui`)          |
| 12  | Security rules                 | Crypto + auth + headers + threat model                         |
| 13  | Performance rules              | Targets + budgets + caching + monitoring                       |
| 14  | Copywriting tone               | Voice + word lists + headlines + microcopy                     |
| 15  | Roadmap                        | Now / next / later milestones                                  |
| 16  | Database schema                | Tables + RLS + indices + backups                               |
| 17  | API architecture               | Surfaces + auth + errors + idempotency + SLOs                  |
| 18  | Admin system                   | Modules + permissions + co-sign + audit                        |
| 19  | Deployment system              | Hosting + envs + CI/CD + rollback + DR                         |
| 20  | AI agent rules                 | Contract for any AI agent                                      |

## How the pack is consumed

### By humans
- The README at the pack root has a **usage recipe** table: for each common task, which files to load.
- Each file is small (1–2 pages) so a human can absorb it in minutes.

### By AI agents
- Drop the relevant files into the agent's context as plain Markdown.
- Start with `00` + `20` + the task-specific files.
- The agent's `CLAUDE.md` enforces the load order.

## Rules

1. **One topic per file.** If two topics keep merging, split them.
2. **No duplication.** Cross-link with paths; don't copy text.
3. **Plain Markdown.** No exotic syntax.
4. **Update both files when a system changes.** The roadmap (15) is the calendar; everything else is the system.
5. **20 is the contract.** When agents conflict with users, 20 plus `/CLAUDE.md` resolve it.

## File template

```markdown
# {{number}} — {{title}}

## {{first heading}}
...

## {{second heading}}
...

## Anti-patterns
- ...
```

See `templates/context-pack/` for a copyable scaffold.

## When to deviate

You can add files 21+ for genuinely new concerns (e.g., a regulated medical product might add `21-clinical-rules.md`). Do **not** drop 00–20 — every project benefits from each of them, even briefly.

## Maintenance

- Quarterly review of the pack.
- File-level last-updated dates if needed.
- Any breaking product change → corresponding file update **before** the code change.

