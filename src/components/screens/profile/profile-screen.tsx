"use client";

import * as React from "react";
import {
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  FolderKanban,
  Edit2,
  Save,
} from "lucide-react";
import { useApp } from "@/src/providers/app-provider";
import { UserAvatar } from "@/src/components/modules/user-avatar";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { formatDate, isOverdue } from "@/src/lib/helpers";
import { toast } from "sonner";

export default function ProfileScreen() {
  const { currentUser, tasks, projects, updateProfile } = useApp();
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(currentUser.name);
  const [bio, setBio] = React.useState(currentUser.bio || "");
  const [email, setEmail] = React.useState(currentUser.email);

  const myTasks = tasks.filter((t) => t.assigneeId === currentUser.id);
  const completed = myTasks.filter((t) => t.completed).length;
  const overdue = myTasks.filter(
    (t) => isOverdue(t.dueDate) && !t.completed,
  ).length;
  const myProjects = projects.filter((p) =>
    p.memberIds.includes(currentUser.id),
  );

  const stats = [
    {
      label: "Projects",
      value: myProjects.length,
      icon: FolderKanban,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "Total Tasks",
      value: myTasks.length,
      icon: Clock,
      color: "text-violet-500 bg-violet-50 dark:bg-violet-950",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950",
    },
    {
      label: "Overdue",
      value: overdue,
      icon: Clock,
      color: "text-destructive bg-destructive/10",
    },
  ];

  const save = () => {
    updateProfile({ name, bio, email });
    setEditing(false);
    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-4 md:p-6">
      <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

      {/* Profile header card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <UserAvatar user={currentUser} size="xl" />
            <div className="flex-1">
              {editing ? (
                <div className="space-y-2">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold">{currentUser.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {currentUser.email}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {currentUser.role}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> Joined{" "}
                      {formatDate(currentUser.joinedDate)}
                    </span>
                  </div>
                </>
              )}
            </div>
            {editing ? (
              <Button onClick={save} className="gap-1.5">
                <Save className="h-4 w-4" /> Save
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setEditing(true)}
                className="gap-1.5"
              >
                <Edit2 className="h-4 w-4" /> Edit
              </Button>
            )}
          </div>

          {editing && (
            <div className="mt-4 space-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>
          )}
          {!editing && currentUser.bio && (
            <p className="mt-4 text-sm text-muted-foreground">
              {currentUser.bio}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {myTasks.slice(0, 5).map((t) => {
              const project = projects.find((p) => p.id === t.projectId);
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-lg border p-2"
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: project?.backgroundColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {project?.name}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {t.completed ? "Done" : "Active"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
