import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDocs, getDocBySlug, renderMDX } from "@/lib/mdx";

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  return doc ? { title: doc.title, description: doc.description, alternates: { canonical: `/docs/${slug}` } } : {};
}

export const revalidate = 3600;

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) return notFound();
  const { content } = await renderMDX(doc.content);

  return (
    <article className="container-prose py-16 prose prose-stone max-w-none prose-headings:font-serif prose-a:text-trove-ink prose-a:decoration-trove-gold">
      <p className="eyebrow">{doc.category}</p>
      <h1 className="display-serif text-display-md mt-2">{doc.title}</h1>
      <p className="lead">{doc.description}</p>
      {content}
    </article>
  );
}
