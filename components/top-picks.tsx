import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import ProductSchema from "@/schemas/Product";
import { Container, Grid } from "@radix-ui/themes";
import ProductCard from "./product-card";

const TopPicks = async () => {
  const { data } = await apiClient.get<ApiResponse<ProductSchema[]>>(
    "/products",
    {
      params: {
        type: "Regular",
      },
    }
  );

  return (
    <section className="py-16 bg-blue-500/10">
      <Container className="px-4">
        <h3 className="text-2xl font-semibold mb-8 text-center">Top Picks</h3>
        <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6">
          {data.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default TopPicks;
