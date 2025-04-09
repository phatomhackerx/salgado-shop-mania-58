
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

type ScheduleInfo = {
  date: Date;
  time: string;
  note?: string;
};

type CartItem = {
  product: Product;
  quantity: number;
  scheduleInfo?: ScheduleInfo;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, scheduleInfo?: ScheduleInfo) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateScheduleInfo: (productId: number, scheduleInfo: ScheduleInfo) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  scheduledItems: CartItem[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [scheduledItems, setScheduledItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert date strings back to Date objects
        const processedCart = parsedCart.map((item: CartItem) => {
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
        setCartItems(processedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes and update totals
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    
    // Calculate totals
    const items = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const price = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    setTotalItems(items);
    setTotalPrice(price);
    
    // Filter out scheduled items
    const scheduled = cartItems.filter(item => item.scheduleInfo);
    setScheduledItems(scheduled);
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1, scheduleInfo?: ScheduleInfo) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item and possibly add schedule info
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        // Add or update schedule info if provided
        if (scheduleInfo) {
          updatedItems[existingItemIndex].scheduleInfo = scheduleInfo;
        }
        
        toast({
          title: "Item atualizado",
          description: `${product.name} agora tem ${updatedItems[existingItemIndex].quantity} unidades no carrinho.`,
        });
        
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Item adicionado",
          description: `${product.name} foi adicionado ao carrinho.`,
        });
        
        return [...prevItems, { product, quantity, scheduleInfo }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.product.id === productId);
      if (item) {
        toast({
          title: "Item removido",
          description: `${item.product.name} foi removido do carrinho.`,
        });
      }
      
      const updatedItems = prevItems.filter(item => item.product.id !== productId);
      
      // Clear localStorage if cart is empty
      if (updatedItems.length === 0) {
        localStorage.removeItem("cart");
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const updateScheduleInfo = (productId: number, scheduleInfo: ScheduleInfo) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, scheduleInfo } 
          : item
      )
    );
    
    toast({
      title: "Agendamento atualizado",
      description: `Entrega agendada para ${scheduleInfo.date.toLocaleDateString()} às ${scheduleInfo.time}.`,
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    toast({
      title: "Carrinho limpo",
      description: "Todos os itens foram removidos do carrinho.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateScheduleInfo,
        clearCart,
        totalItems,
        totalPrice,
        scheduledItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
