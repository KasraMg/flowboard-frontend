import type { Priority, TaskStatus, ProjectStatus } from './types';
import { PRIORITY_META, STATUS_META, PROJECT_STATUS_META } from './types';

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_GRADIENTS = [
  'from-blue-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
  'from-violet-500 to-purple-500',
  'from-cyan-500 to-blue-500',
  'from-lime-500 to-green-500',
];

export function avatarGradient(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

export function formatDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDateTime(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const abs = Math.abs(diff);
  const mins = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  const days = Math.floor(abs / 86400000);
  const suffix = diff < 0 ? '' : ' ago';
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m${suffix}`;
  if (hours < 24) return `${hours}h${suffix}`;
  if (days < 30) return `${days}d${suffix}`;
  return formatDate(iso);
}

export function isOverdue(iso?: string): boolean {
  if (!iso) return false;
  return new Date(iso).getTime() < Date.now();
}

export function dueSoon(iso?: string, days = 2): boolean {
  if (!iso) return false;
  const diff = new Date(iso).getTime() - Date.now();
  return diff > 0 && diff < days * 86400000;
}

export function priorityMeta(p: Priority) {
  return PRIORITY_META[p];
}

export function statusMeta(s: TaskStatus) {
  return STATUS_META[s];
}

export function projectStatusMeta(s: ProjectStatus) {
  return PROJECT_STATUS_META[s];
}

export function checklistProgress(items: { completed: boolean }[]): number {
  if (items.length === 0) return 0;
  return Math.round((items.filter((i) => i.completed).length / items.length) * 100);
}
