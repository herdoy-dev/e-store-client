import FilterByName from "@/components/filter-by-name";
import { buttonVariants } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";

function OrderActions() {
  return (
    <Flex align="center" justify="between" mb="4">
      <FilterByName />
      <Link
        className={buttonVariants({ size: "sm" })}
        href="/dashboard/products/new"
      >
        Add New Product
      </Link>
    </Flex>
  );
}

export default OrderActions;
