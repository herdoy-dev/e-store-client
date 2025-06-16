import { buttonVariants } from "@/components/ui/button";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function Product() {
  return (
    <div>
      <Flex align="center" justify="between">
        <div></div>
        <Link
          className={buttonVariants({ size: "sm" })}
          href="/dashboard/products/new"
        >
          Add New Product
        </Link>
      </Flex>
    </div>
  );
}

export default Product;
