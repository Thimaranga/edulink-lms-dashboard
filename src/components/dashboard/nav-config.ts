import {
  BookOpen,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Role } from "@/lib/roles";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: readonly Role[];
  badge?: string;
};

export type NavSection = {
  heading: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    heading: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "instructor", "student"] },
      { href: "/admin", label: "Admin console", icon: ShieldCheck, roles: ["admin"] },
      { href: "/instructor", label: "Teaching", icon: GraduationCap, roles: ["admin", "instructor"] },
    ],
  },
  {
    heading: "Learning",
    items: [
      { href: "/dashboard/courses", label: "Courses", icon: BookOpen, roles: ["admin", "instructor", "student"] },
      { href: "/instructor/submissions", label: "Submissions", icon: ClipboardCheck, roles: ["admin", "instructor"], badge: "14" },
      { href: "/admin/people", label: "People", icon: Users, roles: ["admin"] },
    ],
  },
  {
    heading: "Operations",
    items: [
      { href: "/admin/billing", label: "Billing", icon: CreditCard, roles: ["admin"] },
      { href: "/settings", label: "Settings", icon: Settings, roles: ["admin", "instructor", "student"] },
      { href: "/support", label: "Support", icon: LifeBuoy, roles: ["admin", "instructor", "student"] },
    ],
  },
];

/** Strips out sections the signed-in role has no items in. */
export function navForRole(role: Role): NavSection[] {
  return NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.roles.includes(role)),
  })).filter((section) => section.items.length > 0);
}
