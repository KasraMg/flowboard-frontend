import { cookies } from "next/headers";
import { backendUrl } from "./helpers";

export async function getUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return null;
  }

  const response = await fetch(`${backendUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  return response.json();
}
