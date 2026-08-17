// Core domain types — structured to map cleanly to a future REST API.

export type ID = string;

export type Role = "owner" | "admin" | "member";

export type User = {
  email: string;
  id: number;
  name: string;
  projectMembers: [];
  projects: {
    background: string;
    id: number;
    title: string;
  }[];
  tasks: [];
};

export interface DashboardResponse {
  success: boolean;
  data: {
    stats: {
      totalProjects: number;
      totalTasks: number;
      completedTasks: number;
      incompleteTasks: number;
    };
    recentProjects: Project[];
    recentTasks: Task[];
  };
}
export type ProjectStatus = "active" | "on_hold" | "completed" | "archived";

export type Project = {
  id: ID;
  name: string;
  description: string;
  status: ProjectStatus;
  backgroundColor: string;
  backgroundImage?: string;
  visibility: "private" | "workspace" | "public";
  workspaceId: ID;
  createdAt: string;
  updatedAt: string;
  ownerId: ID;
  memberIds: ID[];
  favorite?: boolean;
  archived?: boolean;
};

export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";

export type Priority = "low" | "medium" | "high" | "urgent";

export type Label = {
  id: ID;
  name: string;
  color: string;
};

export type ChecklistItem = {
  id: ID;
  text: string;
  completed: boolean;
};

export type Comment = {
  id: ID;
  userId: ID;
  text: string;
  createdAt: string;
};

export type Activity = {
  id: ID;
  type:
    | "task_created"
    | "task_completed"
    | "project_joined"
    | "project_updated"
    | "status_changed"
    | "priority_changed"
    | "assigned"
    | "commented";
  userId: ID;
  targetId: ID;
  targetType: "task" | "project";
  text: string;
  createdAt: string;
};

export type Attachment = {
  id: ID;
  fileName: string;
  fileType: string;
  fileSize: string;
  url?: string;
};

export type Task = {
  id: ID;
  title: string;
  description: string;
  completed: boolean;
  status: TaskStatus;
  priority: Priority;
  backgroundColor?: string;
  coverImage?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  projectId: ID;
  assigneeId?: ID;
  labelIds: ID[];
  checklist: ChecklistItem[];
  comments: Comment[];
  attachments: Attachment[];
  activity: Activity[];
  position: number;
  columnId: ID;
};

export type Column = {
  id: ID;
  name: string;
  projectId: ID;
  position: number;
  color?: string;
};

export type Workspace = {
  id: ID;
  name: string;
  logoUrl?: string;
  ownerId: ID;
  memberIds: ID[];
  createdAt: string;
};

export type WorkspaceMember = {
  userId: ID;
  workspaceId: ID;
  role: Role;
  joinedDate: string;
};

export type Notification = {
  id: ID;
  type: "assignment" | "deadline" | "comment" | "invite" | "update" | "mention";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  userId: ID;
  targetId?: ID;
  targetType?: "task" | "project";
};

export const PRIORITY_META: Record<
  Priority,
  { label: string; color: string; bg: string; dot: string }
> = {
  low: {
    label: "Low",
    color: "text-slate-600 dark:text-slate-300",
    bg: "bg-slate-100 dark:bg-slate-800",
    dot: "bg-slate-400",
  },
  medium: {
    label: "Medium",
    color: "text-blue-600 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950",
    dot: "bg-blue-500",
  },
  high: {
    label: "High",
    color: "text-amber-600 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950",
    dot: "bg-amber-500",
  },
  urgent: {
    label: "Urgent",
    color: "text-red-600 dark:text-red-300",
    bg: "bg-red-50 dark:bg-red-950",
    dot: "bg-red-500",
  },
};

export const STATUS_META: Record<
  TaskStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  backlog: {
    label: "Backlog",
    color: "text-slate-600 dark:text-slate-300",
    bg: "bg-slate-100 dark:bg-slate-800",
    dot: "bg-slate-400",
  },
  todo: {
    label: "To Do",
    color: "text-slate-700 dark:text-slate-200",
    bg: "bg-slate-100 dark:bg-slate-800",
    dot: "bg-slate-500",
  },
  in_progress: {
    label: "In Progress",
    color: "text-blue-600 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950",
    dot: "bg-blue-500",
  },
  review: {
    label: "Review",
    color: "text-purple-600 dark:text-purple-300",
    bg: "bg-purple-50 dark:bg-purple-950",
    dot: "bg-purple-500",
  },
  done: {
    label: "Done",
    color: "text-emerald-600 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    dot: "bg-emerald-500",
  },
};

export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  active: {
    label: "Active",
    color: "text-emerald-600 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    dot: "bg-emerald-500",
  },
  on_hold: {
    label: "On Hold",
    color: "text-amber-600 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950",
    dot: "bg-amber-500",
  },
  completed: {
    label: "Completed",
    color: "text-blue-600 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950",
    dot: "bg-blue-500",
  },
  archived: {
    label: "Archived",
    color: "text-slate-500 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800",
    dot: "bg-slate-400",
  },
};

export const PROJECT_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#ef4444",
  "#6366f1",
  "#84cc16",
  "#f97316",
];
