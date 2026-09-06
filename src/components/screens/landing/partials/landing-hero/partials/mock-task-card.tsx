import { priorityMeta } from "@/src/lib/helpers";
import { User } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";
import { MockAvatar } from "./mock-avatar";

export function MockTaskCard({
  task,
  users,
  labels,
}: {
  task: any;
  users: User[];
  labels: any;
}) {
  const assignee = users.find((u) => u.id === task.assigneeId);
  const taskLabels = labels.filter((l: any) => task.labelIds.includes(l.id));

  const pm = priorityMeta(task.priority);
  if (!pm) {
    return null;
  }

  return (
    <div className="cursor-default rounded-lg border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      {task.backgroundColor && (
        <div
          className="mb-2 -mx-3 -mt-3 h-1 rounded-t-lg"
          style={{ backgroundColor: task.backgroundColor }}
        />
      )}

      {taskLabels.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {taskLabels.map((l: any) => (
            <span
              key={l.id}
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: `${l.color}20`, color: l.color }}
            >
              {l.name}
            </span>
          ))}
        </div>
      )}

      <p
        className={cn(
          "text-sm font-medium leading-snug",
          task.completed && "text-muted-foreground line-through",
        )}
      >
        {task.title}
      </p>

      <div className="mt-2.5 flex items-center gap-2">
        <div className="flex gap-2 items-center">
          <span
            className={cn(
              "inline-flex h-5 items-center gap-1 rounded-full px-1.5 text-[10px] font-medium",
              pm.bg,
              pm.color,
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", pm.dot)} />{" "}
            {pm.label}
          </span>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 19h18" />
                <path d="M15 12H3" />
                <path d="M9 5H3" />
              </svg>
            </p>
          )}
        </div>

        <div className="flex-1" />

        {assignee && <MockAvatar user={assignee} size="xs" />}
      </div>
    </div>
  );
}
