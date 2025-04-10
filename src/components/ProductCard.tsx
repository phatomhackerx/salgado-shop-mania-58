
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product, useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
};

export const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao carrinho`,
      variant: "default",
    });
  };
  
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

  // Generate a random rating between 3.5 and 5.0
  const rating = (3.5 + Math.random() * 1.5).toFixed(1);
  // Convert string to number using parseFloat
  const ratingValue = parseFloat(rating);
  const reviewCount = Math.floor(Math.random() * 50) + 5;

  return (
    <Link to={`/produtos/${product.id}`}>
      <Card 
        className={`overflow-hidden transition-all duration-300 h-full flex flex-col ${
          featured ? 'border-primary/20 shadow-md' : 'hover:shadow-md'
        } ${isHovered ? 'scale-[1.02] shadow-md' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-square overflow-hidden relative group">
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover w-full h-full transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Animated overlay with buttons */}
          <div className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex gap-2 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
              <Button 
                className="bg-white text-primary hover:bg-primary hover:text-white shadow-lg" 
                size="sm"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full bg-white ${isFavorite ? 'text-rose-500 hover:text-rose-600' : 'text-gray-700 hover:text-primary'}`}
                onClick={toggleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </Button>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {featured && (
              <Badge className="bg-primary animate-fade-in">Destaque</Badge>
            )}
            {Math.random() > 0.7 && (
              <Badge className="bg-accent animate-fade-in">Novo</Badge>
            )}
            {Math.random() > 0.8 && (
              <Badge variant="outline" className="bg-white/80 text-primary font-bold animate-fade-in">-10%</Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="font-semibold text-base/tight text-gray-800 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 mb-2">{product.category}</p>
          </div>
          
          {/* Rating stars */}
          <div className="flex items-center mb-1">
            <div className="flex mr-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= Math.floor(ratingValue) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : star - 0.5 <= ratingValue 
                        ? "text-yellow-400 fill-yellow-400 opacity-60" 
                        : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-600">
              {rating}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({reviewCount})
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-auto">
          <div className="flex flex-col">
            <span className="font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </span>
            {Math.random() > 0.8 && (
              <span className="text-xs text-gray-500 line-through">
                R$ {(product.price * 1.1).toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full text-primary hover:text-white hover:bg-primary"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
