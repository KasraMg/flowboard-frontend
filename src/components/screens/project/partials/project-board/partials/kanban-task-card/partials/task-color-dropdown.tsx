import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useTaskModal } from "@/src/store/task/task.store";
import { Palette } from "lucide-react";

const TaskColorDropdown = () => {
  const { form, setForm } = useTaskModal();

  const colors = [
    "#EF4444",
    "#F97316",
    "#EAB308",
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#EC4899",
    "#06B6D4",
    "#6366F1",
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="w-max" asChild>
        <Button
          size={"sm"}
          className="bg-[#2a3b75] relative text-white hover:bg-[#2a3b75]"
        >
          Color <Palette className="ml-2" />
          <Badge
            className="absolute -left-2 w-3 h-5 -top-3 px-2.5"
            style={{ backgroundColor: form.backgroundColor }}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={5} className="z-99999 w-70">
        <DropdownMenuLabel>Colors</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="grid grid-cols-3 gap-2 p-2">
          {colors.map((color) => (
            <div key={color} className="flex gap-2 items-center">
              <input
                type="radio"
                name={`task_color_${color}`}
                id={`task_color_${color}`}
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

              <label
                htmlFor={`task_color_${color}`}
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
  );
};

export default TaskColorDropdown;
