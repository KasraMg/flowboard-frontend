import {
  Calendar,
  ListChecks,
  MessageSquare,
  Paperclip,
} from "lucide-react";

import type { Task } from "@/src/lib/types";

import { Badge } from "@/src/components/ui/badge";
import { UserAvatar } from "@/src/components/modules/user-avatar";

import {
  checklistProgress,
  dueSoon,
  formatDate,
  isOverdue,
  priorityMeta,
} from "@/src/lib/helpers";

import { cn } from "@/src/lib/utils";
import { TaskCounter } from "./task-counter";

type Props = {
  task: Task;
  assignee?: any;
};

export function TaskMeta({ task, assignee }: Props) {
  const priority = priorityMeta(task.priority);

  const overdue = isOverdue(task.dueDate) && !task.completed;
  const soon = dueSoon(task.dueDate) && !task.completed;

  const progress = checklistProgress(task.checklist);

  return (
    <div className="mt-2.5 flex items-center gap-2">
      <Badge
        variant="secondary"
        className={cn(
          "h-5 gap-1 px-1.5 text-[10px]",
          priority.bg,
          priority.color,
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            priority.dot,
          )}
        />

        {priority.label}
      </Badge>

      {task.dueDate && (
        <span
          className={cn(
            "flex items-center gap-0.5 text-[10px]",
            overdue && "font-medium text-destructive",
            soon && "font-medium text-warning",
            !overdue &&
              !soon &&
              "text-muted-foreground",
          )}
        >
          <Calendar className="h-3 w-3" />
          {formatDate(task.dueDate)}
        </span>
      )}

      <div className="flex-1" />

      <TaskCounter
        icon={ListChecks}
        value={
          task.checklist.length
            ? `${progress}%`
            : undefined
        }
      />

      <TaskCounter
        icon={MessageSquare}
        value={
          task.comments.length
            ? task.comments.length
            : undefined
        }
      />

      <TaskCounter
        icon={Paperclip}
        value={
          task.attachments.length
            ? task.attachments.length
            : undefined
        }
      />

      {assignee && (
        <UserAvatar user={assignee} size="xs" />
      )}
    </div>
  );
}