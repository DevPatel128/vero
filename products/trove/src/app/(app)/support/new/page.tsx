import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { SupportTicketForm } from "@/components/app/support-ticket-form";

export const metadata: Metadata = { title: "New support ticket", robots: { index: false, follow: false } };

export default function NewTicketPage() {
  return (
    <>
      <PageHeader eyebrow="Support" title="Submit a ticket" description="Describe the issue. Founder reads every one." />
      <Card className="p-6">
        <SupportTicketForm />
      </Card>
    </>
  );
}
