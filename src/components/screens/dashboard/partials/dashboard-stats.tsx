import {
  Activity,
  CheckCircle2,
  FolderKanban,
  NotebookText,
} from "lucide-react";

import { StatCard } from "@/src/components/screens/dashboard/partials/stat-card";
import { DashboardResponse } from "@/src/lib/types";

export function DashboardStats({ data }: { data: DashboardResponse }) {
  const { stats } = data.data;

  const statCards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
      tone: "primary" as const,
      trend: {
        value: `${stats.trends.totalProjects.value}%`,
        up: stats.trends.totalProjects.up,
      },
    },
    {
      label: "Total Tasks",
      value: stats.totalTasks,
      icon: NotebookText,
      tone: "destructive" as const,
      trend: {
        value: `${stats.trends.totalTasks.value}%`,
        up: stats.trends.totalTasks.up,
      },
    },
    {
      label: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      tone: "success" as const,
      trend: {
        value: `${stats.trends.completedTasks.value}%`,
        up: stats.trends.completedTasks.up,
      },
    },
    {
      label: "Pending",
      value: stats.incompleteTasks,
      icon: Activity,
      tone: "warning" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {statCards.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
