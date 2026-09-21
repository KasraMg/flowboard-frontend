"use client";

import { Task } from "@/src/lib/types";
import { TaskModalProvider } from "@/src/store/task/task.store";
import useTaskModal from "../../kanban-task-card/hook";
import TaskPreview from "../../kanban-task-card/task-preview";

export default function TaskDragOverlay({
  task,
}: {
  task: Task;
}) {
  const { form, setForm } = useTaskModal(task);

  return (
    <TaskModalProvider form={form} setForm={setForm}>
      <TaskPreview task={task} />
    </TaskModalProvider>
  );
}