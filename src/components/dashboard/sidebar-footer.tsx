import { CalendarClock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Role } from "@/lib/roles";

/**
 * Staff get a cohort-wide nudge; students get their own deadline. The staff
 * variant references other learners, so it must not render for a student.
 */
export function SidebarFooter({ role }: { role: Role }) {
  const isStaff = role === "admin" || role === "instructor";

  return (
    <div className="mt-auto border-t border-sidebar-border p-3">
      <div className="rounded-xl bg-gradient-to-br from-primary-soft to-jade-soft p-4">
        <div className="flex items-center gap-2">
          {isStaff ? (
            <Sparkles className="size-4 text-[color:var(--accent-jade)]" />
          ) : (
            <CalendarClock className="size-4 text-[color:var(--accent-jade)]" />
          )}
          <p className="font-display text-[13px] font-bold">
            Term ends in 12 days
          </p>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
          {isStaff
            ? "86 learners still need to submit their capstone."
            : "Your capstone is due before the term closes."}
        </p>
        <Button size="sm" className="mt-3 w-full">
          {isStaff ? "Send a reminder" : "Open your capstone"}
        </Button>
      </div>
    </div>
  );
}
