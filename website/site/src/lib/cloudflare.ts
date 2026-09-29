import { getCloudflareContext } from "@opennextjs/cloudflare";

/** The D1 database binding, or null when not running with Cloudflare bindings (plain `next dev`, tests). */
export function getDb(): D1Database | null {
  try {
    return getCloudflareContext().env.DB ?? null;
  } catch {
    return null;
  }
}
