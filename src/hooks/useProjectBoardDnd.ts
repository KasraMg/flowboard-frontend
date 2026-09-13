"use client";

import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";

import { Task } from "@/src/lib/types";
import { useReorderColumns } from "@/src/hooks/useColumn";
import { useReorderTasks } from "@/src/hooks/useTask";

type BoardColumn = {
  id: number;
  tasks: Task[];
};

type TaskDropState = {
  taskId: number;
  targetColumnId: number;
  taskIds: number[];
};

type Props<T extends BoardColumn> = {
  projectId: number;
  initialColumns: T[];
};

export function useProjectBoardDnd<T extends BoardColumn>({
  projectId,
  initialColumns,
}: Props<T>) {
  const [columns, setColumns] = useState<T[]>(initialColumns);

  const { mutate: reorderColumns } = useReorderColumns(projectId);

  const { mutate: reorderTasks } = useReorderTasks(projectId);

  const columnsRef = useRef<T[]>(initialColumns);

  const taskSourceColumnId = useRef<number | null>(null);

  const taskDropRef = useRef<TaskDropState | null>(null);

  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

  useEffect(() => {
    columnsRef.current = initialColumns;
    setColumns(initialColumns);
  }, [initialColumns]);

  const findColumnByTaskId = (taskId: number) => {
    return columnsRef.current.find((column) =>
      column.tasks.some((task) => task.id === taskId),
    );
  };

  const updateColumns = (updater: T[] | ((prev: T[]) => T[])) => {
    const nextColumns =
      typeof updater === "function" ? updater(columnsRef.current) : updater;

    columnsRef.current = nextColumns;
    setColumns(nextColumns);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = String(event.active.id);

    taskDropRef.current = null;

    if (!activeId.startsWith("task-")) {
      taskSourceColumnId.current = null;
      return;
    }

    const taskId = Number(activeId.replace("task-", ""));

    const sourceColumn = findColumnByTaskId(taskId);

    taskSourceColumnId.current = sourceColumn?.id ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (!activeId.startsWith("task-")) return;

    const taskId = Number(activeId.replace("task-", ""));

    const activeColumn = findColumnByTaskId(taskId);

    if (!activeColumn) return;

    if (overId.startsWith("column-")) {
      const targetColumnId = Number(overId.replace("column-", ""));

      if (activeColumn.id === targetColumnId) {
        return;
      }

      updateColumns((prev) => {
        const sourceColumn = prev.find(
          (column) => column.id === activeColumn.id,
        );

        const targetColumn = prev.find(
          (column) => column.id === targetColumnId,
        );

        if (!sourceColumn || !targetColumn) {
          return prev;
        }

        const task = sourceColumn.tasks.find((task) => task.id === taskId);

        if (!task) return prev;

        const sourceTasks = sourceColumn.tasks.filter(
          (task) => task.id !== taskId,
        );

        const targetTasks = [...targetColumn.tasks, task];

        taskDropRef.current = {
          taskId,
          targetColumnId: targetColumn.id,
          taskIds: targetTasks.map((task) => task.id),
        };

        return prev.map((column) => {
          if (column.id === sourceColumn.id) {
            return {
              ...column,
              tasks: sourceTasks,
            };
          }

          if (column.id === targetColumn.id) {
            return {
              ...column,
              tasks: targetTasks,
            };
          }

          return column;
        });
      });

      return;
    }

    if (!overId.startsWith("task-")) return;

    const overTaskId = Number(overId.replace("task-", ""));

    if (taskId === overTaskId) return;

    const targetColumn = findColumnByTaskId(overTaskId);

    if (!targetColumn) return;

    if (activeColumn.id === targetColumn.id) {
      return;
    }

    updateColumns((prev) => {
      const sourceColumn = prev.find((column) => column.id === activeColumn.id);

      const destinationColumn = prev.find(
        (column) => column.id === targetColumn.id,
      );

      if (!sourceColumn || !destinationColumn) {
        return prev;
      }

      const activeTask = sourceColumn.tasks.find((task) => task.id === taskId);

      if (!activeTask) return prev;

      const sourceTasks = sourceColumn.tasks.filter(
        (task) => task.id !== taskId,
      );

      const targetTasks = [...destinationColumn.tasks];

      const overIndex = targetTasks.findIndex((task) => task.id === overTaskId);

      const insertIndex = overIndex === -1 ? targetTasks.length : overIndex;

      targetTasks.splice(insertIndex, 0, activeTask);

      taskDropRef.current = {
        taskId,
        targetColumnId: destinationColumn.id,
        taskIds: targetTasks.map((task) => task.id),
      };

      return prev.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            tasks: sourceTasks,
          };
        }

        if (column.id === destinationColumn.id) {
          return {
            ...column,
            tasks: targetTasks,
          };
        }

        return column;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;

    if (activeId.startsWith("column-")) {
      if (!overId || !overId.startsWith("column-")) {
        return;
      }

      const activeColumnId = Number(activeId.replace("column-", ""));

      const overColumnId = Number(overId.replace("column-", ""));

      if (activeColumnId === overColumnId) {
        return;
      }

      const currentColumns = columnsRef.current;

      const oldIndex = currentColumns.findIndex(
        (column) => column.id === activeColumnId,
      );

      const newIndex = currentColumns.findIndex(
        (column) => column.id === overColumnId,
      );

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      const reorderedColumns = arrayMove(currentColumns, oldIndex, newIndex);

      columnsRef.current = reorderedColumns;

      setColumns(reorderedColumns);

      reorderColumns(reorderedColumns.map((column) => column.id));

      return;
    }

    if (!activeId.startsWith("task-")) {
      return;
    }

    const taskId = Number(activeId.replace("task-", ""));

    const sourceColumnId = taskSourceColumnId.current;

    const drop = taskDropRef.current;

    if (
      drop &&
      drop.taskId === taskId &&
      sourceColumnId !== null &&
      drop.targetColumnId !== sourceColumnId
    ) {
      reorderTasks(drop);

      taskDropRef.current = null;
      taskSourceColumnId.current = null;

      return;
    }

    if (sourceColumnId === null) {
      taskDropRef.current = null;
      return;
    }

    if (overId && overId.startsWith("task-")) {
      const overTaskId = Number(overId.replace("task-", ""));

      if (taskId === overTaskId) {
        taskDropRef.current = null;
        taskSourceColumnId.current = null;
        return;
      }

      const targetColumn = findColumnByTaskId(overTaskId);

      if (!targetColumn) {
        taskDropRef.current = null;
        taskSourceColumnId.current = null;
        return;
      }

      if (sourceColumnId === targetColumn.id) {
        const currentColumns = columnsRef.current;

        const column = currentColumns.find(
          (column) => column.id === sourceColumnId,
        );

        if (!column) {
          taskDropRef.current = null;
          taskSourceColumnId.current = null;
          return;
        }

        const oldIndex = column.tasks.findIndex((task) => task.id === taskId);

        const newIndex = column.tasks.findIndex(
          (task) => task.id === overTaskId,
        );

        if (oldIndex === -1 || newIndex === -1) {
          taskDropRef.current = null;
          taskSourceColumnId.current = null;
          return;
        }

        const reorderedTasks = arrayMove(column.tasks, oldIndex, newIndex);

        const nextColumns = currentColumns.map((item) =>
          item.id === column.id
            ? {
                ...item,
                tasks: reorderedTasks,
              }
            : item,
        );

        columnsRef.current = nextColumns;

        setColumns(nextColumns);

        reorderTasks({
          taskId,
          targetColumnId: column.id,
          taskIds: reorderedTasks.map((task) => task.id),
        });
      }

      taskDropRef.current = null;
      taskSourceColumnId.current = null;

      return;
    }

    if (overId && overId.startsWith("column-")) {
      const targetColumnId = Number(overId.replace("column-", ""));

      if (sourceColumnId === targetColumnId) {
        taskDropRef.current = null;
        taskSourceColumnId.current = null;
        return;
      }
    }

    taskDropRef.current = null;
    taskSourceColumnId.current = null;
  };

  return {
    columns,
    setColumns,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
