import type { Metadata } from "next";
import { Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Goals", robots: { index: false, follow: false } };

export default async function GoalsPage() {
  const supabase = await createClient();
  const { data: goals = [] } = await supabase.from("goals").select("*").order("target_date", { ascending: true });
  const list = goals ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Save with intent"
        title="Goals"
        description="Set a target. Track honestly. Hit it."
        action={<Button size="sm"><Plus className="h-4 w-4" /> New goal</Button>}
      />

      {list.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Target className="h-8 w-8" />}
            title="No goals yet"
            description="House deposit? Wedding? Sabbatical? Set a number and a date — Trove projects honestly."
            action={<Button size="sm"><Plus className="h-4 w-4" /> Create a goal</Button>}
          />
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => {
            const pct = Math.min(100, (Number(g.current_amount) / Number(g.target_amount)) * 100);
            return (
              <Card key={g.id} className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl tracking-tight">{g.name}</h3>
                  <Badge variant={g.status === "achieved" ? "gold" : g.status === "abandoned" ? "secondary" : "success"}>
                    {g.status}
                  </Badge>
                </div>
                {g.target_date && <p className="mt-1 text-xs text-muted-foreground">By {formatDate(g.target_date)}</p>}
                <div className="mt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl tracking-tight number-tabular text-trove-goldDeep">{formatCurrency(Number(g.current_amount))}</span>
                    <span className="text-sm text-muted-foreground">of {formatCurrency(Number(g.target_amount))}</span>
                  </div>
                  <Progress value={pct} className="mt-3" />
                  <p className="mt-2 text-xs text-muted-foreground">{pct.toFixed(0)}% saved</p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
