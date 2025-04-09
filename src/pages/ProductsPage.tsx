
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/mock-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Nossos Salgados</h1>
        
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-full pl-10 pr-4"
              placeholder="Buscar salgados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full text-sm ${
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
                className={`px-4 py-2 rounded-full text-sm ${
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
        </div>
        
        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h2>
            <p className="text-gray-500">
              Tente ajustar seus filtros ou buscar por outro termo.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
