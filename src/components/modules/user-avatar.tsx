"use client";

import { cn } from "@/src/lib/utils";
import { avatarGradient, backendUrl, getInitials } from "@/src/lib/helpers";
import type { User } from "@/src/lib/types";
import { useApp } from "@/src/providers/app-provider";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<Size, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-7 w-7 text-xs",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
  xl: "h-16 w-16 text-lg",
};

export function UserAvatar({
  user,
  size = "md",
  className,
}: {
  user?: User;
  size?: Size;
  className?: string;
}) {
  const { users } = useApp();
  const u = user || users[0];
  if (!u) return null;

  if (u.avatar) {
    return (
      <img
        src={backendUrl + u.avatar}
        alt={u.name}
        className={cn(
          "rounded-full object-cover ring-2 ring-background",
          sizeClasses[size],
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-linear-to-br font-semibold text-white ring-2 ring-background",
        avatarGradient(String(u.id)),
        sizeClasses[size],
        className,
      )}
      title={u.name}
    >
      {getInitials(u.name)}
    </div>
  );
}

export function AvatarGroup({
  userIds,
  max = 4,
  size = "sm",
}: {
  userIds: string[];
  max?: number;
  size?: Size;
}) {
  const { users } = useApp();
  const shown = userIds.slice(0, max);
  const extra = userIds.length - max;

  return (
    <div className="flex items-center -space-x-2">
      {shown.map((id) => {
        const u = users.find((x) => String(x.id) === id);
        return u ? <UserAvatar key={id} user={u} size={size} /> : null;
      })}
      {extra > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium ring-2 ring-background",
            sizeClasses[size],
          )}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
