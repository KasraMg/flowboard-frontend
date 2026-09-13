"use client";
import { Bell } from "lucide-react";
import type { NotificationData } from "@/src/lib/types";
import InvitationCard from "./partials/invitation-card";
import NotificationCard from "./partials/notification-card";
import { useEffect } from "react";
import { useReadAllNotifications } from "@/src/hooks/useNotification";

export default function NotificationsScreen({
  data,
}: {
  data: NotificationData;
}) {
  const { mutate } = useReadAllNotifications();

  useEffect(() => {
    return () => {
      mutate();
    };
  }, []);
  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 md:p-6">
      {data?.invitations.length == 0 && data?.notifications.length == 0 ? (
        <div className="flex flex-col items-center justify-center pt-20 text-center">
          <Bell className="h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-3 font-medium">No notifications</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            You're all caught up!
          </p>
        </div>
      ) : (
        <>
          {data.invitations.map((invite) => (
            <InvitationCard data={invite} />
          ))}

          {data.notifications.map((notification) => (
            <NotificationCard data={notification} />
          ))}
        </>
      )}
    </div>
  );
}
