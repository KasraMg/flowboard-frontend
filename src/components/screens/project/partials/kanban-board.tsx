'use client';

import * as React from 'react';
import {
  Plus, MoreHorizontal, Trash2, Edit2, GripVertical, Copy,
  Calendar, MessageSquare, Paperclip, ListChecks,
} from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Badge } from '@/src/components/ui/badge';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger,
} from '@/src/components/ui/context-menu';
import { cn } from '@/src/lib/utils';
import { priorityMeta, formatDate, isOverdue, dueSoon, checklistProgress } from '@/src/lib/helpers';
import type { Task, Column } from '@/src/lib/types';
import { toast } from 'sonner';
import { UserAvatar } from '@/src/components/modules/user-avatar';

export function KanbanBoard({ projectId, onOpenTask, onEditTask, onCreateTask }: {
  projectId: string;
  onOpenTask: (t: Task) => void;
  onEditTask: (t: Task) => void;
  onCreateTask: (columnId?: string) => void;
}) {
  const { columns, tasks, createColumn, renameColumn, deleteColumn, moveTask, reorderTasks, createTask, deleteTask } = useApp();
  const projectColumns = columns.filter((c) => c.projectId === projectId).sort((a, b) => a.position - b.position);
  const [draggedTask, setDraggedTask] = React.useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = React.useState<string | null>(null);
  const [addingColumn, setAddingColumn] = React.useState(false);
  const [newColumnName, setNewColumnName] = React.useState('');
  const [editingCol, setEditingCol] = React.useState<string | null>(null);
  const [colNameDraft, setColNameDraft] = React.useState('');

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (draggedTask) {
      const colTasks = tasks.filter((t) => t.columnId === columnId && t.projectId === projectId).sort((a, b) => a.position - b.position);
      moveTask(draggedTask, columnId, colTasks.length);
      toast.success('Task moved');
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const addColumn = () => {
    if (newColumnName.trim()) {
      createColumn(projectId, newColumnName.trim());
      setNewColumnName('');
      setAddingColumn(false);
      toast.success('Column added');
    }
  };

  const saveColumnRename = (colId: string) => {
    if (colNameDraft.trim()) renameColumn(colId, colNameDraft.trim());
    setEditingCol(null);
  };

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4 pr-4 scrollbar-thin">
      {projectColumns.map((column) => {
        const colTasks = tasks.filter((t) => t.columnId === column.id && t.projectId === projectId).sort((a, b) => a.position - b.position);
        return (
          <div
            key={column.id}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={(e) => handleDrop(e, column.id)}
            onDragLeave={() => setDragOverColumn(null)}
            className={cn(
              'flex h-fit max-h-full w-72 shrink-0 flex-col rounded-xl border bg-muted/40 transition-colors',
              dragOverColumn === column.id && 'border-primary/50 bg-primary/5'
            )}
          >
            {/* Column header */}
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: column.color || '#94a3b8' }} />
              {editingCol === column.id ? (
                <Input value={colNameDraft} onChange={(e) => setColNameDraft(e.target.value)} onBlur={() => saveColumnRename(column.id)} onKeyDown={(e) => { if (e.key === 'Enter') saveColumnRename(column.id); if (e.key === 'Escape') setEditingCol(null); }} autoFocus className="h-7 text-sm font-semibold" />
              ) : (
                <button onClick={() => { setEditingCol(column.id); setColNameDraft(column.name); }} className="flex-1 text-left text-sm font-semibold hover:text-primary">
                  {column.name}
                </button>
              )}
              <span className="text-xs text-muted-foreground">{colTasks.length}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { setEditingCol(column.id); setColNameDraft(column.name); }}><Edit2 className="mr-2 h-3.5 w-3.5" /> Rename</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onCreateTask(column.id)}><Plus className="mr-2 h-3.5 w-3.5" /> Add task</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={() => { deleteColumn(column.id); toast.success('Column deleted'); }}><Trash2 className="mr-2 h-3.5 w-3.5" /> Delete column</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Task list */}
            <div className="flex-1 space-y-2 overflow-y-auto px-2 pb-2 scrollbar-thin min-h-[60px]">
              {colTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                  isDragging={draggedTask === task.id}
                  onOpen={() => onOpenTask(task)}
                  onEdit={() => onEditTask(task)}
                  onDuplicate={() => {
                    const { title, description, priority, labelIds, columnId, projectId: pid, assigneeId, dueDate } = task;
                    createTask({ title: `${title} (copy)`, description, priority, labelIds, columnId, projectId: pid, assigneeId, dueDate });
                    toast.success('Task duplicated');
                  }}
                  onDelete={() => { deleteTask(task.id); toast.success('Task deleted'); }}
                  onMove={(colId) => { moveTask(task.id, colId); toast.success('Task moved'); }}
                  columns={projectColumns}
                />
              ))}
              {colTasks.length === 0 && (
                <div className="flex items-center justify-center py-6 text-xs text-muted-foreground">
                  No tasks
                </div>
              )}
            </div>

            {/* Add task button */}
            <button onClick={() => onCreateTask(column.id)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
              <Plus className="h-3.5 w-3.5" /> Add task
            </button>
          </div>
        );
      })}

      {/* Add column */}
      <div className="w-72 shrink-0">
        {addingColumn ? (
          <div className="rounded-xl border bg-muted/40 p-3">
            <Input value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') addColumn(); if (e.key === 'Escape') setAddingColumn(false); }} placeholder="Column name" autoFocus className="text-sm" />
            <div className="mt-2 flex gap-2">
              <Button size="sm" onClick={addColumn}>Add</Button>
              <Button size="sm" variant="ghost" onClick={() => setAddingColumn(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAddingColumn(true)} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
            <Plus className="h-4 w-4" /> Add column
          </button>
        )}
      </div>
    </div>
  );
}

