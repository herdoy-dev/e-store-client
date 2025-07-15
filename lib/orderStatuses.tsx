import Order from "@/schemas/Order";

import { CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import { JSX } from "react";

export const orderPaymentVariantMap: Record<
  Order["paymentStatus"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  paid: "default",
  failed: "destructive",
  refunded: "outline",
};

export const orderStatusVariantMap: Record<
  Order["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  processing: "outline",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

export const orderStatusIconMap: Record<Order["status"], JSX.Element> = {
  pending: <Clock className="w-4 h-4 mr-1" />,
  processing: <Clock className="w-4 h-4 mr-1" />,
  shipped: <Truck className="w-4 h-4 mr-1" />,
  delivered: <CheckCircle className="w-4 h-4 mr-1" />,
  cancelled: <XCircle className="w-4 h-4 mr-1" />,
};
