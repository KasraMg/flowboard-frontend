'use client';

import * as React from 'react';
import {
  users as mockUsers,
  currentUser as mockCurrentUser,
  projects as mockProjects,
  tasks as mockTasks,
  columns as mockColumns,
  labels as mockLabels,
  notifications as mockNotifications,
  recentActivities as mockActivities,
  workspaces as mockWorkspaces,
  workspaceMembers as mockWorkspaceMembers,
} from '@/src/lib/mock-data';
import type {
  User, Project, Task, Column, Label, Notification, Activity, Workspace, WorkspaceMember,
  TaskStatus, Priority, ID,
} from '@/src/lib/types';

type ToastFn = (msg: string, opts?: { description?: string }) => void;

type AppState = {
  // data
  currentUser: User;
  users: User[];
  projects: Project[];
  tasks: Task[];
  columns: Column[];
  labels: Label[];
  notifications: Notification[];
  activities: Activity[];
  workspaces: Workspace[];
  workspaceMembers: WorkspaceMember[];
  activeWorkspaceId: ID;

  // auth (mock)
  isAuthenticated: boolean;

  // actions
  login: (email: string) => void;
  logout: () => void;
  register: (name: string, email: string) => void;

  setActiveWorkspace: (id: ID) => void;

  createProject: (data: Partial<Project>) => Project;
  updateProject: (id: ID, data: Partial<Project>) => void;
  deleteProject: (id: ID) => void;
  toggleFavorite: (id: ID) => void;
  archiveProject: (id: ID) => void;

  createTask: (data: Partial<Task>) => Task;
  updateTask: (id: ID, data: Partial<Task>) => void;
  deleteTask: (id: ID) => void;
  moveTask: (taskId: ID, columnId: ID, position?: number) => void;
  reorderTasks: (columnId: ID, orderedIds: ID[]) => void;

  createColumn: (projectId: ID, name: string) => Column;
  renameColumn: (id: ID, name: string) => void;
  deleteColumn: (id: ID) => void;

  addComment: (taskId: ID, text: string) => void;
  toggleChecklistItem: (taskId: ID, itemId: ID) => void;
  addChecklistItem: (taskId: ID, text: string) => void;
  deleteChecklistItem: (taskId: ID, itemId: ID) => void;

  markNotificationRead: (id: ID) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: ID) => void;

  updateProfile: (data: Partial<User>) => void;
};

const Ctx = React.createContext<AppState | null>(null);

