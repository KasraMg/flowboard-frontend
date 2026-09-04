import { Search, Plus, Menu } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ThemeToggle } from "../theme-toggle";
import UserMenu from "./user-menu";
import Link from "next/link";

export function Topbar({
  onOpenSearch,
  onOpenMobileSidebar,
}: {
  onOpenSearch: () => void;
  onOpenMobileSidebar: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onOpenMobileSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <button
        onClick={onOpenSearch}
        className="group flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-input bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
      >
        <Search className="h-4 w-4" />
        <span className="hidden flex-1 text-left sm:block">
          Search projects, tasks, people...
        </span>
        <span className="flex-1 text-left sm:hidden">Search...</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium sm:flex">
          ⌘K
        </kbd>
      </button>

      <div className="flex-1 sm:flex hidden" />

      <Link href="/projects" className="hidden sm:block">
        <Button variant="default" size="sm" className="gap-1.5 flex">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </Link>

      <ThemeToggle />

      <UserMenu />
    </header>
  );
}
