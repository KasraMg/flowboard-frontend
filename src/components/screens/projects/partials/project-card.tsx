"use client";

import Link from "next/link";
import { Star, MoreHorizontal, Settings } from "lucide-react";
import { cn, getBackground } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Project } from "@/src/lib/types";

export function ProjectCard({
  data,
  isDashboard,
}: {
  isDashboard?: boolean;
  data: {
    project: Project;
    isFave: boolean;
    taskStats: {
      completed: number;
      completionPercentage: number;
      total: number;
    };
  };
}) {
  return data ? (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
      <Link
        href={`/projects/${data.project.id}`}
        className="relative block h-20 overflow-hidden"
        style={{ background: getBackground(data.project.background) }}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/10" />
      </Link>

      {data.project.status == "archived" ? (
        <div className="absolute left-2 top-2 text-xs text-red-500 bg-gray-800 p-2 rounded-xl">
          <p>Archived</p>
        </div>
      ) : (
        ""
      )}

      <button
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-background/80 backdrop-blur transition-all hover:bg-background"
        aria-label="Toggle favorite"
      >
        {isDashboard ? (
          <Star
            className={cn(
              "h-4 w-4",

              data.isFave
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground",
            )}
          />
        ) : (
          <Star
            className={cn(
              "h-4 w-4",
              data.project.isFave
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground",
            )}
          />
        )}
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/projects/${data.project.id}`}
            className="min-w-0 flex-1"
          >
            <h3 className="truncate font-semibold leading-tight transition-colors group-hover:text-primary">
              {data.project.title}
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
              <DropdownMenuItem className="p-0!">
                <Link
                  className="flex gap-1 p-2 w-full items-center"
                  href={`/projects/${data.project.id}?t=setting`}
                >
                  {" "}
                  <Settings className="mr-2 h-4 w-4" /> Setting
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link href={`/projects/${data.project.id}`}>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {data.project.description}
          </p>
        </Link>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {data.taskStats.completionPercentage}% complete
            </span>
            <span className="text-muted-foreground">
              {data.taskStats.total} tasks
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${data.taskStats.completionPercentage}%`,
                background: getBackground(data.project.background),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
