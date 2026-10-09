# Vero

**Proof-based hiring infrastructure, built by [VROE Labs](https://github.com/DevPatel128/vero).** Workers build a portable, dual-signed record of real work completed; businesses hire from that record instead of a resume.

> **Status: pre-launch.** Only the marketing site and waitlist are live. The core product (identity verification, job posting, escrow, dual-signature records) is specified but not built. An earlier, never-deployed prototype and the older documentation layouts remain in git history only.

## What is in this repository

| Path | What it is | Status |
|---|---|---|
| [`website/site/`](website/site/) | The public website and waitlist (Next.js 16, React 19, Tailwind, Cloudflare Workers and D1, Resend) | Live |
| [`AGENTS.md`](AGENTS.md) | Rules for anyone (human or AI agent) changing this repo | Maintained |
| [`PRODUCT.md`](PRODUCT.md), [`SYSTEM.md`](SYSTEM.md), [`RUNBOOK.md`](RUNBOOK.md), [`GROWTH.md`](GROWTH.md) | What Vero is, how the site works, how to operate it, how it will grow | Maintained |
| [`DECISIONS.md`](DECISIONS.md), [`MISTAKES.md`](MISTAKES.md) | Decision and mistake ledgers | Maintained |
| [`website/`](website/) | Copy contracts and draft page copy for the site | Reference |

The documentation follows the WOLF 1.0.5 kit (one file per concept). Start with [`AGENTS.md`](AGENTS.md), then [`PRODUCT.md`](PRODUCT.md).

## Run the website locally

Requires Node 24.

```sh
cd website/site
npm ci
cp .env.example .env.local   # all values are optional in development
npm run dev                  # http://localhost:3000
```

Local development uses a JSON file store by default. In production the site runs on Cloudflare Workers with a D1 database (see `website/site/wrangler.jsonc`).

| Command | Purpose |
|---|---|
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Playwright end-to-end and API tests |
| `npm run build` | Production build |

## Environment variables

See [`website/site/.env.example`](website/site/.env.example). Server-only secrets (`RESEND_API_KEY`) are never exposed to the browser. Never commit a real `.env` file.

## Security

Please report vulnerabilities privately; see [`SECURITY.md`](SECURITY.md).

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

No open-source license has been selected. Unless a `LICENSE` file is added, all rights are reserved by the copyright holder.
