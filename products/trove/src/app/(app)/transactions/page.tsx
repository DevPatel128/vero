import type { Metadata } from "next";
import { Plus, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/page-header";
import { TransactionTable } from "@/components/app/transaction-table";
import { TransactionFilters } from "@/components/app/transaction-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Transactions", robots: { index: false, follow: false } };

export default async function TransactionsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const supabase = await createClient();

  let q = supabase.from("transactions").select("*", { count: "exact" }).order("occurred_at", { ascending: false });
  if (params.category) q = q.eq("category", params.category);
  if (params.direction) q = q.eq("direction", params.direction);
  if (params.search) q = q.ilike("merchant", `%${params.search}%`);
  const { data: txns, count } = await q.range(0, 49);

  return (
    <>
      <PageHeader
        eyebrow={`${count ?? 0} transactions`}
        title="Transactions"
        description="Every movement of money, categorized and searchable."
        action={
          <>
            <Button variant="outline" size="sm"><Upload className="h-4 w-4" /> Import CSV</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm"><Plus className="h-4 w-4" /> Add</Button>
          </>
        }
      />

      <Card>
        <TransactionFilters initial={params} />
        {!txns || txns.length === 0 ? (
          <EmptyState
            title="No transactions yet"
            description="Add manually, import a CSV, or connect a bank to get started."
            action={<Button size="sm"><Plus className="h-4 w-4" /> Add transaction</Button>}
          />
        ) : (
          <TransactionTable rows={txns} />
        )}
        {count && count > 50 && (
          <div className="border-t border-border p-3 flex items-center justify-between">
            <Badge variant="secondary">Showing 1–50 of {count}</Badge>
            <Button variant="ghost" size="sm">Load more</Button>
          </div>
        )}
      </Card>
    </>
  );
}
