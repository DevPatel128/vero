# 13 — Performance Rules

## Targets (production)
- **Lighthouse Performance** ≥ 90 (mobile + desktop).
- **LCP** < 2.5s on 4G + mid-range Android.
- **CLS** < 0.05.
- **TTI** < 5s on 4G + mid-range Android.
- **FCP** < 1.5s.
- **Server response (TTFB)** < 600ms for SSR routes, < 200ms for edge routes.

## Bundle budgets
- App entry JS gzipped: ≤ 200KB.
- Route chunks: ≤ 100KB each.
- Marketing pages: ≤ 80KB total JS.
- CSS: ≤ 60KB.
- Web fonts: ≤ 2 family weights initial, swap-on-load only.

CI fails on budget breach.

## Image rules
- Next.js `<Image>` only.
- AVIF preferred, WebP fallback.
- Profile photos through Cloudflare Images.
- Above-the-fold images use `priority`.
- Responsive `sizes` mandatory.

## Font loading
- Subset to Latin + Indic where needed.
- `font-display: swap`.
- Pre-load only the display family.

## Rendering strategy by route
| Route type           | Strategy             |
| -------------------- | -------------------- |
| Public profile (SSG) | ISR 60s              |
| Marketing            | Static / ISR 1 hour  |
| Job detail           | SSR + cache 30s      |
| Discover (search)    | SSR + edge cache 10s |
| Auth / forms         | Client-rendered      |
| Admin                | SSR + auth-walled    |

## Caching layers
- Edge cache for public ALVED JSON-LD (60s ISR).
- CDN cache for static assets (1 year, immutable hash).
- Redis cache for hot search queries (30s).
- Postgres prepared statements.

## Lazy patterns
- Below-fold sections dynamically imported.
- Charts and large libs (`recharts`) lazy-loaded.
- Heavy components (map, chart, video) `react.lazy` with skeletons.

## Critical CSS
- Inline critical CSS for marketing pages.
- Tailwind v4 generates the minimal CSS via JIT.

## Long-running tasks
- ALVED batch verification → background job.
- Trust score recomputation → background job.
- Anything > 1s of compute → background, not request path.

## Mobile-first reality checks
- Test on mid-range Android (₹15k–20k segment).
- Test on slow 4G.
- Test on 320px width.

## Service Worker (PWA)
- Marketing surface: SW for offline tabs.
- Product surface: SW for asset caching + push notifications post-GA.
- No service worker on auth-walled routes.

## Code-split strategy
- Route-based + component-based + i18n-based.
- Locale bundles loaded on demand.

## Database performance
- Indices on every hot path.
- N+1 queries banned — use joins or `EXISTS` subqueries.
- Pagination is cursor-based for large lists.
- Avoid `SELECT *`.

## Monitoring
- Web vitals to Vercel Analytics + PostHog.
- Sentry performance traces enabled for top 5 routes.
- Logflare for slow queries (>250ms).

## Performance regression policy
- Any PR that worsens Lighthouse by 5+ points on the route it touches must be justified.
- Bundle budget breach is auto-blocked.

