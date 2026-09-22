import { toast } from "sonner";
import { backendUrl } from "../lib/helpers";
import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "../components/modules/auth/partials/login/hook";
import { User } from "../lib/types";

export const useLogin = () => {
  const loginRequest = async (
    data: LoginFormValues,
  ): Promise<{ access_token: string; user: User }> => {
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

    const result = await response.json();
    return result;
  };
  return useMutation({
    mutationFn: loginRequest,
    onError(error) {
      toast.error(error.message);
    },
  });
};
