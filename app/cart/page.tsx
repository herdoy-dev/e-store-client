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
import { useCartStore } from "@/store";
import { Container, Grid } from "@radix-ui/themes";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import CartItems from "./cart-items";

const CartPage = () => {
  const cartItems = useCartStore((s) => s.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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

            {cartItems.length === 0 && (
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
            )}
            {cartItems.length > 0 && (
              <Grid columns={{ initial: "1", md: "2fr 1fr" }} gap="6">
                <div className="space-y-6">
                  <CartItems cartItems={cartItems} />
                </div>
                <div>
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
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button className="w-full" size="lg">
                        Proceed to Checkout
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/products">Continue Shopping</Link>
                      </Button>
                    </CardFooter>
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
