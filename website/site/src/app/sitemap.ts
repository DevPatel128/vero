import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const staticRoutes: { path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/how-it-works", priority: 0.9, changefreq: "monthly" },
  { path: "/features", priority: 0.9, changefreq: "monthly" },
  { path: "/for-workers", priority: 0.85, changefreq: "monthly" },
  { path: "/for-businesses", priority: 0.85, changefreq: "monthly" },
  { path: "/pricing", priority: 0.8, changefreq: "monthly" },
  { path: "/about", priority: 0.7, changefreq: "monthly" },
  { path: "/manifesto", priority: 0.7, changefreq: "monthly" },
  { path: "/why-now", priority: 0.7, changefreq: "monthly" },
  { path: "/trust", priority: 0.7, changefreq: "monthly" },
  { path: "/security", priority: 0.7, changefreq: "monthly" },
  { path: "/faq", priority: 0.75, changefreq: "monthly" },
  { path: "/contact", priority: 0.6, changefreq: "yearly" },
  { path: "/press", priority: 0.6, changefreq: "monthly" },
  { path: "/status", priority: 0.5, changefreq: "daily" },
  { path: "/ecosystem", priority: 0.8, changefreq: "monthly" },
  { path: "/legal/privacy", priority: 0.5, changefreq: "yearly" },
  { path: "/legal/terms", priority: 0.5, changefreq: "yearly" },
  { path: "/legal/cookies", priority: 0.4, changefreq: "yearly" },
  { path: "/legal/refund", priority: 0.4, changefreq: "yearly" },
  { path: "/legal/acceptable-use", priority: 0.4, changefreq: "yearly" },
  { path: "/legal/accessibility", priority: 0.4, changefreq: "yearly" },
  { path: "/legal/grievance", priority: 0.5, changefreq: "yearly" },
  { path: "/legal/responsible-disclosure", priority: 0.5, changefreq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticRoutes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));
}

