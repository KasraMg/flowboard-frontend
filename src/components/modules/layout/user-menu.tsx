"use client";

import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { UserAvatar } from "../user-avatar";
import AuthModal from "./auth/auth-modal";
import useUser from "@/src/hooks/useUser";
import Link from "next/link";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

const UserMenu = () => {
  const { data } = useUser();
  const queryClient = useQueryClient();

  return data?.data ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-accent">
          <UserAvatar
            user={data?.data?.user}
            size="md"
            className="min-h-8 min-w-8"
          />
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{data?.data?.user.name}</span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {data?.data?.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link className="flex" href={"/settings"}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <div
            className="flex"
            onClick={() => {
              Cookies.remove("token");
              queryClient.removeQueries({
                queryKey: ["user"],
              });
              redirect("/");
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
