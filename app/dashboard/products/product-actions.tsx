import { buttonVariants } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import ProductCategoryFilter from "./product-category-filter";

function ProductActions() {
  return (
    <Flex align="center" justify="between" mb="4">
      <ProductCategoryFilter />
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
