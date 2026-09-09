"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useProject } from "@/src/hooks/useProject";
import { SortableColumn } from "./partials/sortable-column";
import { KanbanColumn } from "./partials/kanban-column/kanban-column";
import { AddItem } from "./partials/kanban-column/partials/add-item";
import { useProjectBoardDnd } from "@/src/hooks/use-project-board-dnd";

export function ProjectBoard({ projectId }: { projectId: number }) {
  const { data: project } = useProject(String(projectId));

  const { columns, handleDragStart, handleDragOver, handleDragEnd } =
    useProjectBoardDnd({
      projectId,
      initialColumns: project?.columns ?? [],
    });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={columns.map((column) => `column-${column.id}`)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex h-full gap-4 pt-4 overflow-x-auto pb-4 pr-4 scrollbar-thin">
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
