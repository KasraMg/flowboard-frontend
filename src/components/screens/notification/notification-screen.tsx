"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  Trash2,
  UserPlus,
  MessageSquare,
  Clock,
  AlertTriangle,
  AtSign,
  FolderKanban,
} from "lucide-react";
import { useApp } from "@/src/providers/app-provider";
import { UserAvatar } from "@/src/components/modules/user-avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/src/components/ui/tabs";
import { cn } from "@/src/lib/utils";
import { relativeTime } from "@/src/lib/helpers";
import type { Notification } from "@/src/lib/types";
import { toast } from "sonner";

const iconMap: Record<Notification["type"], { icon: any; color: string }> = {
  assignment: {
    icon: UserPlus,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-950",
  },
  deadline: {
    icon: Clock,
    color: "text-amber-500 bg-amber-50 dark:bg-amber-950",
  },
  comment: {
    icon: MessageSquare,
    color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950",
  },
  invite: {
    icon: FolderKanban,
    color: "text-violet-500 bg-violet-50 dark:bg-violet-950",
  },
  update: { icon: Bell, color: "text-slate-500 bg-slate-50 dark:bg-slate-800" },
  mention: { icon: AtSign, color: "text-pink-500 bg-pink-50 dark:bg-pink-950" },
};

export default function NotificationsScreen() {
  const {
    notifications,
    users,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
  } = useApp();
  const router = useRouter();

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  const handleClick = (n: Notification) => {
    if (!n.read) markNotificationRead(n.id);
    if (n.targetType === "project") router.push(`/projects/${n.targetId}`);
    else if (n.targetType === "task") router.push(`/projects/${n.targetId}`);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {unread.length} unread of {notifications.length} total
          </p>
        </div>
        {unread.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => {
              markAllNotificationsRead();
              toast.success("All marked as read");
            }}
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </Button>
        )}
      </div>

      <Tabs defaultValue="unread">
        <TabsList>
          <TabsTrigger value="unread">Unread ({unread.length})</TabsTrigger>
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="unread" className="mt-4 space-y-2">
          {unread.length === 0 ? (
            <EmptyState />
          ) : (
            unread.map((n) => (
              <NotifCard
                key={n.id}
                n={n}
                users={users}
                onClick={handleClick}
                onRead={markNotificationRead}
                onDelete={deleteNotification}
              />
            ))
          )}
        </TabsContent>
        <TabsContent value="all" className="mt-4 space-y-2">
          {notifications.length === 0 ? (
            <EmptyState />
          ) : (
            notifications.map((n) => (
              <NotifCard
                key={n.id}
                n={n}
                users={users}
                onClick={handleClick}
                onRead={markNotificationRead}
                onDelete={deleteNotification}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotifCard({
  n,
  users,
  onClick,
  onRead,
  onDelete,
}: {
  n: Notification;
  users: any[];
  onClick: (n: Notification) => void;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const user = users.find((u) => u.id === n.userId);
  const meta = iconMap[n.type];
  const Icon = meta.icon;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        !n.read && "border-primary/30 bg-primary/5",
      )}
    >
      <CardContent
        className="flex items-start gap-3 p-3"
        onClick={() => onClick(n)}
      >
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            meta.color,
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {user && <UserAvatar user={user} size="xs" />}
            <p className="text-sm font-medium">{n.title}</p>
            {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{n.message}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {relativeTime(n.createdAt)}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          {!n.read && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onRead(n.id);
              }}
            >
              <CheckCheck className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(n.id);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center">
      <Bell className="h-10 w-10 text-muted-foreground/40" />
      <h3 className="mt-3 font-medium">No notifications</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        You're all caught up!
      </p>
    </div>
  );
}
