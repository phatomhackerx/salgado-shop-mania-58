
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/hooks/use-cart";

interface WishlistButtonProps {
  product: Product;
  variant?: "icon" | "default";
  className?: string;
}

export const WishlistButton = ({ 
  product, 
  variant = "default",
  className = ""
}: WishlistButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: `${product.name} foi ${isFavorite ? "removido dos" : "adicionado aos"} favoritos`,
      variant: "default",
    });
  };

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full bg-white ${isFavorite ? 'text-rose-500 hover:text-rose-600' : 'text-gray-700 hover:text-primary'} ${className}`}
        onClick={toggleFavorite}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className={`rounded-md ${isFavorite ? 'border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100' : 'hover:bg-gray-100'} ${className}`}
      onClick={toggleFavorite}
    >
      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-rose-500' : ''}`} />
      {isFavorite ? "Favorito" : "Adicionar aos favoritos"}
    </Button>
  );
};
