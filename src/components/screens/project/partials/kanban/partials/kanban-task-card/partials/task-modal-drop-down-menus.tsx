
import TaskLabelDropdown from "./task-label-dropdown";
import TaskColorDropdown from "./task-color-dropdown";
import TaskMembersDropdown from "./task-members-dropdown";
import TaskPriorityDropdown from "./task-priority-dropdown";

const TaskModalDropDownMenus = () => {
  return (
    <div className="flex gap-3 pb-4 flex-wrap gap-y-8">
      <TaskColorDropdown /> 
      <TaskLabelDropdown /> 
      <TaskMembersDropdown />
      <TaskPriorityDropdown />
    </div>
  );
};

export default TaskModalDropDownMenus;
