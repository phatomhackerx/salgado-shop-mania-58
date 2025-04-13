
import { useState, useEffect, ReactNode } from "react";
import { CartContext } from "@/contexts/cart-context";
import { toast } from "@/components/ui/use-toast";
import { CartItem, Product, ScheduleInfo } from "@/types/cart";
import { loadCartFromStorage, saveCartToStorage } from "@/utils/cart-storage";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [scheduledItems, setScheduledItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadedCart = loadCartFromStorage();
    setCartItems(loadedCart);
  }, []);

  // Save cart to localStorage whenever it changes and update totals
  useEffect(() => {
    saveCartToStorage(cartItems);
    
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
      
      return prevItems.filter(item => item.product.id !== productId);
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
    
    const isPickup = scheduleInfo.isPickup;
    const messageText = isPickup 
      ? `Retirada agendada para ${scheduleInfo.date.toLocaleDateString()} às ${scheduleInfo.time}.`
      : `Entrega agendada para ${scheduleInfo.date.toLocaleDateString()} às ${scheduleInfo.time}.`;
    
    toast({
      title: isPickup ? "Retirada agendada" : "Agendamento atualizado",
      description: messageText,
    });
  };

  const removeScheduleInfo = (productId: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.product.id === productId) {
          const { scheduleInfo, ...rest } = item;
          return rest;
        }
        return item;
      });
      
      toast({
        title: "Agendamento removido",
        description: "A entrega não está mais agendada.",
      });
      
      return updatedItems;
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

  const clearScheduledItems = () => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        const { scheduleInfo, ...rest } = item;
        return rest;
      })
    );
    
    toast({
      title: "Agendamentos removidos",
      description: "Todos os agendamentos foram removidos.",
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
        removeScheduleInfo,
        clearCart,
        clearScheduledItems,
        totalItems,
        totalPrice,
        scheduledItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
