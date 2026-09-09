import useUser from "@/src/hooks/useUser";
import { ProjectBoard } from "./project-board/project-board";
import ProjectMembers from "./project-members";
import { ProjectSetting } from "./project-setting/project-setting";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Activity, LayoutDashboard, Settings } from "lucide-react";
import { useProject } from "@/src/hooks/useProject";
import { useRouter, useSearchParams } from "next/navigation";

export function ProjectContent({ projectId }: { projectId: number }) {
  const { data: project } = useProject(String(projectId));
  const { data } = useUser();
  const searchParams = useSearchParams();
  const tab = searchParams.get("t");

  const router = useRouter();

  return (
    <>
      <div className="shrink-0 border-b px-4 py-3 md:px-6">
        <Tabs
          onValueChange={() => router.replace(window.location.pathname)}
          defaultValue={tab || "board"}
        >
          <TabsList>
            <TabsTrigger value="board" className="gap-1.5 cursor-pointer">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Board
            </TabsTrigger>

            <TabsTrigger value="members" className="gap-1.5 cursor-pointer">
              <Activity className="h-3.5 w-3.5" />
              Members
            </TabsTrigger>
            {data.data.user.id == project?.owner.id ? (
              <TabsTrigger value="setting" className="gap-1.5 cursor-pointer">
                <Settings className="h-3.5 w-3.5" />
                setting
              </TabsTrigger>
            ) : (
              ""
            )}
          </TabsList>

          <main className="min-h-0 flex-1">
            <TabsContent className="pb-10" value="board">
              <ProjectBoard projectId={projectId} />
            </TabsContent>
            <TabsContent className="pb-10" value="members">
              <ProjectMembers projectId={projectId} />
            </TabsContent>
            {data.data.user.id == project?.owner.id ? (
              <TabsContent className="pb-10" value="setting">
                <ProjectSetting projectId={projectId} />
              </TabsContent>
            ) : (
              ""
            )}
          </main>
        </Tabs>
      </div>
    </>
  );
}
