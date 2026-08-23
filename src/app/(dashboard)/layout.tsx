import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

/**
 * DashboardLayout — the shell every signed-in route renders inside.
 * Middleware has already gated access; this second check is what keeps the
 * user object non-null for the tree below, and covers the case where a
 * session expires between the middleware hop and the render.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = {
    name: session.user.name ?? "Unnamed user",
    email: session.user.email ?? "",
    role: session.user.role,
    title: session.user.title,
    image: session.user.image,
  };

  return (
    <div className="min-h-dvh bg-canvas">
      <Sidebar role={user.role} />
      <div className="lg:pl-[264px]">
        <Header user={user} />
        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
