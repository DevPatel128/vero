import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = { title: "Notifications", robots: { index: false, follow: false } };

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: notifications = [] } = await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
  const list = notifications ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description="Budget alerts, AI digests, security events."
        action={<Button variant="outline" size="sm">Mark all read</Button>}
      />
      <Card>
        {list.length === 0 ? (
          <EmptyState
            icon={<Bell className="h-8 w-8" />}
            title="You're all caught up"
            description="When something happens we think you should know, you'll see it here."
          />
        ) : (
          <ul className="divide-y divide-border">
            {list.map((n) => (
              <li key={n.id} className="flex items-start gap-4 px-5 py-4">
                {!n.read_at && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-trove-gold" aria-label="Unread" />}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{n.title}</p>
                    <Badge variant="secondary">{n.kind}</Badge>
                  </div>
                  {n.body && <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">{timeAgo(n.created_at)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
