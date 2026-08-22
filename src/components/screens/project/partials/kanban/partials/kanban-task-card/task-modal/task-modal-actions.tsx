import { DialogClose } from "@/src/components/ui/dialog";
import { useDeleteTask } from "@/src/hooks/useTask";
import useUser from "@/src/hooks/useUser";
import { Task } from "@/src/lib/types";
import { Trash, X } from "lucide-react";

const TaskModalActions = ({
  task,
  setOpen,
}: {
  task: Task;
  setOpen: (val: boolean) => void;
}) => {
  const { mutate: deleteMutate } = useDeleteTask(task.project.id);
  const { data: userData } = useUser();

  return (
    <div className="flex gap-3 pb-4 border-b border-gray-700">
      <DialogClose className="cursor-pointer text-gray-400 hover:text-white">
        <X size={21} />
      </DialogClose>
      {task.creator.email == userData?.data.user?.email ||
      task.project.owner.email == userData?.data.user?.email ? (
        <Trash
          onClick={() =>
            deleteMutate(task.id, {
              onSuccess() {
                setOpen(false);
              },
            })
          }
          className="cursor-pointer text-red-500"
          size={21}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default TaskModalActions;
