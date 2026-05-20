import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";
import { categoryColor } from "@/lib/categories";

export const metadata: Metadata = { title: "Budgets", robots: { index: false, follow: false } };

export default async function BudgetsPage() {
  const supabase = await createClient();
  const since = new Date();
  since.setDate(1);

  const [{ data: budgets = [] }, { data: txns = [] }] = await Promise.all([
    supabase.from("budgets").select("*"),
    supabase.from("transactions").select("category, amount, direction").gte("occurred_at", since.toISOString()).eq("direction", "debit"),
  ]);

  const spentByCategory = new Map<string, number>();
  (txns ?? []).forEach((t) => spentByCategory.set(t.category, (spentByCategory.get(t.category) ?? 0) + Number(t.amount)));

  const list = budgets ?? [];

  return (
    <>
      <PageHeader
        eyebrow="This month"
        title="Budgets"
        description="Soft limits and rollover. Trove warns before you exceed."
        action={<Button size="sm"><Plus className="h-4 w-4" /> New budget</Button>}
      />

      {list.length === 0 ? (
        <Card>
          <EmptyState
            title="No budgets yet"
            description="Set a soft monthly limit for any category and Trove will alert before you exceed it."
            action={<Button size="sm"><Plus className="h-4 w-4" /> Create your first budget</Button>}
          />
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => {
            const spent = spentByCategory.get(b.category) ?? 0;
            const pct = Math.min(100, (spent / Number(b.amount)) * 100);
            const over = spent > Number(b.amount);
            return (
              <Card key={b.id} className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg">{b.name}</h3>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: categoryColor(b.category) }} />
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{b.category} · {b.period}</p>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-2xl number-tabular">{formatCurrency(spent)}</span>
                    <span className="text-sm text-muted-foreground">of {formatCurrency(Number(b.amount))}</span>
                  </div>
                  <Progress value={pct} className="mt-3" />
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{pct.toFixed(0)}% used</span>
                    {over && <Badge variant="danger">Over budget</Badge>}
                    {!over && pct > 80 && <Badge variant="warning">Approaching limit</Badge>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
