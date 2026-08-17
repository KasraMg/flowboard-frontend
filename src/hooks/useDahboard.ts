import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { backendUrl } from "../lib/helpers";

export const fetchDashboard = async () => {
  const response = await fetch(`${backendUrl}/dashboard`, {
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

const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    enabled: true,
    retry: false,
  });
};

export default useDashboard;
