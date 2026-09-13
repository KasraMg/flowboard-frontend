import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { backendUrl } from "../lib/helpers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useDeleteNotification = (id: number) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (): Promise<{ message: string }> => {
      const response = await fetch(`${backendUrl}/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete notification");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      router.refresh();
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
export const useReadAllNotifications = () => {
  return useMutation({
    mutationFn: async (): Promise<{ message: string }> => {
      const response = await fetch(`${backendUrl}/notifications/read-all`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to read all notifications");
      }

      return data;
    },

    onError(error) {
      toast.error(error.message);
    },
  });
};
