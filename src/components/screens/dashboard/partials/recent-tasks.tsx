import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { TaskRow } from "@/src/components/modules/task-row";
import { DashboardResponse } from "@/src/lib/types";

export function RecentTasks({ data }: { data: DashboardResponse }) {
  const recentTasks = data
    ? [...data.data.recentTasks]
    : []
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .slice(0, 6);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent tasks</h2>

        <Link href="/tasks">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-3">
          <div className="space-y-1.5">
            {recentTasks.map((task) => (
              <TaskRow key={task.id} task={task} showProject />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
