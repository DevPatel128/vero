import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  className,
  containerClassName,
  children,
  id,
  tone = "paper",
}: {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
  tone?: "paper" | "warm" | "ink";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        tone === "warm" && "bg-paper-warm",
        tone === "ink" && "bg-ink-950 text-paper",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-accent">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function SectionLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-2 max-w-2xl text-lg leading-relaxed text-ink-700",
        className,
      )}
    >
      {children}
    </p>
  );
}

