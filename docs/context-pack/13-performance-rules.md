# Performance Rules

## Objective
Keep the website and application fast, lightweight, and responsive. Performance is a brand feature because speed affects trust.

## Performance philosophy
A premium product should feel instant, especially on mobile. Slow loading, heavy animations, and oversized bundles reduce credibility. Performance decisions should be intentional.

## Key targets
- fast initial load
- minimal layout shift
- smooth scrolling
- low memory usage
- low CPU usage
- high Lighthouse scores
- good low-end device support

## Frontend rules
- use static rendering where possible
- reduce client-side JS
- split code by route and feature
- lazy-load non-critical content
- avoid heavy dependencies
- reuse components
- minimize DOM complexity
- avoid overly nested wrappers

## Images and media
- use optimized image sizes
- compress assets
- use appropriate formats
- lazy-load below-the-fold media
- avoid unnecessary autoplay
- serve only what is needed for the current view

## Motion and rendering
- keep animations subtle
- avoid large blur or heavy shadow effects
- reduce repaint-heavy patterns
- keep transitions smooth
- prefer transform and opacity animations when possible

## Data and network
- avoid unnecessary requests
- batch where possible
- cache repeated data
- keep payloads lean
- avoid polling unless required
- use realtime carefully

## Mobile performance
The product must feel good on:
- low-end Android phones
- slow networks
- older browsers where relevant
- small screens

This means:
- smaller bundles
- touch-friendly UI
- reduced complexity
- simple responsive layouts
- fast image handling

## Build discipline
Performance should be considered during implementation, not after. If a feature makes the system meaningfully slower and the benefit is marginal, the feature should be reworked or removed.

## Lazy complexity
Do not add advanced systems before the product needs them. Complexity should arrive when value justifies it.

## Continuous measurement
Performance should be checked regularly through:
- bundle analysis
- runtime observation
- load behavior
- device testing
- responsiveness checks

## Performance outcome
The product should feel efficient and calm. The user should never feel that the system is wasting their time or device resources.