function TaskCard({ task, onDragStart, onDragEnd, isDragging, onOpen, onEdit, onDuplicate, onDelete, onMove, columns }: {
  task: Task;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  onOpen: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMove: (colId: string) => void;
  columns: Column[];
}) {
  const { users, labels } = useApp();
  const assignee = users.find((u) => u.id === task.assigneeId);
  const taskLabels = labels.filter((l) => task.labelIds.includes(l.id));
  const pm = priorityMeta(task.priority);
  const overdue = isOverdue(task.dueDate) && !task.completed;
  const soon = dueSoon(task.dueDate) && !task.completed;
  const cProgress = checklistProgress(task.checklist);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onClick={onOpen}
          className={cn(
            'group cursor-pointer rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing',
            isDragging && 'opacity-40',
            task.completed && 'opacity-70'
          )}
        >
          {/* Cover */}
          {task.coverImage && (
            <div className="mb-2 -mx-3 -mt-3 h-20 overflow-hidden rounded-t-lg">
              <img src={task.coverImage} alt="" className="h-full w-full object-cover" />
            </div>
          )}
          {task.backgroundColor && !task.coverImage && (
            <div className="mb-2 -mx-3 -mt-3 h-1 rounded-t-lg" style={{ backgroundColor: task.backgroundColor }} />
          )}

          {/* Labels */}
          {taskLabels.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {taskLabels.map((l) => (
                <span key={l.id} className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${l.color}20`, color: l.color }}>
                  {l.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <p className={cn('text-sm font-medium leading-snug', task.completed && 'text-muted-foreground line-through')}>{task.title}</p>

          {/* Description preview */}
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{task.description}</p>
          )}

          {/* Footer */}
          <div className="mt-2.5 flex items-center gap-2">
            <Badge variant="secondary" className={cn('h-5 gap-1 px-1.5 text-[10px]', pm.bg, pm.color)}>
              <span className={cn('h-1.5 w-1.5 rounded-full', pm.dot)} /> {pm.label}
            </Badge>

            {task.dueDate && (
              <span className={cn('flex items-center gap-0.5 text-[10px]', overdue && 'text-destructive font-medium', soon && 'text-warning font-medium', !overdue && !soon && 'text-muted-foreground')}>
                <Calendar className="h-3 w-3" /> {formatDate(task.dueDate)}
              </span>
            )}

            <div className="flex-1" />

            {task.checklist.length > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                <ListChecks className="h-3 w-3" /> {cProgress}%
              </span>
            )}
            {task.comments.length > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                <MessageSquare className="h-3 w-3" /> {task.comments.length}
              </span>
            )}
            {task.attachments.length > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                <Paperclip className="h-3 w-3" /> {task.attachments.length}
              </span>
            )}
            {assignee && <UserAvatar user={assignee} size="xs" />}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={onOpen}>Open</ContextMenuItem>
        <ContextMenuItem onClick={onEdit}><Edit2 className="mr-2 h-3.5 w-3.5" /> Edit</ContextMenuItem>
        <ContextMenuItem onClick={onDuplicate}><Copy className="mr-2 h-3.5 w-3.5" /> Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive" onClick={onDelete}><Trash2 className="mr-2 h-3.5 w-3.5" /> Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
