"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { backendUrl } from "@/src/lib/helpers";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginResponse = {
  access_token: string;
};

const loginRequest = async (data: LoginFormValues): Promise<LoginResponse> => {
  const response = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      Array.isArray(error.message)
        ? error.message[0]
        : error.message || "Login failed",
    );
  }

  return response.json();
};

export const useLogin = (setOpen: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess(data) {
        Cookies.set("token", data.access_token);
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        setOpen(false);
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  });

  return {
    ...form,

    onSubmit,

    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
