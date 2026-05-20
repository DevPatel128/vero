import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*",            allow: "/", disallow: ["/admin", "/api", "/dashboard", "/transactions", "/analytics", "/subscriptions", "/budgets", "/goals", "/reports", "/notifications", "/settings", "/onboarding", "/search", "/support", "/auth/"] },
      { userAgent: "GPTBot",       allow: "/", disallow: ["/admin", "/api"] },
      { userAgent: "ClaudeBot",    allow: "/", disallow: ["/admin", "/api"] },
      { userAgent: "PerplexityBot",allow: "/", disallow: ["/admin", "/api"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/admin", "/api"] },
      { userAgent: "Applebot-Extended", allow: "/", disallow: ["/admin", "/api"] },
      { userAgent: "CCBot",        allow: "/", disallow: ["/admin", "/api"] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
