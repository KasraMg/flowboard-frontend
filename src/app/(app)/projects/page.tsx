import ProjectsScreen from "@/src/components/screens/projects/projects-screen";
import { getProjects } from "@/src/lib/server-fetches";
import Hydrated from "@/src/providers/hydrated";

const ProjectsPage = () => {
  return (
    <Hydrated queryKey={[`projects`]} queryFn={getProjects}>
      <ProjectsScreen />
    </Hydrated>
  );
};

export default ProjectsPage;
