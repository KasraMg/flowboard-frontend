'use client';

import * as React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/src/components/ui/dialog';
import { PROJECT_COLORS } from '@/src/lib/types';
import { cn } from '@/src/lib/utils';
import { toast } from 'sonner';
import type { Project } from '@/src/lib/types';

export function ProjectFormModal({
  open, onOpenChange, editProject,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editProject?: Project | null;
}) {
  const { createProject, updateProject, workspaces, activeWorkspaceId } = useApp();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [color, setColor] = React.useState(PROJECT_COLORS[0]);
  const [visibility, setVisibility] = React.useState<Project['visibility']>('workspace');
  const [workspaceId, setWorkspaceId] = React.useState(activeWorkspaceId);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (editProject) {
      setName(editProject.name);
      setDescription(editProject.description);
      setColor(editProject.backgroundColor);
      setVisibility(editProject.visibility);
      setWorkspaceId(editProject.workspaceId);
    } else {
      setName('');
      setDescription('');
      setColor(PROJECT_COLORS[0]);
      setVisibility('workspace');
      setWorkspaceId(activeWorkspaceId);
    }
    setErrors({});
  }, [editProject, open, activeWorkspaceId]);

  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Project name is required';
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    if (editProject) {
      updateProject(editProject.id, { name, description, backgroundColor: color, visibility, workspaceId });
      toast.success('Project updated');
    } else {
      createProject({ name, description, backgroundColor: color, visibility, workspaceId });
      toast.success('Project created', { description: `"${name}" is ready to go.` });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{editProject ? 'Edit project' : 'Create project'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview */}
          <div className="relative h-24 overflow-hidden rounded-xl" style={{ backgroundColor: color }}>
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-white drop-shadow">{name || 'Project name'}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="proj-name">Project name</Label>
            <Input id="proj-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mobile App Redesign" aria-invalid={!!errors.name} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="proj-desc">Description</Label>
            <Textarea id="proj-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this project about?" rows={3} />
          </div>

          <div className="space-y-1.5">
            <Label>Project color</Label>
            <div className="flex flex-wrap gap-2">
              {PROJECT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn('h-8 w-8 rounded-lg transition-all', color === c ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:scale-110')}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Visibility</Label>
              <Select value={visibility} onValueChange={(v) => setVisibility(v as Project['visibility'])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="workspace">Workspace</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Workspace</Label>
              <Select value={workspaceId} onValueChange={setWorkspaceId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {workspaces.map((w) => <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{editProject ? 'Save changes' : 'Create project'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
