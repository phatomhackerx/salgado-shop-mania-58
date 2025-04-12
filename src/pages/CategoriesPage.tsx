
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { categories, products } from "@/data/mock-data";
import { CategoryCard } from "@/components/CategoryCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();
  
  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Count products in each category
  const categoryProductCounts = categories.reduce((acc, category) => {
    acc[category.name] = products.filter(p => p.category === category.name).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Categorias</h1>
          <p className="text-gray-600">
            Explore nossa variedade de categorias de salgados, cada uma com sabores únicos preparados com os melhores ingredientes.
          </p>
        </div>
        
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-full pl-10 pr-4"
              placeholder="Buscar categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.slug} className="overflow-hidden hover:shadow-md transition-all duration-300 group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center group-hover:text-primary transition-colors">
                    <div className="mr-3 p-2 rounded-md bg-primary/10 text-primary">
                      {category.icon}
                    </div>
                    {category.name}
                  </CardTitle>
                  <CardDescription>
                    {categoryProductCounts[category.name] || 0} produtos
                  </CardDescription>
                </CardHeader>
                <div className="px-6 pb-4">
                  <div className="h-[120px] rounded-md overflow-hidden bg-gray-100">
                    {/* We would use a category image here */}
                    <div className="h-full w-full flex items-center justify-center bg-primary/5">
                      <span className="text-4xl text-primary/30">
                        {category.icon}
                      </span>
                    </div>
                  </div>
                </div>
                <CardFooter className="flex justify-between items-center pt-0 pb-4 px-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    asChild
                  >
                    <a href={`/categorias/${category.slug}`}>Ver Produtos</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Nenhuma categoria encontrada</h2>
            <p className="text-gray-500 mb-4">
              Não encontramos nenhuma categoria com este termo de busca.
            </p>
            <Button 
              variant="outline"
              onClick={() => setSearchTerm("")}
            >
              Limpar busca
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
