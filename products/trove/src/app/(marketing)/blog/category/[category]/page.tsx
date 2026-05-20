import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getCategories } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return getCategories(posts).map((c) => ({ category: c.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category.charAt(0).toUpperCase()}${category.slice(1)} · Journal`,
    description: `Posts in the ${category} category of the Trove journal.`,
    alternates: { canonical: `/blog/category/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = (await getAllPosts()).filter((p) => p.category.toLowerCase() === category.toLowerCase());
  if (posts.length === 0) return notFound();
  return (
    <section className="container-wide py-20">
      <Badge variant="gold" className="mb-4">{category}</Badge>
      <h1 className="display-serif text-display-lg">Category: <span className="italic">{category}</span></h1>
      <div className="mt-12 divide-y divide-border border-y border-border">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block py-6 hover:bg-trove-cream transition-colors">
            <p className="eyebrow">{formatDate(p.date)}</p>
            <h3 className="mt-1 font-serif text-2xl tracking-tight">{p.title}</h3>
            <p className="mt-1 text-base text-muted-foreground">{p.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
