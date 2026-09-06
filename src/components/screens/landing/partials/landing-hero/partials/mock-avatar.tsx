import { avatarGradient, getInitials } from "@/src/lib/helpers";
import { User } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";

export function MockAvatar({
  user,
  size = "sm",
}: {
  user: User;
  size?: "xs" | "sm" | "md";
}) {
  const sizeClasses = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-7 w-7 text-xs",
    md: "h-8 w-8 text-xs",
  };

  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className={cn(
          "rounded-full object-cover ring-2 ring-background",
          sizeClasses[size],
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
      )}
      title={user.name}
    >
      {getInitials(user.name)}
    </div>
  );
}

export function MockAvatarGroup({
  users,
  max = 4,
  size = "sm",
}: {
  users: User[];
  max?: number;
  size?: "xs" | "sm" | "md";
}) {
  const shown = users.slice(0, max);
  const extra = users.length - max;

  return (
    <div className="flex items-center -space-x-2">
      {shown.map((u) => (
        <MockAvatar key={u.id} user={u} size={size} />
      ))}
      {extra > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-2 ring-background",
            size === "xs"
              ? "h-6 w-6 text-[10px]"
              : size === "sm"
                ? "h-7 w-7 text-xs"
                : "h-8 w-8 text-xs",
          )}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
