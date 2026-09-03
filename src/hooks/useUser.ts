import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { backendUrl } from "../lib/helpers";

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
