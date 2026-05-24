import { cn } from "@/lib/cn";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "outline";
export type BadgeSize = "sm" | "md";

export type BadgeProps = {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
};

const variants: Record<BadgeVariant, { wrapper: string; dot: string }> = {
  default: {
    wrapper: "bg-ink-100 text-ink-800 dark:bg-ink-800 dark:text-ink-100",
    dot: "bg-ink-500",
  },
  success: {
    wrapper: "bg-[#e8f5e9] text-[#1b5e20] dark:bg-[#1b5e20]/20 dark:text-[#81c784]",
    dot: "bg-[#4caf50]",
  },
  warning: {
    wrapper: "bg-[#fff8e1] text-[#f57f17] dark:bg-[#f57f17]/20 dark:text-[#ffd54f]",
    dot: "bg-[#ffb300]",
  },
  danger: {
    wrapper: "bg-[#ffebee] text-[#b71c1c] dark:bg-[#b71c1c]/20 dark:text-[#e57373]",
    dot: "bg-[#f44336]",
  },
  info: {
    wrapper: "bg-[#e3f2fd] text-[#0d47a1] dark:bg-[#0d47a1]/20 dark:text-[#64b5f6]",
    dot: "bg-[#2196f3]",
  },
  outline: {
    wrapper: "border border-border text-fg-muted bg-transparent",
    dot: "bg-fg-muted",
  },
};

const sizes: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest",
        variants[variant].wrapper,
        sizes[size],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-75",
              variant !== "outline" && "animate-ping",
              variants[variant].dot
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              variants[variant].dot
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
