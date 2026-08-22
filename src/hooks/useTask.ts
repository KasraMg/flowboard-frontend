"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project, Task } from "@/src/lib/types";
import { backendUrl } from "../lib/helpers";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CreateTaskPayload {
  title: string;
  columnId: number;
  projectId: number;
}

export interface CreateTaskResponse {
  message: string;
  success: boolean;
  data: any;
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

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["project", String(projectId)],
      });
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
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  assigneeIds?: number[];
}

export interface EditTaskResponse {
  message: string;
  success: boolean;
  data: Task;
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
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["project", String(projectId)],
      });
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

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["project", String(projectId)],
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}
