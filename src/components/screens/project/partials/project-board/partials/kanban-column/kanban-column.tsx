"use client";

import type { Column, Task } from "@/src/lib/types";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { AddItem } from "./partials/add-item";
import { useEditColumn } from "@/src/hooks/useColumn";
import KanbanColumnDropdown from "./partials/kanban-column-dropdown";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableTask } from "./partials/sortable-task";

type KanbanColumnProps = {
  column: Column;
  tasks: Task[];
  columns: Column[];
  projectId: number;
  dragAttributes: Record<string, any>;
  dragListeners: any;
};

export function KanbanColumn({
  column,
  tasks,
  columns,
  projectId,
  dragAttributes,
  dragListeners,
}: KanbanColumnProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const { mutate } = useEditColumn(projectId);

  const startEditing = () => {
    setTitle(column.title);
    setEditing(true);
  };

  const handleRenameColumn = (
    columnId: string,
    title: string,
  ) => {
    mutate(
      {
        columnId: Number(columnId),
        title,
      },
      {
        onSuccess() {
          setEditing(false);
        },
      },
    );
  };

  const saveEditing = () => {
    const trimmedName = title.trim();

    if (
      trimmedName &&
      trimmedName !== column.title
    ) {
      handleRenameColumn(
        String(column.id),
        trimmedName,
      );
    } else {
      setEditing(false);
    }
  };

  return (
    <div
      className={cn(
        "flex h-fit max-h-full z-40 relative w-72 shrink-0 flex-col transition-colors rounded-xl border bg-muted/40",
      )}
    >
      <div
        {...dragAttributes}
        {...dragListeners}
        className="absolute inset-0 z-0 cursor-grab"
      />

      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#94a3b8]" />

        {editing ? (
          <Input
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            onBlur={saveEditing}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                saveEditing();
              }

              if (event.key === "Escape") {
                setTitle(column.title);
                setEditing(false);
              }
            }}
            autoFocus
            className="h-7 z-50 relative text-sm font-semibold"
          />
        ) : (
          <button
            type="button"
            onClick={startEditing}
            className="w-max! truncate z-50 relative text-left text-sm font-semibold hover:text-primary"
          >
            {column.title}
          </button>
        )}

        <span className="text-xs text-muted-foreground ml-auto">
          {tasks.length}
        </span>

        <KanbanColumnDropdown
          column={column}
          startEditing={startEditing}
          projectId={projectId}
        />
      </div>

      <div className="min-h-15 z-50 relative flex-1 space-y-2 px-2 pb-2 scrollbar-thin">
        {tasks.length > 0 ? (
          <div className="space-y-4 pb-2">
            <SortableContext
              items={tasks.map(
                (task) => `task-${task.id}`,
              )}
              strategy={
                verticalListSortingStrategy
              }
            >
              {tasks.map((task) => (
                <SortableTask
                  key={task.id}
                  task={task}
                />
              ))}
            </SortableContext>
          </div>
        ) : (
          <div className="flex items-center justify-center py-3.5 text-xs text-muted-foreground">
            No tasks
          </div>
        )}

        <AddItem
          isTask
          columnId={Number(column.id)}
        />
      </div>
    </div>
  );
}