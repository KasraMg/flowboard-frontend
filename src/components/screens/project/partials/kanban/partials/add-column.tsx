"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useCreateColumn, useCreateTask } from "@/src/hooks/useProject";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { KeyboardEvent, useState } from "react";

export function AddItem({
  columnsLength,
  columnId,
  isTask,
}: {
  columnsLength?: number;
  columnId?: number;
  isTask?: boolean;
}) {
  const [title, setTitle] = useState("");
  const { projectId } = useParams();
  const [addingItem, setAddingItem] = useState(false);
  const { mutate: createColumnMutate } = useCreateColumn(Number(projectId));
  const { mutate: createTaskMutate } = useCreateTask(Number(projectId));

  const submit = () => {
    if (!title.trim()) return;

    if (isTask) {
      createTaskMutate(
        { title, columnId: Number(columnId), projectId: Number(projectId) },
        {
          onSuccess() {
            setAddingItem(false);
            setTitle("");
          },
        },
      );
    } else {
      createColumnMutate(
        { title, position: Number(columnsLength) + 1 },
        {
          onSuccess() {
            setAddingItem(false);
            setTitle("");
          },
        },
      );
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submit();
    }

    if (event.key === "Escape") {
      setAddingItem(false);
    }
  };

  return addingItem ? (
    <div className="rounded-xl border bg-muted/40 p-3">
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`${isTask ? "Task" : "Column"} name`}
        autoFocus
      />

      <div className="pt-4 flex gap-2">
        <Button size="sm" onClick={submit} disabled={!title.trim()}>
          Add
        </Button>

        <Button size="sm" variant="ghost" onClick={() => setAddingItem(false)}>
          Cancel
        </Button>
      </div>
    </div>
  ) : (
    <Button
      variant="outline"
      className="w-full border-dashed"
      onClick={() => setAddingItem(true)}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add {isTask ? "task" : "column"}
    </Button>
  );
}
