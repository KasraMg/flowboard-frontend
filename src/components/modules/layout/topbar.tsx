'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, Plus, Menu, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import { UserAvatar } from '@/src/components/modules/user-avatar';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { Badge } from '@/src/components/ui/badge';
import { ThemeToggle } from '../theme-toggle';

export function Topbar({ onOpenSearch, onOpenMobileSidebar }: { onOpenSearch: () => void; onOpenMobileSidebar: () => void }) {
  const { currentUser, notifications, logout } = useApp();
  const router = useRouter();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpenMobileSidebar}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search trigger */}
      <button
        onClick={onOpenSearch}
        className="group flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-input bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
      >
        <Search className="h-4 w-4" />
        <span className="hidden flex-1 text-left sm:block">Search projects, tasks, people...</span>
        <span className="flex-1 text-left sm:hidden">Search...</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium sm:flex">
          ⌘K
        </kbd>
      </button>

      <div className="flex-1" />

      <Button variant="default" size="sm" className="hidden gap-1.5 sm:flex" onClick={() => router.push('/projects')}>
        <Plus className="h-4 w-4" /> New Project
      </Button>

      <ThemeToggle />

      <Button variant="ghost" size="icon" className="relative h-9 w-9" onClick={() => router.push('/notifications')}>
        <Bell className="h-[1.1rem] w-[1.1rem]" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
            {unread}
          </span>
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-accent">
            <UserAvatar user={currentUser} size="md" />
            <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{currentUser.name}</span>
              <span className="truncate text-xs font-normal text-muted-foreground">{currentUser.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <User className="mr-2 h-4 w-4" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { logout(); router.push('/login'); }} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
