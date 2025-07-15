import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import Category from "@/schemas/Category";
import CategoryActions from "./category-actions";
import CategoryTable from "./category-table";

export const dynamic = "force-dynamic";

async function Categorys() {
  const { data } = await apiClient.get<ApiResponse<Category[]>>("/categorys");
  const categorys = data.data;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categorys</h1>
      <CategoryActions />
      <CategoryTable categorys={categorys} />
    </div>
  );
}

export default Categorys;
