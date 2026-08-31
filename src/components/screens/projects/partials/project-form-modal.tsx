"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { cn } from "@/src/lib/utils";

import {
  CreateProjectPayload,
  ProjectBackground,
  useCreateProject,
} from "@/src/hooks/useProject";
import { PROJECT_BACKGROUNDS } from "@/src/lib/project-backgrounds";

export function ProjectFormModal({
  editProject,
}: {
  editProject?: any | null;
}) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [background, setBackground] = useState<ProjectBackground>(
    ProjectBackground.OCEAN,
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createProjectMutation = useCreateProject();

  useEffect(() => {
    if (editProject) {
      setName(editProject.title);
      setDescription(editProject.description);
      setBackground(editProject.background);
    } else {
      setName("");
      setDescription("");
      setBackground(ProjectBackground.OCEAN);
    }

    setErrors({});
  }, [editProject, open]);

  const handleSubmit = () => {
    const validationErrors: Record<string, string> = {};

    if (!name.trim()) {
      validationErrors.name = "Project name is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (editProject) {
      return;
    }

    const payload: CreateProjectPayload = {
      title: name.trim(),
      description: description.trim(),
      background,
    };

    createProjectMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Project created successfully");

        setOpen(false);

        setName("");
        setDescription("");
        setBackground(ProjectBackground.OCEAN);
        setErrors({});
      },
    });
  };

  const isLoading = createProjectMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editProject ? "Edit project" : "Create project"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div
            className="relative h-24 overflow-hidden rounded-xl"
            style={{
              background: PROJECT_BACKGROUNDS[background],
            }}
          >
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-white drop-shadow">
                {name || "Project name"}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="proj-name">Project name</Label>

            <Input
              id="proj-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);

                if (errors.name) {
                  setErrors((prev) => ({
                    ...prev,
                    name: "",
                  }));
                }
              }}
              placeholder="e.g. Mobile App Redesign"
              aria-invalid={!!errors.name}
              disabled={isLoading}
            />

            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="proj-desc">Description</Label>

            <Textarea
              id="proj-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Project background</Label>

            <div className="flex flex-wrap gap-2">
              {Object.values(ProjectBackground).map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={isLoading}
                  onClick={() => setBackground(item)}
                  className={cn(
                    "h-9 w-9 rounded-lg transition-all",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    background === item
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "hover:scale-110",
                  )}
                  style={{
                    background: PROJECT_BACKGROUNDS[item],
                  }}
                  aria-label={`Select ${item} background`}
                />
              ))}
            </div>

            <p className="text-xs text-muted-foreground capitalize">
              Selected: {background}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading
              ? "Creating..."
              : editProject
                ? "Save changes"
                : "Create project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
