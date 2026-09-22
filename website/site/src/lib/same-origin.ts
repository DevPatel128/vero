/**
 * A lightweight CSRF defense for form endpoints with no session/cookie to
 * check: the request must claim to come from this same host, via the
 * Origin header (falling back to Referer, since some browsers omit Origin
 * on same-origin requests in edge cases). A request with neither header is
 * not something a normal browser form submission produces, so it is
 * rejected too.
 *
 * Compares against the request's own Host header rather than a hard-coded
 * domain, so this works on every Vercel preview URL as well as production.
 */
export function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;

  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return false;
}
