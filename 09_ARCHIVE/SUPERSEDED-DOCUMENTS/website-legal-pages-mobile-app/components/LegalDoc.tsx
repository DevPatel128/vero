import type { ReactNode } from "react";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";

export function LegalDoc({
  title,
  effective,
  version,
  intro,
  children,
}: {
  title: string;
  effective: string;
  version: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <Section className="!pt-24 !pb-8">
        <Eyebrow>Legal</Eyebrow>
        <SectionTitle>{title}</SectionTitle>
        <SectionLead>{intro}</SectionLead>
        <p className="mt-6 font-mono text-caption text-ink-2">
          Effective: {effective} · Version: {version}
        </p>
      </Section>

      <Section tone="warm" className="!pt-8 !pb-24">
        <article className="prose-vero max-w-[72ch] space-y-6 text-base leading-relaxed text-ink-1">
          {children}
        </article>
      </Section>
    </>
  );
}

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 font-display text-2xl font-medium tracking-tightish text-ink-0">
      {children}
    </h2>
  );
}

export function LegalH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 font-display text-lg font-medium text-ink-0">
      {children}
    </h3>
  );
}

export function LegalTable({
  cols,
  rows,
}: {
  cols: string[];
  rows: string[][];
}) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-ink-100">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-paper">
          <tr>
            {cols.map((c) => (
              <th
                key={c}
                className="border-b border-ink-100 px-4 py-3 text-left font-medium text-ink-0"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 ? "bg-paper/40" : ""}>
              {row.map((cell, j) => (
                <td key={j} className="border-b border-ink-100/60 px-4 py-3 text-ink-1">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
