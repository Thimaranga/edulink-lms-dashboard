import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMyCourses } from "@/lib/data";

/**
 * The learner-facing counterpart to EnrollmentsTable. Deliberately shows only
 * the signed-in student's own enrolments — the admin table exposes other
 * learners' names and email addresses and must never render for a student.
 */
export async function MyCourses() {
  const courses = await getMyCourses();

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Your courses</CardTitle>
          <CardDescription>Progress and what&apos;s coming up</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/courses">
            Browse catalogue
            <ArrowUpRight />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="px-2 pb-2">
        <ul className="flex flex-col">
          {courses.map((c) => (
            <li key={c.id}>
              <Link
                href={`/dashboard/courses/${c.id}`}
                className="tap-safe flex flex-col gap-3 rounded-xl px-3 py-3.5 transition-colors hover:bg-muted sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="min-w-0 flex-1">
                  <span className="block min-w-0 truncate text-[14px] font-semibold">
                    {c.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">
                    {c.instructor} · {c.id}
                  </span>
                </span>

                <span className="flex items-center gap-3 sm:w-64 sm:justify-end">
                  <Progress
                    value={c.progress}
                    className="w-full sm:w-28"
                    indicatorClassName={
                      c.progress === 100 ? "bg-jade" : "bg-primary"
                    }
                  />
                  <span className="metric shrink-0 text-[12px] text-muted-foreground">
                    {c.progress}%
                  </span>
                  <Badge
                    variant={c.nextDue === "Nothing due" ? "neutral" : "warning"}
                    className="shrink-0"
                  >
                    {c.nextDue}
                  </Badge>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
