"use client";
import { cn } from "@/lib/utils";
import {
  Grid2x2,
  LayoutGrid,
  Mail,
  NotepadText,
  PackageOpen,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    _id: "a",
    label: "Dashboard",
    icon: <LayoutGrid size={20} />,
    link: "/dashboard",
  },
  {
    _id: "x",
    label: "Categorys",
    icon: <Grid2x2 size={20} />,
    link: "/dashboard/categorys",
  },
  {
    _id: "b",
    label: "Products",
    icon: <PackageOpen size={20} />,
    link: "/dashboard/products",
  },
  {
    _id: "c",
    label: "Orders",
    icon: <NotepadText size={20} />,
    link: "/dashboard/orders",
  },
  {
    _id: "d",
    label: "Customers",
    icon: <Users size={20} />,
    link: "/dashboard/customers",
  },
  {
    _id: "e",
    label: "Messages",
    icon: <Mail size={20} />,
    link: "/dashboard/messages",
  },
];

function Aside() {
  const currentPath = usePathname();
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-full flex flex-col">
        <Link href="/" className="flex items-center gap-2 ps-4 lg:p-4">
          <Image src="/logo.png" width={120} height={60} alt="logo" />
        </Link>
        <div className="p-4 space-y-2">
          {items.map((item) => (
            <Link
              key={item._id}
              href={item.link}
              className={cn(
                "flex items-center gap-3 p-2 rounded hover:bg-primary/10 transition-all cursor-pointer",
                item.link === currentPath && "bg-primary/20"
              )}
            >
              {item.icon} <span> {item.label} </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <Link
          href="/dashboard/setting"
          className={cn(
            "flex items-center gap-3 p-2 rounded hover:bg-primary/10 transition-all cursor-pointer",
            currentPath === "/dashboard/setting" && "bg-primary/20"
          )}
        >
          <Settings /> <span> Setting </span>
        </Link>
      </div>
    </div>
  );
}

export default Aside;
