import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { getWeeklyActivity } from "@/lib/data";

/** Plot area height in px. Fixed rather than percentage-based: a percentage
 *  height needs a definite parent height, and inside a flex column that is
 *  fragile — an earlier version silently rendered every bar at zero height. */
const PLOT_H = 168;

/**
 * Pure-CSS bar chart. A charting library is overkill for seven bars, and
 * keeping this a Server Component means zero JS ships for it.
 */
export async function ActivityRibbon() {
  const data = await getWeeklyActivity();
  const peak = Math.max(...data.map((d) => d.sessions));

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Weekly engagement</CardTitle>
          <CardDescription>Learner sessions, last 7 days</CardDescription>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="size-2 rounded-sm bg-primary" />
            Sessions
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="size-2 rounded-sm bg-jade" />
            Completions
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline justify-between pb-3">
          <span className="metric text-[11px] text-muted-foreground">
            peak {formatNumber(peak)}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {formatNumber(data.reduce((n, d) => n + d.sessions, 0))} sessions
            this week
          </span>
        </div>

        <ul className="flex items-end gap-2 sm:gap-3">
          {data.map((d) => {
            // Heights in px — no percentage resolution, no ambiguity.
            const barH = Math.max(2, Math.round((d.sessions / peak) * PLOT_H));
            // Completions are a true subset of that day's bar. No scaling
            // fudge: a small share should look small.
            const doneH = Math.round((d.completions / d.sessions) * barH);

            return (
              <li
                key={d.day}
                className="group flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="flex w-full items-end"
                  style={{ height: PLOT_H }}
                  title={`${d.day}: ${formatNumber(d.sessions)} sessions, ${d.completions} completions`}
                >
                  <div
                    className="flex w-full flex-col justify-end overflow-hidden rounded-t-md bg-primary/85 transition-colors duration-200 group-hover:bg-primary"
                    style={{ height: barH }}
                  >
                    <div className="w-full bg-jade" style={{ height: doneH }} />
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {d.day}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
