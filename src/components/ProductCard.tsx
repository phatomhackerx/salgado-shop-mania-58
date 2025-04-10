
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product, useCart } from "@/hooks/use-cart";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
};

export const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/produtos/${product.id}`}>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col ${featured ? 'border-primary/20' : ''}`}>
        <div className="aspect-square overflow-hidden relative group">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              className="bg-white text-primary hover:bg-primary hover:text-white" 
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
          
          {featured && (
            <Badge className="absolute top-2 left-2 bg-primary">Destaque</Badge>
          )}
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-base/tight text-gray-800 mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{product.category}</p>
          
          {/* Rating stars */}
          <div className="flex items-center mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3.5 w-3.5 ${
                  star <= Math.floor(4 + Math.random()) 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({Math.floor(Math.random() * 50) + 5})
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </span>
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
