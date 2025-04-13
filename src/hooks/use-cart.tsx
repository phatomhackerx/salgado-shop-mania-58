
import { useContext } from "react";
import { CartContext } from "@/contexts/cart-context";

// Re-export types for convenience and backward compatibility
export type { Product, CartItem, ScheduleInfo } from "@/types/cart";

// Re-export the provider from its new location
export { CartProvider } from "@/providers/cart-provider";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
