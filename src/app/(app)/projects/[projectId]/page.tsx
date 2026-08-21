import ProjectScreen from "@/src/components/screens/project/project-screen";
import { getProject } from "@/src/lib/server-fetches";
import Hydrated from "@/src/providers/hydrated";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  return (
    <Hydrated
      queryKey={[`project`, projectId]}
      queryFn={() => getProject(projectId)}
    >
      <ProjectScreen />
    </Hydrated>
  );
};

export default ProjectPage;
