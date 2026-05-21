import { cn } from "@/lib/cn";

export function RecordCard({
  className,
  category,
  title,
  verifier,
  date,
  signers,
  metric,
}: {
  className?: string;
  category: string;
  title: string;
  verifier: string;
  date: string;
  signers: { initials: string; role: string }[];
  metric?: { value: string; label: string };
}) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-ink-100 bg-paper p-6 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
      aria-label={`Verified record: ${title}`}
    >
      <header className="flex items-center justify-between">
        <span className="rounded-full bg-paper-warm px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-700">
          {category}
        </span>
        <span
          className="flex items-center gap-1.5 text-[11px] font-medium text-trust"
          title="Verified"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Verified
        </span>
      </header>

      <h3 className="mt-4 font-display text-lg font-medium leading-snug tracking-tightish text-ink-900">
        {title}
      </h3>

      <div className="mt-4 flex items-center justify-between text-xs text-ink-700">
        <span>{verifier}</span>
        <time>{date}</time>
      </div>

      {metric && (
        <div className="mt-5 rounded-xl bg-paper-warm px-4 py-3">
          <p className="text-2xl font-medium tracking-tight text-ink-900">
            {metric.value}
          </p>
          <p className="text-xs text-ink-700">{metric.label}</p>
        </div>
      )}

      <footer className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
        <div className="flex -space-x-1.5">
          {signers.map((s) => (
            <span
              key={s.initials + s.role}
              title={s.role}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-paper bg-ink-800 text-[10px] font-medium text-paper"
            >
              {s.initials}
            </span>
          ))}
        </div>
        <span className="font-mono text-[10px] text-ink-600">
          signed · chained
        </span>
      </footer>
    </article>
  );
}

