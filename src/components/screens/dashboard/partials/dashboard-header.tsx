"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import useUser from "@/src/hooks/useUser";

export function DashboardHeader() {
  const { data } = useUser();
  const router = useRouter();

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, {data?.data.user.name.split(" ")[0]} 👋
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening across your workspace today.
        </p>
      </div>

      <Button
        onClick={() => router.push("/projects")}
        className="gap-2 self-start sm:self-auto"
      >
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </div>
  );
}
