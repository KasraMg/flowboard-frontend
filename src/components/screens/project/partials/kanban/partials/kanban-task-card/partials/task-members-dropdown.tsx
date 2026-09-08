import { UserAvatar } from "@/src/components/modules/user-avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useProject } from "@/src/hooks/useProject";
import { useTaskModal } from "@/src/store/task/task.store";
import { User } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TaskMembersDropdown = () => {
  const { projectId } = useParams();
  const { data: project } = useProject(String(projectId));
  const { form, setForm } = useTaskModal();

  const [assignIds, setAssignIds] = useState<Number[] | []>(
    form.assigneeIds || null,
  );

  useEffect(() => {
    setForm((prev: any) => ({
      ...prev,
      assigneeIds: assignIds,
    }));
  }, [assignIds]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="w-max" asChild>
        <Button
          size={"sm"}
          className="bg-[#2a3b75] relative text-white hover:bg-[#2a3b75]"
        >
          Members <User className="ml-2" />
          {assignIds.length > 0 ? (
            <Badge className="absolute -left-2 -top-3 px-2" variant={"default"}>
              {assignIds.length}
            </Badge>
          ) : (
            ""
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={5} className="z-99999 w-48">
        <DropdownMenuLabel>Members</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="grid gap-y-4 pl-1 py-2">
          {project?.members.map((member) => (
            <div key={member.id} className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="task_color"
                value={member.user.id}
                checked={assignIds.some((item) => item === member.user.id)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setAssignIds((prev: any) => [...prev, member.user.id]);
                  } else {
                    const newAssignIds = assignIds.filter(
                      (item) => item !== member.user.id,
                    );
                    setAssignIds(newAssignIds);
                  }
                }}
                className="accent-green-500 size-4"
              />

              <UserAvatar key={member.role} user={member.user} size="md" />
              <p>{member.user.name}</p>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskMembersDropdown;
