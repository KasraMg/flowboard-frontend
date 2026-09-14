import { Project } from "@/src/lib/types";
import { cn, getBackground } from "@/src/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarFavorites = ({
  favorites,
}: {
  favorites: {
    project: Project;
  }[];
}) => {
  const pathname = usePathname();

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between px-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Favorites
        </span>
        <Star className="h-3.5 w-3.5 text-amber-500" />
      </div>
      <div className="space-y-0.5">
        {favorites.length === 0 ? (
          <p className="px-2 text-xs text-muted-foreground">No favorites yet</p>
        ) : (
          favorites.map((p) => (
            <Link
              key={p.project.id}
              href={`/projects/${p.project.id}`}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent",
                pathname.startsWith(`/projects/${p.project.id}`) &&
                  "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  background: getBackground(p.project.background),
                }}
              />
              <span className="truncate">{p.project.title}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SidebarFavorites;
