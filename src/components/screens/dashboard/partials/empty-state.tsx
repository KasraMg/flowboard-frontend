import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>

      <h3 className="mt-4 font-medium">{title}</h3>

      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
