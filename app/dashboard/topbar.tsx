"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSession from "@/hooks/useSession";
import apiClient from "@/lib/apiClient";
import APIResponse from "@/schemas/APIResponse";
import { AxiosError } from "axios";
import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import toast from "react-hot-toast";

const Topbar: FC = () => {
  const { session } = useSession();

  return (
    <header className="w-full border-b bg-white">
      <div className="flex h-16 items-center justify-end px-4">
        <div className="flex items-center gap-4">
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 hover:bg-transparent"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.image} alt={session.firstName} />
                    <AvatarFallback>
                      {session.firstName.charAt(0)}
                      {session.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
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
                    <p className="text-xs text-muted-foreground">
                      {session.email}
                    </p>
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
                        const { data } = await apiClient.post<
                          APIResponse<string>
                        >("/auth/log-out");
                        toast.success(data.message);
                        window.location.reload();
                      } catch (error) {
                        if (error instanceof AxiosError) {
                          if (error.response && error.response.data) {
                            toast.error(error.response.data.message);
                          }
                        }
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
