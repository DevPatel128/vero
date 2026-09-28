# Quality (testing)

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: The Framework. (imported unchanged apart from this header); renamed from `DEVELOPMENT/TESTING.md` to `QUALITY.md` when this repo adopted the Wolf v3 layout, content unchanged
> Split from `ENGINEERING.md`: section 15. Section numbers are unchanged so old references still resolve.

## 15. Testing

Test according to risk.

Possible layers:

- unit
- integration
- end-to-end
- API
- authorization
- RLS
- security
- performance
- failure/recovery

High-risk paths require stronger testing.

Security tests must verify both permitted and denied behavior.
