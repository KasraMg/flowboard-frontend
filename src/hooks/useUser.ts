import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { backendUrl } from "../lib/helpers";
import { toast } from "sonner";
import { User } from "../lib/types";

export const fetchMe = async () => {
  const response = await fetch(`${backendUrl}/auth/me`, {
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
  const result = await response.json();
  return result.data;
};

const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: fetchMe,
    enabled: true,
    retry: false,
  });
};

export default useUser;

export const fetchSidebar = async () => {
  const response = await fetch(`${backendUrl}/users/sidebar`, {
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
  const result = await response.json();
  return result.data;
};

export const userSidebar = () => {
  return useQuery({
    queryKey: ["sidebar"],
    queryFn: fetchSidebar,
    enabled: true,
    retry: false,
  });
};

export const useUpdateUser = () => {
  const updateUserRequest = async (data: {
    name: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
    emailNotification?: boolean;
  }): Promise<{ message: string }> => {
    const response = await fetch(`${backendUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const result = await response.json();
    return result;
  };

  return useMutation({
    mutationFn: updateUserRequest,
    onSuccess(data) {
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  const updateAvatarRequest = async (
    formData: FormData,
  ): Promise<{
    message: string;
    avatar: string;
  }> => {
    const response = await fetch(`${backendUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  };

  return useMutation({
    mutationFn: updateAvatarRequest,

    onSuccess(data) {
      queryClient.setQueryData(["user"], (oldUser: any) => {
        if (!oldUser) return oldUser;

        return {
          ...oldUser,
          avatar: data.avatar,
        };
      });

      toast.success(data.message);
    },

    onError(error) {
      toast.error(error.message);
    },
  });
};
