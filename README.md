# Vero

**Proof-based hiring infrastructure, built by [VROE Labs](https://github.com/DevPatel128/vero).** Workers build a portable, dual-signed record of real work completed; businesses hire from that record instead of a resume.

> **Status: pre-launch.** Only the marketing site and waitlist are live. The core product (identity verification, job posting, escrow, dual-signature records) is specified but not built. An earlier prototype is kept for reference under [`10_ARCHIVE/`](10_ARCHIVE/) and is not deployed.

## What is in this repository

| Path | What it is | Status |
|---|---|---|
| [`website/site/`](website/site/) | The public website and waitlist (Next.js 16, React 19, Tailwind, Cloudflare Workers and D1, Resend) | Live |
| `00_START_HERE/` … `09_AUDIT/` | Product, research, design, engineering, operations, business and decision documentation, organised by the Wolf v3 framework | Maintained |
| [`10_ARCHIVE/`](10_ARCHIVE/) | Superseded documents and an unbuilt app prototype, kept for history | Archived |
| [`Documents/`](Documents/) | Founder-authored product narrative | Reference |

Start with [`00_START_HERE/README.md`](00_START_HERE/README.md) for a map of the documentation.

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
