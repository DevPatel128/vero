import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Trove is built by Vroe Labs — a one-person studio with a thesis: software should respect your time, your attention, and your money.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-prose py-20 md:py-28">
          <Badge variant="gold" className="mb-6">About</Badge>
          <h1 className="display-serif text-display-xl">Built quietly. Built right.</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Trove began with a single observation: nobody under 35 actually understands their own money. Not because they're careless — because the tools were designed in 2009 and the world moved on. Trove is what the financial dashboard would look like if we built it today, for the way we actually live.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-prose space-y-10">
          <div>
            <h2 className="display-serif text-display-md">Our thesis</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Software should respect your time, your attention, and your money. We don't build for engagement. We build for clarity, and then we get out of your way.
            </p>
          </div>
          <div>
            <h2 className="display-serif text-display-md">What we believe</h2>
            <ul className="mt-4 space-y-3 text-base leading-relaxed">
              <li>· Your data is yours. We don't sell it. Ever.</li>
              <li>· AI helps, but never decides for you.</li>
              <li>· Beautiful things deserve to be beautifully made.</li>
              <li>· Privacy is a feature, not a compliance burden.</li>
              <li>· Slow is smooth. Smooth is fast.</li>
            </ul>
          </div>
          <div>
            <h2 className="display-serif text-display-md">The team</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Trove is built by <span className="font-medium">Dev Patel</span>, founder of <Link href="https://vroelabs.com" className="link-ft">Vroe Labs</Link> — a one-person studio that ships software with the rigor of a team of ten. We don't have investors. We have customers. That is the point.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-trove-cream py-24">
        <div className="container-prose">
          <h2 className="display-serif text-display-md">Want to help build Trove?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We're not hiring yet — but we're listening. Send us a note: what would make Trove the best financial tool you've ever used?
          </p>
          <div className="mt-8 flex gap-3">
            <Button asChild><Link href="/contact">Get in touch</Link></Button>
            <Button asChild variant="ghost"><Link href="/careers">See careers</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
