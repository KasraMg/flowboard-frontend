import { ProjectActivity } from "./project-activity";
import { ProjectBoard } from "./project-board";
import { ProjectCalendar } from "./project-calendar";
import { ProjectList } from "./project-list";
import { ProjectSettings } from "./project-settings";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Activity,
  Calendar,
  LayoutDashboard,
  List,
  Settings,
} from "lucide-react";

export function ProjectContent({ projectId }: { projectId: number }) {
  return (
    <>
      <div className="shrink-0 border-b px-4 py-3 md:px-6">
        <Tabs defaultValue="board">
          <TabsList>
            <TabsTrigger value="board" className="gap-1.5">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Board
            </TabsTrigger>

            <TabsTrigger value="list" className="gap-1.5">
              <List className="h-3.5 w-3.5" />
              List
            </TabsTrigger>

            <TabsTrigger value="calendar" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Calendar
            </TabsTrigger>

            <TabsTrigger value="activity" className="gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              Activity
            </TabsTrigger>

            <TabsTrigger value="settings" className="gap-1.5">
              <Settings className="h-3.5 w-3.5" />
              Settings
            </TabsTrigger>
          </TabsList>

          <main className="min-h-0 flex-1 overflow-hidden">
            <TabsContent value="board">
              <ProjectBoard projectId={projectId} />
            </TabsContent>
            <TabsContent value="list">
              <ProjectList projectId={projectId} />
            </TabsContent>
            <TabsContent value="calendar">
              <ProjectCalendar projectId={projectId} />
            </TabsContent>
            <TabsContent value="activity">
              <ProjectActivity projectId={projectId} />
            </TabsContent>
            <TabsContent value="settings">
              <ProjectSettings projectId={projectId} />
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </>
  );
}
