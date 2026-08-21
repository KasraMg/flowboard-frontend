import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  value?: string | number;
};

export function TaskCounter({ icon: Icon, value }: Props) {
  if (value === undefined) return null;

  return (
    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
      <Icon className="h-3 w-3" />
      {value}
    </span>
  );
}