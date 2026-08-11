'use client';

import * as React from 'react';
import {
  X, Calendar, Paperclip, MessageSquare, ListChecks, Activity as ActivityIcon,
  Trash2, Check, Plus, Send, FileText, Image, FileCode, File,
} from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import { UserAvatar } from '@/src/components/modules/user-avatar';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Separator } from '@/src/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/src/components/ui/select';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/src/components/ui/sheet';
import { cn } from '@/src/lib/utils';
import { PRIORITY_META, STATUS_META } from '@/src/lib/types';
import type { Task, Priority, TaskStatus } from '@/src/lib/types';
import { formatDate, formatDateTime, relativeTime, isOverdue, dueSoon, checklistProgress } from '@/src/lib/helpers';
import { toast } from 'sonner';

const fileIcon = (type: string) => {
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(type)) return Image;
  if (['fig', 'figma', 'sketch', 'xd'].includes(type)) return FileCode;
  if (['pdf', 'doc', 'docx'].includes(type)) return FileText;
  return File;
};

export function TaskDetailsDrawer({ task, open, onOpenChange, onEdit }: { task: Task | null; open: boolean; onOpenChange: (v: boolean) => void; onEdit?: (t: Task) => void }) {
  const { users, projects, labels, updateTask, deleteTask, addComment, toggleChecklistItem, addChecklistItem, deleteChecklistItem, currentUser } = useApp();
  const [comment, setComment] = React.useState('');
  const [newChecklist, setNewChecklist] = React.useState('');
  const [editingTitle, setEditingTitle] = React.useState(false);
  const [titleDraft, setTitleDraft] = React.useState('');

  React.useEffect(() => {
    setComment('');
    setNewChecklist('');
    setEditingTitle(false);
  }, [task?.id]);

  if (!task) return null;
  const assignee = users.find((u) => u.id === task.assigneeId);
  const project = projects.find((p) => p.id === task.projectId);
  const taskLabels = labels.filter((l) => task.labelIds.includes(l.id));
  const pm = PRIORITY_META[task.priority];
  const sm = STATUS_META[task.status];
  const overdue = isOverdue(task.dueDate) && !task.completed;
  const soon = dueSoon(task.dueDate) && !task.completed;
  const cProgress = checklistProgress(task.checklist);

  const saveTitle = () => {
    if (titleDraft.trim() && titleDraft !== task.title) {
      updateTask(task.id, { title: titleDraft.trim() });
    }
    setEditingTitle(false);
  };

  const submitComment = () => {
    if (!comment.trim()) return;
    addComment(task.id, comment.trim());
    setComment('');
    toast.success('Comment added');
  };

  const submitChecklist = () => {
    if (!newChecklist.trim()) return;
    addChecklistItem(task.id, newChecklist.trim());
    setNewChecklist('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-0 sm:max-w-xl md:max-w-2xl">
        <SheetHeader className="sr-only">
          <SheetTitle>{task.title}</SheetTitle>
        </SheetHeader>

        {/* Cover */}
        {task.coverImage && (
          <div className="relative h-32 w-full overflow-hidden">
            <img src={task.coverImage} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        {task.backgroundColor && !task.coverImage && (
          <div className="h-2 w-full" style={{ backgroundColor: task.backgroundColor }} />
        )}

        <div className="flex h-full flex-col overflow-hidden">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="space-y-6 p-5">
              {/* Title */}
              <div>
                {editingTitle ? (
                  <Input value={titleDraft} onChange={(e) => setTitleDraft(e.target.value)} onBlur={saveTitle} onKeyDown={(e) => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') setEditingTitle(false); }} autoFocus className="text-lg font-semibold" />
                ) : (
                  <h2 className="cursor-pointer text-xl font-bold tracking-tight hover:bg-accent/50 rounded px-1 -mx-1 py-0.5" onClick={() => { setTitleDraft(task.title); setEditingTitle(true); }}>
                    {task.title}
                  </h2>
                )}
                <p className="mt-1 text-sm text-muted-foreground">
                  in <span className="font-medium text-foreground">{project?.name}</span>
                </p>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className={cn('gap-1', sm.bg, sm.color)}>
                  <span className={cn('h-1.5 w-1.5 rounded-full', sm.dot)} /> {sm.label}
                </Badge>
                <Badge variant="secondary" className={cn('gap-1', pm.bg, pm.color)}>
                  <span className={cn('h-1.5 w-1.5 rounded-full', pm.dot)} /> {pm.label}
                </Badge>
                {taskLabels.map((label) => (
                  <Badge key={label.id} variant="secondary" className="gap-1" style={{ backgroundColor: `${label.color}18`, color: label.color }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: label.color }} /> {label.name}
                  </Badge>
                ))}
              </div>

              {/* Properties grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <PropertyRow icon={<UserAvatar user={assignee} size="xs" />} label="Assignee" value={assignee?.name || 'Unassigned'}>
                  <Select value={task.assigneeId || 'unassigned'} onValueChange={(v) => updateTask(task.id, { assigneeId: v === 'unassigned' ? undefined : v })}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {users.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </PropertyRow>

                <PropertyRow icon={<Calendar className="h-4 w-4 text-muted-foreground" />} label="Due date" value={task.dueDate ? formatDate(task.dueDate) : 'No due date'} valueClass={cn(overdue && 'text-destructive', soon && 'text-warning')}>
                  <Input type="date" value={task.dueDate ? task.dueDate.slice(0, 10) : ''} onChange={(e) => updateTask(task.id, { dueDate: e.target.value ? new Date(`${e.target.value}T12:00:00`).toISOString() : undefined })} className="h-7 text-xs" />
                </PropertyRow>

                <PropertyRow icon={<span className={cn('h-2.5 w-2.5 rounded-full', pm.dot)} />} label="Priority" value={pm.label}>
                  <Select value={task.priority} onValueChange={(v) => updateTask(task.id, { priority: v as Priority })}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(PRIORITY_META).map(([key, meta]) => <SelectItem key={key} value={key}>{meta.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </PropertyRow>

                <PropertyRow icon={<span className={cn('h-2.5 w-2.5 rounded-full', sm.dot)} />} label="Status" value={sm.label}>
                  <Select value={task.status} onValueChange={(v) => { updateTask(task.id, { status: v as TaskStatus }); }}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_META).map(([key, meta]) => <SelectItem key={key} value={key}>{meta.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </PropertyRow>
              </div>

              <Separator />

              {/* Description */}
              <Section icon={<FileText className="h-4 w-4" />} title="Description">
                <Textarea value={task.description} onChange={(e) => updateTask(task.id, { description: e.target.value })} placeholder="Add a description..." rows={3} className="resize-none" />
              </Section>

              {/* Checklist */}
              <Section icon={<ListChecks className="h-4 w-4" />} title={`Checklist${task.checklist.length > 0 ? ` · ${cProgress}%` : ''}`}>
                {task.checklist.length > 0 && (
                  <div className="mb-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${cProgress}%` }} />
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  {task.checklist.map((item) => (
                    <div key={item.id} className="group flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-accent/50">
                      <Checkbox checked={item.completed} onCheckedChange={() => toggleChecklistItem(task.id, item.id)} />
                      <span className={cn('flex-1 text-sm', item.completed && 'text-muted-foreground line-through')}>{item.text}</span>
                      <button onClick={() => deleteChecklistItem(task.id, item.id)} className="opacity-0 transition-opacity group-hover:opacity-100">
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Input value={newChecklist} onChange={(e) => setNewChecklist(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitChecklist(); } }} placeholder="Add checklist item" className="h-8 text-sm" />
                  <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={submitChecklist}><Plus className="h-4 w-4" /></Button>
                </div>
              </Section>

              {/* Attachments */}
              {task.attachments.length > 0 && (
                <Section icon={<Paperclip className="h-4 w-4" />} title={`Attachments (${task.attachments.length})`}>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {task.attachments.map((att) => {
                      const Icon = fileIcon(att.fileType);
                      return (
                        <div key={att.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{att.fileName}</p>
                            <p className="text-xs text-muted-foreground uppercase">{att.fileType} · {att.fileSize}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Section>
              )}

              {/* Comments */}
              <Section icon={<MessageSquare className="h-4 w-4" />} title={`Comments (${task.comments.length})`}>
                <div className="space-y-3">
                  {task.comments.map((c) => {
                    const u = users.find((x) => x.id === c.userId);
                    return (
                      <div key={c.id} className="flex gap-2.5">
                        {u && <UserAvatar user={u} size="sm" />}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{u?.name}</span>
                            <span className="text-xs text-muted-foreground">{relativeTime(c.createdAt)}</span>
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">{c.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex gap-2">
                  <UserAvatar user={currentUser} size="sm" />
                  <div className="flex-1">
                    <Textarea value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment(); } }} placeholder="Write a comment..." rows={2} className="resize-none text-sm" />
                    <Button size="sm" className="mt-2 gap-1.5" onClick={submitComment} disabled={!comment.trim()}>
                      <Send className="h-3.5 w-3.5" /> Comment
                    </Button>
                  </div>
                </div>
              </Section>

              {/* Activity */}
              {task.activity.length > 0 && (
                <Section icon={<ActivityIcon className="h-4 w-4" />} title="Activity">
                  <div className="relative space-y-3 pl-4">
                    <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />
                    {task.activity.map((act) => {
                      const u = users.find((x) => x.id === act.userId);
                      return (
                        <div key={act.id} className="relative">
                          <div className="absolute -left-[14px] top-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-muted-foreground/40" />
                          <div className="flex items-center gap-2">
                            {u && <UserAvatar user={u} size="xs" />}
                            <p className="text-sm">
                              <span className="font-medium">{u?.name}</span> {act.text}
                            </p>
                          </div>
                          <p className="mt-0.5 pl-6 text-xs text-muted-foreground">{relativeTime(act.createdAt)}</p>
                        </div>
                      );
                    })}
                  </div>
                </Section>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center gap-2 border-t border-border bg-card/50 p-3">
            <Button variant="outline" size="sm" onClick={() => { onOpenChange(false); onEdit?.(task); }} className="gap-1.5">
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => updateTask(task.id, { completed: !task.completed })} className="gap-1.5">
              <Check className="h-3.5 w-3.5" /> {task.completed ? 'Mark incomplete' : 'Mark complete'}
            </Button>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" onClick={() => { deleteTask(task.id); onOpenChange(false); toast.success('Task deleted'); }} className="gap-1.5 text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function PropertyRow({ icon, label, value, valueClass, children }: { icon: React.ReactNode; label: string; value: string; valueClass?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex items-center gap-2 pt-1.5 w-20 shrink-0">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="flex-1 min-w-0">
        {children ? children : <p className={cn('text-sm font-medium py-1.5', valueClass)}>{value}</p>}
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
