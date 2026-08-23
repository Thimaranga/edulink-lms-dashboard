import { Lock } from "lucide-react";

/**
 * Shown after middleware bounces a user off a route their role can't reach.
 * States what happened and what to do — no apology, no vagueness.
 */
export function AccessNotice({ path }: { path: string }) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-xl border border-warning/35 bg-warning/10 px-4 py-3.5"
    >
      <Lock className="mt-0.5 size-4 shrink-0 text-[color:var(--warning)]" />
      <div className="min-w-0 text-[13px]">
        <p className="font-semibold text-foreground">
          Your role doesn&apos;t have access to{" "}
          <span className="font-mono text-[12px]">{path}</span>
        </p>
        <p className="mt-0.5 text-muted-foreground">
          Ask an administrator to grant access, or continue below.
        </p>
      </div>
    </div>
  );
}
