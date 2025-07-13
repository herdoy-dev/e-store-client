import Breadcrumbs from "@/components/breadcrumbs";
import ProductTabs from "@/components/product-tabs";
import SimilarProducts from "@/components/similar-products";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import ProductSchema from "@/schemas/Product";
import { Container, Grid, Heading, Text } from "@radix-ui/themes";
import { ChevronRight, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const response = await apiClient.get<ApiResponse<ProductSchema>>(
    `/products/${id}`
  );

  const product = response.data.data;

  if (!product) {
    return <div>Product not found </div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name, href: `#` },
          ]}
          separator={<ChevronRight className="w-4 h-4" />}
          className="py-4"
        />

        {/* Main Product Section */}
        <Grid
          columns={{ initial: "1", md: "1fr 1fr" }}
          gap="8"
          className="mb-12"
        >
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <Image
                src={product.thumbnail}
                width={800}
                height={600}
                alt={product.name}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((i) => (
                <div
                  key={i}
                  className="bg-white p-2 rounded-md border cursor-pointer hover:border-primary"
                >
                  <Image
                    src={product.thumbnail}
                    width={200}
                    height={200}
                    alt={`${product.name} thumbnail ${i}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Heading as="h1" size="6" weight="bold" className="text-gray-900">
                {product.name}
              </Heading>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Text size="2" className="text-gray-500">
                  (42 reviews)
                </Text>
              </div>
            </div>

            <div className="space-y-2">
              <Text size="6" mr="1" weight="bold" className="text-primary">
                ${product.price.toFixed(2)}
              </Text>
              {product.price && (
                <Text size="2" className="text-gray-500 line-through">
                  ${(1.5 * product.price).toFixed(2)}
                </Text>
              )}
            </div>

            <Text className="text-gray-700">{product.description}</Text>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Text weight="medium">Color:</Text>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.code}
                        className={`w-6 h-6 rounded-full border-2 border-transparent hover:border-gray-300`}
                        style={{
                          background: color.code,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Text weight="medium">Size:</Text>
                  <select className="border rounded-md px-2 py-1 text-sm">
                    {product.sizes.map((size) => (
                      <option key={size}> {size} </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border rounded-md">
                  <button className="px-3 py-1 text-lg">-</button>
                  <span className="px-3 py-1 border-x">1</span>
                  <button className="px-3 py-1 text-lg">+</button>
                </div>
                <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Text weight="medium" className="text-gray-500">
                    Availability
                  </Text>
                  <Text>In Stock (24 items)</Text>
                </div>
                <div>
                  <Text weight="medium" className="text-gray-500">
                    SKU
                  </Text>
                  <Text>PRD-{product._id.slice(0, 8)}</Text>
                </div>
                <div>
                  <Text weight="medium" className="text-gray-500">
                    Category
                  </Text>
                  <Text>{product.category.name || "Uncategorized"}</Text>
                </div>
                <div>
                  <Text weight="medium" className="text-gray-500">
                    Shipping
                  </Text>
                  <Text>Free shipping on orders over $50</Text>
                </div>
              </div>
            </div>
          </div>
        </Grid>

        {/* Product Tabs */}
        <ProductTabs
          description={product.description}
          specifications={[
            { name: "Material", value: "100% Cotton" },
            { name: "Weight", value: "0.5kg" },
            { name: "Dimensions", value: "10 x 10 x 5 cm" },
          ]}
          reviews={[]}
        />

        {/* Similar Products */}
        <SimilarProducts currentProductId={product._id} />
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
