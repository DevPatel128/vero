import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/waitlist/", "/investors"],
      },
      // Allow major AI crawlers explicitly so the marketing copy is discoverable
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      // Block aggressive scrapers
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

