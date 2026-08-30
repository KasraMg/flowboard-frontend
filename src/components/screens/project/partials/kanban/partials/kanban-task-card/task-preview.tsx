import { Check } from "lucide-react";
import { Task } from "@/src/lib/types";
import { UserAvatar } from "@/src/components/modules/user-avatar";

const TaskPreview = ({
  task,
  setForm,
  form,
}: {
  task: Task;
  setForm: any;
  form: { completed: boolean };
}) => {
  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setForm((prev: any) => ({
      ...prev,
      completed: !form.completed,
    }));
  };
  return (
    <div
      style={{
        backgroundColor: task.backgroundColor || "",
      }}
      className="group relative w-full rounded-lg bg-gray-800 py-2 px-2.5 text-center"
    >
      <div className="flex items-center gap-2">
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleToggleComplete}
          aria-label={
            form.completed ? "Mark as incomplete" : "Mark as complete"
          }
          className={`flex h-0 w-0 invisible items-center justify-center rounded-full border cursor-pointer transition-all duration-200 ease-out group-hover:h-4 group-hover:w-4 group-hover:visible
            ${
              form.completed
                ? "h-4 w-4 visible! border-green-500 bg-green-500"
                : "border-white bg-transparent"
            }
          `}
        >
          <Check
            className={`h-3 w-3 text-white transition-all duration-200 ${form.completed ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          />
        </div>
        <p
          className={`text-left text-sm ${form.completed ? "text-gray-400 line-through" : ""}`}
        >
          {task.title}
        </p>
      </div>

      <div className="flex justify-between">
        {task.description && (
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
            className="ml-2 mt-2"
          >
            <path d="M3 19h18" />
            <path d="M15 12H3" />
            <path d="M9 5H3" />
          </svg>
        )}
        <div className="flex gap-1">
          {task.assignees.map((assigneee) => (
            <UserAvatar
              className="ring-transparent"
              key={assigneee.id}
              user={assigneee}
              size="xs"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskPreview;
