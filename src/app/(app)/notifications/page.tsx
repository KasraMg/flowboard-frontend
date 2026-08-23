import NotificationsScreen from "@/src/components/screens/notification/notification-screen";
import { backendUrl } from "@/src/lib/helpers";
import { cookies } from "next/headers";

const NotificationsPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");

  const response = await fetch(`${backendUrl}/invitations`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  const data = await response.json();

  return <NotificationsScreen data={data} />;
};

export default NotificationsPage;
