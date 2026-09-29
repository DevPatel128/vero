# Cost

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: The Framework. (imported unchanged apart from this header); renamed from `COST/COST-OPTIMIZATION.md` to `COST.md` when this repo adopted the Wolf v3 layout, content unchanged
> Split from `ENGINEERING.md`: section 14. Section numbers are unchanged so old references still resolve.

## 14. Cost optimization

Consider total cost, not only infrastructure pricing.

```text
Compute
+ Database
+ Storage
+ Network
+ Third-party services
+ Developer time
+ Maintenance
+ Operational complexity
= Total cost
```

For significant choices:

1. Estimate cost.
2. Identify cheaper alternatives.
3. Compare expected outcomes.
4. Select the lowest-cost option that meets requirements.
5. Record why a more expensive option is justified when one is chosen.

Avoid premature scale infrastructure.
