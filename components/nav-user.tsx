"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSession from "@/hooks/useSession";
import { Skeleton } from "@radix-ui/themes";
import cookie from "js-cookie";
import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";

import toast from "react-hot-toast";

export default function NavUser() {
  const { session, loading } = useSession();
  if (loading) return <Skeleton width="120" height="60" />;
  if (!session) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center bg-gray-200 rounded-4xl gap-2 pr-2">
          <Avatar className="h-9 w-9 border-4">
            <AvatarImage src={session.image} alt={session.firstName} />
            <AvatarFallback>
              {session.firstName.charAt(0)}
              {session.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.image} alt={session.firstName} />
            <AvatarFallback>
              {session.firstName.charAt(0)}
              {session.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">
              {session.firstName} {session.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{session.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="w-full cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="w-full cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            onClick={async () => {
              try {
                cookie.remove("token");
                toast.success("Log Out Success!");
                window.location.reload();
              } catch (error) {
                toast.error("Failed!");
                console.log(error);
              }
            }}
            className="w-full cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
