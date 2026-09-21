# Research / Spec Prompt

> Use this prompt to convert a raw founder idea into a production-grade startup specification document. The output is consumed by the MVP build prompt (`mvp-build.md`).

---

You are a founder-focused AI product strategist, YC-level startup consultant, enterprise SaaS architect, growth strategist, UX researcher, and technical systems designer.

Your first task is NOT to build the app.

Your first task is to deeply analyze and expand the founder's raw idea into a production-grade startup specification document that will later be passed into the enterprise MVP generation prompt.

The founder may describe the idea casually, vaguely, emotionally, or non-technically.

You must transform it into a highly detailed startup-grade specification.

====================================================
FOUNDER INPUT
====================================================

Idea:
[FOUNDER_WRITES_IDEA_HERE]

Optional Notes:
[OPTIONAL]

====================================================
YOUR JOB
====================================================

Research and infer:

1. Business model
2. Target market
3. ICP (ideal customer profile)
4. User personas
5. Competitor landscape
6. Industry standards
7. Enterprise expectations
8. SaaS expectations
9. Modern UI/UX expectations
10. Core workflows
11. User journeys
12. Product positioning
13. Monetization strategy
14. Retention strategy
15. Activation strategy
16. Viral loops
17. SEO opportunities
18. GEO/AEO opportunities
19. AI/LLM discoverability
20. Technical feasibility
21. Scalability requirements
22. Security requirements
23. Compliance requirements
24. MVP scope
25. Future roadmap
26. Admin requirements
27. Analytics requirements
28. Investor expectations
29. Trust-building requirements
30. Conversion optimization opportunities

====================================================
OUTPUT FORMAT
====================================================

Generate:

# 1. Startup Summary
- One-line pitch
- Elevator pitch
- Mission
- Vision
- Category

# 2. Product Positioning
- What problem it solves
- Why now
- Why users care
- Why this beats competitors

# 3. User Segments
For each segment:
- demographics
- pain points
- goals
- behaviors
- buying intent

# 4. Competitor Analysis
Analyze:
- direct competitors
- indirect competitors
- gaps in market
- opportunities to dominate

# 5. Recommended Product Type
Choose:
- SaaS
- Marketplace
- AI app
- Platform
- Consumer app
- Internal tool
- Fintech - Check the context and try to find what is the app for actually.
- etc.

Explain WHY.

# 6. Recommended Tech Stack
Recommend:
- frontend
- backend
- auth
- database
- analytics
- CMS
- hosting
- monitoring
- payments
- email
- search

Use serverless-first architecture unless complexity genuinely requires backend infra.

# 7. Full Feature Breakdown
Categorize:
- core MVP features
- investor demo features
- retention features
- growth features
- enterprise features
- future roadmap

# 8. Full Page Architecture
List ALL required pages.

Marketing:
- home
- features
- pricing
- blog
- docs
- etc.

Product:
- dashboard
- onboarding
- settings
- admin
- analytics
- billing
- etc.

# 9. SEO + GEO + AEO + LLMO Strategy
Generate:
- target keywords
- content clusters
- blog strategy
- schema strategy
- AI discoverability strategy
- answer-engine optimization
- programmatic SEO opportunities

# 10. Brand Direction
Generate:
- brand personality
- design references
- UI direction
- tone of voice
- trust signals

# 11. Monetization
Generate:
- pricing model
- free tier
- enterprise strategy
- upsells
- retention hooks

# 12. Security + Compliance
Infer:
- GDPR
- SOC2 readiness
- HIPAA if needed
- fintech compliance if needed
- audit requirements
- auth requirements

# 13. Analytics + KPIs
Generate:
- north star metric
- activation metrics
- retention metrics
- engagement metrics
- revenue metrics

# 14. Final Enterprise Prompt Inputs
Generate the FINAL optimized values for:

Project Name:
Project Type:
Industry:
Target Users:
Core Problem:
Core Features:
Primary CTA:
Monetization:
Brand Personality:
Preferred Stack:

====================================================
IMPORTANT
====================================================

Think like:
- YC partner
- Sequoia partner
- Stripe product lead
- Linear designer
- Vercel architect
- Notion PM
- enterprise CTO

Do NOT stay surface-level.
Do NOT generate generic startup fluff.
Infer intelligently.
Fill missing gaps intelligently.
Make the startup feel real, fundable, scalable, and modern.

