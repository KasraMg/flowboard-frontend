"use client";

import Link from "next/link";
import { ArrowRight, FolderKanban, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { ProjectCard } from "@/src/components/modules/project-card";
import { EmptyState } from "./empty-state";
import { DashboardResponse } from "@/src/lib/types";

export function RecentProjects({ data }: { data: DashboardResponse }) {
  const router = useRouter();

  return (
    <div className="lg:col-span-2">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent projects</h2>

        <Link href="/projects">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {data?.data.recentProjects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Create your first project to get started."
          action={
            <Button onClick={() => router.push("/projects")} className="gap-2">
              <Plus className="h-4 w-4" />
              Create project
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data?.data.recentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
