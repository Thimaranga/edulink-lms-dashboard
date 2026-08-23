export const ROLES = ["admin", "instructor", "student"] as const;
export type Role = (typeof ROLES)[number];

/**
 * Route access matrix. Prefix -> roles permitted.
 * Order matters: the first matching prefix wins, so list specific paths first.
 */
export const ROUTE_ACCESS: ReadonlyArray<{ prefix: string; roles: readonly Role[] }> = [
  { prefix: "/admin", roles: ["admin"] },
  { prefix: "/instructor", roles: ["admin", "instructor"] },
  { prefix: "/dashboard", roles: ["admin", "instructor", "student"] },
  { prefix: "/settings", roles: ["admin", "instructor", "student"] },
  { prefix: "/support", roles: ["admin", "instructor", "student"] },
];

export const PUBLIC_ROUTES = ["/", "/login", "/forgot-password"];

export function isProtected(pathname: string) {
  return ROUTE_ACCESS.some(
    (r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`)
  );
}

export function rolesFor(pathname: string): readonly Role[] | null {
  const match = ROUTE_ACCESS.find(
    (r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`)
  );
  return match?.roles ?? null;
}

export function canAccess(pathname: string, role: Role | undefined) {
  const required = rolesFor(pathname);
  if (!required) return true;
  return !!role && required.includes(role);
}

/** Where a user lands after signing in, or after being bounced from a route. */
export function homeFor(role: Role | undefined) {
  switch (role) {
    case "admin":
      return "/admin";
    case "instructor":
      return "/instructor";
    default:
      return "/dashboard";
  }
}

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Administrator",
  instructor: "Instructor",
  student: "Student",
};
