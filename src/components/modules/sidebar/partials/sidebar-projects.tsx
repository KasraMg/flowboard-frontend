import { Button } from "@/src/components/ui/button";
import { Project } from "@/src/lib/types";
import { cn, getBackground } from "@/src/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarProjects = ({ projects }: { projects: Project[] }) => {
  const pathname = usePathname();

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between pr-1 pl-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recent
        </span>
        <Link href="/projects">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
      <div className="space-y-0.5">
        {projects.slice(0, 4).map((p: Project) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent",
              pathname.startsWith(`/projects/${p.id}`) &&
                "bg-sidebar-accent text-sidebar-accent-foreground",
            )}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                background: getBackground(p.background),
              }}
            />
            <span className="truncate">{p.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarProjects;
