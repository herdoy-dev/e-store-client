import Product from "@/schemas/Product";
import { Flex } from "@radix-ui/themes";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  return (
    <div className="shadow-lg transition-shadow duration-300 border rounded-2xl overflow-hidden relative">
      <Flex
        align="center"
        justify="center"
        className="w-10 h-10 bg-black/25 rounded-full absolute top-3 right-3 cursor-pointer hover:bg-black/40 transition-all"
      >
        <Heart className="text-white" />
      </Flex>
      <Image
        src={product.image}
        width={600}
        height={400}
        alt={product.title}
        className="object-cover w-fit h-fit"
      />
      <div className="p-4 space-y-6 bg-white">
        <div>
          <h2 className="text-2xl"> {product.title} </h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        <Flex align="center" justify="between">
          <h2 className="text-2xl text-primary">${product.price}</h2>
          <Button size="sm" className="uppercase">
            <ShoppingCart /> Add to cart
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default ProductCard;
