import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import ProductSchema from "@/schemas/Product";
import { Container, Grid } from "@radix-ui/themes";
import ProductCard from "./product-card";

export const dynamic = "force-dynamic";

const FeaturedProducts = async () => {
  const { data } = await apiClient.get<ApiResponse<ProductSchema[]>>(
    "/products"
  );

  return (
    <section className="py-16 bg-gray-50">
      <Container className="px-2">
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Featured Products
        </h3>
        <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="5">
          {data.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
