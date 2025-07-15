import apiClient from "@/lib/apiClient";
import Address from "@/schemas/Address";
import ApiResponse from "@/schemas/APIResponse";
import { useQuery } from "@tanstack/react-query";

const useAddress = () =>
  useQuery<ApiResponse<Address>, Error>({
    queryKey: ["addresses"],
    queryFn: () =>
      apiClient
        .get<ApiResponse<Address>>("/addresses/my")
        .then((res) => res.data),
  });

export default useAddress;
