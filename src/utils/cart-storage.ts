
import { CartItem } from "@/types/cart";

export const loadCartFromStorage = (): CartItem[] => {
  const savedCart = localStorage.getItem("cart");
  if (!savedCart) return [];
  
  try {
    const parsedCart = JSON.parse(savedCart);
    // Convert date strings back to Date objects
    return parsedCart.map((item: CartItem) => {
      if (item.scheduleInfo && item.scheduleInfo.date) {
        return {
          ...item,
          scheduleInfo: {
            ...item.scheduleInfo,
            date: new Date(item.scheduleInfo.date)
          }
        };
      }
      return item;
    });
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};

export const saveCartToStorage = (cartItems: CartItem[]): void => {
  if (cartItems.length > 0) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } else {
    localStorage.removeItem("cart");
  }
};
