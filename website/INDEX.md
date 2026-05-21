# VROE Labs — Website Content Hub

**Non-technical guide to what's in this folder.**

---

## What is this?

This folder stores **all marketing & product copy** for VROE Labs' three products:
- **Vero** — proof-of-work identity platform
- **RIE** — proof-of-discipline apprenticeship
- **Trove** — knowledge & credential aggregation

Copy here gets published to `/apps/marketing/src/app/...` by engineers.

---

## Folder Structure

### `/products/`
Each product has its own folder:

#### `/products/vero/`
- `README.md` — Vero copywriting guide
- `CLAUDE.md` — Agent instructions
- `pages/` — Marketing page copy (Markdown with frontmatter)
- `copy/` — Reusable copy blocks & messaging
- `blog/` — Blog post outlines & drafts
- `seo/` — SEO metadata (titles, descriptions, keywords)
- `schema/` — JSON-LD structured data
- `assets/` — References to images/video (files live in `/apps/vero/public/`)

Same structure for `/products/rie/` and `/products/trove/`.

### `/shared/`
Content that spans all products:
- Legal pages
- Company copy
- Brand guidelines
- Shared schema

### `/site/`
Next.js marketing site (engineers only — don't edit).

### `/_framework/`
Templates & utilities for creating new pages.

---

## How to Contribute

**For product managers / marketers:**
1. Add or edit a file in `/products/<product>/pages/`
2. Use frontmatter at top (see template)
3. Keep voice **calm, trust-first** (like Stripe, Linear, Notion)
4. Never use: _just, simply, easily, revolutionize, disrupt, AI-powered_
5. No overpromises — flag unfinished features as `(coming Q3 2026)`

**For engineers:**
- Pull copy from `/products/<product>/pages/`
- Paste into `/apps/marketing/src/app/...`
- Don't edit directly in `/apps/` — changes come back here

**For agents (Claude, Cursor, etc.):**
- See `CLAUDE.md` in each product folder
- See `/CLAUDE.md` at root for global rules
- See product `/README.md` for copy style guide

---

## Key Rules

1. ✅ Product claims must map to roadmap milestones
2. ✅ Legal/compliance claims go in `/docs/COMPLIANCE.md`
3. ❌ Never invent product behavior (ask if unsure)
4. ❌ Never store binary files here (images → `/apps/<product>/public/`)
5. ❌ Never edit `/apps/marketing/src/...` from this folder

---

## Quick Links

- **Product roadmaps:** `/apps/<product>/docs/context-pack/15-roadmap.md`
- **Compliance matrix:** `/docs/COMPLIANCE.md`
- **Brand tone guide:** `/apps/<product>/docs/context-pack/14-copywriting-tone.md`
- **SEO checklist:** See CLAUDE.md → "Self-checks before you say done"

---

## Questions?

Check the product's `README.md` → `CLAUDE.md` in this order:
1. Root `/CLAUDE.md`
2. `/products/<product>/CLAUDE.md`
3. `/products/<product>/README.md`

Then escalate to Slack `#marketing-copy` or the product owner.

