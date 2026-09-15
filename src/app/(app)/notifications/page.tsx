import NotificationsScreen from "@/src/components/screens/notification/notification-screen";
import { backendUrl } from "@/src/lib/helpers";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "FlowBoard — Notifications",
  icons: "/fav-icon.png",
  description:
    "FlowBoard is a modern project and task management app with boards, lists, calendars, and more.",
};

const NotificationsPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");

  const response = await fetch(`${backendUrl}/notifications`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  const data = await response.json();

  return <NotificationsScreen data={data.data} />;
};

export default NotificationsPage;
