# Vero — Proof-of-Work Identity

**Proof of work, not posts about work.**

Vero turns each job you complete into a verified record, signed by you and the person who hired you. Built for the modern workforce, starting in Bengaluru.

This repository contains the source code for the Vero marketing and waitlist website.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Database:** Supabase (Waitlist storage)
- **Deployment:** Vercel

## Local Development

### 1. Install Dependencies

```bash
cd website/site
npm install
```

### 2. Environment Variables

Create a `.env.local` file in `website/site/` based on the `.env.example`:

```bash
# website/site/.env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WAITLIST_STORE=file # Uses local JSON file for dev. Use 'supabase' for production.
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/website/site/` — The Next.js application codebase.
  - `src/app/` — Pages and API routes.
  - `src/components/` — Reusable UI components, illustrations, and motion wrappers.
  - `src/lib/` — Utilities, waitlist logic, and email integration.
- `/website/content/` — Marketing copy and planning docs.
- `/docs/` — System architecture and context packs.

## Deployment

This site is optimized for deployment on **Vercel**. 

To connect the Waitlist to a real database:
1. Create a Supabase project.
2. Run the `supabase-setup.sql` script in your Supabase SQL Editor.
3. Add `WAITLIST_STORE=supabase`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` to your Vercel Environment Variables.

