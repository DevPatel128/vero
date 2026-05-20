import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Settings", robots: { index: false, follow: false } };

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="divide-y divide-border">
        <Row label="Theme" description="Choose your default appearance." control={<ThemeSwitcher />} />
        <Row label="Currency" description="Primary currency for the dashboard." control={<Badge variant="secondary">USD</Badge>} />
        <Row label="Time zone" description="Used for cash flow buckets." control={<Badge variant="secondary">UTC</Badge>} />
      </Card>

      <Card className="p-6 border-trove-danger/40">
        <h2 className="font-serif text-xl text-trove-danger">Danger zone</h2>
        <p className="mt-1 text-sm text-muted-foreground">Permanent and irreversible.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Button variant="outline">Export my data</Button>
          <Button variant="destructive">Delete account</Button>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, description, control }: { label: string; description: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-6">
      <div>
        <Label className="font-serif text-lg">{label}</Label>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      {control}
    </div>
  );
}

function ThemeSwitcher() {
  return <Switch />;
}
