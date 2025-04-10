
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
import { Minus, Plus, ShoppingCart, CalendarClock, Star, Heart, Share2, Info, Clock, Truck } from "lucide-react";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ProductCard } from "@/components/ProductCard";
import { ScheduleDelivery } from "@/components/ScheduleDelivery";
import { ScheduleStatus } from "@/components/ScheduleStatus";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showScheduleOption, setShowScheduleOption] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const product = products.find((p) => p.id === Number(id));
  
  // Create multiple product images for the gallery
  const productImages = product ? [
    product.image,
    `https://source.unsplash.com/featured/?${product.category}&${Math.random()}`,
    `https://source.unsplash.com/featured/?food&${Math.random()}`
  ] : [];
  
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
    toast({
      title: "Produto adicionado",
      description: `${quantity} unidade(s) de ${product.name} adicionada(s) ao carrinho`,
    });
  };

  const handleScheduleDelivery = (date: Date, time: string, note: string) => {
    // Add to cart with scheduled delivery info
    addToCart(product, quantity, { date, time, note });
    
    toast({
      title: "Entrega agendada!",
      description: `Seu pedido foi agendado para ${date.toLocaleDateString()} às ${time}.`,
    });
  };

  const handleBulkOrderClick = () => {
    navigate("/agendamento");
  };
  
  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };
  
  const deliveryEstimate = "1-3 dias úteis";
  const inStock = true;

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
          {/* Product Images */}
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border bg-white shadow-sm h-[400px]">
              <img 
                src={productImages[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Thumbnail gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`
                    w-20 h-20 rounded-md overflow-hidden border cursor-pointer
                    ${activeImageIndex === index ? 'border-primary border-2' : 'border-gray-200'}
                  `}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-primary">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-primary">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <Badge variant="outline" className="mr-2">{product.category}</Badge>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm ml-2 text-gray-600">(42 avaliações)</span>
                </div>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-primary mb-4">
              R$ {product.price.toFixed(2)}
              <span className="text-sm font-normal text-gray-500 ml-2">Unidade</span>
            </div>
            
            {/* Availability and Delivery */}
            <div className="flex flex-col space-y-2 mb-6 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm">
                <div className={`w-3 h-3 rounded-full mr-2 ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{inStock ? 'Em estoque' : 'Sem estoque'}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>Tempo de preparo: 30 minutos</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Truck className="h-4 w-4 mr-2 text-gray-500" />
                <span>Entrega em {deliveryEstimate}</span>
                
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                      <Info className="h-4 w-4 text-gray-500" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Informações de Entrega</h4>
                      <p className="text-sm">
                        As entregas são realizadas de segunda a sábado, das 8h às 18h.
                      </p>
                      <p className="text-sm">
                        Para pedidos feitos até às 14h, a entrega pode ser realizada no mesmo dia
                        para alguns bairros.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
            
            <Tabs defaultValue="description" className="mb-6">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Descrição</TabsTrigger>
                <TabsTrigger value="ingredients" className="flex-1">Ingredientes</TabsTrigger>
                <TabsTrigger value="nutrition" className="flex-1">Nutrição</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="text-gray-700">
                {product.description}
              </TabsContent>
              <TabsContent value="ingredients" className="text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Farinha de trigo</li>
                  <li>Ovos</li>
                  <li>Queijo</li>
                  <li>Azeitona</li>
                  <li>Temperos naturais</li>
                </ul>
              </TabsContent>
              <TabsContent value="nutrition" className="text-gray-700">
                <div className="space-y-2">
                  <p className="font-medium">Informação Nutricional (por unidade):</p>
                  <div className="flex justify-between border-b pb-1">
                    <span>Calorias</span>
                    <span>180 kcal</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Proteínas</span>
                    <span>5g</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Carboidratos</span>
                    <span>22g</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Gorduras</span>
                    <span>7g</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
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
              className="bg-primary hover:bg-primary/90 w-full mb-3"
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
        
        {/* Preview delivery status */}
        <div className="mb-12">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Acompanhe o Status da Entrega</h2>
            <p className="text-gray-600 mb-6">
              Este é um exemplo de como você pode acompanhar o status da sua entrega quando fizer um pedido.
            </p>
            <ScheduleStatus 
              status="on-the-way" 
              scheduledDate={new Date()} 
              estimatedDeliveryTime="15:30" 
            />
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  featured={index === 0}
                />
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
