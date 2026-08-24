"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie"; 
import { useLogin as useLoginMutation } from "@/src/hooks/useLogin";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = (setOpen: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useLoginMutation();
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess(data) {
        Cookies.set("token", data.access_token);
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        setOpen(false);
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
