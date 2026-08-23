import { cn } from "@/lib/utils";

export function CardSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl border border-border bg-card",
        height
      )}
      aria-hidden="true"
    />
  );
}
