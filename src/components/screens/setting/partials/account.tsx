import UserAvatar from "./user-avatar";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Save } from "lucide-react";
import useSetting from "../hook";

const Account = () => {
  const {
    user,
    isPending,
    errors,
    isDirty,
    updateUserHandler,
    handleSubmit,
    register,
    newPassword,
    currentPassword,
  } = useSetting();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Account Information</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(updateUserHandler)} className="space-y-4">
          <div className="flex items-center gap-4">
            <UserAvatar user={user} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="set-name">Name</Label>
            <Input id="set-name" {...register("name")} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="set-email">Email</Label>
            <Input id="set-email" type="email" {...register("email")} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="set-current-password">Current password</Label>

              <Input
                id="set-current-password"
                type="password"
                placeholder="••••••••"
                {...register("currentPassword", {
                  validate: (value) => {
                    if (value && !newPassword) {
                      return "New password is required";
                    }

                    return true;
                  },
                })}
              />

              {errors.currentPassword && (
                <p className="text-sm text-destructive">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="set-new-password">New password</Label>
              <Input
                id="set-new-password"
                type="password"
                placeholder="••••••••"
                {...register("newPassword", {
                  validate: (value) => {
                    if (value && !currentPassword) {
                      return "Current password is required";
                    }

                    if (value && value.length < 6) {
                      return "Password must be at least 6 characters";
                    }

                    return true;
                  },
                })}
              />

              {errors.newPassword && (
                <p className="text-sm text-destructive">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 items-center py-2">
              <input
                type="checkbox"
                className="size-5"
                id="set-email-notification"
                {...register("emailNotification")}
              />
              <Label className="block" htmlFor="set-email-notification">
                Email Notification
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending || !isDirty}
            className="gap-1.5"
          >
            <Save className="h-4 w-4" />
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Account;
