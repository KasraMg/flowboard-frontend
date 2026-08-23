"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendUrl } from "../lib/helpers";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CreateInvitationPayload {
  email: string;
  projectId: number;
}

export interface CreateInvitationResponse {
  message: string;
  success: boolean;
  data: any;
}

export function useCreateInvitation() {
  return useMutation({
    mutationFn: async (
      payload: CreateInvitationPayload,
    ): Promise<CreateInvitationResponse> => {
      const response = await fetch(`${backendUrl}/invitations`, {
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
        throw new Error(data?.message || "Failed to create invitation");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}

export const fetcInvitations = async () => {
  const response = await fetch(`${backendUrl}/invitations`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      Cookies.remove("token");
      throw new Error("Unauthorized");
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "error");
  }
  return response.json();
};

const useInvitations = () => {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: fetcInvitations,
    enabled: true,
    retry: false,
  });
};
