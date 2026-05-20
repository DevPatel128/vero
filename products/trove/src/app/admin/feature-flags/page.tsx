import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/page-header";
import { createAdminClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Feature flags · Admin", robots: { index: false, follow: false } };

export default async function FeatureFlagsPage() {
  const admin = createAdminClient();
  const { data: flags = [] } = await admin.from("feature_flags").select("*").order("key");

  return (
    <>
      <PageHeader eyebrow="Operations" title="Feature flags" description="Roll out features safely." />
      <Card className="divide-y divide-border">
        {(flags ?? []).map((f) => (
          <div key={f.id} className="flex items-center justify-between gap-4 p-5">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm font-semibold">{f.key}</code>
                <Badge variant={f.enabled ? "success" : "secondary"}>{f.enabled ? "On" : "Off"}</Badge>
                <Badge variant="outline">{f.rollout_pct}%</Badge>
              </div>
              {f.description && <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>}
            </div>
            <Switch defaultChecked={f.enabled} />
          </div>
        ))}
      </Card>
    </>
  );
}
