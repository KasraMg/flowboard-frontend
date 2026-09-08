import { useDebounce } from "@/src/hooks/useDebounce";
import { useEditTask } from "@/src/hooks/useTask";
import { Task } from "@/src/lib/types";
import { useEffect, useState } from "react";

const useTaskModal = (task: Task) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    completed: task.completed,
    backgroundColor: task.backgroundColor,
    priority: task.priority,
    assigneeIds: task.assignees.map((user) => user.id),
    labels: task.labels || [],
  });

  const debouncedTitle = useDebounce(form.title, 1500);
  const debouncedDescription = useDebounce(form.description, 1500);
  const { mutate } = useEditTask(task.id, task.project.id);

  useEffect(() => {
    const titleChanged = debouncedTitle !== task.title;

    const descriptionChanged = debouncedDescription !== task.description;

    const completedChanged = form.completed !== task.completed;
    const priorityChanged = form.priority !== task.priority;

    const labelsChanged =
      JSON.stringify(form.labels ?? []) !== JSON.stringify(task.labels ?? []);

    const backgroundColorChanged =
      form.backgroundColor !== task.backgroundColor;

    const assigneeIdsChanged =
      JSON.stringify(form.assigneeIds) !==
      JSON.stringify(task.assignees.map((user) => user.id));

    if (
      !titleChanged &&
      !priorityChanged &&
      !descriptionChanged &&
      !completedChanged &&
      !backgroundColorChanged &&
      !labelsChanged &&
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
      priority: form.priority,
      labels: form.labels,
    });
  }, [
    debouncedTitle,
    debouncedDescription,
    form.completed,
    form.backgroundColor,
    form.assigneeIds,
    form.priority,
    form.labels,
  ]);
  return { form, setForm };
};

export default useTaskModal;
