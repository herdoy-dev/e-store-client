import ContactSection from "@/components/contact-section";
import ProductCard from "@/components/product-card";
import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import ProductSchema from "@/schemas/Product";
import { Container, Grid, Heading } from "@radix-ui/themes";
import Aside from "./aside";

export const dynamic = "force-dynamic";

const ProductPage = async () => {
  const { data } = await apiClient.get<ApiResponse<ProductSchema[]>>(
    "/products"
  );

  return (
    <>
      <Container className="bg-gray-50 min-h-screen">
        <Grid columns={{ initial: "1", md: "250px 1fr" }} my="9" gap="6">
          <Aside />
          <div className="space-y-6">
            <Heading as="h1" size="6" weight="bold" className="text-gray-900">
              Our Products
            </Heading>
            <Grid
              columns={{ initial: "1", sm: "2", md: "3" }}
              gap="6"
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              {data.data.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Grid>
          </div>
        </Grid>
      </Container>
      <ContactSection />
    </>
  );
};

export default ProductPage;
