
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Category = {
  icon: string;
  name: string;
  slug: string;
};

type CategorySectionProps = {
  categories: Category[];
  showAll?: boolean;
  maxDisplay?: number;
};

export const CategorySection = ({ 
  categories, 
  showAll = false,
  maxDisplay = 6
}: CategorySectionProps) => {
  // If showAll is false, only show up to maxDisplay categories
  const displayCategories = showAll ? categories : categories.slice(0, maxDisplay);
  const hasMore = !showAll && categories.length > maxDisplay;
  
  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Categorias</h2>
          
          {hasMore && (
            <Button variant="ghost" asChild className="group">
              <Link to="/categorias" className="flex items-center text-primary">
                Ver todas
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              icon={category.icon}
              name={category.name}
              slug={category.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
