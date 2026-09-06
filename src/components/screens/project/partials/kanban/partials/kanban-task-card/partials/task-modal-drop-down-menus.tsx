
import { Task } from "@/src/lib/types";
import { useEffect, useState } from "react";
import TaskLabelDropdown from "./task-label-dropdown";
import TaskColorDropdown from "./task-color-dropdown";
import TaskMembersDropdown from "./task-members-dropdown";
import TaskPriorityDropdown from "./task-priority-dropdown";

const TaskModalDropDownMenus = ({
  task,
  form,
  setForm,
}: {
  task: Task;
  form: any;
  setForm: any;
}) => {
  const [assignIds, setAssignIds] = useState<Number[] | []>(
    form.assigneeIds || null,
  );

  useEffect(() => {
    setForm((prev: any) => ({
      ...prev,
      assigneeIds: assignIds,
    }));
  }, [assignIds]);

  return (
    <div className="flex gap-3 pb-4">
      <TaskColorDropdown setForm={setForm} form={form} />

      <TaskLabelDropdown
        labels={form.labels ?? []}
        setLabels={(labels) =>
          setForm((prev: any) => ({
            ...prev,
            labels:
              typeof labels === "function" ? labels(prev.labels ?? []) : labels,
          }))
        }
      />

      <TaskMembersDropdown setAssignIds={setAssignIds} assignIds={assignIds} />
      <TaskPriorityDropdown setForm={setForm} form={form}/>
 
    </div>
  );
};

export default TaskModalDropDownMenus;
