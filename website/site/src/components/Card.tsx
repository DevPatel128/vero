import { cn } from "@/lib/cn";

export type CardVariant = "surface" | "raised" | "outlined" | "dark";

export type CardProps = {
  variant?: CardVariant;
  hoverLift?: boolean;
  className?: string;
  children: React.ReactNode;
};

const variants: Record<CardVariant, string> = {
  surface: "bg-bg-elevated border border-border shadow-sm",
  raised: "bg-bg-elevated border border-border shadow-card",
  outlined: "bg-transparent border border-border",
  dark: "bg-surface-dark border border-surface-dark-muted text-surface-dark-fg",
};

export function Card({
  variant = "surface",
  hoverLift = false,
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden transition-all duration-300",
        variants[variant],
        hoverLift && "hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("p-6 pb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className={cn("font-display text-xl font-medium tracking-tightish", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("mt-1.5 text-sm leading-relaxed text-fg-muted", className)}>
      {children}
    </p>
  );
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("px-6 py-4 border-t border-border bg-bg-warm/50 flex items-center", className)}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;
