
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/mock-data";
import { ChevronLeft, Filter, SlidersHorizontal, Grid, List } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortMode, setSortMode] = useState<"popular" | "price-asc" | "price-desc">("popular");
  
  const category = categories.find((c) => c.slug === slug);
  
  // Filter products by category
  const categoryProducts = products.filter(
    (product) => category && product.category === category.name
  );
  
  // Sort products based on selected sort mode
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortMode) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "popular":
      default:
        return Math.random() - 0.5; // Random for demo
    }
  });
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
          <p className="mb-6">A categoria que você está procurando não existe.</p>
          <Button onClick={() => navigate("/categorias")}>Ver todas as categorias</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2 text-gray-500 pl-0">
            <ChevronLeft className="mr-1 h-5 w-5" />
            <span className="sr-only sm:not-sr-only">Voltar</span>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{category.name}</h1>
        </div>
        
        <div className="mb-10">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 md:p-8">
            <div className="max-w-3xl">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-primary/20 text-primary mr-3">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Confira nossa seleção de deliciosos {category.name.toLowerCase()}. Feitos com ingredientes de qualidade e muito carinho.
              </p>
              
              <div className="flex flex-wrap items-center gap-3">
                <Select
                  value={sortMode}
                  onValueChange={(value) => setSortMode(value as typeof sortMode)}
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-white">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Mais populares</SelectItem>
                    <SelectItem value="price-asc">Menor preço</SelectItem>
                    <SelectItem value="price-desc">Maior preço</SelectItem>
                  </SelectContent>
                </Select>
                
                {!isMobile && (
                  <div className="flex border rounded-md overflow-hidden bg-white">
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
          </div>
        </div>
        
        {sortedProducts.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
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
                      <Button size="sm">
                        Adicionar ao Carrinho
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Nenhum produto nesta categoria</h2>
            <p className="text-gray-500 mb-6">
              Não há produtos disponíveis para esta categoria no momento.
            </p>
            <Button onClick={() => navigate("/produtos")}>Ver todos os produtos</Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetailPage;
