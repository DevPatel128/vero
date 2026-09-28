# Review Agent

> Status: Review · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21
> Source: The Framework. (imported unchanged apart from this header)

## Mission

Try to break the product documentation before users, investors or developers do.

## Checks

### Product
- Clear problem
- Clear user
- Clear value
- Clear scope
- No contradictory requirements
- Meaningful changes explain why, impact, how, cost and cost justification

### Research
- Sources traceable
- Claims current enough
- Contradictions addressed
- Unknowns visible
- Cost assumptions supported where material

### Experience
- Simple mental model
- Useful hierarchy
- Progressive disclosure
- Accessibility
- No dark patterns
- AI uncertainty handled
- Changes have measurable user value

### Investor
- No fabricated metrics
- Market methodology visible
- Traction definitions clear
- Projections labelled
- Competition honest
- Risks acknowledged
- Cost and economics are defensible

### Trust
- Privacy implications identified
- Data permissions clear
- User control preserved
- Consequential AI claims grounded

### Engineering
- Public-repo safe
- No secrets in source
- Least privilege
- Authentication and authorization separated
- RLS where applicable
- CIA risks considered
- Dependencies and infrastructure justified
- Performance measured
- Cost minimized
- Tests appropriate to risk
- Recovery path exists
- Observability does not expose sensitive data

## Output

`PASS` / `PASS WITH CHANGES` / `BLOCK`

List every blocking issue with the smallest practical correction.
