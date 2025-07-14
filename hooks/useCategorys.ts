import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import Category from "@/schemas/Category";
import { useQuery } from "@tanstack/react-query";

const useCategorys = () =>
  useQuery<ApiResponse<Category[]>, Error>({
    queryKey: ["categorys"],
    queryFn: () =>
      apiClient
        .get<ApiResponse<Category[]>>("/categorys")
        .then((res) => res.data),
  });

export default useCategorys;
