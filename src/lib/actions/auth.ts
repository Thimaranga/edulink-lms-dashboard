"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut, credentialsSchema } from "@/auth";
import { findAccountByEmail } from "@/lib/users";
import { homeFor } from "@/lib/roles";

export type LoginState = {
  error?: string;
  fieldErrors?: { email?: string; password?: string };
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = credentialsSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    const f = parsed.error.flatten().fieldErrors;
    return {
      fieldErrors: { email: f.email?.[0], password: f.password?.[0] },
    };
  }

  let destination = "/dashboard";

  try {
    await signIn("credentials", { ...parsed.data, redirect: false });
    const account = await findAccountByEmail(parsed.data.email);
    destination = homeFor(account?.role);
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "That email and password don't match an account." };
    }
    throw err;
  }

  const next = String(formData.get("next") ?? "");
  redirect(next.startsWith("/") ? next : destination);
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
