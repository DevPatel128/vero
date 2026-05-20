# Website — Marketing Surface for VROE Labs

> The single source of truth for everything a visitor reads, sees, or hears about **Vero**, **RIE**, and **Trove** before they touch the product.

This folder is intentionally separated from `/apps`. Why? Because the **product app** and the **marketing site** are two different jobs, with different audiences, different release cycles, and different review processes.

| Folder       | Audience          | Question it answers                            |
| ------------ | ----------------- | ---------------------------------------------- |
| `/apps`      | Logged-in user    | "What do I _do_ here?"                         |
| `/website`   | Stranger / press  | "What _is_ this? Should I trust it?"           |

If you are a non-technical reader: this is the **brochure**. The `/apps` folder is the **store**.

---

## Layout

```
website/
├── vero/              # Everything marketing about Vero
│   ├── pages/         # Page-by-page content (home, features, pricing, ...)
│   ├── copy/          # Headlines, microcopy, taglines, CTAs
│   ├── schema/        # JSON-LD blocks for SEO / AEO / LLMO
│   ├── seo/           # Keyword research, sitemap plan, llms.txt entries
│   ├── blog/          # Editorial calendar + draft posts
│   └── assets/        # Image briefs (we don't store binaries — see /apps/*/public)
├── rie/               # Same layout — but for RIE
├── trove/             # Same layout — but for Trove
├── shared/            # Cross-product: VROE Labs umbrella, careers, press, legal
└── _framework/        # The reusable framework that built this folder
```

Every subfolder follows the same skeleton. If you ever wonder "where does X go?", you can almost always answer it by analogy: "well, in `vero/pages/home.md`, so it goes in `rie/pages/home.md`."

---

## What lives here vs. what does **not**

### Lives here
- Marketing page copy in Markdown (the words on Home, Features, Pricing, About, Security, etc.)
- SEO assets (titles, descriptions, keyword maps, schema, sitemap planning)
- AEO / LLMO assets (answer-engine entries, `llms.txt` fragments, FAQ JSON-LD)
- Brand voice, tone, do/don't lists
- Editorial calendar + blog drafts
- Press kit copy, careers copy, legal page copy

### Does **not** live here
- Compiled React / TSX components — those live in `/apps/marketing/src/...`
- Product UI — that's `/apps/vero`, `/apps/rie`, `/apps/trove`
- Binary assets (images, video) — those live in each app's `/public` directory
- Backend code, database schemas, auth — those are product concerns

This split is deliberate. A marketing writer can edit `website/vero/pages/home.md` without touching code. An engineer can refactor `/apps/marketing` without rewriting copy.

---

## How to use this folder

### If you write copy
1. Open the relevant product folder (`website/vero/`, `website/rie/`, `website/trove/`).
2. Edit Markdown in `pages/` or `copy/`.
3. Engineer pulls the copy into the live Next.js page in `/apps/marketing`.

### If you do SEO
1. Open `website/<product>/seo/`.
2. Update keyword plan, meta titles, descriptions.
3. Update `schema/*.jsonld` if structured data needs a change.

### If you draft a blog post
1. New file at `website/<product>/blog/YYYY-MM-DD-slug.mdx`.
2. Frontmatter: title, description, author, publishedAt, tags, ogImage.
3. Engineer wires it to `/apps/marketing/src/app/blog/...`.

### If you launch a new product
1. Copy `website/_framework/templates/<new-product>/` (it is a duplicate of the Vero scaffold).
2. Rename + fill it in.
3. Wire its routes into `/apps/marketing/src/app/<product>/`.

---

## Quality, security, compliance

Every page must pass:

- **Plain-language test** — a 14-year-old should understand the headline.
- **Promise–proof test** — every claim is either disclaimed (`coming Q3 2026`) or backed by something real on the same page.
- **Schema test** — JSON-LD validates at [schema.org/validator](https://validator.schema.org).
- **AEO test** — every FAQ question is phrased like a real human Google search.
- **LLMO test** — every page produces a coherent paragraph when the URL is fetched by a no-JS crawler. (Test with `curl`.)
- **Compliance test** — no claim violates DPDP / GDPR / CCPA / LGPD / PIPL / POPIA. See [`/docs/COMPLIANCE.md`](../docs/COMPLIANCE.md).

The mechanical checks are run from `/apps/marketing` build pipeline. The human checks are done at copy review.

---

## Where to read next

- [`vero/README.md`](vero/README.md) — Vero marketing
- [`rie/README.md`](rie/README.md) — RIE marketing
- [`trove/README.md`](trove/README.md) — Trove marketing
- [`shared/README.md`](shared/README.md) — VROE Labs umbrella + cross-product
- [`_framework/README.md`](_framework/README.md) — How this folder is structured + how to reuse the framework

Engineers wiring this into pages should also read:

- [`/apps/marketing/README.md`](../apps/marketing/README.md) — The actual Next.js app
- [`/docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) — System architecture
- [`/docs/COMPLIANCE.md`](../docs/COMPLIANCE.md) — Country-by-country compliance matrix
