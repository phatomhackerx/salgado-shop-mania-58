
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product, useCart } from "@/hooks/use-cart";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/produtos/${product.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
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
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-base/tight text-gray-800 mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{product.category}</p>
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
