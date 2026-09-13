"use client";

import { cn, getBackground } from "@/src/lib/utils";
import { priorityMeta } from "@/src/lib/helpers";
import { Task } from "@/src/lib/types";
import { UserAvatar } from "../../../modules/user-avatar";
import Link from "next/link";

export function TaskRow({ task }: { task: Task }) {
  const pm = priorityMeta(task.priority);

  return (
    <Link
      href={`/projects/${task.project.id}`}
      className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 transition-all hover:border-primary/30 hover:shadow-sm"
    >
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium pb-2",
            task.completed && "text-muted-foreground line-through",
          )}
        >
          {task.title}
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: getBackground(task.backgroundColor) }}
            />
            {task.project.title}
          </span>
        </div>
      </div>

      <div>
        {task?.assignees?.map((assigneee) => (
          <UserAvatar
            className="ring-transparent mx-auto"
            key={assigneee.id}
            user={assigneee}
            size="xs"
          />
        ))}

        <span
          className={cn(
            "inline-flex h-5 mt-2 items-center gap-1 rounded-full px-1.5 text-[10px] font-medium",
            pm.bg,
            pm.color,
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", pm.dot)} /> {pm.label}
        </span>
      </div>
    </Link>
  );
}
