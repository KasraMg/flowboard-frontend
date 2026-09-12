export type ID = string;

export type Role = "owner" | "admin" | "member";

export type User = {
  email: string;
  id: number;
  name: string;
  avatar: string;
  projectMembers: [];
  projects: {
    background: string;
    id: number;
    title: string;
  }[];
  tasks: [];
  emailNotification: boolean;
};

export interface DashboardResponse {
  success: boolean;
  data: {
    stats: {
      totalProjects: number;
      totalTasks: number;
      completedTasks: number;
      incompleteTasks: number;
      trends: {
        totalProjects: { value: string; up: boolean };
        totalTasks: { value: string; up: boolean };
        completedTasks: { value: string; up: boolean };
      };
    };
    recentProjects: {
      project: Project;
      isFave: boolean;
      taskStats: {
        completed: number;
        completionPercentage: number;
        total: number;
      };
    }[];
    recentTasks: Task[];
  };
}
export type ProjectStatus = "active" | "on_hold" | "completed" | "archived";

export type Project = {
  background: string;
  createdAt: string;
  description: string;
  isFave: boolean;
  id: number;
  status: "archived" | "active";
  title: string;
  updatedAt: string;
  members: {
    id: number;
    role: string;
    user: User;
  }[];
  owner: {
    email: string;
    id: number;
    name: string;
  };
  columns: Column[];
};

export type Column = {
  id: number;
  position: number;
  tasks: [];
  title: string;
};

export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";

type TaskLabel = {
  title: string;
  backgroundColor: string;
};

export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Task = {
  assignees: User[];
  backgroundColor: string;
  completed: boolean;
  createdAt: string;
  description: string;
  dueDate: string;
  id: number;
  position: number;
  priority: Priority;
  title: string;
  updatedAt: string;
  labels: TaskLabel[];
  creator: {
    email: string;
    id: number;
    name: string;
  };
  project: {
    background: string;
    createdAt: string;
    description: string;
    id: number;
    status: string;
    title: string;
    updatedAt: string;
    owner: {
      email: string;
      id: number;
      name: string;
    };
  };
};

export const PRIORITY_META: Record<
  Priority,
  { label: string; color: string; bg: string; dot: string }
> = {
  Low: {
    label: "Low",
    color: "text-slate-600 dark:text-slate-300",
    bg: "bg-slate-100 dark:bg-slate-800",
    dot: "bg-slate-400",
  },
  Medium: {
    label: "Medium",
    color: "text-blue-600 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950",
    dot: "bg-blue-500",
  },
  High: {
    label: "High",
    color: "text-amber-600 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950",
    dot: "bg-amber-500",
  },
  Urgent: {
    label: "Urgent",
    color: "text-red-600 dark:text-red-300",
    bg: "bg-red-50 dark:bg-red-950",
    dot: "bg-red-500",
  },
};

export type NotificationData = {
  createdAt: string;
  id: number;
  invitedBy: { id: number; name: string; email: string };
  project: Project;
  status: string;
};
