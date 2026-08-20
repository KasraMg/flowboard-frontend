import type { Task } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";

export function TaskContent({ task }: { task: Task }) {
  return (
    <>
      <p
        className={cn(
          "text-sm font-medium leading-snug",
          task.completed && "text-muted-foreground line-through",
        )}
      >
        {task.title}
      </p>

      {task.description && (
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {task.description}
        </p>
      )}
    </>
  );
}