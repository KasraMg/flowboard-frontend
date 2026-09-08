import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { User } from "lucide-react";
import { priority } from "@/src/lib/helpers";
import { Badge } from "@/src/components/ui/badge";
import { useTaskModal } from "@/src/store/task/task.store";

const TaskPriorityDropdown = () => {
  const { form, setForm } = useTaskModal();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="w-max" asChild>
        <Button
          size={"sm"}
          className="bg-[#2a3b75] relative text-white hover:bg-[#2a3b75]"
        >
          Priority <User className="ml-2" />
          <Badge
            className="absolute -left-2 -top-3 px-2 border border-neutral-500"
            variant={"secondary"}
          >
            {form.priority.slice(0, 1)}
          </Badge>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={5} className="z-99999 w-48">
        <DropdownMenuLabel>Priority</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="grid gap-2 p-2">
          {priority.map((p) => (
            <div key={p.name} className="flex gap-2 items-center">
              <input
                type="radio"
                name="task_color"
                value={p.name}
                checked={form.priority == p.name}
                onChange={() =>
                  setForm((prev: any) => ({
                    ...prev,
                    priority: p.name,
                  }))
                }
                className="accent-green-500 size-4"
              />

              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskPriorityDropdown;
