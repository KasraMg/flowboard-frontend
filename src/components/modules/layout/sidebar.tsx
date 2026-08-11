'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, CheckSquare, FolderKanban, Calendar, Bell, Users, Settings,
  Star, ChevronsLeft, ChevronsRight, Plus, Search, Sparkles,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useApp } from '@/src/providers/app-provider';
import { AvatarGroup } from '@/src/components/modules/user-avatar';
import { Button } from '@/src/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import type { LucideIcon } from 'lucide-react';

type NavItem = { label: string; href: string; icon: LucideIcon };

const mainNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Tasks', href: '/tasks', icon: CheckSquare },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Calendar', href: '/calendar', icon: Calendar },
];

const bottomNav: NavItem[] = [
  { label: 'Notifications', href: '/notifications', icon: Bell },
  { label: 'Members', href: '/members', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ collapsed, onToggleCollapse }: { collapsed: boolean; onToggleCollapse: () => void }) {
  const pathname = usePathname();
  const { projects, notifications, currentUser, workspaces, activeWorkspaceId, setActiveWorkspace } = useApp();
  const favProjects = projects.filter((p) => p.favorite && !p.archived).slice(0, 5);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const activeWs = workspaces.find((w) => w.id === activeWorkspaceId);

  return (
    <TooltipProvider delayDuration={collapsed ? 200 : 999999}>
      <aside
        className={cn(
          'flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200',
          collapsed ? 'w-[68px]' : 'w-64'
        )}
      >
        {/* Logo / Workspace switcher */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-tight">{activeWs?.name || 'FlowBoard'}</p>
                <p className="truncate text-xs text-muted-foreground">Free Plan</p>
              </div>
            )}
          </Link>
        </div>

        {/* Workspace switcher */}
        {!collapsed && (
          <div className="px-3 pt-3">
            <WorkspaceSwitcher />
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 scrollbar-thin">
          <div className="space-y-1">
            {mainNav.map((item) => (
              <SidebarLink key={item.href} item={item} active={pathname === item.href || pathname.startsWith(item.href + '/')} collapsed={collapsed} />
            ))}
          </div>

          {/* Favorite projects */}
          {!collapsed && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between px-2">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Favorites</span>
                <Star className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="space-y-0.5">
                {favProjects.length === 0 ? (
                  <p className="px-2 text-xs text-muted-foreground">No favorites yet</p>
                ) : (
                  favProjects.map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.id}`}
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent',
                        pathname.startsWith(`/projects/${p.id}`) && 'bg-sidebar-accent text-sidebar-accent-foreground'
                      )}
                    >
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: p.backgroundColor }} />
                      <span className="truncate">{p.name}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Recent projects */}
          {!collapsed && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between px-2">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Recent</span>
                <Link href="/projects">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-0.5">
                {projects.filter((p) => !p.archived).slice(0, 4).map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent',
                      pathname.startsWith(`/projects/${p.id}`) && 'bg-sidebar-accent text-sidebar-accent-foreground'
                    )}
                  >
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: p.backgroundColor }} />
                    <span className="truncate">{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-1">
            {bottomNav.map((item) => (
              <SidebarLink
                key={item.href}
                item={item}
                active={pathname === item.href || pathname.startsWith(item.href + '/')}
                collapsed={collapsed}
                badge={item.href === '/notifications' && unreadCount > 0 ? unreadCount : undefined}
              />
            ))}
          </div>
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-sidebar-border p-2">
          <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="w-full justify-start gap-2 text-muted-foreground">
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            {!collapsed && <span className="text-xs">Collapse</span>}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}

function SidebarLink({ item, active, collapsed, badge }: { item: NavItem; active: boolean; collapsed: boolean; badge?: number }) {
  const content = (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      )}
    >
      <item.icon className="h-[1.1rem] w-[1.1rem] shrink-0" />
      {!collapsed && <span className="flex-1">{item.label}</span>}
      {!collapsed && badge !== undefined && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
          {badge}
        </span>
      )}
      {collapsed && badge !== undefined && (
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">{content}</div>
        </TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }
  return content;
}

function WorkspaceSwitcher() {
  const { workspaces, activeWorkspaceId, setActiveWorkspace } = useApp();
  const active = workspaces.find((w) => w.id === activeWorkspaceId);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-2.5 py-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary to-blue-600 text-xs font-bold text-white">
        {active?.name?.[0] || 'A'}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-tight">{active?.name}</p>
        <p className="truncate text-xs text-muted-foreground">Workspace</p>
      </div>
      <select
        value={activeWorkspaceId}
        onChange={(e) => setActiveWorkspace(e.target.value)}
        className="h-7 cursor-pointer rounded-md border border-sidebar-border bg-transparent px-1 text-xs text-muted-foreground outline-none"
      >
        {workspaces.map((w) => (
          <option key={w.id} value={w.id}>{w.name}</option>
        ))}
      </select>
    </div>
  );
}
