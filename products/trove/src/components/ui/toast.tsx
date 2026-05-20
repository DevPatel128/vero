"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "border border-border bg-card text-foreground rounded-[4px] shadow-flat",
          title: "font-serif text-base",
          description: "text-sm text-muted-foreground",
          actionButton: "bg-trove-ink text-trove-cream rounded-[4px]",
          cancelButton: "bg-trove-surface text-trove-ink rounded-[4px]",
        },
      }}
    />
  );
}

export { toast } from "sonner";
