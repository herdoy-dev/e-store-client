import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartStoreInterface {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  incQuantity: (itemId: string) => void;
  decQuantity: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStoreInterface>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addToCart: (item) =>
        set(({ items }) => {
          toast.success("Product Added");
          const isPresent = items.find((i) => i.product === item.product);
          if (!isPresent) {
            return { items: [...items, item] };
          }
          const updatedItem = items.map((i) =>
            i.product === item.product ? { ...i, quantity: i.quantity + 1 } : i
          );

          return { items: updatedItem };
        }),
      removeItem: (id) =>
        set(({ items }) => ({ items: items.filter((i) => i.product !== id) })),
      incQuantity: (id) =>
        set(({ items }) => {
          const updatedItem = items.map((i) =>
            i.product === id ? { ...i, quantity: i.quantity + 1 } : i
          );

          return { items: updatedItem };
        }),
      decQuantity: (id) =>
        set(({ items }) => {
          const updatedItem = items.map((i) =>
            i.product === id ? { ...i, quantity: i.quantity - 1 } : i
          );
          return { items: updatedItem };
        }),
      clearCart: () => set(() => ({ items: [] })),
    }),
    {
      name: "cart-sotre",
    }
  )
);
