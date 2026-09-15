import ProjectsScreen from "@/src/components/screens/projects/projects-screen";
import { getProjects } from "@/src/lib/server-fetches";
import Hydrated from "@/src/providers/hydrated";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowBoard — Projects",
  icons: "/fav-icon.png",
  description:
    "FlowBoard is a modern project and task management app with boards, lists, calendars, and more.",
};

const ProjectsPage = () => {
  return (
    <Hydrated queryKey={[`projects`]} queryFn={getProjects}>
      <ProjectsScreen />
    </Hydrated>
  );
};

export default ProjectsPage;
