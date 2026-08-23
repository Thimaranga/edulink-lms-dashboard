import type { Metadata } from "next";
import { Suspense } from "react";
import { requireRole } from "@/lib/session";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatGrid } from "@/components/metrics/stat-card";
import { ReviewQueue } from "@/components/metrics/review-queue";
import { ActivityRibbon } from "@/components/metrics/activity-ribbon";
import { EnrollmentsTable } from "@/components/metrics/enrollments-table";
import { CardSkeleton } from "@/components/dashboard/skeletons";
import { getMetrics } from "@/lib/data";

export const metadata: Metadata = { title: "Teaching" };

export default async function InstructorPage() {
  const user = await requireRole("admin", "instructor");
  const metrics = await getMetrics("instructor");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Teaching"
        title="Your cohorts"
        description={
          user.title ?? "Courses you own and the learners in them."
        }
      />

      <StatGrid metrics={metrics} />

      {/* [&>*]:min-w-0 — grid items default to min-width:auto, so a card
          holding truncating text would otherwise refuse to shrink below its
          min-content width and overflow the track on narrow screens. */}
      <div className="grid gap-4 xl:grid-cols-3 [&>*]:min-w-0">
        <div className="xl:col-span-2">
          <Suspense fallback={<CardSkeleton height="h-80" />}>
            <ActivityRibbon />
          </Suspense>
        </div>
        <Suspense fallback={<CardSkeleton height="h-80" />}>
          <ReviewQueue />
        </Suspense>
      </div>

      <Suspense fallback={<CardSkeleton height="h-96" />}>
        <EnrollmentsTable />
      </Suspense>
    </div>
  );
}
