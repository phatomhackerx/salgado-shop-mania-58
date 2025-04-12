
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { products, categories } from "@/data/mock-data";
import { Filter, FilterX, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";

// Import our components
import { SearchBar } from "@/components/products/SearchBar";
import { FilterSection } from "@/components/products/FilterSection";
import { SortControls } from "@/components/products/SortControls";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductList } from "@/components/products/ProductList";
import { NoResultsMessage } from "@/components/products/NoResultsMessage";
import { AdvancedFilterSection } from "@/components/products/AdvancedFilterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortMode, setSortMode] = useState<"name" | "price-asc" | "price-desc" | "popular">("popular");
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  // New advanced filters
  const [advancedFilters, setAdvancedFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 100] as [number, number]
  });
  
  // Calculate price range from products
  useEffect(() => {
    const allPrices = products.map(p => p.price);
    const minPrice = Math.floor(Math.min(...allPrices));
    const maxPrice = Math.ceil(Math.max(...allPrices));
    setAdvancedFilters(prev => ({
      ...prev,
      priceRange: [minPrice, maxPrice]
    }));
  }, []);

  // Apply both simple category filter and advanced filters
  const filteredProducts = products.filter((product) => {
    // Text search filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter (from tabs)
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    
    // Advanced category filter
    const matchesAdvancedCategories = advancedFilters.categories.length === 0 || 
                                      advancedFilters.categories.includes(product.category);
    
    // Price range filter
    const matchesPriceRange = product.price >= advancedFilters.priceRange[0] && 
                              product.price <= advancedFilters.priceRange[1];
    
    return matchesSearch && matchesCategory && matchesAdvancedCategories && matchesPriceRange;
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
        return Math.random() - 0.5; // In a real app, this would be based on popularity data
    }
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    
    // Reset advanced filters too
    const allPrices = products.map(p => p.price);
    const minPrice = Math.floor(Math.min(...allPrices));
    const maxPrice = Math.ceil(Math.max(...allPrices));
    
    setAdvancedFilters({
      categories: [],
      priceRange: [minPrice, maxPrice]
    });
    
    toast({
      title: "Filtros limpos",
      description: "Todos os filtros foram removidos."
    });
  };
  
  // Synchronize the simple category filter with the advanced filter
  useEffect(() => {
    if (selectedCategory) {
      setAdvancedFilters(prev => ({
        ...prev,
        categories: [selectedCategory]
      }));
    }
  }, [selectedCategory]);
  
  // Update the simple category when the advanced categories change
  useEffect(() => {
    if (advancedFilters.categories.length === 1) {
      setSelectedCategory(advancedFilters.categories[0]);
    } else if (advancedFilters.categories.length === 0) {
      setSelectedCategory(null);
    }
    // We don't handle the case where multiple categories are selected in the advanced filter
    // as the tabs can only show a single selection
  }, [advancedFilters.categories]);

  const hasActiveFilters = 
    searchTerm !== "" || 
    selectedCategory !== null || 
    advancedFilters.categories.length > 0 ||
    (advancedFilters.priceRange[0] > Math.floor(Math.min(...products.map(p => p.price))) ||
    advancedFilters.priceRange[1] < Math.ceil(Math.max(...products.map(p => p.price))));

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
              
              <div className="flex gap-2">
                <AdvancedFilterSection
                  filterSettings={advancedFilters}
                  onFilterChange={setAdvancedFilters}
                  className="md:hidden"
                />
                
                <SortControls 
                  sortMode={sortMode} 
                  setSortMode={setSortMode} 
                  viewMode={viewMode} 
                  setViewMode={setViewMode} 
                  isMobile={isMobile} 
                />
              </div>
            </div>
            
            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="mb-4 overflow-auto py-1 px-1">
                <TabsTrigger value="categories">Categorias</TabsTrigger>
                <TabsTrigger value="filters">Filtros Avançados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories" className="mt-0">
                <FilterSection 
                  categories={categories} 
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory} 
                />
              </TabsContent>
              
              <TabsContent value="filters" className="mt-0">
                <div className="md:grid md:grid-cols-4 gap-6">
                  <div className="hidden md:block">
                    <AdvancedFilterSection
                      filterSettings={advancedFilters}
                      onFilterChange={setAdvancedFilters}
                      showSheetOnMobile={false}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <Separator />
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'} encontrados
            </p>
            
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="h-8 px-2"
              >
                <FilterX className="h-4 w-4 mr-1" />
                Limpar Filtros
              </Button>
            )}
          </div>
          
          {sortedProducts.length > 0 ? (
            viewMode === "grid" ? (
              <ProductGrid products={sortedProducts} isMobile={isMobile} />
            ) : (
              <ProductList products={sortedProducts} />
            )
          ) : (
            <NoResultsMessage 
              searchTerm={searchTerm || undefined} 
              hasFilters={hasActiveFilters && !searchTerm}
              onClearFilters={clearFilters} 
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
