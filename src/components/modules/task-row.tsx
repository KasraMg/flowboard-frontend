'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2, Circle, Clock, MessageSquare, Paperclip, ListChecks } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useApp } from '@/src/providers/app-provider';
import { Badge } from '@/src/components/ui/badge';
import { priorityMeta, statusMeta, formatDate, isOverdue, dueSoon, checklistProgress } from '@/src/lib/helpers';
import type { Task } from '@/src/lib/types';
import { UserAvatar } from './user-avatar';

export function TaskRow({ task, showProject = false, onOpen }: { task: Task; showProject?: boolean; onOpen?: (t: Task) => void }) {
  const { users, projects, updateTask } = useApp();
  const router = useRouter();
  const assignee = users.find((u) => u.id === task.assigneeId);
  const project = projects.find((p) => p.id === task.projectId);
  const pm = priorityMeta(task.priority);
  const sm = statusMeta(task.status);
  const overdue = isOverdue(task.dueDate) && !task.completed;
  const soon = dueSoon(task.dueDate) && !task.completed;
  const cProgress = checklistProgress(task.checklist);

  const open = () => (onOpen ? onOpen(task) : router.push(`/projects/${task.projectId}`));

  return (
    <div
      onClick={open}
      className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 transition-all hover:border-primary/30 hover:shadow-sm"
    >
      <button
        onClick={(e) => { e.stopPropagation(); updateTask(task.id, { completed: !task.completed }); }}
        className="shrink-0"
      >
        {task.completed ? (
          <CheckCircle2 className="h-5 w-5 text-success" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className={cn('truncate text-sm font-medium', task.completed && 'text-muted-foreground line-through')}>{task.title}</p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          {showProject && project && (
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: project.backgroundColor }} />
              {project.name}
            </span>
          )}
          {task.dueDate && (
            <span className={cn('flex items-center gap-1', overdue && 'text-destructive font-medium', soon && 'text-warning font-medium')}>
              <Clock className="h-3 w-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
          {task.comments.length > 0 && (
            <span className="flex items-center gap-0.5">
              <MessageSquare className="h-3 w-3" /> {task.comments.length}
            </span>
          )}
          {task.attachments.length > 0 && (
            <span className="flex items-center gap-0.5">
              <Paperclip className="h-3 w-3" /> {task.attachments.length}
            </span>
          )}
          {task.checklist.length > 0 && (
            <span className="flex items-center gap-0.5">
              <ListChecks className="h-3 w-3" /> {cProgress}%
            </span>
          )}
        </div>
      </div>

      <Badge variant="secondary" className={cn('hidden shrink-0 sm:flex', pm.bg, pm.color)}>
        <span className={cn('mr-1 h-1.5 w-1.5 rounded-full', pm.dot)} />
        {pm.label}
      </Badge>
      <Badge variant="secondary" className={cn('hidden shrink-0 md:flex', sm.bg, sm.color)}>
        {sm.label}
      </Badge>
      {assignee && <UserAvatar user={assignee} size="sm" className="shrink-0" />}
    </div>
  );
}
