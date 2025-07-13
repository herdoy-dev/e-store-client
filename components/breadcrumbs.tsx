import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

const Breadcrumbs = ({
  items,
  className,
  separator = <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />,
}: BreadcrumbsProps) => {
  return (
    <nav
      className={cn("flex items-center text-sm text-gray-600", className)}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && separator}

          {index === items.length - 1 ? (
            <span
              className="font-medium text-gray-800 truncate max-w-[150px] md:max-w-none"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-primary transition-colors truncate max-w-[120px] md:max-w-none"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
