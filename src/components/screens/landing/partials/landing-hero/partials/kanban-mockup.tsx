"use client";

import { MoreHorizontal } from "lucide-react";
import {
  landingTasks,
  landingColumns,
  landingUsers,
  landingLabels,
} from "../../../../../../lib/landing-data";
import { MockTaskCard } from "./mock-task-card";

export function KanbanMockup({ compact = false }: { compact?: boolean }) {
  const visibleColumns = compact
    ? landingColumns.filter((c) => c.id !== "lc1")
    : landingColumns;

  return (
    <div className="flex gap-3 overflow-hidden">
      {visibleColumns.map((column) => {
        const colTasks = landingTasks
          .filter((t) => t.columnId === column.id)
          .sort((a, b) => a.position - b.position);
        return (
          <div
            key={column.id}
            className="flex w-56 shrink-0 flex-col rounded-xl border border-border bg-muted/40"
          >
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <span className="flex-1 text-sm font-semibold">
                {column.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {colTasks.length}
              </span>
              <MoreHorizontal className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 space-y-2 px-2 pb-2">
              {colTasks.map((task) => (
                <MockTaskCard
                  key={task.id}
                  task={task}
                  users={landingUsers}
                  labels={landingLabels}
                />
              ))}
              {colTasks.length === 0 && (
                <div className="flex items-center justify-center py-6 text-xs text-muted-foreground">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
