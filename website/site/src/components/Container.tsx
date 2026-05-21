import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  size = "content",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "content" | "prose";
}) {
  return (
    <div
      className={cn(
        "mx-auto px-6",
        size === "content" && "max-w-content",
        size === "prose" && "max-w-prose",
        className,
      )}
    >
      {children}
    </div>
  );
}

