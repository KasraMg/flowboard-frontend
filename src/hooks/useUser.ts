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
    throw new Error(error.message || "خطا در دریافت اطلاعات کاربر");
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
