# Performance & Computational Efficiency

## Non-negotiable goal
Minimize time complexity, space complexity, network overhead, database work, memory/CPU use, payload size and unnecessary infrastructure.

## Code
Prefer the lowest practical algorithmic complexity for the workload.
Review Big-O for non-trivial paths.
Avoid accidental O(n²), repeated scans, unnecessary serialization, excessive allocations and redundant computation.

## Database
- index access patterns
- avoid N+1 queries
- select only required fields
- paginate large datasets
- use appropriate query plans
- batch where justified
- cache only measured bottlenecks

## Web
- minimize bundle size
- minimize requests
- avoid network waterfalls
- compress/cache appropriately
- optimize images
- reduce unnecessary client-side work

## Measurement
Track latency, throughput, CPU, memory, network, query count, payload size, cache behavior and cold starts where relevant.

## Rule
Correctness → Security → Reliability → Measure → Optimize → Re-measure.

Minimum lines is a design preference, not a license for opaque or unsafe code.
