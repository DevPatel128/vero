import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = { title: "Notifications", robots: { index: false, follow: false } };

const channels = [
  { key: "weekly_digest",      label: "Weekly digest",         desc: "Monday 9am local — AI summary of last week." },
  { key: "budget_warnings",    label: "Budget warnings",       desc: "Alert at 80% and 100% of any budget." },
  { key: "new_subscriptions",  label: "New subscriptions",     desc: "Tell me when Trove detects a recurring charge." },
  { key: "large_transactions", label: "Large transactions",    desc: "Any debit over your configured threshold." },
  { key: "product_updates",    label: "Product updates",       desc: "About once a month. Never spammy." },
  { key: "security_alerts",    label: "Security alerts",       desc: "Cannot be disabled. New device, password change, etc." },
];

export default function NotificationsPage() {
  return (
    <Card className="divide-y divide-border">
      {channels.map((c) => (
        <div key={c.key} className="flex items-center justify-between gap-4 p-6">
          <div>
            <Label className="font-medium">{c.label}</Label>
            <p className="mt-0.5 text-sm text-muted-foreground">{c.desc}</p>
          </div>
          <Switch defaultChecked disabled={c.key === "security_alerts"} />
        </div>
      ))}
    </Card>
  );
}
