
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/hooks/use-cart";

interface StickyProductNavProps {
  product: Product;
  isVisible: boolean;
  onAddToCart: () => void;
}

export const StickyProductNav = ({ product, isVisible, onAddToCart }: StickyProductNavProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30 transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-10 w-10 rounded-md object-cover"
          />
          <div>
            <h4 className="font-medium line-clamp-1 text-sm">{product.name}</h4>
            <p className="text-primary font-bold text-sm">R$ {product.price.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${isFavorite ? 'text-rose-500 hover:text-rose-600' : 'text-gray-700 hover:text-primary'}`}
            onClick={toggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </Button>
          
          <Button size="sm" onClick={onAddToCart} className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Adicionar ao Carrinho</span>
            <span className="sm:hidden">Adicionar</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-gray-500 hover:text-primary" 
            onClick={scrollToTop}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
