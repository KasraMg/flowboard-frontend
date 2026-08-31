import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import { Button } from "@/src/components/ui/button";
import { UserPlus } from "lucide-react";
import { useCreateInvitation } from "@/src/hooks/useInvitation";
import { useParams } from "next/navigation";

const InviteModal = ({
  triggerSize,
}: {
  triggerSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const { mutate } = useCreateInvitation();
  const { projectId } = useParams();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size={triggerSize ? triggerSize : "sm"}
          className="gap-1.5"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <div className="flex gap-2 items-center">
          <UserPlus className="h-4.5 w-4.5" />
          <p>Invite Member</p>
        </div>

        <div className="flex gap-3 items-center">
          <input
            placeholder="Email Address"
            type="email"
            value={email || ""}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full p-2 border rounded-lg outline-0"
            name="email"
          />
          <Button
            disabled={
              new RegExp(
                "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$",
              ).test(email as string) == false
            }
            onClick={() => {
              mutate(
                {
                  email: String(email),
                  projectId: Number(projectId),
                },
                {
                  onSuccess() {
                    setEmail(null);
                  },
                },
              );
            }}
            variant="default"
            size="sm"
            className="gap-1.5"
          >
            Invite
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
