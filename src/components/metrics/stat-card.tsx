import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import type { Metric } from "@/lib/data";

const TONE_RAIL: Record<Metric["tone"], string> = {
  primary: "bg-primary",
  jade: "bg-jade",
  warning: "bg-warning",
  violet: "bg-violet",
};

function display(value: number, unit?: Metric["unit"]) {
  switch (unit) {
    case "percent":
      return `${value}%`;
    case "currency":
      return `$${formatNumber(value)}`;
    case "hours":
      return `${formatNumber(value)}h`;
    default:
      return formatNumber(value);
  }
}

/**
 * A falling number is not automatically bad — "at-risk learners" going down
 * is a win. `trend` carries the semantics; `delta` only carries direction.
 */
function deltaTone(metric: Metric) {
  const good =
    metric.key === "at-risk" ? metric.delta < 0 : metric.delta > 0;
  if (metric.delta === 0) return "text-muted-foreground bg-muted";
  return good
    ? "text-[color:var(--accent-jade)] bg-jade-soft"
    : "text-destructive bg-destructive/10";
}

export function StatCard({ metric }: { metric: Metric }) {
  // A zero delta gets no chip at all — "— 0%" is noise that competes with
  // the figure it sits beside.
  const Arrow = metric.delta > 0 ? ArrowUpRight : ArrowDownRight;
  const showDelta = metric.delta !== 0;

  return (
    <Card className="relative overflow-hidden p-5 transition-shadow duration-200 hover:shadow-raised">
      {/* The rail is the signature device: a 3px colour-keyed edge that lets
          you identify a metric peripherally when four cards sit in a row. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-4 left-0 w-[3px] rounded-r-full",
          TONE_RAIL[metric.tone]
        )}
      />

      <div className="pl-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[13px] font-medium text-muted-foreground">
            {metric.label}
          </p>
          {showDelta && (
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums",
                deltaTone(metric)
              )}
            >
              <Arrow className="size-3" aria-hidden="true" />
              {Math.abs(metric.delta)}%
            </span>
          )}
        </div>

        <p className="metric mt-3 text-[30px] leading-none">
          {display(metric.value, metric.unit)}
        </p>

        <p className="mt-2.5 text-[12px] leading-snug text-muted-foreground">
          {metric.caption}
        </p>
      </div>
    </Card>
  );
}

export function StatGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m) => (
        <StatCard key={m.key} metric={m} />
      ))}
    </div>
  );
}
