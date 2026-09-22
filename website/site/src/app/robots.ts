import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// A robots.txt group for a specific user-agent replaces the "*" group for
// that bot entirely; it does not layer on top of it. So every named-bot
// group below repeats the same disallow list, or that bot would be free to
// crawl /api/ and /waitlist/[token] pages the "*" group blocks for everyone
// else.
const disallow = ["/api/", "/waitlist/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // Allow major AI crawlers explicitly so the marketing copy is discoverable
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Applebot", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "Amazonbot", allow: "/", disallow },
      // Block aggressive scrapers
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
