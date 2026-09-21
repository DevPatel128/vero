# 04 — Independent Folders Pattern

A VROE-style monorepo has three top-level zones that **do not bleed into each other**:

```
apps/          # Product code (what logged-in users use)
website/       # Marketing copy (what strangers see)
packages/      # Shared utilities (used by both)
docs/          # Cross-cutting documentation
framework/     # Reusable framework (this folder)
```

Each zone has different cycles, different reviewers, different gates.

## Why the separation

| Concern              | apps                          | website                  | packages               |
| -------------------- | ----------------------------- | ------------------------ | ---------------------- |
| Primary audience     | Logged-in user                | Stranger / press         | Engineers              |
| Owner                | Engineering                   | Marketing + engineering  | Engineering            |
| Release cadence      | Continuous                    | Pre-launch fast, then weekly | Versioned         |
| Review weight        | Code review                   | Copy review              | Code review + visual   |
| Quality gate         | Build / test / a11y           | Lighthouse / schema / lint | Build / test         |
| Breaking change risk | Per-product                   | None (rendered server)   | Cross-product          |

## Why `/website` exists when there's `/apps/marketing`

`/apps/marketing` is the **renderer**. `/website/` is the **content**. Non-technical contributors edit content. Engineers edit the renderer. They meet only at the PR.

This split also lets you swap the marketing framework (Next.js → Astro, e.g.) without touching a word of copy.

## Per-product independence

Within `apps/`, each product (Vero / RIE / Trove / future) stands alone:

- Its own Next.js project.
- Its own ports, domains, Vercel project.
- Its own env vars.
- Its own context pack.
- Its own CLAUDE.md.
- Its own marketing folder in `/website/<product>/`.

The shared bits live in `packages/`. The cross-cutting bits live in `docs/`.

## How to add a new product

1. Pick a slug.
2. Copy `apps/_template/` (or the closest existing app) to `apps/<slug>/`.
3. Copy `framework/templates/context-pack/` to `apps/<slug>/docs/context-pack/`.
4. Copy `framework/templates/website/` to `website/<slug>/`.
5. Add a project to `vercel.json` + a port to `pnpm-workspace.yaml`.
6. Add it to `docs/ARCHITECTURE.md`'s topology.
7. Run the research prompt to fill the context pack.
8. Run the MVP prompt to scaffold the code.

## How the monorepo stays sane

- Turborepo orchestrates builds + caches.
- `@vroe/ui`, `@vroe/types`, `@vroe/config` are the shared trunk.
- Cross-product imports go through `@vroe/types` only.
- No app imports from another app. Ever.

## Anti-patterns

- Marketing copy embedded as JSX strings.
- Apps depending on each other.
- One Vercel project with multiple apps.
- A single tokens file copy-pasted three times.
- Engineering doing the press release.
- Marketing editing `next.config.ts`.

