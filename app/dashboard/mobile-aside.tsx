"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import Aside from "./aside";

export function MobileAside() {
  const [open, setOpen] = useState(false);
  return (
    <div className="block lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle />
          <div onClick={() => setOpen(false)} className="h-full">
            <Aside />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
