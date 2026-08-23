import type { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { requireRole } from "@/lib/session";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatGrid } from "@/components/metrics/stat-card";
import { CoursesTable } from "@/components/metrics/courses-table";
import { EnrollmentsTable } from "@/components/metrics/enrollments-table";
import { AccessNotice } from "@/components/dashboard/access-notice";
import { CardSkeleton } from "@/components/dashboard/skeletons";
import { getMetrics } from "@/lib/data";

export const metadata: Metadata = { title: "Admin console" };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  // Defence in depth: middleware gates /admin, this re-checks at render.
  const [user, { denied }] = await Promise.all([
    requireRole("admin"),
    searchParams,
  ]);
  const metrics = await getMetrics(user.role);

  return (
    <div className="flex flex-col gap-6">
      {denied && <AccessNotice path={denied} />}

      <PageHeader
        eyebrow="Administrator only"
        title="Admin console"
        description="Institution-wide figures across every cohort and instructor."
        actions={
          <Badge variant="violet" className="gap-1.5 px-2.5 py-1">
            <ShieldCheck />
            Elevated access
          </Badge>
        }
      />

      <StatGrid metrics={metrics} />

      <Suspense fallback={<CardSkeleton height="h-80" />}>
        <CoursesTable />
      </Suspense>

      <Suspense fallback={<CardSkeleton height="h-96" />}>
        <EnrollmentsTable />
      </Suspense>
    </div>
  );
}
