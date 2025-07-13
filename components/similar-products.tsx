import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import ProductSchema from "@/schemas/Product";
import { Grid, Heading } from "@radix-ui/themes";
import ProductCard from "./product-card";

export const dynamic = "force-dynamic";

interface SimilarProductsProps {
  currentProductId: string;
}

const SimilarProducts = async ({ currentProductId }: SimilarProductsProps) => {
  const { data } = await apiClient.get<ApiResponse<ProductSchema[]>>(
    "/products"
  );

  const similarProducts = data.data
    .filter((product) => product._id !== currentProductId)
    .slice(0, 4);

  if (similarProducts.length === 0) return null;

  return (
    <div className="space-y-6">
      <Heading size="5" weight="bold" mb="3">
        You may also like
      </Heading>
      <Grid columns={{ initial: "1", sm: "2", md: "3", lg: "4" }} gap="6">
        {similarProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </div>
  );
};

export default SimilarProducts;
