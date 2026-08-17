"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { backendUrl } from "@/src/lib/helpers";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be less than 30 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),

    age: z.coerce
      .number()
      .min(18, "You must be at least 18 years old")
      .max(100, "Please enter a valid age"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterResponse = {
  access_token: string;
};

const registerRequest = async (
  data: RegisterFormValues,
): Promise<RegisterResponse> => {
  const { confirmPassword, ...registerData } = data;

  const response = await fetch(`${backendUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      Array.isArray(error.message)
        ? error.message[0]
        : error.message || "Registration failed",
    );
  }

  return response.json();
};

export const useRegister = (setOpen: (open: boolean) => void) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: registerRequest,

    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess(data) {
        Cookies.set("token", data.access_token);
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
