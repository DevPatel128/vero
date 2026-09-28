# Performance

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21
> Source: The Framework. (imported unchanged apart from this header)
> Split from `ENGINEERING.md`: section 13. Section numbers are unchanged so old references still resolve.

## 13. Performance

Optimize for actual requirements.

Measure:

- latency
- CPU
- memory
- network
- database queries
- storage
- payload size
- cache behavior
- cold starts where relevant

Order of work:

```text
Correctness
   ↓
Security
   ↓
Reliability
   ↓
Measure
   ↓
Optimize
```

Do not trade correctness or security for theoretical performance.
