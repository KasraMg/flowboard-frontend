"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FolderKanban,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useApp } from "@/src/providers/app-provider";
import { UserAvatar } from "@/src/components/modules/user-avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { cn } from "@/src/lib/utils";
import { relativeTime, isOverdue } from "@/src/lib/helpers";
import { StatCard } from "@/src/components/modules/stat-card";
import { ProjectCard } from "@/src/components/modules/project-card";
import { TaskRow } from "@/src/components/modules/task-row";

export default function DashboardScreen() {
  const { currentUser, projects, tasks, activities, users, createProject } =
    useApp();
  const router = useRouter();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const activeProjects = projects.filter(
    (p) => p.status === "active" && !p.archived,
  );
  const completedTasks = tasks.filter((t) => t.completed);
  const overdueTasks = tasks.filter(
    (t) => isOverdue(t.dueDate) && !t.completed,
  );
  const recentProjects = projects.filter((p) => !p.archived).slice(0, 4);
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 6);

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      tone: "primary" as const,
      trend: { value: "12%", up: true },
    },
    {
      label: "Active Projects",
      value: activeProjects.length,
      icon: Activity,
      tone: "info" as const,
      trend: { value: "8%", up: true },
    },
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: CheckCircle2,
      tone: "success" as const,
      trend: { value: "23%", up: true },
    },
    {
      label: "Completed",
      value: completedTasks.length,
      icon: CheckCircle2,
      tone: "success" as const,
      trend: { value: "15%", up: true },
    },
    {
      label: "Overdue",
      value: overdueTasks.length,
      icon: AlertTriangle,
      tone: "destructive" as const,
      trend: { value: "4%", up: false },
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {greeting}, {currentUser.name.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening across your workspace today.
          </p>
        </div>
        <Button
          onClick={() => router.push("/projects")}
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent projects */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent projects</h2>
            <Link href="/projects">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          {recentProjects.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="No projects yet"
              description="Create your first project to get started."
              action={
                <Button
                  onClick={() => router.push("/projects")}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" /> Create project
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {recentProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>

        {/* Activity feed */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Activity feed</h2>
          <Card>
            <CardContent className="p-0">
              <div className="max-h-[480px] space-y-0 overflow-y-auto scrollbar-thin">
                {activities.slice(0, 8).map((act, i) => {
                  const user = users.find((u) => u.id === act.userId);
                  return (
                    <div
                      key={i}
                      className={cn(
                        "flex gap-3 p-3",
                        i < 7 && "border-b border-border",
                      )}
                    >
                      {user && <UserAvatar user={user} size="sm" />}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-snug">
                          <span className="font-medium">{user?.name}</span>{" "}
                          {act.text}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {relativeTime(act.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent tasks */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent tasks</h2>
          <Link href="/tasks">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-3">
            <div className="space-y-1.5">
              {recentTasks.map((t) => (
                <TaskRow key={t.id} task={t} showProject />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: any;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
