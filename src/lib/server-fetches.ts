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
export async function getProject(projectId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return null;
  }

  const response = await fetch(`${backendUrl}/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  return response.json();
}
export async function getProjects() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return null;
  }

  const response = await fetch(`${backendUrl}/projects`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  return response.json();
}
export async function getDashboardData() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return null;
  }

  const response = await fetch(`${backendUrl}/dashboard`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  return response.json();
}
