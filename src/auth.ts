import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "@/auth.config";
import { findAccountByEmail, verifyPassword } from "@/lib/users";

export const credentialsSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const account = await findAccountByEmail(email);
        if (!account) return null;

        const ok = await verifyPassword(password, account.passwordHash);
        if (!ok) return null;

        return {
          id: account.id,
          name: account.name,
          email: account.email,
          image: account.image ?? null,
          role: account.role,
          title: account.title,
        };
      },
    }),
  ],
});
