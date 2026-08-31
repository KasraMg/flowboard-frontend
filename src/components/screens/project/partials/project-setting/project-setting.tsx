"use client";

import { Settings } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { useProject, useUpdateProject } from "@/src/hooks/useProject";
import { useEffect, useState } from "react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { DeleteProjectModal } from "./partials/delete-project-modal";
import { ArchiveProjectModal } from "./partials/archive-project-modal";

type Props = {
  projectId: number;
};

export function ProjectSetting({ projectId }: Props) {
  const { data: project } = useProject(String(projectId));
  const [title, setTitle] = useState(project?.title);
  const [description, setDescription] = useState(project?.description);

  const { mutate } = useUpdateProject(String(projectId));

  const debouncedTitle = useDebounce(title, 1500);
  const debouncedDescription = useDebounce(description, 1500);

  useEffect(() => {
    const titleChanged = debouncedTitle !== project?.title;

    const descriptionChanged = debouncedDescription !== project?.description;

    if (!titleChanged && !descriptionChanged) {
      return;
    }

    mutate({
      title: String(debouncedTitle),
      description: String(description),
    });
  }, [debouncedTitle, debouncedDescription]);

  return project ? (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Project settings</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your project.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Settings className="h-4 w-4" />
              General
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div>
              <p className="text-sm pb-2 font-medium">title</p>
              <Input onChange={(e) => setTitle(e.target.value)} value={title} />
            </div>

            <div className="mt-1 text-sm pt-5">
              <p className="text-sm pb-2 font-medium">description</p>
              <Input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className="space-y-5 grid w-max pt-8">
              <ArchiveProjectModal
                status={project.status}
                projectId={project.id}
                projectTitle={project.title}
              />

              <DeleteProjectModal
                projectId={project.id}
                projectTitle={project.title}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : (
    ""
  );
}
