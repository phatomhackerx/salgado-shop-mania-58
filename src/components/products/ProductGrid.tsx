
import { Product } from "@/hooks/use-cart";
import { ProductCard } from "@/components/ProductCard";

interface ProductGridProps {
  products: Product[];
  isMobile: boolean;
}

export const ProductGrid = ({ products, isMobile }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          compact={isMobile}
        />
      ))}
    </div>
  );
};
