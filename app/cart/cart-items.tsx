"use client";

import { Button } from "@/components/ui/button";
import { CartItem, useCartStore } from "@/store";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface Props {
  cartItems: CartItem[];
}

function CartItems({ cartItems }: Props) {
  const removeItem = useCartStore((s) => s.removeItem);
  const incQuantity = useCartStore((s) => s.incQuantity);
  const decQuantity = useCartStore((s) => s.decQuantity);

  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <div
          key={item.product}
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
                </div>
                <button
                  onClick={() => removeItem(item.product)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <IoClose className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="space-x-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-8 px-2"
                    disabled={item.quantity <= 1}
                    onClick={() => decQuantity(item.product)}
                  >
                    <Minus />
                  </Button>
                  <Button size="sm" variant="ghost">
                    {item.quantity}
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 px-2"
                    disabled={item.quantity >= 10}
                    onClick={() => incQuantity(item.product)}
                  >
                    <Plus />
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
  );
}

export default CartItems;
