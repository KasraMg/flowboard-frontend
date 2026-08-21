"use client";

import { KanbanBoard } from "@/src/components/screens/project/partials/kanban/kanban-board";

export function ProjectBoard({ projectId }: { projectId: number }) {
  return (
    <div className="h-full overflow-hidden p-4 md:p-6">
      <KanbanBoard
        projectId={projectId}
        onOpenTask={() => {}}
        onEditTask={() => {}}
        onCreateTask={() => {}}
      />
    </div>
  );
}
