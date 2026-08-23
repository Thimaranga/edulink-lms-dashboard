import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark. The bracket glyph is the signature mark — a learning path
 * rendered as three ascending rungs, drawn rather than iconified so it
 * scales cleanly in the 32px sidebar slot and the 24px mobile header.
 */
export function Brand({
  href = "/dashboard",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2.5 rounded-lg outline-none pointer-coarse:min-h-11",
        className
      )}
      aria-label="EduLink home"
    >
      <span className="relative grid size-9 shrink-0 place-items-center rounded-[11px] bg-primary shadow-brand transition-transform duration-200 group-hover:-translate-y-px">
        <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
          <g
            stroke="currentColor"
            className="text-primary-foreground"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          >
            <path d="M5 17h6" />
            <path d="M5 12h9" />
            <path d="M5 7h5" />
          </g>
          <circle cx="18.5" cy="7" r="2.1" className="fill-current text-primary-foreground/55" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-extrabold tracking-[-0.03em] text-foreground">
          EduLink
        </span>
        <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Console
        </span>
      </span>
    </Link>
  );
}
