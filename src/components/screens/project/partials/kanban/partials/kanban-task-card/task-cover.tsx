import type { Task } from "@/src/lib/types";

export function TaskCover({ task }: { task: Task }) {
  if (task.coverImage) {
    return (
      <div className="-mx-3 -mt-3 mb-2 h-20 overflow-hidden rounded-t-lg">
        <img
          src={task.coverImage}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (task.backgroundColor) {
    return (
      <div
        className="-mx-3 -mt-3 mb-2 h-1 rounded-t-lg"
        style={{ backgroundColor: task.backgroundColor }}
      />
    );
  }

  return null;
}