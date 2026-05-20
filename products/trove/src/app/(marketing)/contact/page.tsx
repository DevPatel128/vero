import type { Metadata } from "next";
import { Mail, MessageSquare, Shield } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Trove. Sales, support, partnerships, press — we'd love to hear from you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <Badge variant="gold" className="mb-6">Contact</Badge>
          <h1 className="display-serif text-display-xl">Talk to us. We read every message.</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Whether it's a feature request, a bug, a partnership, or a hello — we want to hear it. Founders read every message personally.
          </p>
        </div>
      </section>

      <section className="container-wide py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <ContactForm />
          </div>
          <aside className="space-y-8">
            <ContactItem icon={Mail} title="Email" body="hello@trove.vroelabs.com" href="mailto:hello@trove.vroelabs.com" />
            <ContactItem icon={MessageSquare} title="Support" body="support@trove.vroelabs.com" href="mailto:support@trove.vroelabs.com" />
            <ContactItem icon={Shield} title="Security disclosure" body="security@trove.vroelabs.com — PGP key on /security" href="/security" />
            <div className="border-t border-border pt-8">
              <p className="eyebrow mb-2">Response time</p>
              <p className="text-base">Within 24 hours, M–F. Often faster.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactItem({ icon: Icon, title, body, href }: { icon: typeof Mail; title: string; body: string; href: string }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="h-5 w-5 mt-0.5 text-trove-goldDeep" strokeWidth={1.25} />
      <div>
        <p className="eyebrow">{title}</p>
        <a href={href} className="mt-1 block link-ft">{body}</a>
      </div>
    </div>
  );
}
