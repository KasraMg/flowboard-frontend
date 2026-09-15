import { Card, CardContent } from "@/src/components/ui/card";
import { TaskRow } from "@/src/components/screens/dashboard/partials/task-row";
import { DashboardResponse } from "@/src/lib/types";

export function RecentTasks({ data }: { data: DashboardResponse }) {
  return data?.recentTasks.length > 0 ? (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent tasks</h2>
      </div>

      <Card>
        <CardContent className="p-3">
          <div className="space-y-1.5 grid grid-cols-2 gap-3">
            {data?.recentTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    ""
  );
}
