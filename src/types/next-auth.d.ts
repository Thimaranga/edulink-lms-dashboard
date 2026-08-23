import type { Role } from "@/lib/roles";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      title?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    title?: string | null;
  }
}

/**
 * `next-auth/jwt` only re-exports (`export * from "@auth/core/jwt"`), so
 * augmenting it would declare a fresh interface rather than merge into the
 * real one. The declaration lives in @auth/core/jwt — augment that.
 */
declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
    title?: string | null;
  }
}

export {};
