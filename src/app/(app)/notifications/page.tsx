import NotificationsScreen from "@/src/components/screens/notification/notification-screen";
import { getNotifications } from "@/src/lib/server-fetches";
import Hydrated from "@/src/providers/hydrated";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowBoard — Notifications",
  icons: "/fav-icon.png",
  description:
    "FlowBoard is a modern project and task management app with boards, lists, calendars, and more.",
};

const NotificationsPage = async () => {
  return (
    <Hydrated queryFn={getNotifications} queryKey={["notifications"]}>
      <NotificationsScreen />
    </Hydrated>
  );
};

export default NotificationsPage;
