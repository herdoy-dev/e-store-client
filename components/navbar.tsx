"use client";

import { buttonVariants } from "@/components/ui/button";
import useSession from "@/hooks/useSession";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store";
import { Container, Skeleton } from "@radix-ui/themes";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./mobile-nav";
import NavUser from "./nav-user";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { session, loading } = useSession();
  const cartItems = useCartStore((s) => s.items);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="pr-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center px-2">
            <MobileNav />
            <div className="flex items-center">
              <Link href="/">
                <Image src="/logo.png" width={120} height={60} alt="logo" />
              </Link>
            </div>

            <nav className="hidden items-center space-x-6 md:flex ms-1">
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

          {!loading ? (
            <div className="flex gap-3 md:gap-4 items-center">
              <NavUser />
              {!session && (
                <div className="items-center md:flex">
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "sm",
                      }),
                      "mr-4"
                    )}
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
              {cartItems.length >= 1 && (
                <Link href="/cart" className="relative">
                  <ShoppingBag />
                  <div className="w-5 h-5 flex items-center justify-center text-[10px] rounded-full bg-primary text-white absolute -top-3 -right-3">
                    {cartItems.length}
                  </div>
                </Link>
              )}
            </div>
          ) : (
            <Skeleton className="w-16 !h-8" />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
