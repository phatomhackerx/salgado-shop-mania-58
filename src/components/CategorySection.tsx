
import { CategoryCard } from "@/components/CategoryCard";

type Category = {
  icon: string;
  name: string;
  slug: string;
};

type CategorySectionProps = {
  categories: Category[];
};

export const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categorias</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
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
