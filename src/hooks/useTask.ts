"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Column, Task } from "@/src/lib/types";
import { backendUrl } from "../lib/helpers";
import Cookies from "js-cookie";
import { toast } from "sonner";

export interface CreateTaskPayload {
  title: string;
  columnId: number;
  projectId: number;
}

export interface CreateTaskResponse {
  message: string;
  success: boolean;
  task: Task;
}

export function useCreateTask(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: CreateTaskPayload,
    ): Promise<CreateTaskResponse> => {
      const response = await fetch(`${backendUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create task");
      }

      return data;
    },

    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["project", String(projectId)],
        (oldProject: any) => {
          if (!oldProject) return oldProject;

          return {
            ...oldProject,
            columns: oldProject.columns.map((column: Column) => {
              if (column.id !== variables.columnId) {
                return column;
              }

              return {
                ...column,
                tasks: [...column.tasks, data.task],
              };
            }),
          };
        },
      );

      toast.success(data.message);
    },

    onError(error) {
      toast.error(error.message);
    },
  });
}

export interface EditTaskPayload {
  title?: string;
  description?: string;
  completed?: boolean;
  backgroundColor?: string;
  priority?: any;
  dueDate?: string;
  assigneeIds?: number[];
  labels: any;
}

export interface EditTaskResponse {
  message: string;
  success: boolean;
  task: Task;
}
export function useEditTask(taskId: number, projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EditTaskPayload): Promise<EditTaskResponse> => {
      const response = await fetch(`${backendUrl}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to edit task");
      }

      return data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        ["project", String(projectId)],
        (oldProject: any) => {
          if (!oldProject) return oldProject;

          return {
            ...oldProject,
            columns: oldProject.columns.map((column: Column) => ({
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      ...data.task,
                    }
                  : task,
              ),
            })),
          };
        },
      );

      toast.success(data.message);
    },

    onError(error) {
      toast.error(error.message);
    },
  });
}

export interface DeleteTaskResponse {
  message: string;
  success: boolean;
}
export function useDeleteTask(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: number): Promise<DeleteTaskResponse> => {
      const response = await fetch(`${backendUrl}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete task");
      }

      return data;
    },

    onSuccess: (data, taskId) => {
      queryClient.setQueryData(
        ["project", String(projectId)],
        (oldProject: any) => {
          if (!oldProject) return oldProject;

          return {
            ...oldProject,
            columns: oldProject.columns.map((column: Column) => ({
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            })),
          };
        },
      );

      toast.success(data.message);
    },

    onError(error) {
      toast.error(error.message);
    },
  });
}

export function useReorderTasks(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {}) => {
      const response = await fetch(`${backendUrl}/tasks/reorder/${projectId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to reorder columns");
      }

      const result = await response.json();
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", String(projectId)],
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}
