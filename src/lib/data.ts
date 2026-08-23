import type { Role } from "@/lib/roles";

/* Mock LMS reporting layer. Every function is async so swapping in a real
   query (Prisma, Drizzle, an internal API) is a one-line change per call. */

export type Trend = "up" | "down" | "flat";

export type Metric = {
  key: string;
  label: string;
  value: number;
  unit?: "count" | "percent" | "currency" | "hours";
  delta: number;
  trend: Trend;
  caption: string;
  tone: "primary" | "jade" | "warning" | "violet";
};

export type EnrollmentRow = {
  id: string;
  student: string;
  email: string;
  course: string;
  cohort: string;
  progress: number;
  status: "on-track" | "at-risk" | "completed" | "not-started";
  lastActive: string;
};

export type CourseRow = {
  id: string;
  title: string;
  instructor: string;
  enrolled: number;
  completionRate: number;
  rating: number;
  status: "published" | "draft" | "archived";
};

export type ReviewItem = {
  id: string;
  title: string;
  course: string;
  submitted: string;
  count: number;
  priority: "high" | "normal";
};

export async function getMetrics(role: Role): Promise<Metric[]> {
  const admin: Metric[] = [
    {
      key: "active-students",
      label: "Active students",
      value: 4218,
      unit: "count",
      delta: 6.4,
      trend: "up",
      caption: "Signed in within the last 7 days",
      tone: "primary",
    },
    {
      key: "completions",
      label: "Course completions",
      value: 1147,
      unit: "count",
      delta: 12.1,
      trend: "up",
      caption: "Certificates issued this month",
      tone: "jade",
    },
    {
      key: "at-risk",
      label: "At-risk learners",
      value: 86,
      unit: "count",
      delta: -3.2,
      trend: "down",
      caption: "No activity for 14+ days",
      tone: "warning",
    },
    {
      key: "watch-hours",
      label: "Watch hours",
      value: 12940,
      unit: "hours",
      delta: 4.8,
      trend: "up",
      caption: "Total across all published courses",
      tone: "violet",
    },
  ];

  if (role === "instructor") {
    return [
      { ...admin[0], value: 312, caption: "Across your 6 published courses" },
      { ...admin[1], value: 74, caption: "Completed your courses this month" },
      { ...admin[2], value: 11, caption: "In your cohorts, no activity 14+ days" },
      { ...admin[3], value: 1860, caption: "Watched across your lessons" },
    ];
  }

  // A student must never see institution-wide figures. These are scoped to
  // the signed-in learner only.
  if (role === "student") {
    return [
      {
        key: "my-courses",
        label: "Courses in progress",
        value: 3,
        unit: "count",
        delta: 0,
        trend: "flat",
        caption: "Active enrolments this term",
        tone: "primary",
      },
      {
        key: "my-completions",
        label: "Completed",
        value: 7,
        unit: "count",
        delta: 16.7,
        trend: "up",
        caption: "Certificates earned to date",
        tone: "jade",
      },
      {
        key: "my-due",
        label: "Due this week",
        value: 2,
        unit: "count",
        delta: 0,
        trend: "flat",
        caption: "Assignments awaiting submission",
        tone: "warning",
      },
      {
        key: "my-hours",
        label: "Study hours",
        value: 41,
        unit: "hours",
        delta: 9.2,
        trend: "up",
        caption: "Your watch time this month",
        tone: "violet",
      },
    ];
  }

  return admin;
}

export type MyCourseRow = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  nextDue: string;
};

/** Scoped to the signed-in learner — no other students' records. */
export async function getMyCourses(): Promise<MyCourseRow[]> {
  return [
    { id: "CRS-118", title: "Intro to Machine Learning", instructor: "Daniel Reyes", progress: 78, nextDue: "Lab 7 — Friday" },
    { id: "CRS-104", title: "Applied Statistics II", instructor: "Nadia Petrova", progress: 45, nextDue: "Problem set — Tuesday" },
    { id: "CRS-131", title: "Data Visualisation", instructor: "Daniel Reyes", progress: 12, nextDue: "Nothing due" },
  ];
}

export async function getEnrollments(): Promise<EnrollmentRow[]> {
  return [
    { id: "ENR-4820", student: "Priya Raghavan", email: "priya.r@edulink.io", course: "Applied Statistics II", cohort: "C-24", progress: 92, status: "on-track", lastActive: "2 hours ago" },
    { id: "ENR-4819", student: "Marcus Bell", email: "m.bell@edulink.io", course: "Intro to Machine Learning", cohort: "C-24", progress: 100, status: "completed", lastActive: "Yesterday" },
    { id: "ENR-4816", student: "Sofia Almeida", email: "s.almeida@edulink.io", course: "Data Visualisation", cohort: "C-23", progress: 34, status: "at-risk", lastActive: "18 days ago" },
    { id: "ENR-4811", student: "Yusuf Karim", email: "y.karim@edulink.io", course: "Applied Statistics II", cohort: "C-24", progress: 67, status: "on-track", lastActive: "5 hours ago" },
    { id: "ENR-4807", student: "Hannah Lindqvist", email: "h.lind@edulink.io", course: "Product Analytics", cohort: "C-25", progress: 0, status: "not-started", lastActive: "Never" },
    { id: "ENR-4802", student: "Diego Fuentes", email: "d.fuentes@edulink.io", course: "Intro to Machine Learning", cohort: "C-23", progress: 78, status: "on-track", lastActive: "1 day ago" },
  ];
}

export async function getCourses(): Promise<CourseRow[]> {
  return [
    { id: "CRS-118", title: "Intro to Machine Learning", instructor: "Daniel Reyes", enrolled: 642, completionRate: 71, rating: 4.8, status: "published" },
    { id: "CRS-104", title: "Applied Statistics II", instructor: "Nadia Petrova", enrolled: 418, completionRate: 64, rating: 4.6, status: "published" },
    { id: "CRS-131", title: "Data Visualisation", instructor: "Daniel Reyes", enrolled: 297, completionRate: 58, rating: 4.4, status: "published" },
    { id: "CRS-140", title: "Product Analytics", instructor: "Tomás Guerrero", enrolled: 155, completionRate: 41, rating: 4.2, status: "draft" },
  ];
}

export async function getReviewQueue(): Promise<ReviewItem[]> {
  return [
    { id: "SUB-991", title: "Capstone: churn model write-up", course: "Intro to Machine Learning", submitted: "3 hours ago", count: 14, priority: "high" },
    { id: "SUB-988", title: "Lab 6 — hypothesis testing", course: "Applied Statistics II", submitted: "Yesterday", count: 31, priority: "normal" },
    { id: "SUB-984", title: "Dashboard critique essay", course: "Data Visualisation", submitted: "2 days ago", count: 9, priority: "normal" },
  ];
}

/** Weekly engagement, used by the activity ribbon. */
export async function getWeeklyActivity() {
  return [
    { day: "Mon", sessions: 618, completions: 41 },
    { day: "Tue", sessions: 742, completions: 55 },
    { day: "Wed", sessions: 803, completions: 62 },
    { day: "Thu", sessions: 690, completions: 48 },
    { day: "Fri", sessions: 574, completions: 39 },
    { day: "Sat", sessions: 288, completions: 17 },
    { day: "Sun", sessions: 231, completions: 12 },
  ];
}