let idCounter = 1000;
const uid = (prefix: string) => `${prefix}${++idCounter}`;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<User>(mockCurrentUser);
  const [users, setUsers] = React.useState<User[]>(mockUsers);
  const [projects, setProjects] = React.useState<Project[]>(mockProjects);
  const [tasks, setTasks] = React.useState<Task[]>(mockTasks);
  const [columns, setColumns] = React.useState<Column[]>(mockColumns);
  const [labels] = React.useState<Label[]>(mockLabels);
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);
  const [activities, setActivities] = React.useState<Activity[]>(mockActivities);
  const [workspaces] = React.useState<Workspace[]>(mockWorkspaces);
  const [workspaceMembers, setWorkspaceMembers] = React.useState<WorkspaceMember[]>(mockWorkspaceMembers);
  const [activeWorkspaceId, setActiveWorkspaceId] = React.useState<ID>('w1');

  const login = React.useCallback((email: string) => {
    setIsAuthenticated(true);
    setCurrentUser((u) => ({ ...u, email }));
  }, []);

  const logout = React.useCallback(() => setIsAuthenticated(false), []);

  const register = React.useCallback((name: string, email: string) => {
    setIsAuthenticated(true);
    setCurrentUser((u) => ({ ...u, name, email }));
  }, []);

  const setActiveWorkspace = React.useCallback((id: ID) => setActiveWorkspaceId(id), []);

  const createProject = React.useCallback((data: Partial<Project>): Project => {
    const nowIso = new Date().toISOString();
    const project: Project = {
      id: uid('p'),
      name: data.name || 'Untitled project',
      description: data.description || '',
      status: data.status || 'active',
      backgroundColor: data.backgroundColor || '#3b82f6',
      backgroundImage: data.backgroundImage,
      visibility: data.visibility || 'workspace',
      workspaceId: data.workspaceId || activeWorkspaceId,
      createdAt: nowIso,
      updatedAt: nowIso,
      ownerId: currentUser.id,
      memberIds: data.memberIds || [currentUser.id],
      favorite: false,
      archived: false,
    };
    setProjects((p) => [project, ...p]);
    return project;
  }, [activeWorkspaceId, currentUser.id]);

  const updateProject = React.useCallback((id: ID, data: Partial<Project>) => {
    setProjects((p) => p.map((proj) => (proj.id === id ? { ...proj, ...data, updatedAt: new Date().toISOString() } : proj)));
  }, []);

  const deleteProject = React.useCallback((id: ID) => {
    setProjects((p) => p.filter((proj) => proj.id !== id));
    setTasks((t) => t.filter((task) => task.projectId !== id));
    setColumns((c) => c.filter((col) => col.projectId !== id));
  }, []);

  const toggleFavorite = React.useCallback((id: ID) => {
    setProjects((p) => p.map((proj) => (proj.id === id ? { ...proj, favorite: !proj.favorite } : proj)));
  }, []);

  const archiveProject = React.useCallback((id: ID) => {
    setProjects((p) => p.map((proj) => (proj.id === id ? { ...proj, archived: !proj.archived, status: proj.archived ? proj.status : 'archived' } : proj)));
  }, []);

  const createTask = React.useCallback((data: Partial<Task>): Task => {
    const nowIso = new Date().toISOString();
    const columnId = data.columnId || columns.find((c) => c.projectId === data.projectId)?.id || 'c1';
    const task: Task = {
      id: uid('t'),
      title: data.title || 'Untitled task',
      description: data.description || '',
      completed: data.completed || false,
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      backgroundColor: data.backgroundColor,
      coverImage: data.coverImage,
      dueDate: data.dueDate,
      createdAt: nowIso,
      updatedAt: nowIso,
      projectId: data.projectId || 'p1',
      assigneeId: data.assigneeId,
      labelIds: data.labelIds || [],
      checklist: data.checklist || [],
      comments: [],
      attachments: data.attachments || [],
      activity: [{
        id: uid('a'),
        type: 'task_created',
        userId: currentUser.id,
        targetId: '',
        targetType: 'task',
        text: 'created this task',
        createdAt: nowIso,
      }],
      position: data.position ?? 0,
      columnId,
    };
    setTasks((t) => [task, ...t]);
    return task;
  }, [columns, currentUser.id]);

  const updateTask = React.useCallback((id: ID, data: Partial<Task>) => {
    setTasks((t) => t.map((task) => (task.id === id ? { ...task, ...data, updatedAt: new Date().toISOString() } : task)));
  }, []);

  const deleteTask = React.useCallback((id: ID) => {
    setTasks((t) => t.filter((task) => task.id !== id));
  }, []);

  const moveTask = React.useCallback((taskId: ID, columnId: ID, position?: number) => {
    setTasks((t) => {
      const task = t.find((tk) => tk.id === taskId);
      if (!task) return t;
      const newStatus: TaskStatus =
        columnId === 'c1' ? 'backlog' :
        columnId === 'c2' ? 'todo' :
        columnId === 'c3' ? 'in_progress' :
        columnId === 'c4' ? 'review' : 'done';
      return t.map((tk) =>
        tk.id === taskId
          ? { ...tk, columnId, status: newStatus, position: position ?? tk.position, updatedAt: new Date().toISOString() }
          : tk
      );
    });
  }, []);

  const reorderTasks = React.useCallback((columnId: ID, orderedIds: ID[]) => {
    setTasks((t) => {
      const updated = t.map((task) => {
        const idx = orderedIds.indexOf(task.id);
        if (idx === -1) return task;
        return { ...task, columnId, position: idx };
      });
      return updated;
    });
  }, []);

  const createColumn = React.useCallback((projectId: ID, name: string): Column => {
    const projectCols = columns.filter((c) => c.projectId === projectId);
    const column: Column = {
      id: uid('c'),
      name,
      projectId,
      position: projectCols.length,
      color: '#94a3b8',
    };
    setColumns((c) => [...c, column]);
    return column;
  }, [columns]);

  const renameColumn = React.useCallback((id: ID, name: string) => {
    setColumns((c) => c.map((col) => (col.id === id ? { ...col, name } : col)));
  }, []);

  const deleteColumn = React.useCallback((id: ID) => {
    setColumns((c) => c.filter((col) => col.id !== id));
    setTasks((t) => t.filter((task) => task.columnId !== id));
  }, []);

  const addComment = React.useCallback((taskId: ID, text: string) => {
    const comment = {
      id: uid('cm'),
      userId: currentUser.id,
      text,
      createdAt: new Date().toISOString(),
    };
    setTasks((t) => t.map((task) =>
      task.id === taskId
        ? { ...task, comments: [...task.comments, comment], updatedAt: new Date().toISOString() }
        : task
    ));
  }, [currentUser.id]);

  const toggleChecklistItem = React.useCallback((taskId: ID, itemId: ID) => {
    setTasks((t) => t.map((task) =>
      task.id === taskId
        ? {
            ...task,
            checklist: task.checklist.map((item) =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            ),
          }
        : task
    ));
  }, []);

  const addChecklistItem = React.useCallback((taskId: ID, text: string) => {
    const item = { id: uid('ch'), text, completed: false };
    setTasks((t) => t.map((task) =>
      task.id === taskId
        ? { ...task, checklist: [...task.checklist, item] }
        : task
    ));
  }, []);

  const deleteChecklistItem = React.useCallback((taskId: ID, itemId: ID) => {
    setTasks((t) => t.map((task) =>
      task.id === taskId
        ? { ...task, checklist: task.checklist.filter((item) => item.id !== itemId) }
        : task
    ));
  }, []);

  const markNotificationRead = React.useCallback((id: ID) => {
    setNotifications((n) => n.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)));
  }, []);

  const markAllNotificationsRead = React.useCallback(() => {
    setNotifications((n) => n.map((notif) => ({ ...notif, read: true })));
  }, []);

  const deleteNotification = React.useCallback((id: ID) => {
    setNotifications((n) => n.filter((notif) => notif.id !== id));
  }, []);

  const updateProfile = React.useCallback((data: Partial<User>) => {
    setCurrentUser((u) => ({ ...u, ...data }));
    setUsers((us) => us.map((u) => (u.id === currentUser.id ? { ...u, ...data } : u)));
  }, [currentUser.id]);

  const value: AppState = {
    currentUser,
    users,
    projects,
    tasks,
    columns,
    labels,
    notifications,
    activities,
    workspaces,
    workspaceMembers,
    activeWorkspaceId,
    isAuthenticated,
    login,
    logout,
    register,
    setActiveWorkspace,
    createProject,
    updateProject,
    deleteProject,
    toggleFavorite,
    archiveProject,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasks,
    createColumn,
    renameColumn,
    deleteColumn,
    addComment,
    toggleChecklistItem,
    addChecklistItem,
    deleteChecklistItem,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    updateProfile,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
