# MVP Build Prompt

> Use this prompt after the research prompt has produced the specification. This prompt generates the actual production-grade MVP — code, design, copy, SEO, compliance.

---

You are a senior-level product engineer, enterprise architect, staff UX designer, security engineer, DevOps engineer, SEO strategist, accessibility auditor, QA lead, and growth product strategist.

Your task is to generate a COMPLETE production-grade MVP web application and marketing website that is investor-ready, scalable, SEO-optimized, AI/LLM-optimized, secure, fast, visually polished, and deployable immediately for real-world pilot testing with 50–200 users.

The final output MUST feel like a real funded startup product, not a prototype.

====================================================
PROJECT INPUTS
====================================================

Project Name: [PROJECT_NAME]

Project Type:
[SaaS / Marketplace / AI App / Fintech / Social Platform / Analytics Dashboard / Internal Tool / Consumer App / Other]

Industry:
[INDUSTRY]

Target Users:
[TARGET_USERS]

Core Problem:
[PROBLEM_STATEMENT]

Core Features:
[FEATURE_LIST]

Primary CTA:
[PRIMARY_CALL_TO_ACTION]

Monetization:
[SUBSCRIPTION / FREEMIUM / ONE-TIME / LEAD-GEN / ENTERPRISE SALES]

Brand Personality:
[MODERN / MINIMAL / LUXURY / TECH / ENTERPRISE / PLAYFUL / PREMIUM]

Preferred Stack:
[LEAVE BLANK IF NOT SPECIFIED]

====================================================
GLOBAL REQUIREMENTS
====================================================

Build a fully structured enterprise-grade product with:

- Production-ready frontend
- Production-ready backend only IF needed
- Serverless-first architecture
- Mobile-first responsive design
- WCAG AA accessibility compliance
- SEO + GEO + AEO + LLMO optimization
- Investor-demo quality polish
- Enterprise-grade UI/UX
- Fast loading speed
- Secure architecture
- Clean scalable codebase
- Structured documentation
- Real-world deployability
- CI/CD setup
- Testing infrastructure
- Monitoring and observability
- Analytics instrumentation
- Scalable information architecture

Do NOT generate placeholder junk.
Every page, section, button, state, flow, and piece of copy must feel intentional and realistic.

====================================================
ARCHITECTURE REQUIREMENTS
====================================================

DEFAULT RULE:
Use static-first and serverless-first architecture.

Preferred stack hierarchy:

1. Next.js App Router + TypeScript
2. TailwindCSS
3. shadcn/ui
4. Server Components where possible
5. Vercel deployment
6. Supabase/Firebase only if persistence is needed
7. Edge functions where useful
8. PostgreSQL only if relational complexity exists

DO NOT introduce a backend unless genuinely required.

Use:
- Static rendering
- Incremental Static Regeneration
- Edge caching
- CDN optimization
- Serverless APIs

Avoid:
- Monolithic backend
- Heavy infra
- Overengineering
- Unnecessary microservices

====================================================
DESIGN SYSTEM
====================================================

Create a full enterprise-grade design system including:

- Typography scale
- Color system
- Spacing system
- Radius system
- Elevation/shadow system
- Component states
- Motion guidelines
- Hover/focus states
- Dark mode
- Accessibility-safe contrast

Generate reusable components:

- Navbar
- Footer
- Buttons
- Cards
- Modals
- Dialogs
- Inputs
- Tables
- Charts
- Empty states
- Error states
- Loading skeletons
- Toasts
- Dropdowns
- Command palette
- Mobile navigation
- Search UI
- Pricing cards
- FAQ accordion
- Testimonials
- Analytics widgets

The UI should feel comparable to:
Stripe, Linear, Notion, Vercel, Framer, Ramp, Perplexity, OpenAI, Retool.

====================================================
INFORMATION ARCHITECTURE
====================================================

Generate all necessary pages.

MANDATORY PAGES:

Marketing:
- Home
- Features
- Pricing
- About
- Contact
- Careers
- Blog
- Changelog
- Documentation
- Integrations
- Case Studies
- Security
- Privacy Policy
- Terms of Service
- Cookie Policy
- Accessibility Statement

Product:
- Login
- Register
- Forgot Password
- Onboarding
- Dashboard
- Settings
- Billing
- Notifications
- User Profile
- Team Management
- API Keys
- Audit Logs
- Admin Panel
- Support Center
- Search Results
- 404
- 500

====================================================
BLOG + CONTENT ENGINE
====================================================

Implement a production-grade blog system.

Requirements:
- SEO optimized articles
- Dynamic metadata
- OpenGraph support
- Twitter cards
- RSS feed
- XML sitemap inclusion
- Canonical URLs
- Table of contents
- Reading progress bar
- Structured headings
- FAQ schema
- Article schema
- Breadcrumbs
- Related posts
- Author pages
- Category pages
- Tag pages
- Search functionality

Support:
- Markdown
- MDX
- Headless CMS compatibility

Blog strategy:
- Programmatic SEO ready
- GEO optimized
- AEO optimized
- LLM-readable formatting
- Snippet optimized
- Featured snippets support

====================================================
SEO + GEO + AEO + LLMO
====================================================

The site MUST be optimized for:

- Google Search
- Bing
- Perplexity
- ChatGPT retrieval
- Claude retrieval
- Gemini retrieval
- AI agents
- Voice search
- Answer engines

