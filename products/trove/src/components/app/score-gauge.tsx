import { scoreBand } from "@/lib/formulas";
import { cn } from "@/lib/utils";

export function ScoreGauge({ value }: { value: number }) {
  const band = scoreBand(value);
  const radius = 70;
  const circ = Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  const stroke = {
    danger: "#9A2A2A",
    warning: "#B8860B",
    success: "#3B7A3D",
    gold: "#C9A96E",
  }[band.color];

  return (
    <div className="flex flex-col items-center">
      <svg width="170" height="100" viewBox="0 0 170 100" className="overflow-visible">
        <path d="M15 95 A 70 70 0 0 1 155 95" fill="none" stroke="#E5E0D8" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M15 95 A 70 70 0 0 1 155 95"
          fill="none"
          stroke={stroke}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      <div className="mt-2 text-center">
        <p className={cn("font-serif text-5xl tracking-tight number-tabular", `text-trove-${band.color === "danger" ? "danger" : band.color === "warning" ? "warning" : band.color === "success" ? "success" : "goldDeep"}`)}>
          {Math.round(value)}
        </p>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{band.label}</p>
      </div>
    </div>
  );
}
