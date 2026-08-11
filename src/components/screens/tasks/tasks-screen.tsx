'use client';

import * as React from 'react';
import { CheckSquare, Clock, AlertTriangle, CheckCircle2, Search } from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import { TaskDetailsDrawer } from '@/src/components/modules/task-details-drawer';
import { TaskFormModal } from '@/src/components/modules/task-form-modal';
import { Input } from '@/src/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/components/ui/tabs';
import { Card, CardContent } from '@/src/components/ui/card';
import { isOverdue } from '@/src/lib/helpers';
import type { Task } from '@/src/lib/types';
import { TaskRow } from '@/src/components/modules/task-row';

export default function TasksScreen() {
  const { tasks, currentUser } = useApp();
  const [search, setSearch] = React.useState('');
  const [drawerTask, setDrawerTask] = React.useState<Task | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editTask, setEditTask] = React.useState<Task | null>(null);
  const [editOpen, setEditOpen] = React.useState(false);

  const myTasks = tasks.filter((t) => t.assigneeId === currentUser.id);
  const filtered = search ? myTasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase())) : myTasks;

  const today = new Date();
  const todayTasks = filtered.filter((t) => { if (!t.dueDate) return false; const d = new Date(t.dueDate); return d.toDateString() === today.toDateString() && !t.completed; });
  const upcomingTasks = filtered.filter((t) => { if (!t.dueDate) return false; return new Date(t.dueDate).getTime() > today.getTime() && !t.completed; });
  const overdueTasks = filtered.filter((t) => isOverdue(t.dueDate) && !t.completed);
  const completedTasks = filtered.filter((t) => t.completed);

  const openTask = (t: Task) => { setDrawerTask(t); setDrawerOpen(true); };
  const editTaskFn = (t: Task) => { setEditTask(t); setEditOpen(true); setDrawerOpen(false); };

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
        <p className="mt-1 text-sm text-muted-foreground">All tasks assigned to you across projects</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your tasks..." className="pl-9" />
      </div>

      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today" className="gap-1.5"><Clock className="h-3.5 w-3.5" /> Today ({todayTasks.length})</TabsTrigger>
          <TabsTrigger value="upcoming" className="gap-1.5"><CheckSquare className="h-3.5 w-3.5" /> Upcoming ({upcomingTasks.length})</TabsTrigger>
          <TabsTrigger value="overdue" className="gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Overdue ({overdueTasks.length})</TabsTrigger>
          <TabsTrigger value="completed" className="gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Completed ({completedTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-4">
          <TaskList tasks={todayTasks} onOpen={openTask} emptyTitle="Nothing due today" emptyDesc="You're all caught up!" />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          <TaskList tasks={upcomingTasks} onOpen={openTask} emptyTitle="No upcoming tasks" emptyDesc="Nothing scheduled for the future." />
        </TabsContent>
        <TabsContent value="overdue" className="mt-4">
          <TaskList tasks={overdueTasks} onOpen={openTask} emptyTitle="No overdue tasks" emptyDesc="Great job staying on track!" />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <TaskList tasks={completedTasks} onOpen={openTask} emptyTitle="No completed tasks yet" emptyDesc="Complete a task to see it here." />
        </TabsContent>
      </Tabs>

      <TaskDetailsDrawer task={drawerTask} open={drawerOpen} onOpenChange={setDrawerOpen} onEdit={editTaskFn} />
      <TaskFormModal open={editOpen} onOpenChange={setEditOpen} projectId={editTask?.projectId || 'p1'} editTask={editTask} />
    </div>
  );
}

function TaskList({ tasks, onOpen, emptyTitle, emptyDesc }: { tasks: Task[]; onOpen: (t: Task) => void; emptyTitle: string; emptyDesc: string }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-muted-foreground/40" />
        <h3 className="mt-3 font-medium">{emptyTitle}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{emptyDesc}</p>
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      {tasks.map((t) => <TaskRow key={t.id} task={t} showProject onOpen={onOpen} />)}
    </div>
  );
}
