# Architecture

## Architecture decision method
Requirements → constraints → simplest viable architecture → security review → performance review → cost review → failure analysis → implementation → validation.

## Architecture fitness functions
Security, correctness, reliability, latency, throughput, scalability, cost, operability, developer complexity and recovery.

## Scaling ladder
1. Modular monolith
2. Targeted background jobs/caching
3. Selective service extraction
4. Service-oriented architecture
5. Kubernetes/advanced orchestration only when justified

## Every new component must have
purpose, owner, interface, dependency, data flow, security boundary, failure mode, observability, cost, rollback and reason it cannot remain simpler.
