"use client";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

function PaymentSuccess() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate processing for better UX
    const timer = setTimeout(() => {
      clearCart();
      setIsLoading(false);
      // Redirect after showing success message
      setTimeout(() => router.push("/dashboard/orders"), 3000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [clearCart, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-green-600"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order is being processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              You&apos;ll be redirected to your orders shortly...
            </p>
            <Button
              variant="default"
              onClick={() => router.push("/dashboard/orders")}
              className="w-full"
            >
              Go to Orders Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccess;
