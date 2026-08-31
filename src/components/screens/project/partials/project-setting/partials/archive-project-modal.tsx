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
import { Archive } from "lucide-react";
import { useUpdateProject } from "@/src/hooks/useProject";

type Props = {
  projectId: number;
  projectTitle: string;
  status: "archived" | "active";
};

export function ArchiveProjectModal({
  projectId,
  projectTitle,
  status,
}: Props) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useUpdateProject(String(projectId));

  const handleArchive = () => {
    mutate(
      { status: status == "archived" ? "active" : "archived" },
      {
        onSuccess() {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Archive className="h-4 w-4" />
          {status == "archived" ? "Active" : "Archive"} project
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {" "}
            {status == "archived" ? "Active" : "Archive"} project
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to{" "}
            {status == "archived" ? "Active" : "Archive"}{" "}
            <span className="font-medium text-foreground">{projectTitle}</span>?
            {status == "archived" ? (
              ""
            ) : (
              <>
                <br />
                The project will no longer appear in your active projects, but
                you can restore it later.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleArchive} disabled={isPending}>
            {status == "archived" ? "Active" : "Archive"} project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
