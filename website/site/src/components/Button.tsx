import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "btn-magnetic inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-micro ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 focus-visible:ring-accent-glow disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:shadow-glow",
  secondary:
    "border border-line bg-surface-1/50 text-ink-1 hover:border-line-strong hover:text-ink-0 hover:bg-surface-2/70",
  ghost: "text-ink-1 hover:text-ink-0",
  inverse: "bg-surface-inverse text-ink-inverse hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-caption",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
}: ButtonProps & { href: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}
