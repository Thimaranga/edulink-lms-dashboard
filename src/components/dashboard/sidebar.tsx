import { Brand } from "./brand";
import { SidebarNav } from "./sidebar-nav";
import { SidebarFooter } from "./sidebar-footer";
import type { Role } from "@/lib/roles";

/** Desktop rail. Fixed at 264px — the template's 252px felt cramped once
 *  section headings were introduced. */
export function Sidebar({ role }: { role: Role }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 shrink-0 items-center px-5">
        <Brand />
      </div>
      <div className="scrollbar-slim flex flex-1 flex-col overflow-y-auto pt-2">
        <SidebarNav role={role} />
        <SidebarFooter role={role} />
      </div>
    </aside>
  );
}
