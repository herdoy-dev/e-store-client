import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import apiClient from "@/lib/apiClient";
import formatDate from "@/lib/formatDate";
import {
  orderPaymentVariantMap,
  orderStatusIconMap,
  orderStatusVariantMap,
} from "@/lib/orderStatuses";
import ApiResponse from "@/schemas/APIResponse";
import Order from "@/schemas/Order";
import { ArrowLeft, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetails({ params }: Props) {
  const { id } = await params;
  const { data } = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
  const order = data.data;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard/orders">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Button>
        </Link>

        <Button variant="outline">
          <Printer className="w-4 h-4" />
          Print
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order #{order._id.slice(-8).toUpperCase()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={orderStatusVariantMap[order.status]}
                    className="flex items-center"
                  >
                    {orderStatusIconMap[order.status]}
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <Badge variant={orderPaymentVariantMap[order.paymentStatus]}>
                    {order.paymentStatus.charAt(0).toUpperCase() +
                      order.paymentStatus.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-medium">${order.subtotal.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          width={64}
                          height={64}
                          src={item.product.thumbnail}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                        {item.product.colors.length > 0 && (
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-muted-foreground mr-2">
                              Color:
                            </span>
                            <div
                              className="w-4 h-4 rounded-full border"
                              style={{
                                backgroundColor: item.product.colors[0].code,
                              }}
                            />
                            <span className="ml-1 text-sm">
                              {item.product.colors[0].name}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {index < order.items.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer and Shipping Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">
                  {order.user.firstName} {order.user.lastName}
                </p>
                <p className="text-muted-foreground">{order.user.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{order.shippingAddress.street}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.country}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.subtotal > 50 ? "Free" : "$5.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
