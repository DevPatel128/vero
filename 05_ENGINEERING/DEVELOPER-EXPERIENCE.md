# Developer Experience

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Sources: Wolf v3 framework, `05_ENGINEERING/DEVELOPER-EXPERIENCE.md`; `website/site/package.json`, `.github/workflows/ci.yml`, `website/site/README.md`

Standardize:
repository layout, local setup, environment variables, scripts, testing, linting, formatting, commits, PRs, code ownership, debugging, documentation and incident handoff.

The easiest path should also be the safe path.

## Applied in this repo

- **Repository layout:** `website/site/` is the only deployed code; `10_ARCHIVE/` holds everything superseded. `00_START_HERE/README.md`'s "code map" is the map.
- **Local setup:** `npm ci` inside `website/site`, `.env.example` for placeholders (no real credentials ever committed, per `01_PRINCIPLES/PRINCIPLES.md`).
- **Scripts:** `npm run typecheck`, `npm run lint`, `npm test` (Playwright), `npm run build` — the same four gates CI runs (`05_ENGINEERING/CI-CD.md`).
- **Formatting/linting:** flat ESLint config (`eslint.config.mjs`), added this PR since Next 16 removed `next lint`.
- **Commits/PRs:** `.github/CODEOWNERS` requires review on `website/site/`, `.github/`, `01_PRINCIPLES/` and `08_DECISIONS/`.
- **Debugging/incident handoff:** `06_OPERATIONS/INCIDENTS.md`, `06_OPERATIONS/RUNBOOKS/`.

The safe path is the only path where it matters most: `join`'s duplicate-email response can no longer leak a token even if a future change forgets to check for it, because the response shape is now identical either way (`src/app/api/waitlist/join/route.ts`).
