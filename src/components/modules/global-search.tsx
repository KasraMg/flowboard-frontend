'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, FolderKanban, CheckSquare, Users } from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { cn } from '@/src/lib/utils';
import { priorityMeta } from '@/src/lib/helpers';
import type { LucideIcon } from 'lucide-react';

type Result = { id: string; title: string; subtitle?: string; href: string; icon: LucideIcon; badge?: string; badgeColor?: string };

export function GlobalSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { projects, tasks, users } = useApp();
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  const q = query.trim().toLowerCase();

  const projectResults: Result[] = q
    ? projects.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)).slice(0, 5).map((p) => ({
        id: p.id, title: p.name, subtitle: p.description, href: `/projects/${p.id}`, icon: FolderKanban,
      }))
    : [];

  const taskResults: Result[] = q
    ? tasks.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 5).map((t) => {
        const pm = priorityMeta(t.priority);
        return {
          id: t.id, title: t.title, subtitle: projects.find((p) => p.id === t.projectId)?.name, href: `/projects/${t.projectId}`, icon: CheckSquare,
          badge: pm.label, badgeColor: pm.dot,
        };
      })
    : [];

  const userResults: Result[] = q
    ? users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)).slice(0, 5).map((u) => ({
        id: u.id, title: u.name, subtitle: u.email, href: '/members', icon: Users,
      }))
    : [];

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const hasResults = projectResults.length + taskResults.length + userResults.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tasks, people..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin">
          {!q && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              <Search className="mx-auto mb-2 h-8 w-8 opacity-30" />
              Start typing to search across your workspace
            </div>
          )}
          {q && !hasResults && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}
          {hasResults && (
            <div className="space-y-4">
              {projectResults.length > 0 && (
                <ResultGroup label="Projects" items={projectResults} onSelect={go} />
              )}
              {taskResults.length > 0 && (
                <ResultGroup label="Tasks" items={taskResults} onSelect={go} />
              )}
              {userResults.length > 0 && (
                <ResultGroup label="People" items={userResults} onSelect={go} />
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ResultGroup({ label, items, onSelect }: { label: string; items: Result[]; onSelect: (href: string) => void }) {
  return (
    <div>
      <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="space-y-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.href)}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-accent"
          >
            <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.title}</p>
              {item.subtitle && <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>}
            </div>
            {item.badge && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={cn('h-2 w-2 rounded-full', item.badgeColor)} />
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
