"use client";

import { Settings, Users } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

type Props = {
  projectId: number;
};

export function ProjectSettings({ projectId }: Props) {
  //   const { data: project } = useProject(projectId);

  //   if (!project) return null;

  return (
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
            <p className="text-sm font-medium">title</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {/* {project.description || "No description"} */}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              Members
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Member management will be implemented here.
            </p>

            <Button variant="outline" size="sm" className="mt-4">
              <Users className="mr-2 h-3.5 w-3.5" />
              Add member
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
