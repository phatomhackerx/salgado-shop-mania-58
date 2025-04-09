
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { products } from "@/data/mock-data";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, ShoppingCart, CalendarClock } from "lucide-react";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ProductCard } from "@/components/ProductCard";
import { ScheduleDelivery } from "@/components/ScheduleDelivery";
import { toast } from "@/components/ui/use-toast";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showScheduleOption, setShowScheduleOption] = useState(false);
  
  const product = products.find((p) => p.id === Number(id));
  
  // Find related products (same category)
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5)
    : [];
  
  useEffect(() => {
    // Show schedule option if quantity >= 100
    setShowScheduleOption(quantity >= 100);
  }, [quantity]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <p className="mb-6">O produto que você está procurando não existe.</p>
          <Button onClick={() => navigate("/produtos")}>Ver todos os produtos</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleScheduleDelivery = (date: Date, time: string, note: string) => {
    // Add to cart with scheduled delivery info
    addToCart(product, quantity);
    
    // Store schedule information (in a real app, this would be stored in the server)
    const scheduleInfo = {
      productId: product.id,
      quantity,
      date,
      time,
      note
    };
    
    console.log("Scheduled delivery:", scheduleInfo);
    
    toast({
      title: "Entrega agendada!",
      description: `Seu pedido foi agendado para ${date.toLocaleDateString()} às ${time}.`,
    });
  };

  const handleBulkOrderClick = () => {
    navigate("/agendamento");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-500">
            ← Voltar
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden border bg-white">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover max-h-[500px]" 
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-4">Categoria: {product.category}</p>
            
            <div className="text-2xl font-bold text-primary mb-6">
              R$ {product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Quantity selector */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Quantidade</span>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleIncrement}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Scheduling notice for large quantities */}
            {showScheduleOption && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <CalendarClock className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Agendamento disponível</h3>
                    <p className="text-sm text-gray-600">
                      Para pedidos de 100 ou mais unidades, oferecemos entrega agendada.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Add to cart button */}
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Adicionar ao Carrinho
            </Button>
            
            {/* Schedule delivery option */}
            {showScheduleOption && (
              <ScheduleDelivery 
                onSchedule={handleScheduleDelivery}
                minimumQuantity={100}
                currentQuantity={quantity}
              />
            )}
            
            {/* Bulk order button */}
            <Button
              variant="outline"
              className="mt-4"
              onClick={handleBulkOrderClick}
            >
              <CalendarClock className="mr-2 h-5 w-5" />
              Ver Combos para Eventos
            </Button>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
