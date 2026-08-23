import type { Metadata } from "next";
import { Brand } from "@/components/dashboard/brand";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign in" };

const PROOF = [
  { figure: "4,218", label: "learners active this week" },
  { figure: "71%", label: "median course completion" },
  { figure: "12", label: "cohorts running concurrently" },
];

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="grid min-h-dvh lg:grid-cols-[1fr_minmax(0,44rem)]">
      {/* Narrative panel — desktop only. On mobile the form is the whole job,
          and a decorative half-screen would just push it below the fold. */}
      <section className="relative hidden overflow-hidden bg-foreground p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 size-[32rem] rounded-full bg-primary/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-16 size-[26rem] rounded-full bg-jade/20 blur-3xl"
        />

        <div className="relative">
          <span className="font-display text-lg font-extrabold tracking-[-0.03em] text-white">
            EduLink
          </span>
        </div>

        <div className="relative max-w-md">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
            Learning operations
          </p>
          <h1 className="mt-4 font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
            Every cohort, every outcome, on one screen.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-white/60">
            Track enrolments, spot learners drifting off pace, and clear the
            grading queue before it becomes a backlog.
          </p>
        </div>

        <dl className="relative grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {PROOF.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="metric text-2xl text-white">{s.figure}</dd>
              <p className="mt-1.5 text-[12px] leading-snug text-white/45">
                {s.label}
              </p>
            </div>
          ))}
        </dl>
      </section>

      {/* Form panel */}
      <section className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-[26rem]">
          <div className="lg:hidden">
            <Brand href="/login" />
          </div>

          <div className="mt-8 lg:mt-0">
            <h2 className="text-[26px] font-extrabold tracking-[-0.03em]">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use your EduLink work account.
            </p>
          </div>

          <LoginForm next={next} />

          <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/50 p-4">
            <p className="eyebrow">Demo accounts</p>
            <ul className="mt-2.5 space-y-1.5 font-mono text-[12px] text-muted-foreground">
              <li>admin@edulink.io — Administrator</li>
              <li>instructor@edulink.io — Instructor</li>
              <li>student@edulink.io — Student</li>
            </ul>
            <p className="mt-2.5 font-mono text-[12px] text-foreground/70">
              Password for all three: Password123!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
