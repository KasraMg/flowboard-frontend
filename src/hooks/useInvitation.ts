"use client";

import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "../lib/helpers";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

export interface ChangeInvitationStatusPayload {
  action: "accept" | "reject";
  invitationId: number;
}

export interface ChangeInvitationStatusResponse {
  message: string;
  success: boolean;
  data: any;
}

export function useChangeInvitationStatus() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (
      payload: ChangeInvitationStatusPayload,
    ): Promise<ChangeInvitationStatusResponse> => {
      const response = await fetch(
        `${backendUrl}/invitations/${payload.invitationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          credentials: "include",
          body: JSON.stringify({ action: payload.action }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to change invitation status");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      router.refresh();
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}
