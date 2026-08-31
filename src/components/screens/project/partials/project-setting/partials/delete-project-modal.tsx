"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Trash2 } from "lucide-react";
import { useDeleteProject } from "@/src/hooks/useProject";
import { redirect } from "next/navigation";

type Props = {
  projectId: number;
  projectTitle: string;
};

export function DeleteProjectModal({ projectId, projectTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const { mutate, isPending } = useDeleteProject(String(projectId));

  const isConfirmed = confirmation === projectTitle;

  const handleDelete = () => {
    if (!isConfirmed) return;

    mutate(undefined, {
      onSuccess() {
        setOpen(false);
        setConfirmation("");
        redirect("/dashboard");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Delete project
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete project</DialogTitle>

          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            project and all related data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <p className="text-sm text-muted-foreground">To confirm, type:</p>

          <div className="rounded-md bg-muted px-3 py-2 text-sm font-medium">
            {projectTitle}
          </div>

          <Input
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="Enter project name"
            className="outline-0! shadow-none ring-0! ring-offset-0!"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={!isConfirmed || isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
