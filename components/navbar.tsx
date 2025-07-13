"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSession from "@/hooks/useSession";
import apiClient from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import APIResponse from "@/schemas/APIResponse";
import { Container, Skeleton } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar: FC = () => {
  const pathname = usePathname();
  const { session, loading } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="px-4">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="block md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 hover:bg-transparent"
                >
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {navItems.map((item, index) => (
                  <DropdownMenuItem asChild key={index}>
                    <Link href={item.href}> {item.name} </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">MyBrand</span>
            </Link>

            <nav className="hidden items-center space-x-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary font-semibold"
                      : "text-foreground/60 hover:text-foreground/80"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {loading ? (
            <Skeleton className="w-20 !h-5" />
          ) : (
            <div className="flex items-center gap-4">
              {session && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 px-2 hover:bg-transparent"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.image}
                          alt={session.firstName}
                        />
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
                        <AvatarImage
                          src={session.image}
                          alt={session.firstName}
                        />
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

              {!session && (
                <div className="items-center gap-4 md:flex">
                  <Link
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                    href="/log-in"
                  >
                    Log In
                  </Link>
                  <Link
                    className={buttonVariants({ size: "sm" })}
                    href="/sign-up"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
