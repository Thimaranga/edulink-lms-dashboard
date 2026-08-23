import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getReviewQueue } from "@/lib/data";

export async function ReviewQueue() {
  const items = await getReviewQueue();

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Grading queue</CardTitle>
          <CardDescription>Submissions waiting on a reviewer</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`/instructor/submissions/${item.id}`}
                className="tap-safe flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted"
              >
                <span className="metric mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-[13px] text-accent-foreground">
                  {item.count}
                </span>
                <span className="min-w-0 flex-1">
                  {/* min-w-0 here too: `truncate` sets white-space:nowrap, and
                      without it this flex row reports the untruncated text
                      width as its min-content, overflowing the viewport. */}
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="min-w-0 truncate text-[13.5px] font-semibold">
                      {item.title}
                    </span>
                    {item.priority === "high" && (
                      <Badge variant="danger">Due soon</Badge>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">
                    {item.course} · {item.submitted}
                  </span>
                </span>
                <ChevronRight className="mt-2 size-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
