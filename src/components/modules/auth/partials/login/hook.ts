"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useLogin as useLoginMutation } from "@/src/hooks/useLogin";
import { useRouter } from "next/navigation";
import { fetchMe } from "@/src/hooks/useUser";

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

  const router = useRouter();
  const mutation = useLoginMutation();

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: async (data) => {
        Cookies.set("token", data.access_token);
        await queryClient.refetchQueries({
          queryKey: ["user"],
        });

        setOpen(false);
        router.refresh();
        router.replace("/dashboard");
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
