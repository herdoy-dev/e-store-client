import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import Order from "@/schemas/Order";
import OrderTable from "./order-table";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const response = await apiClient.get<ApiResponse<Order[]>>("/orders");
  const products = response.data;
  if (!products) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <OrderTable data={products.data} />
    </div>
  );
}
