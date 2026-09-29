# Frontend Architecture

## Objective
Build a frontend that is modular, scalable, high-performance, and easy to maintain. The architecture must support a pre-launch website now and a full application later without needing a rebuild.

## Recommended stack
- Next.js 15
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion
- Lenis

Optional:
- GSAP for selected storytelling sections
- React Three Fiber only when a visual effect clearly improves the experience

## Architecture principles
1. One component should do one job.
2. One file should have one responsibility.
3. Shared logic belongs in reusable utilities or hooks.
4. Page content should be data-driven where possible.
5. Avoid repeated markup.
6. Keep client components minimal.
7. Use server components where possible if using Next.js.
8. Keep bundle size small.
9. Prefer readability over cleverness.

## Suggested folder structure
- app/ for pages and routes
- components/ for reusable UI
- data/ for copy and structured content
- hooks/ for reusable logic
- lib/ for utilities
- styles/ for global tokens and shared styling
- types/ for TypeScript interfaces

## Component strategy
Use reusable components for:
- hero sections
- stat cards
- step flows
- trust cards
- career cards
- FAQ accordions
- waitlist forms
- CTA blocks
- testimonial blocks
- footer and nav

Do not hardcode the same content blocks across pages. Reuse patterns with flexible props.

## State strategy
Keep state local when possible. Use global state only when necessary. Since the pre-launch website is mostly informational, avoid heavy client-side state. Save interactivity for:
- nav state
- accordion state
- form state
- theme state
- waitlist form state
- motion triggers

## Data strategy
Represent repeatable content as data arrays or objects:
- career paths
- FAQs
- testimonials
- roadmap items
- trust signals
- feature blocks

This makes the site easy to update without reworking components.

## Animation strategy
Use Framer Motion for subtle reveal and interaction states. Use Lenis for smooth scrolling. Do not over-animate. Motion should be a layer, not the structure.

## Performance strategy
- minimize hydration
- reduce client-side JS
- lazy-load non-critical components
- optimize images
- code-split heavy features
- avoid unnecessary libraries
- compress assets
- use static routes where appropriate

## SEO strategy
Each page should have:
- unique title
- unique meta description
- semantic structure
- clean headings
- shareable metadata
- appropriate OpenGraph data

## Maintainability strategy
Every component and module should be easy for an AI agent or human developer to understand quickly. Avoid nested abstractions that make the system hard to change. Keep the architecture boring in the best sense: predictable, modular, and durable.

## Pre-launch website constraint
Because this is a pre-launch website, the architecture should favor content clarity and conversion rather than application complexity. The code should still be ready to grow into the product later.

## Future-app compatibility
The frontend should be built so that the same design language can later power the actual app interface. That means reusing:
- cards
- badges
- step flows
- trust visuals
- profile structures
- CTA components
- modal patterns
- form styles

## Quality standard
The frontend should feel like a polished product from day one. It should not look like a prototype with placeholders. Even if the backend is static or serverless, the interface should feel intentional and finished.

