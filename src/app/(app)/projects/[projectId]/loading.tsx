import { Skeleton } from "@/src/components/ui/skeleton";

function ProjectSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <header className="shrink-0">
        <Skeleton className="shadow-md h-28 bg-[#86a9e0]! w-full rounded-none" />

        <div className="relative z-50 px-4 pb-4 md:px-6">
          <div className="-mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <Skeleton className="shadow-md mt-1 h-8 w-8 shrink-0 rounded-md" />

              <div className="min-w-0 space-y-2">
                <Skeleton className="shadow-md h-7 w-48" />
                <Skeleton className="shadow-md h-4 w-72 max-w-full" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <Skeleton className="shadow-md h-8 w-8 rounded-full ring-2 ring-background" />
                <Skeleton className="shadow-md h-8 w-8 rounded-full ring-2 ring-background" />
                <Skeleton className="shadow-md h-8 w-8 rounded-full ring-2 ring-background" />
              </div>

              <Skeleton className="shadow-md h-9 w-20" />
              <Skeleton className="shadow-md h-9 w-9" />
            </div>
          </div>
        </div>
      </header>

      <div className="shrink-0 px-4 pb-1 pt-3 md:px-6">
        <div className="flex items-center gap-1">
          <Skeleton className="shadow-md h-9 w-20" />
          <Skeleton className="shadow-md h-9 w-24" />
          <Skeleton className="shadow-md h-9 w-24" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden p-4 md:px-6">
        <div className="flex h-full gap-4 overflow-hidden">
          {Array.from({ length: 2 }).map((_, columnIndex) => (
            <div
              key={columnIndex}
              className="flex w-72 shrink-0 flex-col gap-3 rounded-lg bg-muted/40 p-3"
            >
              <Skeleton className="shadow-md h-6 w-32" />

              {Array.from({ length: 3 }).map((_, taskIndex) => (
                <Skeleton
                  key={taskIndex}
                  className="shadow-md h-24 w-full rounded-lg"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return <ProjectSkeleton />;
}