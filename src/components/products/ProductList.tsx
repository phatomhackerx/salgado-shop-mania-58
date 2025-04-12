
import { Product, useCart } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao carrinho`,
      variant: "default",
    });
  };
  
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col p-4 flex-grow">
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <p className="text-sm line-clamp-2 mb-auto">{product.description || "Um delicioso salgado preparado com ingredientes frescos."}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold text-primary text-lg">
                R$ {product.price.toFixed(2)}
              </span>
              <Button 
                size="sm" 
                onClick={(e) => handleAddToCart(product, e)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
