import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import ProductSchema from "@/schemas/Product";
import ProductActions from "./product-actions";
import ProductTable from "./product-table";

export const dynamic = "force-dynamic";

interface SearchParams {
  name: string;
  orderBy: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function ProductPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.name ? params.name : undefined;
  const orderBy = params.orderBy ? params.orderBy : undefined;

  const response = await apiClient.get<ApiResponse<ProductSchema[]>>(
    "/products/my",
    {
      params: {
        search,
        orderBy,
      },
    }
  );

  const products = response.data;

  if (!products) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Products</h1>
      <ProductActions />
      <ProductTable data={products.data} />
    </div>
  );
}
