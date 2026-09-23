"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
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
import { useProjectBoardDnd } from "@/src/hooks/useProjectBoardDnd";
import type { Task } from "@/src/lib/types";
import TaskDragOverlay from "./partials/kanban-column/partials/task-drag-overlay";

export function ProjectBoard({ projectId }: { projectId: number }) {
  const { data: project } = useProject(String(projectId));

  const [activeTask, setActiveTask] = useState<Task | null>(null);

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
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
  );

  const handleBoardDragStart = (event: DragStartEvent) => {
    handleDragStart(event);

    const activeId = String(event.active.id);

    if (!activeId.startsWith("task-")) {
      setActiveTask(null);
      return;
    }

    const taskId = Number(activeId.replace("task-", ""));

    const task = columns
      .flatMap((column) => column.tasks)
      .find((task: Task) => task.id === taskId);

    setActiveTask(task ?? null);
  };

  const handleBoardDragEnd = (event: DragEndEvent) => {
    handleDragEnd(event);
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleBoardDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleBoardDragEnd}
      onDragCancel={() => setActiveTask(null)}
    >
      <SortableContext
        items={columns.map((column) => `column-${column.id}`)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex h-full gap-4 overflow-x-auto pb-4 pt-4 pr-4 scrollbar-thin">
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

      <DragOverlay>
        {activeTask ? <TaskDragOverlay task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
