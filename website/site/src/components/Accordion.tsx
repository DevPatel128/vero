"use client";

import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

type AccordionContextType = {
  activeItems: string[];
  toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

export type AccordionProps = {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
  jsonLd?: boolean;
};

export function Accordion({
  type = "single",
  defaultValue,
  className,
  children,
  // Reserved for a future FAQPage JSON-LD emission; not wired up yet.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  jsonLd = false,
}: AccordionProps) {
  const [activeItems, setActiveItems] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );

  const toggleItem = (value: string) => {
    if (type === "single") {
      setActiveItems((prev) => (prev[0] === value ? [] : [value]));
    } else {
      setActiveItems((prev) =>
        prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ activeItems, toggleItem }}>
      <div className={cn("divide-y divide-border", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = {
  value: string;
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function AccordionItem({ value, title, children, className }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used within Accordion");

  const isOpen = context.activeItems.includes(value);

  return (
    <div className={cn("py-4", className)}>
      <button
        type="button"
        onClick={() => context.toggleItem(value)}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between text-left font-medium text-fg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 -mx-2 transition-colors hover:text-primary"
      >
        <span className="text-base">{title}</span>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-subtle text-fg-muted transition-transform duration-200 group-hover:border-border group-hover:text-fg-base"
        >
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </motion.svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden px-2 -mx-2"
          >
            <div className="pt-3 pb-2 text-sm leading-relaxed text-fg-muted">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
