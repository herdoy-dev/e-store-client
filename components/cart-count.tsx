import { ShoppingCart } from "lucide-react";
import Link from "next/link";

function CartCount() {
  return (
    <Link
      href="/cart"
      className="fixed bottom-6 md:bottom-10 right-6 md:right-10 w-16 h-16 cursor-pointer"
    >
      <div className="relative flex items-center bg-primary w-full rounded-full h-full justify-center text-white">
        <ShoppingCart />
        <div className="absolute text-sm -top-2 right-0 bg-destructive w-6 h-6 flex items-center justify-center rounded-full">
          2
        </div>
      </div>
    </Link>
  );
}

export default CartCount;
