import { createContext, useContext } from "react";

export type TaskForm = {
  title: string;
  description: string;
  completed: boolean;
  backgroundColor: string;
  priority: any;
  assigneeIds: number[];
  labels: any[];
};

type TaskModalContextType = {
  form: TaskForm;
  setForm: React.Dispatch<React.SetStateAction<TaskForm>>;
};

const TaskModalContext = createContext<TaskModalContextType | null>(null);

export const TaskModalProvider = ({
  children,
  form,
  setForm,
}: TaskModalContextType & { children: React.ReactNode }) => {
  return (
    <TaskModalContext.Provider value={{ form, setForm }}>
      {children}
    </TaskModalContext.Provider>
  );
};

export const useTaskModal = () => {
  const context = useContext(TaskModalContext);

  if (!context) {
    throw new Error("useTaskModal must be used inside TaskModalProvider");
  }

  return context;
};
