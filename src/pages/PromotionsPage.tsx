
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/mock-data";
import { useNavigate } from "react-router-dom";

// Create some promotional offers
const promotions = [
  {
    id: 1,
    title: "Combo Festa",
    description: "20 salgados sortidos por apenas R$ 79,90",
    image: "/placeholder.svg",
    price: 79.9,
    originalPrice: 100,
    products: products.slice(0, 4),
  },
  {
    id: 2,
    title: "Compre 10, Leve 12",
    description: "Escolha 10 salgados e ganhe mais 2 grátis",
    image: "/placeholder.svg",
    products: products.slice(2, 3),
  },
  {
    id: 3,
    title: "Frete Grátis",
    description: "Em compras acima de R$ 50,00",
    image: "/placeholder.svg",
  },
];

const PromotionsPage = () => {
  const navigate = useNavigate();
  
  // Get some featured products on sale
  const saleProducts = products.map(product => ({
    ...product,
    originalPrice: product.price,
    price: Number((product.price * 0.8).toFixed(2)),
  })).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Promoções</h1>
        
        {/* Hero promotion */}
        <div className="bg-gradient-to-r from-secondary to-primary text-white rounded-lg p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Super Promoção de Inauguração</h2>
              <p className="text-lg mb-6 opacity-90">
                20% de desconto em todo o cardápio! Aproveite essa oferta por tempo limitado.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => navigate("/produtos")}
              >
                Aproveitar Agora
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center animate-float">
                <div className="text-center">
                  <div className="text-3xl font-bold">20%</div>
                  <div className="text-sm font-medium">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Promotions grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {promotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              <div className="h-40 bg-gray-100">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                {promo.price && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">
                      R$ {promo.price.toFixed(2)}
                    </span>
                    {promo.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        R$ {promo.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
                <Button 
                  className="w-full"
                  onClick={() => navigate("/produtos")}
                >
                  Aproveitar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Products on sale */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Produtos em Oferta</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {saleProducts.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-destructive text-white text-xs font-bold px-2 py-1 rounded">
                    -20%
                  </span>
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-accent/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Não Perca Nossas Ofertas</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nossas promoções mudam frequentemente! Volte sempre para conferir as novidades.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/produtos")}
          >
            Ver Todos os Produtos
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromotionsPage;
