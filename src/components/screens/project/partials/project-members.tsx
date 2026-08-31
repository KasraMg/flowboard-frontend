import { UserAvatar } from "@/src/components/modules/user-avatar";
import { Button } from "@/src/components/ui/button";
import { useProject, useRemoveUserFromProject } from "@/src/hooks/useProject";
import { Trash } from "lucide-react";
import useUser from "@/src/hooks/useUser";
import InviteModal from "./invite-modal";

const ProjectMembers = ({ projectId }: { projectId: number }) => {
  const { data: project } = useProject(String(projectId));
  const { data } = useUser();
  const { mutate } = useRemoveUserFromProject(String(project?.id));

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4 pt-10">
        {project?.members.map((member) => (
          <div className="flex items-center flex-wrap justify-between gap-2 border p-4 rounded-lg border-gray-700">
            <div className="flex gap-2.5 items-center">
              <UserAvatar user={member?.user} size="md" />
              <div>
                <p>{member.user.name}</p>
                <p className="text-sm pt-1 text-neutral-400">
                  {member.user.email}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm">{member.role}</p>
              {project.owner.email == data.data.user.email ? (
                <Button
                  onClick={() => mutate({ projectId, userId: member.user.id })}
                  size={"sm"}
                  className="px-3.5! mt-2"
                  variant="destructive"
                >
                  <Trash size={17} />
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full py-10 flex justify-center">
        {data.data.user.id == project?.owner.id ? (
          <InviteModal triggerSize="lg" />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProjectMembers;
