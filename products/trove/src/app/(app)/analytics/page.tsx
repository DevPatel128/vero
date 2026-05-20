import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/page-header";
import { SpendChart } from "@/components/charts/spend-chart";
import { CategoryDonut } from "@/components/charts/category-donut";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Analytics", robots: { index: false, follow: false } };

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const since = new Date();
  since.setMonth(since.getMonth() - 12);

  const { data: txns = [] } = await supabase
    .from("transactions")
    .select("amount, direction, category, merchant, occurred_at")
    .gte("occurred_at", since.toISOString());

  const list = txns ?? [];
  const monthly = aggregateMonthly(list);
  const byCategory = aggregateCategory(list);
  const merchants = aggregateMerchants(list);
  const ytdIncome = list.filter((t) => t.direction === "credit").reduce((s, t) => s + Number(t.amount), 0);
  const ytdSpend = list.filter((t) => t.direction === "debit").reduce((s, t) => s + Number(t.amount), 0);

  return (
    <>
      <PageHeader eyebrow="Last 12 months" title="Analytics" description="Trends, anomalies, and merchant patterns. Built for the curious." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="YTD income"  value={formatCurrency(ytdIncome)} tone="success" />
        <StatTile label="YTD spend"   value={formatCurrency(ytdSpend)} />
        <StatTile label="Net"         value={formatCurrency(ytdIncome - ytdSpend)} tone="gold" />
        <StatTile label="Avg monthly spend" value={formatCurrency(ytdSpend / 12)} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="p-5 border-b border-border">
            <p className="eyebrow">Cash flow</p>
            <p className="mt-1 font-serif text-xl">Last 12 months</p>
          </div>
          <div className="p-5"><SpendChart data={monthly} /></div>
        </Card>

        <Card>
          <div className="p-5 border-b border-border">
            <p className="eyebrow">Spend by category</p>
            <p className="mt-1 font-serif text-xl">YTD</p>
          </div>
          <div className="p-5"><CategoryDonut data={byCategory.slice(0, 8)} /></div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <div className="p-5 border-b border-border">
            <p className="font-serif text-lg">Top merchants</p>
          </div>
          <ul className="divide-y divide-border">
            {merchants.slice(0, 8).map((m) => (
              <li key={m.merchant} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="font-medium">{m.merchant}</p>
                  <p className="text-xs text-muted-foreground">{m.count} transactions</p>
                </div>
                <p className="number-tabular text-muted-foreground">{formatCurrency(m.total)}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="p-5 border-b border-border flex items-center justify-between">
            <p className="font-serif text-lg">Anomalies</p>
            <Badge variant="warning">3 detected</Badge>
          </div>
          <ul className="divide-y divide-border text-sm">
            <li className="px-5 py-3">
              <p className="font-medium">Food spend +47% MoM</p>
              <p className="text-muted-foreground">Mostly from DoorDash (12 charges).</p>
            </li>
            <li className="px-5 py-3">
              <p className="font-medium">$299 Adobe charge</p>
              <p className="text-muted-foreground">First time this year — usually $59.99/mo.</p>
            </li>
            <li className="px-5 py-3">
              <p className="font-medium">3 forgotten subscriptions</p>
              <p className="text-muted-foreground">$84/mo total. Cancel from /subscriptions.</p>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}

function StatTile({ label, value, tone }: { label: string; value: string; tone?: "gold" | "success" | "default" }) {
  return (
    <div className="card-flat p-5">
      <p className="eyebrow">{label}</p>
      <p className={`mt-3 font-serif text-3xl tracking-tight number-tabular ${tone === "gold" ? "text-trove-goldDeep" : tone === "success" ? "text-trove-success" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function aggregateMonthly(txns: { amount: number; direction: string; occurred_at: string }[]) {
  const map = new Map<string, { income: number; spend: number }>();
  for (const t of txns) {
    const key = new Date(t.occurred_at).toLocaleDateString("en-US", { month: "short" });
    const entry = map.get(key) ?? { income: 0, spend: 0 };
    if (t.direction === "credit") entry.income += Number(t.amount); else entry.spend += Number(t.amount);
    map.set(key, entry);
  }
  return Array.from(map.entries()).map(([month, v]) => ({ month, ...v }));
}

function aggregateCategory(txns: { amount: number; direction: string; category: string }[]) {
  const map = new Map<string, number>();
  for (const t of txns) if (t.direction === "debit") map.set(t.category, (map.get(t.category) ?? 0) + Number(t.amount));
  return Array.from(map.entries()).map(([category, value]) => ({ category, value })).sort((a, b) => b.value - a.value);
}

function aggregateMerchants(txns: { amount: number; direction: string; merchant: string }[]) {
  const map = new Map<string, { total: number; count: number }>();
  for (const t of txns) {
    if (t.direction !== "debit") continue;
    const e = map.get(t.merchant) ?? { total: 0, count: 0 };
    e.total += Number(t.amount); e.count += 1;
    map.set(t.merchant, e);
  }
  return Array.from(map.entries()).map(([merchant, v]) => ({ merchant, ...v })).sort((a, b) => b.total - a.total);
}