MANDATORY:
- robots.txt
- sitemap.xml
- structured metadata
- semantic HTML
- JSON-LD schema
- canonical URLs
- OpenGraph tags
- Twitter cards
- breadcrumb schema
- FAQ schema
- Organization schema
- SoftwareApplication schema
- Article schema

Create:
- robots.txt
- sitemap.xml
- llms.txt
- manifest.json

robots.txt MUST:
- allow major AI crawlers
- allow GPTBot
- allow ClaudeBot
- allow PerplexityBot
- disallow admin routes
- disallow staging routes

Generate optimized:
- titles
- descriptions
- slugs
- internal linking
- heading hierarchy

Ensure:
- crawlability
- renderability
- indexability
- semantic structure

All content must be understandable without JavaScript execution.

====================================================
SECURITY
====================================================

Implement enterprise-grade security.

MANDATORY:
- HTTPS everywhere
- HSTS
- CSP headers
- CSRF protection
- XSS protection
- SQL injection prevention
- Rate limiting
- Secure cookies
- Secure auth flow
- Input sanitization
- Environment variable isolation
- API validation
- RBAC
- Audit logs

Authentication:
- Email/password
- OAuth
- Session management
- Password reset
- MFA-ready architecture

Compliance-ready:
- GDPR
- CCPA
- cookie consent
- data export
- account deletion
- privacy controls

====================================================
PERFORMANCE
====================================================

Performance budgets:
- Lighthouse > 90
- LCP < 2.5s
- CLS < 0.1
- TTI < 5s

Optimize:
- bundle splitting
- lazy loading
- image optimization
- font loading
- edge caching
- route prefetching
- script deferral

Use:
- WebP/AVIF
- responsive images
- dynamic imports
- partial hydration if useful

====================================================
PRODUCT EXPERIENCE
====================================================

Implement production-quality UX.

Include:
- onboarding flows
- activation flows
- retention hooks
- onboarding checklist
- feature discovery
- search
- keyboard shortcuts
- notifications
- email states
- loading states
- offline states
- retry states
- optimistic UI
- undo actions
- onboarding empty states

Ensure:
- zero dead ends
- smooth transitions
- polished microinteractions
- intuitive navigation
- enterprise-level usability

====================================================
ANALYTICS + OBSERVABILITY
====================================================

Integrate:
- PostHog or GA4
- event tracking
- funnel tracking
- conversion tracking
- session replay
- error replay
- uptime monitoring
- performance monitoring
- structured logs

Track:
- signups
- onboarding completion
- activation
- retention
- churn
- CTA clicks
- feature usage
- engagement

Generate KPI dashboards.

====================================================
ADMIN + OPERATIONS
====================================================

Generate:
- admin dashboard
- moderation tools
- user management
- billing management
- analytics dashboard
- audit logs
- feature flags
- announcement system
- support tooling

====================================================
BILLING + SUBSCRIPTIONS
====================================================

Billing-ready architecture:
- Razorpay integration ready
- pricing tiers
- invoices
- receipts
- subscriptions
- upgrade/downgrade
- trial periods
- cancellation flow

====================================================
API + DEVELOPER EXPERIENCE
====================================================

Generate:
- typed API layer
- OpenAPI spec
- API documentation
- SDK-ready structure
- webhooks
- rate limiting
- API key management

====================================================
TESTING + QA
====================================================

Implement:
- unit tests
- integration tests
- E2E tests
- accessibility tests
- performance tests
- stress tests
- security tests

Simulate:
- 50 users
- 200 users
- 1000 users spike

Verify:
- no broken links
- no console errors
- no hydration issues
- no accessibility violations
- no security vulnerabilities

Test:
- Chrome
- Safari
- Firefox
- Edge
- iOS Safari
- Android Chrome

====================================================
CI/CD + DEPLOYMENT
====================================================

Generate:
- GitHub Actions workflows
- lint pipeline
- test pipeline
- preview deployments
- production deployments

Deployment targets:
- Vercel
- Netlify
- Cloudflare Pages

Include:
- environment setup
- secrets handling
- rollback strategy
- staging environment

====================================================
DOCUMENTATION
====================================================

Generate:
- README
- setup guide
- deployment guide
- architecture documentation
- API documentation
- folder structure explanation
- environment variables guide
- onboarding docs

====================================================
FINAL OUTPUT REQUIREMENTS
====================================================

Deliver:

1. Full application architecture
2. Production-ready codebase
3. Design system
4. Responsive UI
5. Backend only if needed
6. Database schema if needed
7. API routes
8. SEO infrastructure
9. robots.txt
10. sitemap.xml
11. llms.txt
12. Structured metadata
13. Blog engine
14. Authentication
15. Analytics
16. Admin dashboard
17. CI/CD workflows
18. Security hardening
19. QA/testing suite
20. Documentation
21. Deployment configuration
22. Monitoring setup
23. Performance optimization
24. Accessibility compliance
25. Investor-demo polish
26. It Should also be LLM and AI agents hacksafe.

The final product should feel indistinguishable from a modern funded startup MVP.

Prioritize:
- clarity
- scalability
- performance
- maintainability
- investor trust
- user trust
- conversion optimization
- production readiness

Do NOT cut corners.
Do NOT simplify enterprise requirements.
Do NOT generate pseudo-code.
Generate realistic implementation-quality output.

