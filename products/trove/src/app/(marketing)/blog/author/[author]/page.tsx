import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/mdx";
import { formatDate, slugify } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((p) => slugify(p.author)))).map((a) => ({ author: a }));
}

export async function generateMetadata({ params }: { params: Promise<{ author: string }> }): Promise<Metadata> {
  const { author } = await params;
  return { title: `${author} · Journal`, alternates: { canonical: `/blog/author/${author}` } };
}

export default async function AuthorPage({ params }: { params: Promise<{ author: string }> }) {
  const { author } = await params;
  const posts = (await getAllPosts()).filter((p) => slugify(p.author) === author);
  if (posts.length === 0) return notFound();
  const display = posts[0]!.author;
  return (
    <section className="container-wide py-20">
      <h1 className="display-serif text-display-lg">By <span className="italic text-trove-goldDeep">{display}</span></h1>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block py-6 hover:bg-trove-cream">
            <p className="eyebrow">{formatDate(p.date)} · {p.category}</p>
            <h3 className="mt-1 font-serif text-2xl tracking-tight">{p.title}</h3>
            <p className="mt-1 text-base text-muted-foreground">{p.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
