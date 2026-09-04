import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { backendUrl } from "../lib/helpers";
import { toast } from "sonner";

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
  return response.json();
};

const useUser = () => {
  return useQuery({
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
  return response.json();
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
  }): Promise<{ message: string }> => {
    const response = await fetch(`${backendUrl}/users`, {
      method: "PUT",
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
    return response.json();
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
    formData: any,
  ): Promise<{ message: string }> => {
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
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
