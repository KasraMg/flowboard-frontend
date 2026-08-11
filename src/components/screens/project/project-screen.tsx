'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Star, Users, MoreHorizontal, Search, Plus, ArrowLeft,
  LayoutDashboard, List as ListIcon, Calendar, Activity as ActivityIcon, Settings,
  Archive, Trash2, Eye, Copy,
} from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import { KanbanBoard } from '@/src/components/screens/project/partials/kanban-board';
import { TaskFormModal } from '@/src/components/modules/task-form-modal';
import { TaskDetailsDrawer } from '@/src/components/modules/task-details-drawer';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Badge } from '@/src/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/src/components/ui/alert-dialog';
import { cn } from '@/src/lib/utils';
import { relativeTime, formatDate, isOverdue, priorityMeta, statusMeta, checklistProgress } from '@/src/lib/helpers';
import { PROJECT_COLORS, PRIORITY_META, STATUS_META } from '@/src/lib/types';
import type { Task, Priority, TaskStatus } from '@/src/lib/types';
import { toast } from 'sonner';
import { AvatarGroup, UserAvatar } from '@/src/components/modules/user-avatar';

export default function ProjectScreen() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const { projects, tasks, users, columns, toggleFavorite, archiveProject, deleteProject, updateProject, updateTask, activities } = useApp();
  const project = projects.find((p) => p.id === projectId);

  const [activeTab, setActiveTab] = React.useState('board');
  const [search, setSearch] = React.useState('');
  const [taskModalOpen, setTaskModalOpen] = React.useState(false);
  const [editTask, setEditTask] = React.useState<Task | null>(null);
  const [columnForNewTask, setColumnForNewTask] = React.useState<string | undefined>(undefined);
  const [drawerTask, setDrawerTask] = React.useState<Task | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);

  if (!project) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <h2 className="text-xl font-semibold">Project not found</h2>
        <p className="text-sm text-muted-foreground">This project may have been deleted.</p>
        <Button onClick={() => router.push('/projects')}>Back to projects</Button>
      </div>
    );
  }

  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  const projectMembers = users.filter((u) => project.memberIds.includes(u.id));
  const completedCount = projectTasks.filter((t) => t.completed).length;
  const progress = projectTasks.length ? Math.round((completedCount / projectTasks.length) * 100) : 0;

  const openTask = (t: Task) => { setDrawerTask(t); setDrawerOpen(true); };
  const openCreate = (columnId?: string) => { setEditTask(null); setColumnForNewTask(columnId); setTaskModalOpen(true); };
  const openEdit = (t: Task) => { setEditTask(t); setColumnForNewTask(undefined); setTaskModalOpen(true); setDrawerOpen(false); };

  return (
    <div className="flex h-full flex-col">
      {/* Project header */}
      <div className="relative shrink-0">
        <div className="h-24 w-full" style={{ backgroundColor: project.backgroundColor }}>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
        </div>
        <div className="px-4 pb-4 md:px-6">
          <div className="-mt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur" onClick={() => router.push('/projects')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white drop-shadow md:text-2xl">{project.name}</h1>
                  <button onClick={() => toggleFavorite(project.id)} className="transition-transform hover:scale-110">
                    <Star className={cn('h-4 w-4', project.favorite ? 'fill-amber-400 text-amber-400' : 'text-white/70')} />
                  </button>
                </div>
                <p className="mt-0.5 text-sm text-white/80 drop-shadow line-clamp-1">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AvatarGroup userIds={project.memberIds} max={4} size="sm" />
              <Button variant="secondary" size="sm" className="gap-1.5 bg-background/90 backdrop-blur" onClick={() => toast.info('Invite sent (mock)')}>
                <Users className="h-3.5 w-3.5" /> Invite
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="bg-background/90 backdrop-blur"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toggleFavorite(project.id)}><Star className="mr-2 h-3.5 w-3.5" /> {project.favorite ? 'Unfavorite' : 'Favorite'}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => archiveProject(project.id)}><Archive className="mr-2 h-3.5 w-3.5" /> {project.archived ? 'Unarchive' : 'Archive'}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={() => setDeleteConfirm(true)}><Trash2 className="mr-2 h-3.5 w-3.5" /> Delete project</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + search */}
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="board" className="gap-1.5"><LayoutDashboard className="h-3.5 w-3.5" /> Board</TabsTrigger>
            <TabsTrigger value="list" className="gap-1.5"><ListIcon className="h-3.5 w-3.5" /> List</TabsTrigger>
            <TabsTrigger value="calendar" className="gap-1.5"><Calendar className="h-3.5 w-3.5" /> Calendar</TabsTrigger>
            <TabsTrigger value="activity" className="gap-1.5"><ActivityIcon className="h-3.5 w-3.5" /> Activity</TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5"><Settings className="h-3.5 w-3.5" /> Settings</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          {activeTab === 'board' && (
            <>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter tasks..." className="h-8 w-40 pl-8 text-sm md:w-56" />
              </div>
              <Button size="sm" className="gap-1.5" onClick={() => openCreate()}><Plus className="h-3.5 w-3.5" /> Add task</Button>
            </>
          )}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'board' && (
          <div className="h-full p-4 md:p-6">
            <KanbanBoard projectId={projectId} onOpenTask={openTask} onEditTask={openEdit} onCreateTask={openCreate} />
          </div>
        )}
        {activeTab === 'list' && <ListView projectId={projectId} onOpenTask={openTask} onEditTask={openEdit} />}
        {activeTab === 'calendar' && <CalendarView projectId={projectId} onOpenTask={openTask} />}
        {activeTab === 'activity' && <ActivityView projectId={projectId} />}
        {activeTab === 'settings' && <ProjectSettings projectId={projectId} />}
      </div>

      {/* Modals */}
      <TaskFormModal open={taskModalOpen} onOpenChange={setTaskModalOpen} projectId={projectId} columnId={columnForNewTask} editTask={editTask} />
      <TaskDetailsDrawer task={drawerTask} open={drawerOpen} onOpenChange={setDrawerOpen} onEdit={openEdit} />
      <AlertDialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete "{project.name}" and all its tasks. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { deleteProject(projectId); toast.success('Project deleted'); router.push('/projects'); }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ===== LIST VIEW =====
