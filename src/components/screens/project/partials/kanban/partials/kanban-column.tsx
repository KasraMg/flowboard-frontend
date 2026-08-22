"use client";

import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import type { Column, Task } from "@/src/lib/types";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { AddItem } from "./add-column";
import TaskModal from "./kanban-task-card/task-modal/task-modal";

type KanbanColumnProps = {
  column: Column;
  tasks: Task[];
  columns: Column[];
};

export function KanbanColumn({ column, tasks, columns }: KanbanColumnProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(column.title);

  const startEditing = () => {
    setName(column.title);
    setEditing(true);
  };

  const handleDeleteColumn = (columnId: string) => {};

  const handleRenameColumn = (columnId: string, name: string) => {};

  const saveEditing = () => {
    const trimmedName = name.trim();

    if (trimmedName && trimmedName !== column.title) {
      handleRenameColumn(String(column.id), trimmedName);
    }

    setEditing(false);
  };

  return (
    <div
      className={cn(
        "flex h-fit max-h-full w-72 shrink-0 flex-col transition-colors rounded-xl border bg-muted/40",
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#94a3b8]" />

        {editing ? (
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={saveEditing}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                saveEditing();
              }
              if (event.key === "Escape") {
                setName(column.title);
                setEditing(false);
              }
            }}
            autoFocus
            className="h-7 text-sm font-semibold"
          />
        ) : (
          <button
            type="button"
            onClick={startEditing}
            className="flex-1 truncate text-left text-sm font-semibold hover:text-primary"
          >
            {column.title}
          </button>
        )}

        <span className="text-xs text-muted-foreground">{tasks.length}</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={startEditing}>
              <Edit2 className="mr-2 h-3.5 w-3.5" />
              Rename
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive"
              onClick={() => handleDeleteColumn(String(column.id))}
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Delete column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="min-h-15 flex-1 space-y-2 overflow-y-auto px-2 pb-2 scrollbar-thin">
        {tasks.length !== 0 ? (
          <div className="w-full space-y-3 pb-2">
            {tasks.map((task) => (
              <TaskModal key={task.id} task={task} />
            ))}
          </div>
        ) : (
          ""
        )}

        {tasks.length === 0 && (
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-center py-3.5 text-xs text-muted-foreground">
              No tasks
            </div>
          </div>
        )}
        <AddItem isTask columnId={Number(column.id)} />
      </div>
    </div>
  );
}
