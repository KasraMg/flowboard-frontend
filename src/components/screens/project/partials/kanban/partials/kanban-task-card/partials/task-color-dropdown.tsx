import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

const TaskColorDropdown = ({ setForm, form }: { setForm: any; form: any }) => {
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
          className="bg-[#2a3b75] text-white hover:bg-[#2a3b75]"
        >
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
  );
};

export default TaskColorDropdown;
