"use client";

import ContactSection from "@/components/contact-section";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Container, Grid } from "@radix-ui/themes";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size?: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image: "/jacket.jpg",
      color: "Black",
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "/couch.jpg",
      size: "M",
      color: "White",
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "/jacket.jpg",
      size: "M",
      color: "White",
    },
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
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
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="overflow-hidden border border-gray-200 rounded-2xl shadow-lg"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full max-w-[200px] aspect-square bg-muted">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-muted-foreground text-sm mt-1">
                                {item.color}
                                {item.size && ` • ${item.size}`}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <IoClose className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                -
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.id,
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                className="w-12 h-8 text-center border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </Button>
                            </div>
                            <p className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
      <ContactSection />
      <Footer />
    </>
  );
};

export default CartPage;
