import Address from "./Address";
import ProductSchema from "./Product";
import UserSchema from "./User";

interface OrderItem {
  product: ProductSchema;
  quantity: number;
  price: number;
}

export default interface Order {
  _id: string;
  items: OrderItem[];
  user: UserSchema;
  shippingAddress: Address;
  subtotal: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: Date;
}
