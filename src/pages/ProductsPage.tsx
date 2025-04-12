
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { products, categories } from "@/data/mock-data";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

// Import our new components
import { SearchBar } from "@/components/products/SearchBar";
import { FilterSection } from "@/components/products/FilterSection";
import { SortControls } from "@/components/products/SortControls";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductList } from "@/components/products/ProductList";
import { NoResultsMessage } from "@/components/products/NoResultsMessage";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortMode, setSortMode] = useState<"name" | "price-asc" | "price-desc" | "popular">("popular");
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortMode) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "popular":
      default:
        return Math.random() - 0.5;
    }
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };

  useEffect(() => {
    return () => {
      setSearchTerm("");
      setSelectedCategory(null);
      setSortMode("popular");
      setViewMode("grid");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Nossos Salgados</h1>
          
          {isMobile && (
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between"
            >
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filtros e opções
              </span>
              <Badge className="ml-2 bg-primary">{filteredProducts.length}</Badge>
            </Button>
          )}
          
          <div className={`${isMobile && !showFilters ? 'hidden' : 'block'} space-y-4`}>
            <div className="flex flex-col md:flex-row gap-4">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
              />
              
              <SortControls 
                sortMode={sortMode} 
                setSortMode={setSortMode} 
                viewMode={viewMode} 
                setViewMode={setViewMode} 
                isMobile={isMobile} 
              />
            </div>
            
            <FilterSection 
              categories={categories} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
            <Separator />
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'} encontrados
            </p>
            {!isMobile && (
              <Badge variant="outline" className="text-sm">
                {selectedCategory ? selectedCategory : "Todas categorias"}
              </Badge>
            )}
          </div>
          
          {sortedProducts.length > 0 ? (
            viewMode === "grid" ? (
              <ProductGrid products={sortedProducts} isMobile={isMobile} />
            ) : (
              <ProductList products={sortedProducts} />
            )
          ) : (
            <NoResultsMessage onClearFilters={clearFilters} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
