import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../../ui/dialog";
import { Task } from "@/src/lib/types";
import { Check, NotebookText } from "lucide-react";
import TaskModalDropDownMenus from "./partials/task-modal-drop-down-menus";
import TaskModalActions from "./partials/task-modal-actions";
import TaskPreview from "./task-preview";
import { TaskModalProvider } from "@/src/store/task/task.store";
import useTaskModal from "./hook";

const TaskModal = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);

  const { form, setForm } = useTaskModal(task);
  return (
    <TaskModalProvider form={form} setForm={setForm}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full cursor-pointer">
          <TaskPreview task={task} />
        </DialogTrigger>
        <DialogContent
          hideX
          className="max-h-[90vh] sm:max-w-xl! w-full overflow-y-auto bg-gray-800!"
        >
          <TaskModalActions setOpen={setOpen} task={task} />
          <div className="flex items-center gap-2">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                setForm((prev: any) => ({
                  ...prev,
                  completed: !form.completed,
                }));
              }}
              aria-label={
                form.completed ? "Mark as incomplete" : "Mark as complete"
              }
              className={`flex items-center justify-center rounded-full border cursor-pointer transition-all duration-200 ease-out h-5 w-5 visible
            ${
              form.completed
                ? "h-5 w-5 border-green-500 bg-green-500"
                : "border-gray-400 bg-transparent"
            }  `}
            >
              <Check
                className={`h-3 w-3 text-white transition-all duration-200 ${form.completed ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
              />
            </button>
            <input
              className="text-2xl p-2 rounded-lg w-full"
              type="text"
              value={form.title}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
          </div>
          <TaskModalDropDownMenus />
          <div>
            <div className="flex gap-3 pb-4">
              <NotebookText size={21} />
              <p>Description</p>
            </div>
            <textarea
              className="border border-gray-700 rounded-lg p-3 w-full min-h-20"
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            ></textarea>
          </div>
        </DialogContent>
      </Dialog>
    </TaskModalProvider>
  );
};

export default TaskModal;