function ListView({ projectId, onOpenTask, onEditTask }: { projectId: string; onOpenTask: (t: Task) => void; onEditTask: (t: Task) => void }) {
  const { tasks, users, labels, updateTask } = useApp();
  const [search, setSearch] = React.useState('');
  const [sortBy, setSortBy] = React.useState('updated');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [priorityFilter, setPriorityFilter] = React.useState('all');

  let list = tasks.filter((t) => t.projectId === projectId);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((t) => t.title.toLowerCase().includes(q));
  }
  if (statusFilter !== 'all') list = list.filter((t) => t.status === statusFilter);
  if (priorityFilter !== 'all') list = list.filter((t) => t.priority === priorityFilter);

  list = [...list].sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'priority') return ['low', 'medium', 'high', 'urgent'].indexOf(b.priority) - ['low', 'medium', 'high', 'urgent'].indexOf(a.priority);
    if (sortBy === 'due') return new Date(a.dueDate || '9999').getTime() - new Date(b.dueDate || '9999').getTime();
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  if (list.length === 0) {
    return <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No tasks found</div>;
  }

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." className="h-8 w-48 text-sm" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-8 rounded-md border border-input bg-background px-2 text-sm">
          <option value="all">All statuses</option>
          {Object.entries(STATUS_META).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="h-8 rounded-md border border-input bg-background px-2 text-sm">
          <option value="all">All priorities</option>
          {Object.entries(PRIORITY_META).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-8 rounded-md border border-input bg-background px-2 text-sm">
          <option value="updated">Last updated</option>
          <option value="name">Name</option>
          <option value="priority">Priority</option>
          <option value="due">Due date</option>
        </select>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border md:block">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="w-8 p-3"></th>
              <th className="p-3 text-left text-xs font-medium text-muted-foreground">Task</th>
              <th className="p-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="p-3 text-left text-xs font-medium text-muted-foreground">Priority</th>
              <th className="p-3 text-left text-xs font-medium text-muted-foreground">Assignee</th>
              <th className="p-3 text-left text-xs font-medium text-muted-foreground">Labels</th>
              <th className="p-3 text-left text-xs font-medium text-muted-foreground">Due</th>
              <th className="p-3 text-left text-xs font-medium text-muted-foreground">Updated</th>
            </tr>
          </thead>
          <tbody>
            {list.map((task) => {
              const assignee = users.find((u) => u.id === task.assigneeId);
              const taskLabels = labels.filter((l) => task.labelIds.includes(l.id));
              const pm = priorityMeta(task.priority);
              const sm = statusMeta(task.status);
              const overdue = isOverdue(task.dueDate) && !task.completed;
              return (
                <tr key={task.id} onClick={() => onOpenTask(task)} className="cursor-pointer border-b transition-colors hover:bg-accent/50 last:border-0">
                  <td className="p-3">
                    <button onClick={(e) => { e.stopPropagation(); updateTask(task.id, { completed: !task.completed }); }}>
                      {task.completed ? <span className="text-success text-sm">✓</span> : <span className="text-muted-foreground text-sm">○</span>}
                    </button>
                  </td>
                  <td className="p-3"><span className={cn('text-sm font-medium', task.completed && 'text-muted-foreground line-through')}>{task.title}</span></td>
                  <td className="p-3"><Badge variant="secondary" className={cn(sm.bg, sm.color)}>{sm.label}</Badge></td>
                  <td className="p-3"><Badge variant="secondary" className={cn(pm.bg, pm.color)}><span className={cn('mr-1 h-1.5 w-1.5 rounded-full', pm.dot)} />{pm.label}</Badge></td>
                  <td className="p-3">{assignee ? <UserAvatar user={assignee} size="xs" /> : <span className="text-xs text-muted-foreground">—</span>}</td>
                  <td className="p-3"><div className="flex flex-wrap gap-1">{taskLabels.map((l) => <span key={l.id} className="rounded-full px-1.5 py-0.5 text-[10px]" style={{ backgroundColor: `${l.color}20`, color: l.color }}>{l.name}</span>)}</div></td>
                  <td className="p-3"><span className={cn('text-xs', overdue && 'text-destructive font-medium')}>{task.dueDate ? formatDate(task.dueDate) : '—'}</span></td>
                  <td className="p-3 text-xs text-muted-foreground">{relativeTime(task.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2 md:hidden">
        {list.map((task) => {
          const assignee = users.find((u) => u.id === task.assigneeId);
          const pm = priorityMeta(task.priority);
          const sm = statusMeta(task.status);
          return (
            <div key={task.id} onClick={() => onOpenTask(task)} className="rounded-lg border bg-card p-3">
              <div className="flex items-start gap-2">
                <button onClick={(e) => { e.stopPropagation(); updateTask(task.id, { completed: !task.completed }); }} className="mt-0.5">
                  {task.completed ? <span className="text-success">✓</span> : <span className="text-muted-foreground">○</span>}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium', task.completed && 'line-through text-muted-foreground')}>{task.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <Badge variant="secondary" className={cn('h-5 text-[10px]', sm.bg, sm.color)}>{sm.label}</Badge>
                    <Badge variant="secondary" className={cn('h-5 text-[10px]', pm.bg, pm.color)}>{pm.label}</Badge>
                    {task.dueDate && <span className="text-[10px] text-muted-foreground">{formatDate(task.dueDate)}</span>}
                    {assignee && <UserAvatar user={assignee} size="xs" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== CALENDAR VIEW =====
function CalendarView({ projectId, onOpenTask }: { projectId: string; onOpenTask: (t: Task) => void }) {
  const { tasks, projects } = useApp();
  const [view, setView] = React.useState<'month' | 'week' | 'day'>('month');
  const [current, setCurrent] = React.useState(new Date());

  const projectTasks = tasks.filter((t) => t.projectId === projectId && t.dueDate);
  const project = projects.find((p) => p.id === projectId);

  if (view === 'month') {
    return <MonthView tasks={projectTasks} current={current} setCurrent={setCurrent} onOpenTask={onOpenTask} setView={setView} color={project?.backgroundColor || '#3b82f6'} />;
  }
  if (view === 'week') {
    return <WeekView tasks={projectTasks} current={current} setCurrent={setCurrent} onOpenTask={onOpenTask} setView={setView} color={project?.backgroundColor || '#3b82f6'} />;
  }
  return <DayView tasks={projectTasks} current={current} setCurrent={setCurrent} onOpenTask={onOpenTask} setView={setView} color={project?.backgroundColor || '#3b82f6'} />;
}

function MonthView({ tasks, current, setCurrent, onOpenTask, setView, color }: any) {
  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const days: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
  while (days.length % 7 !== 0) days.push(null);

  const tasksOnDay = (date: Date) => tasks.filter((t: Task) => {
    if (!t.dueDate) return false;
    const td = new Date(t.dueDate);
    return td.getDate() === date.getDate() && td.getMonth() === date.getMonth() && td.getFullYear() === date.getFullYear();
  });

  const today = new Date();

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => setCurrent(new Date(year, month - 1, 1))}>Prev</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrent(new Date())}>Today</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrent(new Date(year, month + 1, 1))}>Next</Button>
          <div className="ml-2 flex rounded-md border">
            {(['month', 'week', 'day'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={cn('px-2.5 py-1 text-xs capitalize', v === 'month' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>{v}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border">
        <div className="grid grid-cols-7 border-b bg-muted/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="p-2 text-center text-xs font-medium text-muted-foreground">{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {days.map((date, i) => {
            if (!date) return <div key={i} className="min-h-24 border-b border-r border-border bg-muted/20" />;
            const dayTasks = tasksOnDay(date);
            const isToday = date.toDateString() === today.toDateString();
            return (
              <div key={i} className="min-h-24 border-b border-r border-border p-1.5 last:border-r-0">
                <div className={cn('mb-1 text-xs', isToday ? 'flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground')}>{date.getDate()}</div>
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((t: Task) => (
                    <button key={t.id} onClick={() => onOpenTask(t)} className="block w-full truncate rounded-md px-1.5 py-1 text-left text-[10px] font-medium text-white" style={{ backgroundColor: color }}>
                      {t.title}
                    </button>
                  ))}
                  {dayTasks.length > 3 && <span className="text-[10px] text-muted-foreground">+{dayTasks.length - 3} more</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WeekView({ tasks, current, setCurrent, onOpenTask, setView, color }: any) {
  const start = new Date(current);
  start.setDate(start.getDate() - start.getDay());
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(d.getDate() + i); return d; });
  const today = new Date();

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {days[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h2>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => { const d = new Date(current); d.setDate(d.getDate() - 7); setCurrent(d); }}>Prev</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrent(new Date())}>Today</Button>
          <Button variant="outline" size="sm" onClick={() => { const d = new Date(current); d.setDate(d.getDate() + 7); setCurrent(d); }}>Next</Button>
          <div className="ml-2 flex rounded-md border">
            {(['month', 'week', 'day'] as const).map((v) => <button key={v} onClick={() => setView(v)} className={cn('px-2.5 py-1 text-xs capitalize', v === 'week' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>{v}</button>)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-7">
        {days.map((date) => {
          const dayTasks = tasks.filter((t: Task) => { if (!t.dueDate) return false; const td = new Date(t.dueDate); return td.toDateString() === date.toDateString(); });
          const isToday = date.toDateString() === today.toDateString();
          return (
            <div key={date.toISOString()} className={cn('rounded-lg border p-2', isToday && 'border-primary')}>
              <p className={cn('mb-2 text-xs font-medium', isToday ? 'text-primary' : 'text-muted-foreground')}>{date.toLocaleDateString('en-US', { weekday: 'short' })} {date.getDate()}</p>
              <div className="space-y-1">
                {dayTasks.map((t: Task) => <button key={t.id} onClick={() => onOpenTask(t)} className="block w-full truncate rounded-md px-2 py-1 text-left text-xs font-medium text-white" style={{ backgroundColor: color }}>{t.title}</button>)}
                {dayTasks.length === 0 && <p className="text-[10px] text-muted-foreground">No tasks</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DayView({ tasks, current, setCurrent, onOpenTask, setView, color }: any) {
  const dayTasks = tasks.filter((t: Task) => { if (!t.dueDate) return false; return new Date(t.dueDate).toDateString() === current.toDateString(); });
  const today = new Date();

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{current.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => { const d = new Date(current); d.setDate(d.getDate() - 1); setCurrent(d); }}>Prev</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrent(new Date())}>Today</Button>
          <Button variant="outline" size="sm" onClick={() => { const d = new Date(current); d.setDate(d.getDate() + 1); setCurrent(d); }}>Next</Button>
          <div className="ml-2 flex rounded-md border">
            {(['month', 'week', 'day'] as const).map((v) => <button key={v} onClick={() => setView(v)} className={cn('px-2.5 py-1 text-xs capitalize', v === 'day' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>{v}</button>)}
          </div>
        </div>
      </div>
      <div className="rounded-xl border p-4">
        {dayTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">No tasks due on this day</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dayTasks.map((t: Task) => (
              <div key={t.id} onClick={() => onOpenTask(t)} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-accent/50">
                <div className="h-8 w-1 rounded-full" style={{ backgroundColor: color }} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{priorityMeta(t.priority).label} · {statusMeta(t.status).label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== ACTIVITY VIEW =====
function ActivityView({ projectId }: { projectId: string }) {
  const { tasks, users, activities } = useApp();
  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  const taskActivities = projectTasks.flatMap((t) => t.activity);
  const allActivities = [...activities.filter((a) => a.targetId === projectId), ...taskActivities].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <h2 className="mb-4 text-lg font-semibold">Project Activity</h2>
      {allActivities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ActivityIcon className="h-10 w-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">No activity yet</p>
        </div>
      ) : (
        <div className="relative space-y-4 pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
          {allActivities.map((act, i) => {
            const u = users.find((x) => x.id === act.userId);
            return (
              <div key={i} className="relative">
                <div className="absolute -left-[18px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary/40" />
                <div className="flex items-start gap-2.5">
                  {u && <UserAvatar user={u} size="sm" />}
                  <div>
                    <p className="text-sm"><span className="font-medium">{u?.name}</span> {act.text}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{relativeTime(act.createdAt)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ===== PROJECT SETTINGS =====
function ProjectSettings({ projectId }: { projectId: string }) {
  const { projects, updateProject, archiveProject, deleteProject, users, tasks } = useApp();
  const project = projects.find((p) => p.id === projectId)!;
  const [name, setName] = React.useState(project.name);
  const [description, setDescription] = React.useState(project.description);
  const [color, setColor] = React.useState(project.backgroundColor);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const projectMembers = users.filter((u) => project.memberIds.includes(u.id));

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <h2 className="text-lg font-semibold">Project Settings</h2>

        {/* General */}
        <Card>
          <CardHeader><CardTitle className="text-base">General</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Project name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Project color</label>
              <div className="flex flex-wrap gap-2">
                {PROJECT_COLORS.map((c) => <button key={c} onClick={() => setColor(c)} className={cn('h-8 w-8 rounded-lg transition-all', color === c && 'ring-2 ring-primary ring-offset-2')} style={{ backgroundColor: c }} />)}
              </div>
            </div>
            <Button onClick={() => { updateProject(projectId, { name, description, backgroundColor: color }); toast.success('Settings saved'); }}>Save changes</Button>
          </CardContent>
        </Card>

        {/* Members */}
        <Card>
          <CardHeader><CardTitle className="text-base">Members ({projectMembers.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {projectMembers.map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-lg border p-2">
                <UserAvatar user={m} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                <Badge variant="secondary" className="capitalize">{m.role}</Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="mt-2" onClick={() => toast.info('Invite sent (mock)')}><Users className="mr-2 h-3.5 w-3.5" /> Invite member</Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader><CardTitle className="text-base">Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Default task priority</label>
              <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" defaultValue="medium">
                {Object.entries(PRIORITY_META).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Default view</label>
              <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" defaultValue="board">
                <option value="board">Board</option>
                <option value="list">List</option>
                <option value="calendar">Calendar</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-destructive/30">
          <CardHeader><CardTitle className="text-base text-destructive">Danger Zone</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div><p className="text-sm font-medium">Archive project</p><p className="text-xs text-muted-foreground">Hide this project from active views</p></div>
              <Button variant="outline" onClick={() => { archiveProject(projectId); toast.success(project.archived ? 'Unarchived' : 'Archived'); }}>{project.archived ? 'Unarchive' : 'Archive'}</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-3">
              <div><p className="text-sm font-medium">Delete project</p><p className="text-xs text-muted-foreground">Permanently delete this project and all tasks</p></div>
              <Button variant="destructive" onClick={() => setConfirmDelete(true)}>Delete</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete "{project.name}" and all {tasks.filter((t) => t.projectId === projectId).length} tasks. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { deleteProject(projectId); toast.success('Project deleted'); }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
