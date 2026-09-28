# Errors

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: this session's actual debugging record

Real errors hit during this branch's work, and how each was actually resolved — kept here rather than silently smoothed over, per `01_PRINCIPLES/PRINCIPLES.md` #12 ("Never fabricate").

| Error | Root cause | Fix |
|---|---|---|
| 3 parallel content-writing subagents failed with a session rate limit | Three concurrent subagent dispatches exceeded the session's rate limit | Did not retry the same parallel-subagent approach; wrote the content directly in the main thread once the limit reset the next day |
| `Header.tsx` hydration mismatch (SunIcon/MoonIcon SVG diff caught by a Playwright test) | First fix attempt used a lazy `useState` initializer reading `window` for theme — a genuine client/server mismatch, not a false alarm | Reverted to resolving theme inside a client-only `useEffect`, with the lint rule suppressed on that one line and a comment explaining why |
| `investors/request` route returning 500; `waitlist.spec.ts` UI tests timing out | Stray `next dev`/`next start` processes from earlier manual verification were still holding port 3000 | `ps aux \| grep next` + `kill` on stale PIDs before every later manual verification round — not a code bug |
| `prefill-email` sessionStorage value not persisting in dev | React 19 Strict Mode double-invokes effects in dev only; the throwaway first mount consumed the sessionStorage value before the real mount could use it | Re-verified against a production build (`next build && next start`), where it worked correctly — confirmed not a real bug |
| Referral-code regex test failed twice | (1) Code renders inside a separate `<span>` from its label, not one text run — matched the share-link `<code>` block instead. (2) React SSRs a `<!-- -->` comment between adjacent JSX expressions (`#` and the digit) | (1) Changed what the assertion matched. (2) Regex tolerates the optional comment marker |
| Honeypot tests initially wrong | Assumed a 200 silent-accept response; both schemas cap the honeypot field at `.max(0)`, so zod rejects it with 422 before the route's own honeypot check ever runs (that branch is dead code) | Fixed the tests to assert the real 422 behavior, with a comment explaining why, rather than changing the route to match the wrong assumption |
| `npm run typecheck` failed after archiving `/privacy`, `/terms`, `/delete` | Stale `.next/types/validator.ts` still referenced the removed routes | `rm -rf .next` before re-running |
| Shell parse error on a commit message containing raw backticks | Shell attempted command substitution on `` `new Date()` `` inside the message | Wrote the message to a scratch file, used `git commit -F <file>` for subsequent large messages |
| Playwright browser binary mismatch after `npm update` bumped `@playwright/test` | New Playwright version, stale browser binary | `npx playwright install chromium --with-deps` |
| Two citation errors in newly-written content docs, caught in a link-verification pass | Wrong filename for `Documents/13`; a nonexistent `Documents/16` citation (source only goes to 15) | Corrected both before merge into the canonical docs |
