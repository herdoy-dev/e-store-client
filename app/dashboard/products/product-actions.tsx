import FilterByName from "@/components/filter-by-name";
import { buttonVariants } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";

function ProductActions() {
  return (
    <Flex
      align={{ initial: "start", md: "center" }}
      justify="between"
      gap={{ initial: "5", md: "0" }}
      direction={{ initial: "column", md: "row" }}
      mb="4"
    >
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

export default ProductActions;
