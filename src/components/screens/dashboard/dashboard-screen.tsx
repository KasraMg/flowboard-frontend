"use client";
import { DashboardHeader } from "./partials/dashboard-header";
import { DashboardStats } from "./partials/dashboard-stats";
import { RecentProjects } from "./partials/recent-projects";
import { RecentTasks } from "./partials/recent-tasks";
import useDashboard from "@/src/hooks/useDahboard";

export default function DashboardScreen() {
  const { data } = useDashboard();

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <DashboardHeader />
      <DashboardStats data={data} />
      <RecentProjects data={data} />
      <RecentTasks data={data} />
    </div>
  );
}
