'use client';

import * as React from 'react';
import { Plus, Search, Star, Archive, FolderKanban, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { useApp } from '@/src/providers/app-provider';
import { ProjectFormModal } from '@/src/components/screens/projects/partials/project-form-modal';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import type { Project } from '@/src/lib/types';
import { ProjectCard } from '@/src/components/modules/project-card';

export default function ProjectsScreen() {
  const { projects } = useApp();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('updated');
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [showArchived, setShowArchived] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editProject, setEditProject] = React.useState<Project | null>(null);

  const filtered = React.useMemo(() => {
    let list = [...projects];
    if (showFavorites) list = list.filter((p) => p.favorite);
    if (showArchived) list = list.filter((p) => p.archived);
    else list = list.filter((p) => !p.archived);
    if (statusFilter !== 'all') list = list.filter((p) => p.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'created') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return list;
  }, [projects, search, statusFilter, sortBy, showFavorites, showArchived]);

  const openCreate = () => { setEditProject(null); setModalOpen(true); };
  const openEdit = (p: Project) => { setEditProject(p); setModalOpen(true); };

  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage all your projects in one place</p>
        </div>
        <Button onClick={openCreate} className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="pl-9" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]"><SlidersHorizontal className="mr-1 h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last updated</SelectItem>
              <SelectItem value="created">Newest</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={showFavorites ? 'default' : 'outline'} size="icon" onClick={() => setShowFavorites((f) => !f)} title="Favorites">
            <Star className={showFavorites ? 'fill-current h-4 w-4' : 'h-4 w-4'} />
          </Button>
          <Button variant={showArchived ? 'default' : 'outline'} size="icon" onClick={() => setShowArchived((a) => !a)} title="Archived">
            <Archive className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <FolderKanban className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No projects found</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {search || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Create your first project to get started.'}
          </p>
          <Button onClick={openCreate} className="mt-4 gap-2"><Plus className="h-4 w-4" /> Create project</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} onEdit={openEdit} />)}
        </div>
      )}

      <ProjectFormModal open={modalOpen} onOpenChange={setModalOpen} editProject={editProject} />
    </div>
  );
}
