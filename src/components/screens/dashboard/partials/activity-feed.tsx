import { Card, CardContent } from "@/src/components/ui/card";
import { UserAvatar } from "@/src/components/modules/user-avatar";
import { relativeTime } from "@/src/lib/helpers";
import { cn } from "@/src/lib/utils";

interface ActivityFeedProps {
  activities: any[];
  users: any[];
}

export function ActivityFeed({ activities, users }: ActivityFeedProps) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Activity feed</h2>

      <Card>
        <CardContent className="p-0">
          <div className="max-h-[480px] space-y-0 overflow-y-auto scrollbar-thin">
            {activities.slice(0, 8).map((activity, index) => {
              const user = users.find((user) => user.id === activity.userId);

              return (
                <div
                  key={activity.id ?? index}
                  className={cn(
                    "flex gap-3 p-3",
                    index < 7 && "border-b border-border",
                  )}
                >
                  {user && <UserAvatar user={user} size="sm" />}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug">
                      <span className="font-medium">{user?.name}</span>{" "}
                      {activity.text}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {relativeTime(activity.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
