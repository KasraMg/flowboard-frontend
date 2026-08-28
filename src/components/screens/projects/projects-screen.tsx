"use client";

import { Search, Star, FolderKanban, SlidersHorizontal } from "lucide-react";
import { ProjectFormModal } from "@/src/components/screens/projects/partials/project-form-modal";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ProjectCard } from "@/src/components/screens/projects/partials/project-card";
import { useProjects } from "@/src/hooks/useProject";
import { useEffect, useState } from "react";
import ProjectCardSkeleton from "./partials/project-card-skeleton";
import ProjectNotFound from "./partials/project-not-found";

export default function ProjectsScreen() {
  const { data: projects } = useProjects();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [showFavorites, setShowFavorites] = useState(false);
  const [filteredData, SetFilteredData] = useState([]);

  useEffect(() => {
    if (projects) {
      let list = [...(projects as any)];
      if (statusFilter !== "all") {
        if (statusFilter == "active") {
          list = list.filter((p) => p.project.status == "active");
        } else {
          list = list.filter((p) => p.project.status !== "active");
        }
      } else list = [...(projects as any)];

      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
          (p) =>
            p.project.title.toLowerCase().includes(q) ||
            p.project.description.toLowerCase().includes(q),
        );
      }

      list.sort((a, b) => {
        if (sortBy === "title")
          return a.project.title.localeCompare(b.project.title);
        if (sortBy === "created")
          return (
            new Date(b.project.createdAt).getTime() -
            new Date(a.project.createdAt).getTime()
          );
        return (
          new Date(b.project.updatedAt).getTime() -
          new Date(a.project.updatedAt).getTime()
        );
      });

      SetFilteredData(list as any);
    }
  }, [projects, search, statusFilter, sortBy, showFavorites]);

  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all your projects in one place
          </p>
        </div>
        <ProjectFormModal />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-35">
              <SlidersHorizontal className="mr-1 h-3.5 w-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-35">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last updated</SelectItem>
              <SelectItem value="created">Newest</SelectItem>
              <SelectItem value="title">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={showFavorites ? "default" : "outline"}
            size="icon"
            onClick={() => setShowFavorites((f) => !f)}
            title="Favorites"
          >
            <Star
              className={showFavorites ? "fill-current h-4 w-4" : "h-4 w-4"}
            />
          </Button>
        </div>
      </div>

      {filteredData.length !== 0 ? (
        !projects ? (
          <ProjectNotFound />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData?.map((p, index) => (
              <ProjectCard key={index + 1} data={p} />
            ))}
          </div>
        )
      ) : search ? (
        <ProjectNotFound />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton className="sm:block! hidden" />
          <ProjectCardSkeleton className="lg:block! hidden" />
          <ProjectCardSkeleton className="xl:block! hidden" />
        </div>
      )}
    </div>
  );
}
