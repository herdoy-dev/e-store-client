import ContactSection from "@/components/contact-section";
import ProductCard from "@/components/product-card";
import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import Category from "@/schemas/Category";
import ProductSchema from "@/schemas/Product";
import { Container, Grid } from "@radix-ui/themes";
import FilterByName from "../../components/filter-by-name";
import Aside from "./aside";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    categoryId: string;
    price: string;
    name: string;
  }>;
}

const ProductPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const categoryId = params.categoryId ? params.categoryId : null;
  const price = params.price ? parseInt(params.price) : null;
  const search = params.name ? params.name : null;
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      apiClient.get<ApiResponse<ProductSchema[]>>("/products", {
        params: {
          categoryId,
          price,
          search,
        },
      }),
      apiClient.get<ApiResponse<Category[]>>("/categorys"),
    ]);

    const products = productsRes.data;
    const categories = categoriesRes.data;

    if (!products || !categories) return null;

    return (
      <>
        <Container className="bg-gray-50 min-h-screen">
          <Grid columns={{ initial: "1", md: "250px 1fr" }} my="9" gap="6">
            <Aside categorys={categories.data} />
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="max-w-[400px]">
                  <FilterByName />
                </div>
              </div>
              <Grid
                columns={{ initial: "1", sm: "2", md: "3" }}
                gap="6"
                className="bg-white p-6 rounded-2xl shadow-sm"
              >
                {products.data.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </Grid>
            </div>
          </Grid>
        </Container>
        <ContactSection />
      </>
    );
  } catch (error) {
    console.error("Failed to fetch products or categories:", error);
    return null;
  }
};

export default ProductPage;
