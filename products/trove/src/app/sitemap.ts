import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllPosts, getAllDocs } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages = [
    "", "/features", "/pricing", "/about", "/contact", "/careers",
    "/security", "/integrations", "/case-studies", "/changelog",
    "/blog", "/docs",
    "/privacy", "/terms", "/cookies", "/accessibility",
  ];

  const posts = await getAllPosts();
  const docs = await getAllDocs();

  return [
    ...staticPages.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.7,
    })),
    ...posts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...docs.map((d) => ({
      url: `${siteConfig.url}/docs/${d.slug}`,
      lastModified: new Date(d.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
