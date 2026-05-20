import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[4px] border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-trove-ink text-trove-cream",
        secondary: "border-trove-line bg-trove-surface text-trove-ink",
        outline: "border-border text-foreground",
        gold: "border-trove-gold/40 bg-trove-gold/10 text-trove-goldDeep",
        salmon: "border-transparent bg-trove-salmon text-trove-ink",
        success: "border-transparent bg-trove-success/15 text-trove-success",
        warning: "border-transparent bg-trove-warning/15 text-trove-warning",
        danger: "border-transparent bg-trove-danger/15 text-trove-danger",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
