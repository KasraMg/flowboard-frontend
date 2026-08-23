"use client";
import { Bell, UserPlus } from "lucide-react";
import { UserAvatar } from "@/src/components/modules/user-avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import { relativeTime } from "@/src/lib/helpers";
import type { NotificationData, User } from "@/src/lib/types";

export default function NotificationsScreen({
  data,
}: {
  data: {
    data: NotificationData[];
  };
}) {
  console.log(data);

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 md:p-6">
      {data?.data.length == 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center">
          <Bell className="h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-3 font-medium">No notifications</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            You're all caught up!
          </p>
        </div>
      ) : (
        data.data.map((notif) => (
          <Card className={cn("border-primary/30 bg-primary/5")}>
            <CardContent className="flex items-center gap-3 p-3">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                )}
              >
                <UserPlus className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {notif.invitedBy.name && (
                    <UserAvatar user={notif.invitedBy as User} size="xs" />
                  )}
                  <p className="text-sm font-medium">
                    ! New project: {notif.project.title}
                  </p>
                </div>
                <p className="pt-2 text-sm text-muted-foreground">
                  {notif.project.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  {relativeTime(notif.createdAt)}
                </p>
              </div>

              <div className="flex gap-3">
                <Button size={"sm"} className="w-full" variant={"default"}>
                  Accept
                </Button>
                <Button size={"sm"} className="w-full" variant={"destructive"}>
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
