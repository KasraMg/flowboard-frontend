"use client";

import * as React from "react";
import { useApp } from "@/src/providers/app-provider";
import type { Task } from "@/src/lib/types";
import { toast } from "sonner";

export function useKanban(projectId: number) {
  const {
    columns,
    tasks,
    createColumn,
    renameColumn,
    deleteColumn,
    moveTask,
    createTask,
    deleteTask,
  } = useApp();

  const projectIdString = String(projectId);

  const projectColumns = React.useMemo(() => {
    return columns
      .filter((column) => column.projectId === projectIdString)
      .sort((a, b) => a.position - b.position);
  }, [columns, projectIdString]);

  const getColumnTasks = React.useCallback(
    (columnId: string) => {
      return tasks
        .filter(
          (task) =>
            task.projectId === projectIdString && task.columnId === columnId,
        )
        .sort((a, b) => a.position - b.position);
    },
    [tasks, projectIdString],
  );

  const [draggedTask, setDraggedTask] = React.useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = React.useState<string | null>(
    null,
  );

  const [addingColumn, setAddingColumn] = React.useState(false);
  const [newColumnName, setNewColumnName] = React.useState("");

  const [editingColumnId, setEditingColumnId] = React.useState<string | null>(
    null,
  );
  const [columnNameDraft, setColumnNameDraft] = React.useState("");

  const startColumnEdit = React.useCallback(
    (columnId: string, name: string) => {
      setEditingColumnId(columnId);
      setColumnNameDraft(name);
    },
    [],
  );

  const cancelColumnEdit = React.useCallback(() => {
    setEditingColumnId(null);
    setColumnNameDraft("");
  }, []);

  const saveColumnRename = React.useCallback(
    (columnId: string) => {
      const name = columnNameDraft.trim();

      if (name) {
        renameColumn(columnId, name);
      }

      cancelColumnEdit();
    },
    [columnNameDraft, renameColumn, cancelColumnEdit],
  );

  const addNewColumn = React.useCallback(() => {
    const name = newColumnName.trim();

    if (!name) return;

    createColumn(projectIdString, name);

    setNewColumnName("");
    setAddingColumn(false);

    toast.success("Column added");
  }, [newColumnName, createColumn, projectIdString]);

  const startDrag = React.useCallback((taskId: string) => {
    setDraggedTask(taskId);
  }, []);

  const dragOver = React.useCallback((columnId: string) => {
    setDragOverColumn(columnId);
  }, []);

  const endDrag = React.useCallback(() => {
    setDraggedTask(null);
    setDragOverColumn(null);
  }, []);

  const dropTask = React.useCallback(
    (columnId: string) => {
      if (!draggedTask) return;

      const columnTasks = getColumnTasks(columnId);

      moveTask(draggedTask, columnId, columnTasks.length);

      toast.success("Task moved");

      endDrag();
    },
    [draggedTask, getColumnTasks, moveTask, endDrag],
  );

  const duplicateTask = React.useCallback(
    (task: Task) => {
      createTask({
        title: `${task.title} (copy)`,
        description: task.description,
        priority: task.priority,
        labelIds: task.labelIds,
        columnId: task.columnId,
        projectId: task.projectId,
        assigneeId: task.assigneeId,
        dueDate: task.dueDate,
      });

      toast.success("Task duplicated");
    },
    [createTask],
  );

  const removeTask = React.useCallback(
    (taskId: string) => {
      deleteTask(taskId);
      toast.success("Task deleted");
    },
    [deleteTask],
  );

  const moveTaskToColumn = React.useCallback(
    (taskId: string, columnId: string) => {
      moveTask(taskId, columnId);
      toast.success("Task moved");
    },
    [moveTask],
  );

  const removeColumn = React.useCallback(
    (columnId: string) => {
      deleteColumn(columnId);
      toast.success("Column deleted");
    },
    [deleteColumn],
  );

  return {
    projectColumns,
    getColumnTasks,

    draggedTask,
    dragOverColumn,

    addingColumn,
    setAddingColumn,

    newColumnName,
    setNewColumnName,

    editingColumnId,
    columnNameDraft,

    startColumnEdit,
    cancelColumnEdit,
    saveColumnRename,

    addNewColumn,

    startDrag,
    dragOver,
    dropTask,
    endDrag,

    duplicateTask,
    removeTask,
    moveTaskToColumn,
    removeColumn,
  };
}
