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

const colors = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#3B82F6",
  "#8B5CF6",
];

const TaskModalDropDownMenus = ({
  task,
  form,
  setForm,
}: {
  task: Task;
  form: any;
  setForm: any;
}) => {
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
          <DropdownMenuLabel>Colors</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <div className="grid grid-cols-4 gap-2 p-2">
            {colors.map((color) => (
              <Button
                key={color}
                type="button"
                className="h-5 w-full rounded-sm transition-opacity hover:opacity-70"
                style={{ backgroundColor: color }}
                onClick={() => {
                  console.log("selected color:", color);
                }}
              />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskModalDropDownMenus;
