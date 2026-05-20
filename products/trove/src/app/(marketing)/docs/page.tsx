import type { Metadata } from "next";
import Link from "next/link";
import { getAllDocs } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Trove documentation — getting started, core concepts, API reference, and integration guides.",
  alternates: { canonical: "/docs" },
};

export const revalidate = 3600;

export default async function DocsIndex() {
  const docs = await getAllDocs();
  const groups = new Map<string, typeof docs>();
  for (const d of docs) {
    const cat = d.category || "Guides";
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat)!.push(d);
  }

  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <Badge variant="gold" className="mb-6">Documentation</Badge>
          <h1 className="display-serif text-display-xl">Everything you need to use Trove well.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Short, practical guides. No fluff. Updated alongside every release.
          </p>
        </div>
      </section>

      <section className="container-wide py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {Array.from(groups.entries()).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="eyebrow mb-4">{cat}</h2>
              <ul className="space-y-3">
                {items.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/docs/${d.slug}`} className="group flex flex-col">
                      <span className="font-serif text-lg tracking-tight group-hover:text-trove-goldDeep">{d.title}</span>
                      <span className="text-sm text-muted-foreground">{d.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
