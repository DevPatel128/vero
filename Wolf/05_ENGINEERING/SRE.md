# Site Reliability Engineering

Reliability is a product feature.

SLI = what we measure.
SLO = reliability target.
SLA = external commitment when applicable.
Error budget = tolerated unreliability implied by the SLO.

Track availability, latency, correctness, freshness and successful transactions where relevant.

Healthy budget → normal release velocity.
Budget under pressure → investigate risky changes.
Budget exhausted → prioritize reliability.

Measure → Alert → Diagnose → Mitigate → Recover → Learn → Change → Re-measure.
