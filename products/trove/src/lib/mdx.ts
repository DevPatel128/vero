import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  cover?: string;
  draft?: boolean;
  readingTime?: number;
}

export type Post = PostFrontmatter & { slug: string; content: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const DOCS_DIR = path.join(process.cwd(), "content", "docs");
const CHANGELOG_DIR = path.join(process.cwd(), "content", "changelog");

async function readDir(dir: string): Promise<string[]> {
  try {
    return (await fs.readdir(dir)).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  } catch {
    return [];
  }
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

async function parseFile(dir: string, file: string): Promise<Post | null> {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = await fs.readFile(path.join(dir, file), "utf8");
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return null;
  const fm = parseFrontmatter(fmMatch[1]!);
  const content = fmMatch[2]!;
  if (fm.draft) return null;
  return {
    slug,
    title: fm.title ?? slug,
    description: fm.description ?? "",
    date: fm.date ?? "1970-01-01",
    author: fm.author ?? "Trove Team",
    authorRole: fm.authorRole,
    authorAvatar: fm.authorAvatar,
    category: fm.category ?? "Product",
    tags: typeof fm.tags === "string" ? fm.tags.split(",").map((t: string) => t.trim()) : (fm.tags ?? []),
    cover: fm.cover,
    draft: !!fm.draft,
    readingTime: fm.readingTime ?? estimateReadingTime(content),
    content,
  };
}

function parseFrontmatter(raw: string): Record<string, any> {
  const result: Record<string, any> = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, val] = m;
    if (!key || val === undefined) continue;
    if (val.startsWith("[") && val.endsWith("]")) {
      result[key] = val.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else if (val === "true") result[key] = true;
    else if (val === "false") result[key] = false;
    else result[key] = val.replace(/^["']|["']$/g, "");
  }
  return result;
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await readDir(BLOG_DIR);
  const posts = await Promise.all(files.map((f) => parseFile(BLOG_DIR, f)));
  return posts.filter((p): p is Post => !!p).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  for (const ext of [".mdx", ".md"]) {
    try {
      return await parseFile(BLOG_DIR, `${slug}${ext}`);
    } catch {
      // try next
    }
  }
  return null;
}

export async function getAllDocs(): Promise<Post[]> {
  const files = await readDir(DOCS_DIR);
  const docs = await Promise.all(files.map((f) => parseFile(DOCS_DIR, f)));
  return docs.filter((d): d is Post => !!d).sort((a, b) => a.title.localeCompare(b.title));
}

export async function getDocBySlug(slug: string): Promise<Post | null> {
  for (const ext of [".mdx", ".md"]) {
    try {
      return await parseFile(DOCS_DIR, `${slug}${ext}`);
    } catch {
      // try next
    }
  }
  return null;
}

export async function getAllChangelog(): Promise<Post[]> {
  const files = await readDir(CHANGELOG_DIR);
  const items = await Promise.all(files.map((f) => parseFile(CHANGELOG_DIR, f)));
  return items.filter((p): p is Post => !!p).sort((a, b) => b.date.localeCompare(a.date));
}

export async function renderMDX(source: string) {
  return compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
      parseFrontmatter: false,
    },
  });
}

export function getCategories(posts: Post[]): string[] {
  return Array.from(new Set(posts.map((p) => p.category))).sort();
}

export function getTags(posts: Post[]): string[] {
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
}

export function relatedPosts(post: Post, all: Post[], n = 3): Post[] {
  return all
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length + (p.category === post.category ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(({ p }) => p);
}
