import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { Tags } from "lucide-react";
import { useState } from "react";

export type TaskLabel = {
  title: string;
  backgroundColor: string;
};

const colors = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
];

type Props = {
  labels: TaskLabel[];
  setLabels: React.Dispatch<React.SetStateAction<TaskLabel[]>>;
};

const TaskLabelDropdown = ({ labels, setLabels }: Props) => {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const addLabel = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    setLabels((prev) => [
      ...prev,
      {
        title: trimmedTitle,
        backgroundColor: selectedColor,
      },
    ]);

    setTitle("");
    setSelectedColor(colors[0]);
  };

  const removeLabel = (index: number) => {
    setLabels((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="w-max" asChild>
        <Button
          size="sm"
          className="bg-[#2a3b75] text-white hover:bg-[#2a3b75]"
        >
          Labels
          <Tags className="ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={5} className="z-99999 w-64">
        <DropdownMenuLabel>Add label</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="space-y-4 p-2">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addLabel();
              }
            }}
            placeholder="Label title..."
            className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <div>
            <p className="mb-2 text-xs text-gray-400">Choose a color</p>

            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 rounded-md border-2 transition-all ${
                    selectedColor === color
                      ? "scale-105 border-white"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            className="w-full"
            disabled={!title.trim()}
            onClick={addLabel}
          >
            Add label
          </Button>

          {labels.length > 0 && (
            <div className="space-y-2 border-t border-gray-700 pt-3">
              {labels.map((label, index) => (
                <div
                  key={`${label.title}-${index}`}
                  className="flex items-center justify-between rounded-md px-3 py-2"
                  style={{
                    backgroundColor: label.backgroundColor,
                  }}
                >
                  <span className="text-sm text-white">{label.title}</span>

                  <button
                    type="button"
                    onClick={() => removeLabel(index)}
                    className="text-white/70 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskLabelDropdown;
