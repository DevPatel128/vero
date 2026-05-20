import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/app/page-header";
import { TransactionTable } from "@/components/app/transaction-table";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Search", robots: { index: false, follow: false } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const supabase = await createClient();
  const { data: txns = [], count } = q
    ? await supabase.from("transactions").select("*", { count: "exact" }).ilike("merchant", `%${q}%`).limit(50)
    : { data: [], count: 0 };

  return (
    <>
      <PageHeader eyebrow="Universal" title="Search" description="Find any transaction in milliseconds." />
      <form action="/search" method="get" className="mb-6">
        <Input name="q" defaultValue={q ?? ""} placeholder="Type a merchant, category, or amount…" autoFocus />
      </form>
      <Card>
        {!q ? (
          <EmptyState title="Search your money" description="Try a merchant name, category, or partial match." />
        ) : !txns || txns.length === 0 ? (
          <EmptyState title="Nothing matched" description={`No transactions for "${q}". Try a different query.`} />
        ) : (
          <>
            <div className="border-b border-border p-3"><Badge variant="secondary">{count} result{count === 1 ? "" : "s"}</Badge></div>
            <TransactionTable rows={txns} />
          </>
        )}
      </Card>
    </>
  );
}
