import type { Metadata } from "next";
import { Suspense } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatGrid } from "@/components/metrics/stat-card";
import { ActivityRibbon } from "@/components/metrics/activity-ribbon";
import { EnrollmentsTable } from "@/components/metrics/enrollments-table";
import { ReviewQueue } from "@/components/metrics/review-queue";
import { CoursesTable } from "@/components/metrics/courses-table";
import { MyCourses } from "@/components/metrics/my-courses";
import { AccessNotice } from "@/components/dashboard/access-notice";
import { CardSkeleton } from "@/components/dashboard/skeletons";
import { requireUser } from "@/lib/session";
import { getMetrics } from "@/lib/data";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const [user, { denied }] = await Promise.all([requireUser(), searchParams]);
  const metrics = await getMetrics(user.role);
  const firstName = (user.name ?? "there").split(" ")[0];

  // Staff see cohort-wide reporting; a student sees only their own record.
  // This gate matters beyond copy: EnrollmentsTable lists other learners'
  // names and email addresses.
  const isStaff = user.role === "admin" || user.role === "instructor";

  return (
    <div className="flex flex-col gap-6">
      {denied && <AccessNotice path={denied} />}

      <PageHeader
        eyebrow="Term 3 · Week 9"
        title={`Good to see you, ${firstName}`}
        description={
          isStaff
            ? "Here's how your learners are tracking this week."
            : "Here's where you are with your courses this week."
        }
        actions={
          isStaff ? (
            <>
              <Button variant="outline" size="sm">
                <Download />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button size="sm">
                <Plus />
                New course
              </Button>
            </>
          ) : undefined
        }
      />

      <StatGrid metrics={metrics} />

      {isStaff ? (
        <>
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

          <Suspense fallback={<CardSkeleton height="h-80" />}>
            <CoursesTable />
          </Suspense>
        </>
      ) : (
        <Suspense fallback={<CardSkeleton height="h-72" />}>
          <MyCourses />
        </Suspense>
      )}
    </div>
  );
}
