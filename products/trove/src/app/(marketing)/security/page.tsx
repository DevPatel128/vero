import type { Metadata } from "next";
import { Lock, KeyRound, ShieldCheck, FileCheck, Server, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Security",
  description: "How Trove protects your data — encryption, access controls, monitoring, incident response, and SOC 2 progress.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide py-20 md:py-28">
          <Badge variant="gold" className="mb-6">Security</Badge>
          <h1 className="display-serif text-display-xl">Your money belongs to you.<br />So does your data.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Trove is built with security as a foundation, not a bolt-on. Below is a public statement of what we do, what we don't, and how to reach us if you find something we missed.
          </p>
        </div>
      </section>

      <section className="container-wide py-20 grid gap-px bg-trove-line md:grid-cols-2">
        {[
          { Icon: Lock,        title: "Encryption",       body: "TLS 1.3 in transit. AES-256 at rest. Database backups encrypted with rotating keys via pgsodium." },
          { Icon: KeyRound,    title: "Read-only access", body: "We can never move your money. Plaid tokens are read-only by design — and stored encrypted." },
          { Icon: ShieldCheck, title: "Authentication",   body: "Email/password with strong hashing (Argon2id), OAuth (Google), and MFA-ready architecture." },
          { Icon: Server,      title: "Infrastructure",   body: "Hosted on Vercel + Supabase, both SOC 2 Type II. PostgreSQL with row-level security on every table." },
          { Icon: Eye,         title: "Monitoring",       body: "Sentry for errors, PostHog session replay (with PII masking), Vercel observability, and uptime checks." },
          { Icon: FileCheck,   title: "Compliance",       body: "SOC 2 Type II audit in progress (target: Q3 2026). GDPR + CCPA compliant. Data deletion within 30 days." },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="bg-background p-8">
            <Icon className="h-6 w-6 text-trove-goldDeep" strokeWidth={1.25} />
            <h3 className="mt-4 font-serif text-xl tracking-tight">{title}</h3>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-border bg-trove-surface/30 py-20">
        <div className="container-prose">
          <h2 className="display-serif text-display-md">Responsible disclosure</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            If you discover a vulnerability, please email <a href="mailto:security@trove.vroelabs.com" className="link-ft">security@trove.vroelabs.com</a>. We respond within 24 hours and credit researchers publicly upon resolution. We do not currently offer a bounty, but we offer Pro for life.
          </p>
          <pre className="mt-6 overflow-x-auto rounded-[4px] border border-border bg-card p-4 font-mono text-xs">
{`-----BEGIN PGP PUBLIC KEY BLOCK-----
[Replace with your actual PGP public key. Generate via gpg --gen-key
 then gpg --armor --export security@trove.vroelabs.com]
-----END PGP PUBLIC KEY BLOCK-----`}
          </pre>
        </div>
      </section>
    </>
  );
}
