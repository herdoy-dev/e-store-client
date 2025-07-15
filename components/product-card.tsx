"use client";
import Product from "@/schemas/Product";
import { useCartStore } from "@/store";
import { Flex } from "@radix-ui/themes";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  return (
    <div className="group relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-all">
        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
      </button>
      <div className="overflow-hidden bg-gray-100">
        <Image
          src={product.thumbnail}
          width={600}
          height={400}
          alt={product.name}
          className="object-cover w-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Link
            href={`/products/${product._id}`}
            className="font-medium text-lg text-gray-900 line-clamp-1"
          >
            {product.name}
          </Link>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        <Flex align="center" justify="between" className="pt-2">
          <span className="font-bold text-lg text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            className="gap-2 bg-primary hover:bg-primary/90 transition-colors"
            onClick={() =>
              addToCart({
                product: product._id,
                name: product.name,
                image: product.thumbnail,
                price: product.price,
                quantity: 1,
              })
            }
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default ProductCard;
