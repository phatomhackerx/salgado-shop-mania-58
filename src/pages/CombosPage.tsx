
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CalendarClock, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

// Define combo products
const combos = [
  {
    id: 1,
    name: "Kit Festa Pequena",
    description: "100 salgados sortidos: coxinhas, pastéis, bolinhas de queijo, e kibes.",
    image: "/placeholder.svg",
    price: 149.9,
    originalPrice: 199.9,
    quantity: 100,
    popular: true,
  },
  {
    id: 2,
    name: "Kit Festa Média",
    description: "200 salgados sortidos, incluindo variedades premium como camarão empanado.",
    image: "/placeholder.svg",
    price: 279.9,
    originalPrice: 349.9,
    quantity: 200,
    popular: false,
  },
  {
    id: 3,
    name: "Kit Festa Grande",
    description: "300 salgados sortidos com mais opções gourmet e 50 mini pães de queijo.",
    image: "/placeholder.svg",
    price: 399.9,
    originalPrice: 499.9,
    quantity: 300,
    popular: false,
  },
  {
    id: 4,
    name: "Kit Premium",
    description: "200 salgados premium com opções exclusivas como camarão ao catupiry.",
    image: "/placeholder.svg",
    price: 399.9,
    originalPrice: 499.9,
    quantity: 200,
    popular: true,
  },
  {
    id: 5,
    name: "Kit Corporativo",
    description: "500 salgados variados, perfeito para eventos empresariais e conferências.",
    image: "/placeholder.svg",
    price: 699.9,
    originalPrice: 899.9,
    quantity: 500,
    popular: false,
  },
  {
    id: 6,
    name: "Kit Gourmet",
    description: "150 salgados gourmet exclusivos, feitos com ingredientes selecionados.",
    image: "/placeholder.svg",
    price: 299.9,
    originalPrice: 369.9,
    quantity: 150,
    popular: false,
  },
];

const CombosPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleAddToCart = (combo: typeof combos[0]) => {
    // Create a product-like object from the combo
    const comboAsProduct = {
      id: combo.id + 1000, // To avoid ID conflicts with regular products
      name: combo.name,
      price: combo.price,
      image: combo.image,
      category: "Combos",
      description: combo.description,
    };
    
    addToCart(comboAsProduct, 1);
    toast({
      title: "Combo adicionado!",
      description: `${combo.name} foi adicionado ao carrinho.`,
    });
  };
  
  const handleScheduleClick = () => {
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
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Combos para Festas e Eventos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos combos especiais para qualquer ocasião. Economize com nossos pacotes
            pré-montados e garanta o sucesso do seu evento.
          </p>
        </div>
        
        {/* Hero banner */}
        <div className="bg-gradient-to-r from-primary/80 to-primary text-white rounded-lg p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Grandes Eventos?</h2>
              <p className="text-lg mb-6 opacity-90">
                Para eventos corporativos ou grandes festas, oferecemos um serviço personalizado 
                de agendamento. Combine exatamente o que você precisa!
              </p>
              <Button 
                size="lg" 
                onClick={handleScheduleClick}
                className="bg-white text-primary hover:bg-gray-100"
              >
                <CalendarClock className="mr-2 h-5 w-5" />
                Agendar Evento Especial
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="text-center">
                  <div className="text-3xl font-bold">20%</div>
                  <div className="text-sm font-medium">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Combos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {combos.map((combo) => (
            <Card key={combo.id} className="overflow-hidden flex flex-col">
              <div className="h-40 bg-gray-100 relative">
                <img 
                  src={combo.image} 
                  alt={combo.name} 
                  className="w-full h-full object-cover" 
                />
                {combo.popular && (
                  <Badge className="absolute top-3 left-3 bg-primary">
                    Mais Vendido
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle>{combo.name}</CardTitle>
                <CardDescription>
                  {combo.quantity} unidades
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{combo.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-primary">
                    R$ {combo.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    R$ {combo.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  Economize R$ {(combo.originalPrice - combo.price).toFixed(2)}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  className="flex-grow"
                  onClick={() => handleAddToCart(combo)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleScheduleClick}
                >
                  Agendar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="bg-accent/10 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Contratei o Kit Festa Média para o aniversário da minha filha e foi um sucesso! 
                Os salgados chegaram no horário e estavam deliciosos."
              </p>
              <div className="font-medium">Maria Silva</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Encomendei para um evento corporativo e o agendamento foi super prático. 
                Todos elogiaram a qualidade e variedade dos salgados."
              </p>
              <div className="font-medium">João Santos</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "O Kit Premium valeu cada centavo. A qualidade é impecável e o atendimento 
                do início ao fim foi excelente. Recomendo muito!"
              </p>
              <div className="font-medium">Ana Oliveira</div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
          <div className="grid gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Com quantos dias de antecedência devo agendar?</h3>
              <p className="text-gray-600">
                Recomendamos agendar com pelo menos 3 dias de antecedência para garantir disponibilidade.
                Para eventos grandes (acima de 300 unidades), o ideal é agendar com 7 dias.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">É possível personalizar os combos?</h3>
              <p className="text-gray-600">
                Sim! Para personalizar seu combo, recomendamos acessar nossa página de agendamento
                onde você pode especificar suas preferências de sabores e quantidades.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Qual a área de entrega para eventos?</h3>
              <p className="text-gray-600">
                Atendemos toda a região metropolitana. Para locais mais distantes, 
                pode haver uma taxa adicional de entrega.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={handleScheduleClick}
          >
            <CalendarClock className="mr-2 h-5 w-5" />
            Agendar seu Evento Agora
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CombosPage;
