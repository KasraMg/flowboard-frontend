'use client';

import * as React from 'react';
import { UserPlus, MoreHorizontal, Mail, Calendar, FolderKanban, Shield } from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import { UserAvatar } from '@/src/components/modules/user-avatar';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { formatDate } from '@/src/lib/helpers';
import type { Role } from '@/src/lib/types';
import { toast } from 'sonner';

const roleBadge: Record<Role, { label: string; class: string }> = {
  owner: { label: 'Owner', class: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  admin: { label: 'Admin', class: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
  member: { label: 'Member', class: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
};

export default function MembersScreen() {
  const { users, projects, workspaceMembers, activeWorkspaceId, currentUser } = useApp();
  const wsMembers = workspaceMembers.filter((m) => m.workspaceId === activeWorkspaceId);
  const members = wsMembers.map((wm) => {
    const user = users.find((u) => u.id === wm.userId);
    const userProjects = projects.filter((p) => p.memberIds.includes(wm.userId));
    return { ...wm, user, projects: userProjects };
  }).filter((m): m is typeof m & { user: NonNullable<typeof m.user> } => !!m.user);

  const changeRole = (userId: string, role: Role) => {
    toast.success(`${users.find((u) => u.id === userId)?.name} is now ${role}`);
  };

  const removeMember = (userId: string) => {
    toast.success(`${users.find((u) => u.id === userId)?.name} removed from workspace`);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>
          <p className="mt-1 text-sm text-muted-foreground">{members.length} members in this workspace</p>
        </div>
        <Button className="gap-2" onClick={() => toast.info('Invite sent (mock)')}><UserPlus className="h-4 w-4" /> Invite member</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="flex items-center gap-3 p-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950"><Shield className="h-5 w-5 text-amber-500" /></div><div><p className="text-2xl font-bold">{members.filter((m) => m.role === 'owner').length}</p><p className="text-xs text-muted-foreground">Owners</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950"><Shield className="h-5 w-5 text-blue-500" /></div><div><p className="text-2xl font-bold">{members.filter((m) => m.role === 'admin').length}</p><p className="text-xs text-muted-foreground">Admins</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800"><Shield className="h-5 w-5 text-slate-500" /></div><div><p className="text-2xl font-bold">{members.filter((m) => m.role === 'member').length}</p><p className="text-xs text-muted-foreground">Members</p></div></CardContent></Card>
      </div>

      {/* Member list */}
      <Card>
        <CardContent className="p-0">
          {/* Desktop table */}
          <div className="hidden overflow-hidden md:block">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Member</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Role</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Joined</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Projects</th>
                  <th className="p-3 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.userId} className="border-b transition-colors hover:bg-accent/50 last:border-0">
                    <td className="p-3"><div className="flex items-center gap-2.5"><UserAvatar user={m.user} size="sm" /><span className="text-sm font-medium">{m.user.name}</span></div></td>
                    <td className="p-3 text-sm text-muted-foreground">{m.user.email}</td>
                    <td className="p-3"><Badge variant="secondary" className={roleBadge[m.role].class}>{roleBadge[m.role].label}</Badge></td>
                    <td className="p-3 text-sm text-muted-foreground">{formatDate(m.joinedDate)}</td>
                    <td className="p-3 text-sm text-muted-foreground">{m.projects.length}</td>
                    <td className="p-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => changeRole(m.userId, 'admin')}>Make Admin</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeRole(m.userId, 'member')}>Make Member</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => removeMember(m.userId)} disabled={m.userId === currentUser.id}>Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="space-y-2 p-3 md:hidden">
            {members.map((m) => (
              <div key={m.userId} className="flex items-center gap-3 rounded-lg border p-3">
                <UserAvatar user={m.user} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{m.user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.user.email}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary" className={roleBadge[m.role].class}>{roleBadge[m.role].label}</Badge>
                    <span className="text-xs text-muted-foreground">{m.projects.length} projects</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => changeRole(m.userId, 'admin')}>Make Admin</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeRole(m.userId, 'member')}>Make Member</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => removeMember(m.userId)} disabled={m.userId === currentUser.id}>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
