import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendUrl } from "../lib/helpers";
import Cookies from "js-cookie";
import { toast } from "sonner";

export interface toggleFavoriteResponse {
  message: string;
  success: boolean;
  data: any;
}

export function useToggleFavorite(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<toggleFavoriteResponse> => {
      const response = await fetch(
        `${backendUrl}/favorites/toggle/${projectId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to toggle favorite");
      }

      return response.json();
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", String(projectId)],
      });
      queryClient.invalidateQueries({
        queryKey: ["sidebar"],
      });

      toast.success(data.message);
    },
  });
}
