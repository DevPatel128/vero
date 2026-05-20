import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategories } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Money, software, and the operating system of a quietly competent life — written by the Trove team.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export const revalidate = 3600;

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const categories = getCategories(posts);
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <Badge variant="gold" className="mb-6">Journal</Badge>
          <h1 className="display-serif text-display-xl">The Trove Journal</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Notes from the desk — on money, on software, and on the operating system of a quietly competent life.
          </p>
        </div>
      </section>

      <section className="container-wide py-16">
        <div className="mb-12 flex flex-wrap items-center gap-2">
          <Link href="/blog" className="rounded-[4px] border border-border bg-trove-ink px-3 py-1 text-xs text-trove-cream">All</Link>
          {categories.map((c) => (
            <Link key={c} href={`/blog/category/${encodeURIComponent(c.toLowerCase())}`} className="rounded-[4px] border border-border bg-card px-3 py-1 text-xs hover:bg-trove-surface">
              {c}
            </Link>
          ))}
        </div>

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block border-y border-border py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
              <div>
                <p className="eyebrow text-trove-goldDeep">{featured.category}</p>
                <h2 className="mt-3 display-serif text-display-md group-hover:text-trove-goldDeep transition-colors">{featured.title}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{featured.description}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{featured.author}</p>
                <p className="mt-1">{formatDate(featured.date)} · {featured.readingTime} min read</p>
              </div>
            </div>
          </Link>
        )}

        <div className="mt-16 grid gap-px bg-trove-line md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block bg-background p-6 hover:bg-trove-cream transition-colors">
              <p className="eyebrow text-trove-goldDeep">{p.category}</p>
              <h3 className="mt-3 font-serif text-xl tracking-tight group-hover:text-trove-goldDeep transition-colors">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span>{formatDate(p.date)}</span>
                <span>{p.readingTime} min</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
