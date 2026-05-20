import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getTags } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return getTags(posts).map((t) => ({ tag: t.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} · Journal`,
    description: `Posts tagged ${tag}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = (await getAllPosts()).filter((p) => p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()));
  if (posts.length === 0) return notFound();
  return (
    <section className="container-wide py-20">
      <h1 className="display-serif text-display-lg">Tagged <span className="italic text-trove-goldDeep">#{tag}</span></h1>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block py-6 hover:bg-trove-cream">
            <p className="eyebrow">{formatDate(p.date)}</p>
            <h3 className="mt-1 font-serif text-2xl tracking-tight">{p.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
