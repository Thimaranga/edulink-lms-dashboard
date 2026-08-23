import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";
import { canAccess, homeFor, isProtected } from "@/lib/roles";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const user = req.auth?.user;

  // Signed-in users have no business on the login screen.
  if (path === "/login" && user) {
    return NextResponse.redirect(new URL(homeFor(user.role), nextUrl));
  }

  if (!isProtected(path)) return NextResponse.next();

  if (!user) {
    const login = new URL("/login", nextUrl);
    login.searchParams.set("next", path + nextUrl.search);
    return NextResponse.redirect(login);
  }

  // Authenticated but wrong role: send them to their own dashboard rather
  // than a dead end, and say why once they land.
  if (!canAccess(path, user.role)) {
    const fallback = new URL(homeFor(user.role), nextUrl);
    fallback.searchParams.set("denied", path);
    return NextResponse.redirect(fallback);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
