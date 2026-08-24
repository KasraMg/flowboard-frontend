import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { Palette, User } from "lucide-react";
import { Task } from "@/src/lib/types";
import { useProject } from "@/src/hooks/useProject";
import { UserAvatar } from "@/src/components/modules/user-avatar";
import { useEffect, useState } from "react";

const colors = ["#EF4444", "#F97316", "#EAB308", "#3B82F6", "#8B5CF6"];

const TaskModalDropDownMenus = ({
  task,
  form,
  setForm,
}: {
  task: Task;
  form: any;
  setForm: any;
}) => {
  const { data: project } = useProject(String(task.project.id));
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
    <div className="flex gap-3 pb-4">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="w-max" asChild>
          <Button variant="white">
            Color <Palette className="ml-2" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5} className="z-99999 w-48">
          <DropdownMenuLabel>Colors</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <div className="grid gap-2 p-2">
            {colors.map((color) => (
              <div key={color} className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="task_color"
                  value={color}
                  checked={form.backgroundColor == color}
                  onChange={() =>
                    setForm((prev: any) => ({
                      ...prev,
                      backgroundColor: color,
                    }))
                  }
                  className="accent-green-500 size-4"
                />

                <Button
                  type="button"
                  className="h-7 w-full rounded-sm transition-opacity hover:opacity-70"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setForm((prev: any) => ({
                      ...prev,
                      color: color,
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="w-max" asChild>
          <Button variant="green">
            Members <User className="ml-2" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5} className="z-99999 w-48">
          <DropdownMenuLabel>Members</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <div className="grid gap-y-4 pl-1">
            {project?.members.map((member) => (
              <div key={member.id} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="task_color"
                  value={member.user.id}
                  checked={assignIds.some((item) => item === member.user.id)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setAssignIds((prev) => [...prev, member.user.id]);
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
    </div>
  );
};

export default TaskModalDropDownMenus;
