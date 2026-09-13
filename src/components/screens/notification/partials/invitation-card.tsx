import { cn } from "@/src/lib/utils";
import { UserAvatar } from "@/src/components/modules/user-avatar";
import { Card, CardContent } from "@/src/components/ui/card";
import { UserPlus } from "lucide-react";
import { invitation, User } from "@/src/lib/types";
import { relativeTime } from "@/src/lib/helpers";
import { Button } from "@/src/components/ui/button";
import { useChangeInvitationStatus } from "@/src/hooks/useInvitation";

const InvitationCard = ({ data }: { data: invitation }) => {
  const { mutate } = useChangeInvitationStatus();

  return (
    <Card className={cn("border-primary/30 bg-primary/5")}>
      <CardContent className="flex items-center gap-3 p-3">
        <div
          className={cn(
            "sm:flex! hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          )}
        >
          <UserPlus className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {data.invitedBy.name && (
              <UserAvatar user={data.invitedBy as User} size="xs" />
            )}
            <p className="text-sm font-medium">
              ! New invitation: {data.project.title}
            </p>
          </div>
          <p className="pt-2 text-sm text-muted-foreground">
            {data.project.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <p className="text-xs text-muted-foreground">
            {relativeTime(data.createdAt)}
          </p>
        </div>

        <div className="flex gap-3 lg:w-max! w-full lg:pt-0! pt-3">
          <Button
            onClick={() => {
              mutate({
                action: "accept",
                invitationId: data.id,
              });
            }}
            size={"sm"}
            className="w-full"
            variant={"default"}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              mutate({
                action: "reject",
                invitationId: data.id,
              });
            }}
            size={"sm"}
            className="w-full"
            variant={"destructive"}
          >
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
