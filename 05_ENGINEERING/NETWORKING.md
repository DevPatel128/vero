# Networking (Cloudflare / infrastructure)

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: The Framework. (imported unchanged apart from this header); renamed from `INFRASTRUCTURE/CLOUDFLARE.md` to `NETWORKING.md` when this repo adopted the Wolf v3 layout, content unchanged
> Split from `ENGINEERING.md`: section 4. Section numbers are unchanged so old references still resolve.

## 4. Cloudflare

Use Cloudflare services only when they solve a real requirement.

Potential components include:

```text
DNS
CDN / caching
WAF
DDoS protection
Workers
R2
Rate limiting
Headers
Secrets
Observability
```

### Cloudflare rules

- Minimize public exposure.
- Apply appropriate security controls.
- Keep secrets outside source code.
- Use caching where it reduces latency/cost without causing stale or incorrect data.
- Use rate limiting where abuse or cost exposure warrants it.
- Keep Worker logic small and measurable.
- Avoid adding Cloudflare products without a requirement.
- Measure performance before and after material optimization.
- Estimate recurring cost before adopting paid usage.
