'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { User, Palette, Bell, Building2, Sun, Moon, Monitor, Save } from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import { UserAvatar } from '@/src/components/modules/user-avatar';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Switch } from '@/src/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/components/ui/tabs';
import { cn } from '@/src/lib/utils';
import { toast } from 'sonner';

export default function SettingsScreen() {
  const { currentUser, updateProfile, workspaces, activeWorkspaceId } = useApp();
  const { theme, setTheme } = useTheme();
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [notifSettings, setNotifSettings] = React.useState({ email: true, tasks: true, projects: false });

  const activeWs = workspaces.find((w) => w.id === activeWorkspaceId);

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="flex-wrap">
          <TabsTrigger value="account" className="gap-1.5"><User className="h-3.5 w-3.5" /> Account</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1.5"><Palette className="h-3.5 w-3.5" /> Appearance</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-3.5 w-3.5" /> Notifications</TabsTrigger>
          <TabsTrigger value="workspace" className="gap-1.5"><Building2 className="h-3.5 w-3.5" /> Workspace</TabsTrigger>
        </TabsList>

        {/* Account */}
        <TabsContent value="account" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Account Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <UserAvatar user={currentUser} size="xl" />
                <Button variant="outline" size="sm" onClick={() => toast.info('Upload coming soon')}>Change avatar</Button>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="set-name">Name</Label>
                <Input id="set-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="set-email">Email</Label>
                <Input id="set-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="set-pass">Password</Label>
                <Input id="set-pass" type="password" placeholder="••••••••" />
              </div>
              <Button onClick={() => { updateProfile({ name, email }); toast.success('Account updated'); }} className="gap-1.5"><Save className="h-4 w-4" /> Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Theme</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Monitor },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:shadow-sm',
                      theme === opt.value ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border'
                    )}
                  >
                    <opt.icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'email', label: 'Email notifications', desc: 'Receive notifications via email' },
                { key: 'tasks', label: 'Task notifications', desc: 'Get notified about task assignments and deadlines' },
                { key: 'projects', label: 'Project notifications', desc: 'Get notified about project updates and invites' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifSettings[item.key as keyof typeof notifSettings]}
                    onCheckedChange={(v) => { setNotifSettings((s) => ({ ...s, [item.key]: v })); toast.success('Preference updated'); }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workspace */}
        <TabsContent value="workspace" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Workspace Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ws-name">Workspace name</Label>
                <Input id="ws-name" defaultValue={activeWs?.name} />
              </div>
              <div className="space-y-1.5">
                <Label>Workspace logo</Label>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-lg font-bold text-white">
                    {activeWs?.name?.[0] || 'A'}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info('Upload coming soon')}>Change logo</Button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Preferences</Label>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div><p className="text-sm font-medium">Auto-archive completed tasks</p><p className="text-xs text-muted-foreground">Move done tasks to archive after 30 days</p></div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div><p className="text-sm font-medium">Show project colors in sidebar</p><p className="text-xs text-muted-foreground">Display color dots next to projects</p></div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button onClick={() => toast.success('Workspace updated')} className="gap-1.5"><Save className="h-4 w-4" /> Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
