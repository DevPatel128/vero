import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getAllPosts, getPostBySlug, relatedPosts, renderMDX } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { formatDate, absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [post.cover ?? siteConfig.ogImage],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.cover ?? siteConfig.ogImage] },
  };
}

export const revalidate = 3600;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const all = await getAllPosts();
  const related = relatedPosts(post, all);
  const { content } = await renderMDX(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.legalName, logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg") } },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: post.cover ? absoluteUrl(post.cover) : absoluteUrl(siteConfig.ogImage),
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <Script id="article-jsonld" type="application/ld+json">{JSON.stringify(jsonLd)}</Script>
      <ReadingProgress />

      <article>
        <header className="border-b border-border">
          <div className="container-prose py-16 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
              <ol className="flex items-center gap-1.5">
                <li><Link href="/blog" className="hover:text-trove-ink">Journal</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href={`/blog/category/${encodeURIComponent(post.category.toLowerCase())}`} className="hover:text-trove-ink">{post.category}</Link></li>
              </ol>
            </nav>
            <Badge variant="gold" className="mb-4">{post.category}</Badge>
            <h1 className="display-serif text-display-lg text-balance">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">{post.description}</p>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </header>

        <div className="container-wide py-12 grid gap-12 lg:grid-cols-[1fr_240px]">
          <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-trove-ink prose-a:decoration-trove-gold prose-a:underline-offset-[3px] prose-code:bg-trove-surface prose-code:rounded-[4px] prose-code:px-1.5">
            {content}
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-trove-cream py-16">
          <div className="container-wide">
            <h2 className="font-serif text-2xl tracking-tight">Keep reading</h2>
            <div className="mt-8 grid gap-px bg-trove-line md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="block bg-background p-6 hover:bg-trove-surface">
                  <p className="eyebrow text-trove-goldDeep">{r.category}</p>
                  <h3 className="mt-2 font-serif text-lg tracking-tight">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
