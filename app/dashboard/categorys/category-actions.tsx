import { buttonVariants } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";

function CategoryActions() {
  return (
    <Flex align="center" justify="end" mb="4">
      <Link
        className={buttonVariants({ size: "sm" })}
        href="/dashboard/categorys/new"
      >
        Add New Category
      </Link>
    </Flex>
  );
}

export default CategoryActions;
