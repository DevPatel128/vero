# CI/CD

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Sources: Wolf v3 framework, `05_ENGINEERING/CI-CD.md`; `.github/workflows/ci.yml`, `.github/dependabot.yml`

Automate:
formatting, linting, type checks, tests, dependency checks, secret scanning, security scanning, builds, preview environments and deployment verification.

Protect:
branches, environments, credentials and production deployment permissions.

Prefer short-lived credentials and immutable build artifacts where practical.

## Applied in this repo

`.github/workflows/ci.yml` (added this PR, scoped to `website/site/**` changes): `npm ci` → typecheck → lint → Playwright install + test → `next build` → `npm audit --omit=dev` (non-blocking) → gitleaks. All actions are pinned by resolved commit SHA, `permissions: {}` by default (least privilege). `.github/dependabot.yml` groups weekly npm and GitHub Actions bumps. CI also compiles the Cloudflare Workers bundle (`npx opennextjs-cloudflare build`). Deployment is Cloudflare Workers Builds (`05_ENGINEERING/DEPLOYMENT.md`), not GitHub Actions, so no Cloudflare credential is stored in GitHub.

Not yet true: CI is not marked as a required check on `main` (a human action listed in this PR — see the PR body); until then, CI failing does not block a merge.
