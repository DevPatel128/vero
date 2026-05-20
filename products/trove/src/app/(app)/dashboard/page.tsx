import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Sparkles, TrendingDown, TrendingUp, Wallet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { SpendChart } from "@/components/charts/spend-chart";
import { CategoryDonut } from "@/components/charts/category-donut";
import { ScoreGauge } from "@/components/app/score-gauge";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Pull last 6 months
  const since = new Date();
  since.setMonth(since.getMonth() - 6);

  const [{ data: txns = [] }, { data: subs = [] }, { data: scoreRow }] = await Promise.all([
    supabase.from("transactions").select("amount, direction, category, occurred_at, merchant").gte("occurred_at", since.toISOString()).order("occurred_at", { ascending: false }),
    supabase.from("subscriptions").select("merchant, amount, cadence, next_renewal, status").eq("status", "active"),
    supabase.rpc("financial_health_score", { p_user_id: user!.id }),
  ]);

  const txList = txns ?? [];
  const monthly = aggregateMonthly(txList);
  const byCategory = aggregateCategory(txList);
  const thisMonth = monthly.at(-1) ?? { income: 0, spend: 0 };
  const score = typeof scoreRow === "number" ? scoreRow : 50;

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Welcome back."
        description="Your money, last 6 months — at a glance."
        action={
          <Button asChild>
            <Link href="/transactions?new=1"><Plus className="h-4 w-4" /> Add transaction</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Net cash flow" value={formatCurrency(thisMonth.income - thisMonth.spend)} tone="gold" delta={{ value: "12.4%", positive: true }} icon={TrendingUp} />
        <StatCard label="Income" value={formatCurrency(thisMonth.income)} icon={TrendingUp} tone="success" />
        <StatCard label="Spend" value={formatCurrency(thisMonth.spend)} icon={TrendingDown} delta={{ value: "3.1%", positive: false }} />
        <StatCard label="Active subs" value={String((subs ?? []).length)} icon={Wallet} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <p className="eyebrow">Income vs spend</p>
              <p className="mt-1 font-serif text-xl">Last 6 months</p>
            </div>
            <Badge variant="gold">Live</Badge>
          </div>
          <div className="p-5">
            <SpendChart data={monthly} />
          </div>
        </Card>

        <Card>
          <div className="p-5 border-b border-border">
            <p className="eyebrow">Financial Health Score</p>
            <p className="mt-1 font-serif text-xl">This month</p>
          </div>
          <div className="p-5">
            <ScoreGauge value={score} />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <p className="font-serif text-lg tracking-tight">Recent transactions</p>
            <Button asChild variant="ghost" size="sm"><Link href="/transactions">See all →</Link></Button>
          </div>
          <ul className="divide-y divide-border">
            {txList.slice(0, 6).map((t, i) => (
              <li key={i} className="flex items-center justify-between gap-4 px-5 py-3">
                <div>
                  <p className="font-medium">{t.merchant}</p>
                  <p className="text-xs text-muted-foreground">{t.category} · {formatDate(t.occurred_at)}</p>
                </div>
                <p className={`number-tabular font-medium ${t.direction === "credit" ? "text-trove-success" : ""}`}>
                  {t.direction === "credit" ? "+" : "−"}{formatCurrency(Number(t.amount))}
                </p>
              </li>
            ))}
            {txList.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-muted-foreground">
                No transactions yet. <Link href="/transactions?new=1" className="link-ft">Add your first one</Link>.
              </li>
            )}
          </ul>
        </Card>

        <Card>
          <div className="p-5 border-b border-border">
            <p className="font-serif text-lg tracking-tight">Top categories</p>
          </div>
          <div className="p-5">
            <CategoryDonut data={byCategory.slice(0, 6)} />
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="bg-trove-cream border-trove-gold/40">
          <div className="p-6 grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="h-10 w-10 rounded-[4px] bg-trove-gold/15 flex items-center justify-center">
              <Brain className="h-5 w-5 text-trove-goldDeep" />
            </div>
            <div>
              <p className="eyebrow text-trove-goldDeep">AI Insight</p>
              <p className="mt-1 font-serif text-xl">
                {thisMonth.income > thisMonth.spend
                  ? `You saved ${formatCurrency(thisMonth.income - thisMonth.spend)} this month — your highest in 90 days.`
                  : "Spending exceeded income this month. Two subscriptions you haven't used in 30 days could close the gap."}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Generated just now · regenerates weekly</p>
            </div>
            <Button asChild variant="primary" size="sm">
              <Link href="/analytics"><Sparkles className="h-4 w-4" /> See more</Link>
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

function aggregateMonthly(txns: { amount: number; direction: string; occurred_at: string }[]) {
  const map = new Map<string, { income: number; spend: number }>();
  for (const t of txns) {
    const key = new Date(t.occurred_at).toLocaleDateString("en-US", { month: "short" });
    const entry = map.get(key) ?? { income: 0, spend: 0 };
    if (t.direction === "credit") entry.income += Number(t.amount);
    else entry.spend += Number(t.amount);
    map.set(key, entry);
  }
  return Array.from(map.entries()).map(([month, v]) => ({ month, ...v }));
}

function aggregateCategory(txns: { amount: number; direction: string; category: string }[]) {
  const map = new Map<string, number>();
  for (const t of txns) {
    if (t.direction !== "debit") continue;
    map.set(t.category, (map.get(t.category) ?? 0) + Number(t.amount));
  }
  return Array.from(map.entries()).map(([category, value]) => ({ category, value })).sort((a, b) => b.value - a.value);
}
