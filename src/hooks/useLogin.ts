import { toast } from "sonner";
import { backendUrl } from "../lib/helpers";
import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "../components/modules/layout/auth/partials/login/hook";

type LoginResponse = {
  access_token: string;
};

export const useLogin = () => {
  const loginRequest = async (
    data: LoginFormValues,
  ): Promise<LoginResponse> => {
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
  return useMutation({
    mutationFn: loginRequest,
    onError(error) {
      toast.error(error.message);
    },
  });
};
