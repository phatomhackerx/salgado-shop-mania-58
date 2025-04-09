
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/mock-data";

const CategoryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const category = categories.find((c) => c.slug === slug);
  
  // Filter products by category
  const categoryProducts = products.filter(
    (product) => category && product.category === category.name
  );
  
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
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-500">
            ← Voltar
          </Button>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira nossa seleção de deliciosos {category.name.toLowerCase()}. Feitos com ingredientes de qualidade e muito carinho.
          </p>
        </div>
        
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
