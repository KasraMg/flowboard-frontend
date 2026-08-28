import { Skeleton } from "@/src/components/ui/skeleton";

const ProjectCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={`h-52.5 rounded-xl w-full ${className || ""}`}>
      <Skeleton className="bg-gray-600 h-20 w-full" />

      <div className="flex flex-1 flex-col p-4">
        <Skeleton className="bg-gray-600 h-4 w-1/2 rounded-md" />
        <Skeleton className="bg-gray-600 mt-5 h-3 w-3/4 rounded-md" />
        <Skeleton className="bg-gray-600 mt-5 h-3 w-full rounded-md" />
      </div>
    </Skeleton>
  );
};

export default ProjectCardSkeleton;
