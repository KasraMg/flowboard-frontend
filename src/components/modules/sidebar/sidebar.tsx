"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  TooltipProvider,
} from "@/src/components/ui/tooltip";
import type { LucideIcon } from "lucide-react";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { userSidebar } from "@/src/hooks/useUser";
import { Badge } from "../../ui/badge";
import SidebarFavorites from "./partials/sidebar-favorites";
import SidebarProjects from "./partials/sidebar-projects";
import SidebarLink from "./partials/sidebar-link";

type NavItem = { label: string; href: string; icon: LucideIcon };

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Projects", href: "/projects", icon: FolderKanban },
];

const bottomNav: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({
  collapsed,
  onToggleCollapse,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { data } = userSidebar();

  return (
    <TooltipProvider delayDuration={collapsed ? 200 : 999999}>
      <aside
        className={cn(
          "flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200",
          collapsed ? "w-17" : "w-64",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-tight">
                  FlowBoard
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  Free Plan
                </p>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 scrollbar-thin">
          <div className="space-y-1">
            {mainNav.map((item) => (
              <div className="relative">
                {item.label == "Notifications" ? (
                  <Badge
                    variant={"destructive"}
                    className={`${collapsed ? "text-[11px] pl-1.25 pr-1.5 py-0 -right-2" : "text-xs pl-1.75 pr-2 right-1.5"} top-1.75 absolute`}
                  >
                    {data?.data.notificationCount}
                  </Badge>
                ) : (
                  ""
                )}
                <SidebarLink
                  key={item.href}
                  item={item}
                  active={
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                  }
                  collapsed={collapsed}
                />
              </div>
            ))}
          </div>

          {!collapsed && <SidebarFavorites favorites={data?.data?.favorites} />}
          {!collapsed && data?.data?.projects.length > 0 && (
            <SidebarProjects projects={data?.data?.projects} />
          )}

          <div className="mt-6 space-y-1">
            {bottomNav.map((item) => (
              <SidebarLink
                key={item.href}
                item={item}
                active={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                }
                collapsed={collapsed}
                badge={item.href === "/notifications" && 1 > 0 ? 1 : undefined}
              />
            ))}
            <div
              onClick={() => {
                Cookies.remove("token");
                queryClient.removeQueries({
                  queryKey: ["user"],
                });
                redirect("/");
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all cursor-pointer text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <LogOut className="h-[1.1rem] w-[1.1rem] shrink-0" />
              {!collapsed && <span className="flex-1">Logout</span>}
            </div>
          </div>
        </nav>

        <div className="border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="w-full justify-start gap-2 text-muted-foreground"
          >
            {collapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
            {!collapsed && <span className="text-xs">Collapse</span>}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
