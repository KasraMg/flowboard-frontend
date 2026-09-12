"use client";

import { User, Palette } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import Appearance from "./partials/appearance";
import Account from "./partials/account";

export default function SettingsScreen() {
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
          <Account />
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Appearance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
