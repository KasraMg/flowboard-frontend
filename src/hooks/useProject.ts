"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "@/src/lib/types";
import { backendUrl } from "../lib/helpers";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export enum ProjectBackground {
  OCEAN = "ocean",
  SUNSET = "sunset",
  PURPLE = "purple",
  FOREST = "forest",
  FIRE = "fire",
  SKY = "sky",
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  background: ProjectBackground;
}

export interface CreateProjectResponse {
  message: string;
  success: boolean;
  data: Project;
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: CreateProjectPayload,
    ): Promise<CreateProjectResponse> => {
      const response = await fetch(`${backendUrl}/projects`, {
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
        throw new Error(data?.message || "Failed to create project");
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}

export function useDeleteProject(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<CreateProjectResponse> => {
      const response = await fetch(`${backendUrl}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete project");
      }

      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}

export interface UpdateProjectPayload {
  title?: string;
  description?: string;
  background?: ProjectBackground;
  status?: "archived" | "active";
}
export interface UpdateProjectResponse {
  message: string;
  success: boolean;
  data: Project;
}
export function useUpdateProject(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: UpdateProjectPayload,
    ): Promise<UpdateProjectResponse> => {
      const response = await fetch(`${backendUrl}/projects/${projectId}`, {
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
        throw new Error(data?.message || "Failed to update project");
      }

      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}

export function useRemoveUserFromProject(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      userId: number;
      projectId: number;
    }): Promise<CreateProjectResponse> => {
      const response = await fetch(
        `${backendUrl}/project-members/${payload.projectId}/${payload.userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to remove user from project");
      }

      return data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}

export function useProject(projectId: string) {
  return useQuery<Project>({
    queryKey: ["project", projectId],

    queryFn: async () => {
      const response = await fetch(`${backendUrl}/projects/${projectId}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      return response.json();
    },

    enabled: !!projectId,
  });
}

export function useProjects() {
  return useQuery<Project>({
    queryKey: ["projects"],

    queryFn: async () => {
      const response = await fetch(`${backendUrl}/projects`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return response.json();
    },
  });
}
