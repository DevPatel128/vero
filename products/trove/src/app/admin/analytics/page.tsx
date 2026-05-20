import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/app/stat-card";
import { PageHeader } from "@/components/app/page-header";
import { createAdminClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Analytics · Admin", robots: { index: false, follow: false } };

export default async function AdminAnalyticsPage() {
  const admin = createAdminClient();
  const since30 = new Date(Date.now() - 30 * 86400_000).toISOString();
  const since1 = new Date(Date.now() - 86400_000).toISOString();
  const [{ count: signups30 }, { count: signups1 }, { count: dau }] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }).gte("created_at", since30),
    admin.from("profiles").select("id", { count: "exact", head: true }).gte("created_at", since1),
    admin.from("audit_logs").select("user_id", { count: "exact", head: true }).gte("created_at", since1),
  ]);

  return (
    <>
      <PageHeader eyebrow="Product" title="Analytics" description="Top-level KPIs. Deep dives in PostHog." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Signups (30d)" value={String(signups30 ?? 0)} />
        <StatCard label="Signups (24h)" value={String(signups1 ?? 0)} tone="gold" />
        <StatCard label="DAU (24h)" value={String(dau ?? 0)} />
      </div>
      <Card className="mt-6 p-6">
        <p className="text-sm text-muted-foreground">For full funnels, retention, and session replay, see <a href="https://us.posthog.com" target="_blank" rel="noopener" className="link-ft">PostHog</a>.</p>
      </Card>
    </>
  );
}
