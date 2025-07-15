import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import Category from "@/schemas/Category";
import CategoryForm from "../../category-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function EditCategory({ params }: Props) {
  const { id } = await params;
  const { data } = await apiClient.get<ApiResponse<Category>>(
    `/categorys/${id}`
  );
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Category</h1>
      <CategoryForm category={data.data} />
    </div>
  );
}

export default EditCategory;
