import {
  Activity,
  CheckCircle2,
  FolderKanban,
  NotebookText,
} from "lucide-react";

import { StatCard } from "@/src/components/modules/stat-card";
import { DashboardResponse } from "@/src/lib/types";

export function DashboardStats({ data }: { data: DashboardResponse }) {
  const stats = [
    {
      label: "Total Projects",
      value: data?.data.stats.totalProjects,
      icon: FolderKanban,
      tone: "primary" as const,
      trend: { value: "12%", up: true },
    },
    {
      label: "Total Tasks",
      value: data?.data.stats.totalTasks,
      icon: NotebookText,
      tone: "success" as const,
      trend: { value: "23%", up: true },
    },
    {
      label: "Completed",
      value: data?.data.stats.completedTasks,
      icon: CheckCircle2,
      tone: "success" as const,
      trend: { value: "15%", up: true },
    },
    {
      label: "Pending",
      value: data?.data.stats.incompleteTasks,
      icon: Activity,
      tone: "success" as const,
      trend: { value: "15%", up: true },
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
