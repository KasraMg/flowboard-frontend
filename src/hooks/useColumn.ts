import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendUrl } from "../lib/helpers";
import Cookies from "js-cookie";

export interface CreateColumnPayload {
  title: string;
  position: number;
}

export interface CreateColumnResponse {
  message: string;
  success: boolean;
  data: any;
}

export function useCreateColumn(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: CreateColumnPayload,
    ): Promise<CreateColumnResponse> => {
      const response = await fetch(`${backendUrl}/columns/${projectId}`, {
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
        throw new Error(data?.message || "Failed to create column");
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

export interface EditColumnPayload {
  title: string;
  position?: number;
  columnId: number;
}

export interface EditColumnResponse {
  message: string;
  success: boolean;
  data: any;
}

export function useEditColumn(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: EditColumnPayload,
    ): Promise<EditColumnResponse> => {
      const response = await fetch(
        `${backendUrl}/columns/${payload.columnId}`,
        {
          method: "PATCH",
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
        throw new Error(data?.message || "Failed to edit column");
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

export interface DeleteColumnResponse {
  message: string;
  success: boolean;
}
export function useDeleteColumn(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (columnId: number): Promise<DeleteColumnResponse> => {
      const response = await fetch(`${backendUrl}/columns/${columnId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete column");
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

export function useReorderColumns(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (columnIds: number[]) => {
      const response = await fetch(
        `${backendUrl}/columns/reorder/${projectId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            columnIds,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to reorder columns");
      }

      return response.json();
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
