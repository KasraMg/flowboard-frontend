"use client";

import { ChevronDown, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import AuthModal from "./auth/auth-modal";
import useUser from "@/src/hooks/useUser";
import Link from "next/link";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

const UserMenu = () => {
  const { data, isPending } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  return data ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-accent">
          {isPending ? (
            <Skeleton className="min-h-8 min-w-8 rounded-full"/>
          ) : (
            <UserAvatar user={data} size="md" className="min-h-8 min-w-8" />
          )}
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{data.name}</span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {data.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link className="flex items-center" href={"/settings"}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <div
            className="flex items-center w-full cursor-pointer"
            onClick={() => {
              Cookies.remove("token");
              queryClient.removeQueries({
                queryKey: ["user"],
              });
              router.push("/");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <AuthModal />
  );
};

export default UserMenu;
