import { List, Loader } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import { relativeTime } from "@/src/lib/helpers";
import { notification } from "@/src/lib/types";
import { useDeleteNotification } from "@/src/hooks/useNotification"

const NotificationCard = ({ data }: { data: notification }) => {
  const { mutate, isPending } = useDeleteNotification(data.id);
  return (
    <Card
      className={`${data.isRead ? "opacity-70" : "border-primary/30 bg-primary/5"}`}
    >
      <CardContent className="flex flex-wrap items-center gap-3 p-3">
        <div
          className={cn(
            "sm:flex! hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          )}
        >
          <List className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              ! New Task Assignment in {data.subject}:
            </p>
          </div>
          <p className="pt-2 text-sm text-muted-foreground">{data.message}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <p className="text-xs text-muted-foreground">
            {relativeTime(data.createdAt)}
          </p>
        </div>

        <div className="flex gap-3 lg:w-max! w-full lg:pt-0! pt-3">
          <Button
            onClick={() => {
              mutate();
            }}
            size={"sm"}
            className="w-full"
            variant={"destructive"}
          >
            {isPending ? (
              <Loader className="animate-spin" size={17} />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
