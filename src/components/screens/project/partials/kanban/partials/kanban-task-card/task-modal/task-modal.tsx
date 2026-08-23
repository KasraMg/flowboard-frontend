import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../../../ui/dialog";
import { Task } from "@/src/lib/types";
import { Check, NotebookText } from "lucide-react";
import TaskModalDropDownMenus from "./task-modal-drop-down-menus";
import { useDebounce } from "@/src/hooks/useDebounce";
import TaskModalActions from "./task-modal-actions";
import { useEditTask } from "@/src/hooks/useTask";
import TaskPreview from "./task-preview";

const TaskModal = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);
  console.log(task);

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    completed: task.completed,
    backgroundColor: task.backgroundColor,
    assigneeIds: task.assignees.map((user) => user.id),
  });

  const debouncedTitle = useDebounce(form.title, 1500);
  const debouncedDescription = useDebounce(form.description, 1500);
  const { mutate } = useEditTask(task.id, task.project.id);

  useEffect(() => {
    const titleChanged = debouncedTitle !== task.title;

    const descriptionChanged = debouncedDescription !== task.description;

    const completedChanged = form.completed !== task.completed;

    const backgroundColorChanged =
      form.backgroundColor !== task.backgroundColor;

    const assigneeIdsChanged =
      JSON.stringify(form.assigneeIds) !==
      JSON.stringify(task.assignees.map((user) => user.id));

    if (
      !titleChanged &&
      !descriptionChanged &&
      !completedChanged &&
      !backgroundColorChanged &&
      !assigneeIdsChanged
    ) {
      return;
    }

    mutate({
      title: debouncedTitle,
      description: debouncedDescription,
      completed: form.completed,
      backgroundColor: form.backgroundColor,
      assigneeIds: form.assigneeIds,
    });
  }, [
    debouncedTitle,
    debouncedDescription,
    form.completed,
    form.backgroundColor,
    form.assigneeIds,
    mutate,
    task,
  ]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full cursor-pointer">
        <TaskPreview form={form} setForm={setForm} task={task} />
      </DialogTrigger>
      <DialogContent
        hideX
        className="max-h-[90vh] max-w-xl overflow-y-auto bg-gray-800!"
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
            className={`
            flex items-center justify-center
            rounded-full border
            cursor-pointer
            transition-all duration-200 ease-out
            h-5 w-5 visible
            ${
              form.completed
                ? "h-5 w-5 border-green-500 bg-green-500"
                : "border-gray-400 bg-transparent"
            }
          `}
          >
            <Check
              className={`
              h-3 w-3 text-white
              transition-all duration-200
              ${form.completed ? "scale-100 opacity-100" : "scale-0 opacity-0"}
            `}
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

        <TaskModalDropDownMenus form={form} setForm={setForm} task={task} />
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
  );
};

export default TaskModal;
