import { cn } from "@/lib/cn";

type Tone = "base" | "raised" | "inverse" | "drench" | "paper" | "warm" | "ink";

const toneClass: Record<Tone, string> = {
  base: "bg-surface-0 text-ink-0",
  raised: "bg-surface-1 text-ink-0",
  inverse: "bg-surface-inverse text-ink-inverse",
  drench: "bg-accent text-accent-ink",
  // legacy aliases (pre-pivot pages)
  paper: "bg-surface-0 text-ink-0",
  warm: "bg-surface-1 text-ink-0",
  ink: "bg-surface-inverse text-ink-inverse",
};

export function Section({
  id,
  tone = "base",
  className,
  containerClassName,
  rule = "none",
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  rule?: "none" | "top" | "bottom" | "both";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        toneClass[tone],
        (rule === "top" || rule === "both") && "border-t border-line-faint",
        (rule === "bottom" || rule === "both") && "border-b border-line-faint",
        className,
      )}
    >
      <div className={cn("mx-auto max-w-content px-5 py-24 sm:px-8 md:py-32", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-caption text-ink-2", className)}>{children}</p>
  );
}

export function SectionTitle({
  children,
  className,
  size = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "h2" | "h3" | "h1";
}) {
  const sizeClass = size === "h1" ? "text-h1" : size === "h3" ? "text-h3" : "text-h2";
  return (
    <h2 className={cn("mt-4 max-w-[20ch] text-balance font-display font-medium text-ink-0", sizeClass, className)}>
      {children}
    </h2>
  );
}

export function SectionHeadline({
  children,
  className,
  size = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "h2" | "h3" | "h1";
}) {
  return (
    <SectionTitle className={className} size={size}>
      {children}
    </SectionTitle>
  );
}

export function SectionLead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mt-5 max-w-[58ch] text-lead text-ink-1", className)}>
      {children}
    </p>
  );
}
