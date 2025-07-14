import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import ProductSchema from "@/schemas/Product";
import ProductForm from "../../product-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewProduct({ params }: Props) {
  const { id } = await params;
  const { data } = await apiClient.get<ApiResponse<ProductSchema>>(
    `/products/${id}`
  );
  return <ProductForm product={data.data} />;
}
