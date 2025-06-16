import apiClient from "@/lib/apiClient";
import { CategoryResponse } from "@/schemas/Category";
import { useQuery } from "@tanstack/react-query";

const useCategorys = () =>
  useQuery<CategoryResponse, Error>({
    queryKey: ["categorys"],
    queryFn: () =>
      apiClient.get<CategoryResponse>("/categorys").then((res) => res.data),
  });

export default useCategorys;
