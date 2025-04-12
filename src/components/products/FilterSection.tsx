
import { Category } from "@/data/mock-data";

interface FilterSectionProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const FilterSection = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: FilterSectionProps) => {
  return (
    <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto">
      <button
        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
          selectedCategory === null
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.slug}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === category.name
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedCategory(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
