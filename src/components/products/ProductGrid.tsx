
import { Product } from "@/hooks/use-cart";
import { ProductCard } from "@/components/ProductCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductGridProps {
  products: Product[];
  isMobile?: boolean;
  columns?: 2 | 3 | 4 | 5;
  gap?: 'small' | 'medium' | 'large';
  showRating?: boolean;
}

export const ProductGrid = ({ 
  products, 
  isMobile: forceMobile,
  columns = 5,
  gap = 'medium',
  showRating = true
}: ProductGridProps) => {
  const isDeviceMobile = useIsMobile();
  const isMobile = forceMobile !== undefined ? forceMobile : isDeviceMobile;
  
  const getGridCols = () => {
    if (isMobile) return "grid-cols-2";
    
    const colsMap = {
      2: "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2",
      3: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
      4: "sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4",
      5: "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    };
    
    return colsMap[columns];
  };
  
  const getGridGap = () => {
    const gapMap = {
      small: "gap-2 md:gap-3",
      medium: "gap-3 md:gap-6",
      large: "gap-4 md:gap-8"
    };
    
    return gapMap[gap];
  };

  return (
    <div className={`grid grid-cols-2 ${getGridCols()} ${getGridGap()} animate-fade-in`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          compact={isMobile}
          featured={product.id === 1 || product.id === 5}
          showRating={showRating && !isMobile}
        />
      ))}
      
      {products.length > 0 && products.length % 2 === 1 && (
        <div className="hidden sm:block" aria-hidden="true"></div>
      )}
    </div>
  );
};
