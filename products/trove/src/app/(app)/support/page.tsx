import type { Metadata } from "next";
import { Mail, MessageSquare, Book } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Support", robots: { index: false, follow: false } };

export default function SupportPage() {
  return (
    <>
      <PageHeader eyebrow="Help" title="Support" description="We read every message. Usually reply within hours." />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <Book className="h-6 w-6 text-trove-goldDeep" strokeWidth={1.25} />
          <h3 className="mt-4 font-serif text-xl">Documentation</h3>
          <p className="mt-2 text-sm text-muted-foreground">Quick guides, concepts, API reference.</p>
          <Button asChild variant="outline" size="sm" className="mt-4"><Link href="/docs">Browse docs →</Link></Button>
        </Card>
        <Card className="p-6">
          <Mail className="h-6 w-6 text-trove-goldDeep" strokeWidth={1.25} />
          <h3 className="mt-4 font-serif text-xl">Email</h3>
          <p className="mt-2 text-sm text-muted-foreground">support@trove.vroelabs.com</p>
          <Button asChild variant="outline" size="sm" className="mt-4"><a href="mailto:support@trove.vroelabs.com">Send email →</a></Button>
        </Card>
        <Card className="p-6">
          <MessageSquare className="h-6 w-6 text-trove-goldDeep" strokeWidth={1.25} />
          <h3 className="mt-4 font-serif text-xl">Submit a ticket</h3>
          <p className="mt-2 text-sm text-muted-foreground">For bugs, billing, account issues.</p>
          <Button asChild size="sm" className="mt-4"><Link href="/support/new">New ticket →</Link></Button>
        </Card>
      </div>
    </>
  );
}
