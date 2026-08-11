'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, FolderKanban, Calendar, Bell } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useApp } from '@/src/providers/app-provider';

const items = [
  { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Tasks', href: '/tasks', icon: CheckSquare },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Calendar', href: '/calendar', icon: Calendar },
  { label: 'Alerts', href: '/notifications', icon: Bell },
];

export function MobileNav() {
  const pathname = usePathname();
  const { notifications } = useApp();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors',
              active ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label === 'Alerts' && unread > 0 && (
              <span className="absolute right-3 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
