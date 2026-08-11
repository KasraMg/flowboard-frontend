'use client';

import * as React from 'react';
import { useApp } from '@/src/providers/app-provider';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Label } from '@/src/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/src/components/ui/dialog';
import { Checkbox } from '@/src/components/ui/checkbox';
import { CalendarDays, Check, Plus, X } from 'lucide-react';
import { PRIORITY_META, STATUS_META } from '@/src/lib/types';
import type { Priority, Task, TaskStatus } from '@/src/lib/types';
import { toast } from 'sonner';

export function TaskFormModal({ open, onOpenChange, projectId, columnId, editTask }: { open: boolean; onOpenChange: (value: boolean) => void; projectId: string; columnId?: string; editTask?: Task | null }) {
  const { createTask, updateTask, users, projects, labels, columns } = useApp();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState<TaskStatus>('todo');
  const [priority, setPriority] = React.useState<Priority>('medium');
  const [assigneeId, setAssigneeId] = React.useState('unassigned');
  const [dueDate, setDueDate] = React.useState('');
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>([]);
  const [checklist, setChecklist] = React.useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newItem, setNewItem] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (editTask) {
      setTitle(editTask.title); setDescription(editTask.description); setStatus(editTask.status); setPriority(editTask.priority);
      setAssigneeId(editTask.assigneeId || 'unassigned'); setDueDate(editTask.dueDate ? editTask.dueDate.slice(0, 10) : '');
      setSelectedLabels(editTask.labelIds); setChecklist(editTask.checklist);
    } else {
      setTitle(''); setDescription(''); setStatus('todo'); setPriority('medium'); setAssigneeId('unassigned'); setDueDate(''); setSelectedLabels([]); setChecklist([]);
    }
    setError('');
  }, [editTask, open]);

  const addItem = () => { if (newItem.trim()) { setChecklist((items) => [...items, { id: `new-${Date.now()}`, text: newItem.trim(), completed: false }]); setNewItem(''); } };
  const submit = () => {
    if (!title.trim()) { setError('Give your task a title'); return; }
    const data = { title: title.trim(), description, status, priority, assigneeId: assigneeId === 'unassigned' ? undefined : assigneeId, dueDate: dueDate ? new Date(`${dueDate}T12:00:00`).toISOString() : undefined, labelIds: selectedLabels, checklist, columnId: columnId || columns.find((c) => c.projectId === projectId)?.id };
    if (editTask) { updateTask(editTask.id, data); toast.success('Task updated'); } else { createTask({ ...data, projectId }); toast.success('Task created'); }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader><DialogTitle>{editTask ? 'Edit task' : 'Create task'}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5"><Label htmlFor="task-title">Title</Label><Input id="task-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" autoFocus />{error && <p className="text-xs text-destructive">{error}</p>}</div>
          <div className="space-y-1.5"><Label htmlFor="task-description">Description</Label><Textarea id="task-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add more details..." rows={3} /></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="space-y-1.5"><Label>Status</Label><Select value={status} onValueChange={(v) => setStatus(v as TaskStatus)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.entries(STATUS_META).map(([key, meta]) => <SelectItem key={key} value={key}>{meta.label}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Priority</Label><Select value={priority} onValueChange={(v) => setPriority(v as Priority)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.entries(PRIORITY_META).map(([key, meta]) => <SelectItem key={key} value={key}>{meta.label}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Assignee</Label><Select value={assigneeId} onValueChange={setAssigneeId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="unassigned">Unassigned</SelectItem>{users.map((user) => <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Due date</Label><div className="relative"><CalendarDays className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="pl-8" /></div></div>
          </div>
          <div className="space-y-2"><Label>Labels</Label><div className="flex flex-wrap gap-2">{labels.map((label) => { const selected = selectedLabels.includes(label.id); return <button type="button" key={label.id} onClick={() => setSelectedLabels((current) => selected ? current.filter((id) => id !== label.id) : [...current, label.id])} className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all" style={{ borderColor: selected ? label.color : undefined, backgroundColor: selected ? `${label.color}18` : undefined }}><span className="h-2 w-2 rounded-full" style={{ backgroundColor: label.color }} />{label.name}{selected && <Check className="h-3 w-3" />}</button>; })}</div></div>
          <div className="space-y-2"><Label>Checklist</Label>{checklist.map((item, index) => <div key={item.id} className="flex items-center gap-2"><Checkbox checked={item.completed} onCheckedChange={(checked) => setChecklist((items) => items.map((current, i) => i === index ? { ...current, completed: !!checked } : current))} /><span className="flex-1 text-sm">{item.text}</span><button type="button" onClick={() => setChecklist((items) => items.filter((current) => current.id !== item.id))}><X className="h-4 w-4 text-muted-foreground" /></button></div>)}<div className="flex gap-2"><Input value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItem(); } }} placeholder="Add checklist item" /><Button type="button" variant="outline" size="icon" onClick={addItem}><Plus className="h-4 w-4" /></Button></div></div>
          <div className="space-y-1.5"><Label>Project</Label><Select value={projectId} disabled><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{projects.map((project) => <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>)}</SelectContent></Select></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={submit}>{editTask ? 'Save changes' : 'Create task'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
