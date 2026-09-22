import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { backendUrl } from "../lib/helpers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { notification, NotificationData } from "../lib/types";

export function useNotification() {
  return useQuery<NotificationData>({
    queryKey: ["notifications"],

    queryFn: async () => {
      const response = await fetch(`${backendUrl}/notifications`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Notification");
      }

      const result = await response.json();

      return result;
    },
  });
}

export const useDeleteNotification = (id: number) => {
  const queryClient = useQueryClient();

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
      queryClient.setQueryData(["notifications"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          notifications: oldData.notifications.filter(
            (notification: notification) => notification.id !== id,
          ),
        };
      });

      toast.success(data.message);
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
