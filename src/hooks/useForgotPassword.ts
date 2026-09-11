"use client";

import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "../lib/helpers";
import { toast } from "sonner";
import Cookies from "js-cookie";

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (
      email: string,
    ): Promise<{
      message: string;
      success: boolean;
    }> => {
      const response = await fetch(
        `${backendUrl}/auth/forgot-password/${email}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create otp");
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
export function useResetPassword() {
  return useMutation({
    mutationFn: async (paylod: {
      email: string;
      password: string;
    }): Promise<{
      message: string;
      success: boolean;
    }> => {
      const response = await fetch(
        `${backendUrl}/auth/reset-password/${paylod.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${Cookies.get("token")}`,
          },

          body: JSON.stringify({ password: paylod.password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to reset password");
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
export function useVerifyOtp() {
  return useMutation({
    mutationFn: async (paylod: {
      email: string;
      otp: string;
    }): Promise<{
      message: string;
      success: boolean;
    }> => {
      const response = await fetch(
        `${backendUrl}/auth/verify-otp/${paylod.email}/${paylod.otp}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to verify otp");
      }
      return data;
    },

    onError(error) {
      toast.error(error.message);
    },
  });
}
