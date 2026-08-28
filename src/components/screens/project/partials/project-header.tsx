"use client";

import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { UserAvatar } from "@/src/components/modules/user-avatar";
import { PROJECT_BACKGROUNDS } from "@/src/lib/project-backgrounds";
import { useRouter } from "next/navigation";
import type { Project } from "@/src/lib/types";
import InviteModal from "./invite-modal";
import useUser from "@/src/hooks/useUser";
import FavoriteButton from "@/src/components/modules/layout/favorite-button";

export function ProjectHeader({ project }: { project: Project }) {
  const router = useRouter();
  const { data } = useUser();
  const background = PROJECT_BACKGROUNDS[project.background];

  return (
    <header className="shrink-0">
      <div className="relative h-28 overflow-hidden" style={{ background }}>
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/20" />
      </div>

      <div className="px-4 pb-4 md:px-6 z-50 relative">
        <div className="-mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="mt-1 h-8 w-8 shrink-0 bg-background/90 backdrop-blur"
              onClick={() => router.push("/projects")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-xl font-bold md:text-2xl">
                  {project.title}
                </h1>

                <Star className={`${project.isFave ? ' text-yellow-400 fill-yellow-400 stroke-yellow-400' : ''} h-4 w-4 text-muted-foreground`} />
              </div>

              {project.description && (
                <p className="mt-1 line-clamp-2 max-w-2xl text-sm text-muted-foreground">
                  {project.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.members.map((member) => (
              <UserAvatar key={member.role} user={member.user} size="md" />
            ))}
            {data.data.user.id == project.owner.id ? <InviteModal /> : ""}
            <FavoriteButton
              projectId={project.id}
              isFavorite={project.isFave}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
