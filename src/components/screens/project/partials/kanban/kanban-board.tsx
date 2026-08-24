"use client";

import { AddItem } from "./partials/add-item";
import { KanbanColumn } from "./partials/kanban-column";
import { useProject } from "@/src/hooks/useProject";

export function KanbanBoard({ projectId }: { projectId: number }) {
  const { data: project } = useProject(String(projectId));

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4 pr-4 scrollbar-thin">
      {project?.columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={column.tasks}
          columns={project?.columns}
          projectId={project.id}
        />
      ))}

      <div className="w-72 shrink-0">
        <AddItem columnsLength={Number(project?.columns.length)} />
      </div>
    </div>
  );
}
