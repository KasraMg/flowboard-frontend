"use client";

import { Search, FolderKanban } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { cn } from "@/src/lib/utils";
import type { LucideIcon } from "lucide-react";
import { useProjects } from "@/src/hooks/useProject";
import { useEffect, useState } from "react";
import Link from "next/link";

type Result = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
};

export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!open) return null;

  const [query, setQuery] = useState("");
  const { data } = useProjects();

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const q = query.trim().toLowerCase();

  const projectResults: Result[] = q
    ? (data as any)
        .filter(
          (p: any) =>
            p.project.title.toLowerCase().includes(q) ||
            p.project.description.toLowerCase().includes(q),
        )
        .slice(0, 5)
        .map((p: any) => ({
          id: p.project.id,
          title: p.project.title,
          subtitle: p.project.description,
          href: `/projects/${p.id}`,
          icon: FolderKanban,
        }))
    : [];

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
            placeholder="Search projects..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="max-h-100 overflow-y-auto p-2 scrollbar-thin">
          {!q && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              <Search className="mx-auto mb-2 h-8 w-8 opacity-30" />
              Start typing to search across your workspace
            </div>
          )}
          {q && projectResults.length == 0 && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}
          {projectResults.length > 0 ? (
            <div className="space-y-4">
              {projectResults.length > 0 ? (
                <div className="space-y-0.5">
                  {projectResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/projects/${item.id}`}
                      onClick={() => onOpenChange(false)}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-accent"
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.title}
                        </p>
                        {item.subtitle && (
                          <p className="truncate text-xs text-muted-foreground">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                      {item.badge && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full",
                              item.badgeColor,
                            )}
                          />
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
