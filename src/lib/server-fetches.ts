import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return undefined;
  }

  const response = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  const result = await response.json();
  return result.data;
}
export async function getProject(projectId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return null;
  }

  const response = await fetch(`${process.env.BACKEND_URL}/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  const result = await response.json();
  return result.data;
}
export async function getProjects() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return null;
  }

  const response = await fetch(`${process.env.BACKEND_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  const result = await response.json();

  return result.data;
}
export async function getDashboardData() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return null;
  }

  const response = await fetch(`${process.env.BACKEND_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  const result = await response.json();
  return result.data;
}
export async function getSideBar() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return undefined;
  }

  const response = await fetch(`${process.env.BACKEND_URL}/users/sidebar`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  const result = await response.json();
  return result.data;
}
export async function getNotifications() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  if (!accessToken?.value) {
    return undefined;
  }

  const response = await fetch(`${process.env.BACKEND_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  const result = await response.json();
  return result.data;
}
