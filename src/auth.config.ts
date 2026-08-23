import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe slice of the auth config. Contains no Node-only dependencies
 * (no bcrypt, no database driver) so it can run inside middleware.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.title = user.title ?? null;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.title = token.title ?? null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
