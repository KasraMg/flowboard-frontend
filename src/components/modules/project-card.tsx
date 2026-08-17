"use client";

import Link from "next/link";
import { Star, MoreHorizontal, Archive, Trash2, Edit } from "lucide-react";
import { cn, getBackground } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { toast } from "sonner";

export function ProjectCard({
  project,
  onEdit,
}: {
  project: any;
  onEdit?: (p: any) => void;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
      <Link
        href={`/projects/${project.id}`}
        className="relative block h-20 overflow-hidden"
        style={{ background: getBackground(project.background) }}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
      </Link>

      <button
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-background/80 backdrop-blur transition-all hover:bg-background"
        aria-label="Toggle favorite"
      >
        <Star
          className={cn(
            "h-4 w-4",
            project.favorite
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground",
          )}
        />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/projects/${project.id}`} className="min-w-0 flex-1">
            <h3 className="truncate font-semibold leading-tight transition-colors group-hover:text-primary">
              {project.title}
            </h3>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(project)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" /> Favorite
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" /> Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  toast.success("Project deleted");
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link href={`/projects/${project.id}`}>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        </Link>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{30}% complete</span>
            <span className="text-muted-foreground">1 tasks</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${30}%`,
                backgroundColor: project.backgroundColor,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
