"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useAddress from "@/hooks/useAddress";
import apiClient from "@/lib/apiClient";
import ApiResponse from "@/schemas/APIResponse";
import { useCartStore } from "@/store";
import { Container, Grid } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import CartItems from "./cart-items";

const CartPage = () => {
  const cartItems = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: address } = useAddress();

  // Calculate order totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 100 ? 0 : 9.99;
  const taxRate = 0.08;
  const taxAmount = subtotal * taxRate;
  const orderTotal = subtotal + shippingFee + taxAmount;

  const handlePlaceOrder = async () => {
    if (!address) {
      setError("Please set your shipping address before placing an order");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const orderData = {
        items: cartItems,
        shippingAddress: address.data._id,
      };

      const response = await apiClient.post<ApiResponse<string>>(
        "/orders",
        orderData
      );
      toast.success(response.data.message);
      clearCart();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Failed to place order");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">
                Your Cart ({cartItems.length})
              </h1>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                <h2 className="text-xl font-medium">Your cart is empty</h2>
                <p className="text-muted-foreground">
                  Start shopping to add items to your cart
                </p>
                <Button asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <Grid columns={{ initial: "1", md: "2fr 1fr" }} gap="6">
                <div className="space-y-6">
                  <CartItems cartItems={cartItems} />
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>
                          {shippingFee === 0
                            ? "Free"
                            : `$${shippingFee.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (8%)</span>
                        <span>${taxAmount.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${orderTotal.toFixed(2)}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      {error && (
                        <p className="text-sm text-destructive text-center">
                          {error}
                        </p>
                      )}
                      <Button
                        onClick={handlePlaceOrder}
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? "Processing..."
                          : "Place Order (Cash on Delivery)"}
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/products">Continue Shopping</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border border-amber-100 bg-amber-50">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <ShoppingCart className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Cash on Delivery</h3>
                          <p className="text-sm text-muted-foreground">
                            Pay with cash when your order is delivered. No
                            online payment required.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CartPage;
