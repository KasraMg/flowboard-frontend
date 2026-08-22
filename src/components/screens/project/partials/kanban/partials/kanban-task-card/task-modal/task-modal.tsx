import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../../../ui/dialog";
import { Task } from "@/src/lib/types";
import { NotebookText } from "lucide-react";
import TaskModalDropDownMenus from "./task-modal-drop-down-menus";
import { useDebounce } from "@/src/hooks/useDebounce";
import TaskModalActions from "./task-modal-actions";
import { useEditTask } from "@/src/hooks/useTask";

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

  const debouncedForm = useDebounce(form, 1500);

  const { mutate } = useEditTask(task.id, task.project.id);

  useEffect(() => {
    if (
      debouncedForm.title === task.title &&
      debouncedForm.completed === task.completed &&
      debouncedForm.description === task.description &&
      debouncedForm.backgroundColor === task.backgroundColor &&
      JSON.stringify(debouncedForm.assigneeIds) ===
        JSON.stringify(task.assignees.map((user) => user.id))
    ) {
      return;
    }

    mutate(debouncedForm);
  }, [debouncedForm, mutate, task]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full cursor-pointer">
        <div
          style={{
            backgroundColor: task.backgroundColor ? task.backgroundColor : "",
          }}
          className={`rounded-lg bg-gray-800 py-2 w-full text-center pl-2.5`}
        >
          <p className="text-sm text-left">{task.title}</p>
          {task.description ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-list-sort-ascending-icon lucide-list-sort-ascending mt-2 ml-2"
            >
              <path d="M3 19h18" />
              <path d="M15 12H3" />
              <path d="M9 5H3" />
            </svg>
          ) : (
            ""
          )}
        </div>
      </DialogTrigger>
      <DialogContent
        hideX
        className="max-h-[90vh] max-w-xl overflow-y-auto bg-gray-800!"
      >
        <TaskModalActions setOpen={setOpen} task={task} />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.completed}
            onChange={(event) =>
              setForm((prev: any) => ({
                ...prev,
                completed: event?.target.checked,
              }))
            }
            className="accent-green-500 size-4"
          />
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
