import ProjectCardSkeleton from "@/src/components/screens/projects/partials/project-card-skeleton";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 shadow-md" />
          <Skeleton className="h-4 w-64 shadow-md" />
        </div>

        <Skeleton className="h-10 w-32 shadow-md" />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <Skeleton className="h-10 w-full shadow-md" />

        <div className="flex gap-2">
          <Skeleton className="h-10 w-35 shadow-md" />
          <Skeleton className="h-10 w-35 shadow-md" />
          <Skeleton className="h-10 w-10 shadow-md" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton className="sm:block! hidden" />
        <ProjectCardSkeleton className="lg:block! hidden" />
        <ProjectCardSkeleton className="xl:block! hidden" />
      </div>
    </div>
  );
}
