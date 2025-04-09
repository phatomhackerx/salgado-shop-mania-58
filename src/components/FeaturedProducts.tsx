
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/hooks/use-cart";

type FeaturedProductsProps = {
  title: string;
  products: Product[];
};

export const FeaturedProducts = ({ title, products }: FeaturedProductsProps) => {
  return (
    <div className="py-10 container mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <a href="/produtos" className="text-primary hover:underline">
          Ver mais
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
