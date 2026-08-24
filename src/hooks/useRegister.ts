import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "../lib/helpers";
import { toast } from "sonner";
import { RegisterFormValues } from "../components/modules/layout/auth/partials/register/hook";

type RegisterResponse = {
  access_token: string;
};
export const useRegister = () => {
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

  return useMutation({
    mutationFn: registerRequest,

    onError(error) {
      toast.error(error.message);
    },
  });
};
