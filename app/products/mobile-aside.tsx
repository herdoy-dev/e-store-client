"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Category from "@/schemas/Category";
import { ListFilter } from "lucide-react";
import Aside from "./aside";

interface Props {
  categorys: Category[];
}

export function MobileAside({ categorys }: Props) {
  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <ListFilter />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle />
          <Aside categorys={categorys} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
