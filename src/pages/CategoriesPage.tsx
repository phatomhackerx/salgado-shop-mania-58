
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { categories } from "@/data/mock-data";

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group categories into rows for a nicer layout
  const groupCategories = (categories: typeof filteredCategories, perRow: number) => {
    const result = [];
    for (let i = 0; i < categories.length; i += perRow) {
      result.push(categories.slice(i, i + perRow));
    }
    return result;
  };
  
  const groupedCategories = groupCategories(filteredCategories, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Categorias</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Explore nossa ampla variedade de produtos organizados por categoria para facilitar sua busca.
            </p>
            
            {/* Search bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar categorias..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Categories grid */}
        <div className="container mx-auto px-4 py-12">
          {filteredCategories.length > 0 ? (
            <div className="space-y-12">
              {groupedCategories.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {row.map(category => (
                    <div key={category.slug} className="flex flex-col">
                      <h3 className="text-xl font-bold mb-4 pb-2 border-b">{category.name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                        <CategoryCard
                          icon={category.icon}
                          name={category.name}
                          slug={category.slug}
                        />
                        <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
                          <p className="text-sm text-gray-600 mb-auto">
                            Explore nossa seleção de produtos na categoria {category.name}.
                          </p>
                          <p className="text-primary text-sm mt-2">
                            {Math.floor(Math.random() * 20) + 5} produtos disponíveis
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Nenhuma categoria encontrada para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
