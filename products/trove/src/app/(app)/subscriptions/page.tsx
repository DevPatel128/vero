import type { Metadata } from "next";
import { Pause, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Repeat, TrendingUp, AlertCircle } from "lucide-react";

export const metadata: Metadata = { title: "Subscriptions", robots: { index: false, follow: false } };

export default async function SubscriptionsPage() {
  const supabase = await createClient();
  const { data: subs = [] } = await supabase.from("subscriptions").select("*").order("amount", { ascending: false });
  const list = subs ?? [];
  const monthly = list.filter((s) => s.status === "active").reduce((sum, s) => sum + normalizeMonthly(s), 0);
  const yearly = monthly * 12;

  return (
    <>
      <PageHeader
        eyebrow="Auto-detected"
        title="Subscriptions"
        description="Every recurring charge we found. Cancel the ones that aren't earning their keep."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active subscriptions" value={String(list.filter((s) => s.status === "active").length)} icon={Repeat} />
        <StatCard label="Monthly cost" value={formatCurrency(monthly)} tone="gold" icon={TrendingUp} />
        <StatCard label="Annual cost" value={formatCurrency(yearly)} icon={AlertCircle} tone="warning" />
      </div>

      <Card className="mt-6">
        <div className="p-5 border-b border-border">
          <p className="font-serif text-lg">All subscriptions</p>
        </div>
        {list.length === 0 ? (
          <EmptyState
            icon={<Repeat className="h-8 w-8" />}
            title="No subscriptions detected yet"
            description="As we see recurring charges, they'll appear here automatically."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Cadence</TableHead>
                <TableHead>Next renewal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[110px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.merchant}</TableCell>
                  <TableCell><Badge variant="secondary">{s.category}</Badge></TableCell>
                  <TableCell className="capitalize">{s.cadence}</TableCell>
                  <TableCell>{s.next_renewal ? formatDate(s.next_renewal) : "—"}</TableCell>
                  <TableCell>
                    <Badge variant={s.status === "active" ? "success" : s.status === "paused" ? "warning" : "secondary"}>
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right number-tabular">{formatCurrency(Number(s.amount))}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" aria-label="Pause"><Pause className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" aria-label="Cancel"><X className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </>
  );
}

function normalizeMonthly(s: { amount: number; cadence: string }) {
  const amt = Number(s.amount);
  switch (s.cadence) {
    case "weekly":    return amt * 4.345;
    case "monthly":   return amt;
    case "quarterly": return amt / 3;
    case "yearly":    return amt / 12;
    default:          return amt;
  }
}
