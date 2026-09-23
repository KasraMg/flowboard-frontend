import { Skeleton } from "@/src/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 md:p-6">
      <div className="border rounded-lg">
        <div className="flex flex-wrap items-center gap-3 p-3">
          <Skeleton className="hidden sm:block h-9 w-9 shrink-0 rounded-lg" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-3/4 max-w-md" />
          </div>

          <Skeleton className="h-3 w-16 shrink-0" />

          <div className="w-full pt-3 lg:w-max lg:pt-0">
            <Skeleton className="h-9 w-full lg:w-20" />
          </div>
        </div>
      </div>
      <div className="border rounded-lg">
        <div className="flex flex-wrap items-center gap-3 p-3">
          <Skeleton className="hidden sm:block h-9 w-9 shrink-0 rounded-lg" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-3/4 max-w-md" />
          </div>

          <Skeleton className="h-3 w-16 shrink-0" />

          <div className="w-full pt-3 lg:w-max lg:pt-0">
            <Skeleton className="h-9 w-full lg:w-20" />
          </div>
        </div>
      </div>
      <div className="border rounded-lg">
        <div className="flex flex-wrap items-center gap-3 p-3">
          <Skeleton className="hidden sm:block h-9 w-9 shrink-0 rounded-lg" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-3/4 max-w-md" />
          </div>

          <Skeleton className="h-3 w-16 shrink-0" />

          <div className="w-full pt-3 lg:w-max lg:pt-0">
            <Skeleton className="h-9 w-full lg:w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
