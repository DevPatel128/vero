import type { Metadata } from "next";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/app/page-header";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Reports", robots: { index: false, follow: false } };

export default async function ReportsPage() {
  const supabase = await createClient();
  const since = new Date(); since.setMonth(since.getMonth() - 12);
  const { data: txns = [] } = await supabase
    .from("transactions")
    .select("amount, direction, category, occurred_at")
    .gte("occurred_at", since.toISOString());

  const monthlyMap = aggregateBy(txns ?? [], (d) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" }));
  const quarterlyMap = aggregateBy(txns ?? [], (d) => `Q${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`);
  const yearlyMap = aggregateBy(txns ?? [], (d) => String(d.getFullYear()));

  return (
    <>
      <PageHeader
        eyebrow="Auto-generated"
        title="Reports"
        description="Tax-season ready. Auditor-clean. Export to PDF or CSV."
        action={
          <>
            <Button variant="outline" size="sm"><Printer className="h-4 w-4" /> Print</Button>
            <Button size="sm"><Download className="h-4 w-4" /> Export PDF</Button>
          </>
        }
      />

      <Tabs defaultValue="monthly">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly"><ReportList rows={Array.from(monthlyMap.entries())} /></TabsContent>
        <TabsContent value="quarterly"><ReportList rows={Array.from(quarterlyMap.entries())} /></TabsContent>
        <TabsContent value="yearly"><ReportList rows={Array.from(yearlyMap.entries())} /></TabsContent>
      </Tabs>
    </>
  );
}

function ReportList({ rows }: { rows: [string, { income: number; spend: number; net: number }][] }) {
  return (
    <div className="grid gap-3">
      {rows.map(([period, v]) => (
        <Card key={period} className="grid grid-cols-2 gap-4 p-5 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="eyebrow">{period}</p>
            <p className="mt-1 font-serif text-xl">{period}</p>
          </div>
          <div>
            <p className="eyebrow">Income</p>
            <p className="mt-1 font-serif text-lg number-tabular text-trove-success">{formatCurrency(v.income)}</p>
          </div>
          <div>
            <p className="eyebrow">Spend</p>
            <p className="mt-1 font-serif text-lg number-tabular">{formatCurrency(v.spend)}</p>
          </div>
          <div>
            <p className="eyebrow">Net</p>
            <p className={`mt-1 font-serif text-lg number-tabular ${v.net >= 0 ? "text-trove-goldDeep" : "text-trove-danger"}`}>
              {formatCurrency(v.net)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function aggregateBy(txns: { amount: number; direction: string; occurred_at: string }[], key: (d: Date) => string) {
  const map = new Map<string, { income: number; spend: number; net: number }>();
  for (const t of txns) {
    const k = key(new Date(t.occurred_at));
    const e = map.get(k) ?? { income: 0, spend: 0, net: 0 };
    if (t.direction === "credit") e.income += Number(t.amount); else e.spend += Number(t.amount);
    e.net = e.income - e.spend;
    map.set(k, e);
  }
  return map;
}
