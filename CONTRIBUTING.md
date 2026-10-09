# Contributing

Thanks for your interest in Vero. The project is pre-launch and maintained by VROE Labs, so please open an issue to discuss a change before sending a large pull request.

## Setup

```sh
cd website/site
npm ci
cp .env.example .env.local
npm run dev
```

Requires Node 24. Do not commit `.env` files or real credentials; `.env.example` holds placeholders only.

## Before opening a pull request

Run all four from `website/site/` and make sure they pass:

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

Add or update tests for behaviour you change, especially the two public POST routes under `src/app/api/`.

## Pull requests

- Branch from `main`; keep each PR focused.
- Explain why the change is needed, what it affects, and any cost or risk.
- Changes to `website/site/`, `.github/`, `AGENTS.md` or `DECISIONS.md` need review from the code owner (`.github/CODEOWNERS`).
- Documentation follows the WOLF kit described in [`AGENTS.md`](AGENTS.md): one canonical home per concept, no unsourced claims, and touched docs are updated in the same PR.

## Security

Report vulnerabilities privately, as described in [`SECURITY.md`](SECURITY.md).

## Bugs and proposals

Open a GitHub issue using the template. For product proposals, describe the user problem first.
