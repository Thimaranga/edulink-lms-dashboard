import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileNav } from "./mobile-nav";
import { UserMenu } from "./user-menu";
import type { Role } from "@/lib/roles";

export function Header({
  user,
}: {
  user: { name: string; email: string; role: Role; title?: string | null; image?: string | null };
}) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/85 px-4 backdrop-blur-md sm:px-6">
      <MobileNav role={user.role} />

      {/* Search collapses to an icon button under sm so the header never
          crowds the account control on a 360px viewport. */}
      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses, learners, submissions"
          className="h-10 border-transparent bg-muted pl-9"
          aria-label="Search"
        />
      </div>
      <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Search">
        <Search className="size-5" />
      </Button>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications, 3 unread">
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>
        <div className="mx-1 hidden h-6 w-px bg-border sm:block" />
        <UserMenu {...user} />
      </div>
    </header>
  );
}
