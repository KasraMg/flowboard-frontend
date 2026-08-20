import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../../ui/dialog";
import { Task } from "@/src/lib/types";
import { NotebookText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";

const colors = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#3B82F6",
  "#8B5CF6",
];

const TaskModal = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full cursor-pointer">
        <div className="bg-gray-800 rounded-lg py-2 w-full text-center pl-2.5">
          <p className="text-sm text-left">{task.title}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto bg-gray-700!">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="accent-green-500 size-4" />
          <input
            className="text-2xl p-2 rounded-lg"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="w-max" asChild>
              <Button variant="outline">Color</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent sideOffset={5} className="z-99999 w-48">
              <DropdownMenuLabel>Colors</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <div className="grid gap-2 p-2">
                {colors.map((color) => (
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="task_color"
                      className="accent-green-500 size-4"
                    />

                    <Button
                      key={color}
                      type="button"
                      className="h-7 w-full rounded-sm transition-opacity hover:opacity-70"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        console.log("selected color:", color);
                      }}
                    />
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="w-max" asChild>
              <Button variant="outline">Members</Button>
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
        <div>
          <div className="flex gap-3 pb-4">
            <NotebookText size={21} />
            <p>Description</p>
          </div>
          <textarea
            className="border border-white rounded-lg p-3 w-full min-h-20"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
