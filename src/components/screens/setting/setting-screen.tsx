"use client";

import { User, Palette, Save } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import UserAvatar from "./partials/user-avatar";
import useSetting from "./hook";
import Appearance from "./partials/appearance";

export default function SettingsScreen() {
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
    <div className="mx-auto max-w-3xl space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="flex-wrap">
          <TabsTrigger value="account" className="gap-1.5">
            <User className="h-3.5 w-3.5" />
            Account
          </TabsTrigger>

          <TabsTrigger value="appearance" className="gap-1.5">
            <Palette className="h-3.5 w-3.5" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account Information</CardTitle>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit(updateUserHandler)}
                className="space-y-4"
              >
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
                    <Label htmlFor="set-current-password">
                      Current password
                    </Label>

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

                          if (value && value.length < 8) {
                            return "Password must be at least 8 characters";
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
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Appearance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
