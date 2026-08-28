import { ProjectBoard } from "./project-board";
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

            <TabsTrigger value="members" className="gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              Members
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
            <TabsContent value="members">
              <ProjectBoard projectId={projectId} />
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
