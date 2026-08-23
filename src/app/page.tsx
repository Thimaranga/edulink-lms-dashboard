import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { homeFor } from "@/lib/roles";

export default async function RootPage() {
  const session = await auth();
  redirect(session?.user ? homeFor(session.user.role) : "/login");
}
