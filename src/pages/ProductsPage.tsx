import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/mock-data";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal, Grid, List, SortAsc, SortDesc, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

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
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  className="w-full pl-10 pr-4"
                  placeholder="Buscar salgados..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      {sortMode === "name" && <SortAsc className="h-4 w-4" />}
                      {sortMode === "price-asc" && <SortAsc className="h-4 w-4" />}
                      {sortMode === "price-desc" && <SortDesc className="h-4 w-4" />}
                      {sortMode === "popular" && <SlidersHorizontal className="h-4 w-4" />}
                      <span className="hidden sm:inline">Ordenar</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setSortMode("popular")}>
                      Mais populares
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortMode("name")}>
                      Nome (A-Z)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortMode("price-asc")}>
                      Preço (menor ao maior)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortMode("price-desc")}>
                      Preço (maior ao menor)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {!isMobile && (
                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    compact={isMobile}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col p-4 flex-grow">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <p className="text-sm line-clamp-2 mb-auto">{product.description || "Um delicioso salgado preparado com ingredientes frescos."}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary text-lg">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <Button size="sm" onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Add to cart
                        }}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h2>
              <p className="text-gray-500">
                Tente ajustar seus filtros ou buscar por outro termo.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
