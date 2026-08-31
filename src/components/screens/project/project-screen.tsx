"use client";

import { notFound, useParams } from "next/navigation";
import { useProject } from "@/src/hooks/useProject";
import { ProjectHeader } from "./partials/project-header";
import { useEffect } from "react";
import { ProjectContent } from "./partials/project-content";

export default function ProjectScreen() {
  const params = useParams();

  const { data: project, isPending } = useProject(String(params.projectId));

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  useEffect(() => {
    if ((project as any)?.statusCode == 404 && !isPending) {
      notFound();
    }
  }, [project]);

  return project?.id ? (
    <div className="flex h-full flex-col">
      <ProjectHeader project={project} />
      <ProjectContent projectId={Number(params.projectId)} />
    </div>
  ) : (
    ""
  );
}
