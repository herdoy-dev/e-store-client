import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import ProductSchema from "@/schemas/Product";
import ProductActions from "./product-actions";
import ProductTable from "./product-table";

export const dynamic = "force-dynamic";

async function Product() {
  const { data } = await apiClient.get<ApiResponse<ProductSchema[]>>(
    "/products/my"
  );
  return (
    <div>
      <ProductActions />
      <ProductTable data={data.data} />
    </div>
  );
}

export default Product;
