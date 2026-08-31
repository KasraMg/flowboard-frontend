"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import { useEffect, useState } from "react";

import { AddItem } from "./partials/add-item";
import { KanbanColumn } from "./partials/kanban-column";
import { useProject } from "@/src/hooks/useProject";
import { SortableColumn } from "./partials/sortable-column";
import { useReorderColumns } from "@/src/hooks/useColumn";

export function KanbanBoard({ projectId }: { projectId: number }) {
  const { data: project } = useProject(String(projectId));

  const [columns, setColumns] = useState(project?.columns ?? []);
  const { mutate: reorderColumns } = useReorderColumns(projectId);

  useEffect(() => {
    if (project?.columns) {
      setColumns(project.columns);
    }
  }, [project?.columns]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = columns.findIndex((column) => column.id === active.id);

    const newIndex = columns.findIndex((column) => column.id === over.id);

    const reorderedColumns = arrayMove(columns, oldIndex, newIndex);

    setColumns(reorderedColumns);

    const data = reorderedColumns.map((column) => column.id);
    reorderColumns(data);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={columns.map((column) => column.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex h-full gap-4 overflow-x-auto pb-4 pr-4 scrollbar-thin">
          {columns.map((column) => (
            <SortableColumn key={column.id} column={column}>
              {({ dragAttributes, dragListeners }) => (
                <KanbanColumn
                  column={column}
                  tasks={column.tasks}
                  columns={columns}
                  projectId={projectId}
                  dragAttributes={dragAttributes}
                  dragListeners={dragListeners}
                />
              )}
            </SortableColumn>
          ))}

          <div className="w-72 shrink-0">
            <AddItem columnsLength={columns.length} />
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
