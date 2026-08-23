import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { homeFor, type Role } from "@/lib/roles";

/**
 * Returns the signed-in user, or redirects to login.
 *
 * Middleware already gates these routes, so in practice this never redirects.
 * It exists so that a middleware misconfiguration degrades into a redirect
 * rather than a `Cannot read properties of null` crash — page and layout
 * render in parallel, so the layout's own guard is not enough to protect a
 * page body that dereferences the session.
 */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session.user;
}

/**
 * Second line of defence behind the middleware role matrix. Bounces to the
 * user's own landing page with the same `denied` marker the middleware uses,
 * so the notice renders identically whichever layer caught it.
 */
export async function requireRole(...allowed: Role[]) {
  const user = await requireUser();
  if (!allowed.includes(user.role)) {
    redirect(`${homeFor(user.role)}?denied=${encodeURIComponent("/" + allowed[0])}`);
  }
  return user;
}
