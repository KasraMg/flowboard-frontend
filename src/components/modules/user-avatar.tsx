"use client";

import { cn } from "@/src/lib/utils";
import { avatarGradient, backendUrl, getInitials } from "@/src/lib/helpers";
import type { User } from "@/src/lib/types";

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
  if (!user) return null;

  if (user.avatar) {
    return (
      <img
        src={backendUrl + user.avatar}
        alt={user.name}
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
        avatarGradient(String(user.id)),
        sizeClasses[size],
        className,
      )}
      title={user.name}
    >
      {getInitials(user.name)}
    </div>
  );
}
