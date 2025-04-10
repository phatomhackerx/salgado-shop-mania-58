
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X, ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, useCart } from "@/hooks/use-cart";
import { RatingStars } from "@/components/RatingStars";
import { WishlistButton } from "@/components/WishlistButton";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface ProductQuickViewProps {
  product: Product;
  children: React.ReactNode;
}

export const ProductQuickView = ({ product, children }: ProductQuickViewProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao carrinho`,
      variant: "default",
    });
  };
  
  // Generate a random rating between 3.5 and 5.0
  const rating = parseFloat((3.5 + Math.random() * 1.5).toFixed(1));
  const reviewCount = Math.floor(Math.random() * 50) + 5;
  
  // Random stock status
  const stockStatus = Math.random() > 0.2 ? "Em estoque" : "Estoque baixo";
  const isLowStock = stockStatus === "Estoque baixo";
  
  // Random delivery time
  const deliveryTime = Math.floor(Math.random() * 3) + 1;
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] overflow-auto">
        <div className="mx-auto w-full max-w-3xl p-4 md:p-6">
          <DrawerHeader className="px-0 pb-4">
            <div className="flex justify-between items-center">
              <DrawerTitle className="text-xl font-bold">{product.name}</DrawerTitle>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DrawerDescription className="text-gray-500">{product.category}</DrawerDescription>
          </DrawerHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="flex flex-col">
              <div className="mb-4">
                <RatingStars 
                  rating={rating} 
                  size="md" 
                  showScore={true} 
                  reviewCount={reviewCount} 
                />
              </div>
              
              <div className="mb-4">
                <h3 className="font-bold text-2xl text-primary mb-1">
                  R$ {product.price.toFixed(2)}
                </h3>
                {Math.random() > 0.7 && (
                  <p className="text-sm text-gray-500 line-through">
                    R$ {(product.price * 1.15).toFixed(2)}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-center">
                  <Badge variant={isLowStock ? "outline" : "default"} className={isLowStock ? "border-orange-400 text-orange-500" : ""}>
                    {stockStatus}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Entrega em até {deliveryTime} {deliveryTime === 1 ? "dia útil" : "dias úteis"}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Button 
                  className="gap-2 flex-1" 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
                <WishlistButton product={product} className="flex-1" />
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Descrição</h3>
            <p className="text-gray-600">
              {product.description || "Um delicioso salgado preparado com ingredientes frescos e de alta qualidade, perfeito para qualquer ocasião."}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Ingredientes</h4>
                <p className="text-xs text-gray-500">
                  Farinha de trigo, manteiga, leite, sal, recheio especial.
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Informações</h4>
                <p className="text-xs text-gray-500">
                  Peso aproximado: 80g | Porção: 1 unidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
