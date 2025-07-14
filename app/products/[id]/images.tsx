"use client";
import ProductSchema from "@/schemas/Product";
import Image from "next/image";
import { useState } from "react";

interface Props {
  product: ProductSchema;
}

function ProductImages({ product }: Props) {
  const [thumbnail, setThumbnail] = useState(product.thumbnail);
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <Image
          src={thumbnail}
          width={800}
          height={600}
          alt={product.name}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div
          onClick={() => setThumbnail(product.thumbnail)}
          className="bg-white p-2 rounded-md border cursor-pointer hover:border-primary"
        >
          <Image
            src={product.thumbnail}
            width={200}
            height={200}
            alt="thumbnail"
            className="w-full h-auto object-contain"
          />
        </div>
        {product.images.length >= 1 &&
          product.images.map((i) => (
            <div
              key={i}
              className="bg-white p-2 rounded-md border cursor-pointer hover:border-primary"
              onClick={() => setThumbnail(i)}
            >
              <Image
                src={i}
                width={200}
                height={200}
                alt={`${product.name} thumbnail ${i}`}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductImages;
