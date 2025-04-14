
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

export type ScheduleInfo = {
  date: Date;
  time: string;
  note?: string;
  locationId?: number;
  isPickup?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  scheduleInfo?: ScheduleInfo;
};

// Add the ScheduledItem type that was missing
export type ScheduledItem = CartItem;

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, scheduleInfo?: ScheduleInfo) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateScheduleInfo: (productId: number, scheduleInfo: ScheduleInfo) => void;
  removeScheduleInfo: (productId: number) => void;
  clearCart: () => void;
  clearScheduledItems: () => void;
  totalItems: number;
  totalPrice: number;
  scheduledItems: CartItem[];
};
