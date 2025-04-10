
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { SchedulePreview } from "@/components/SchedulePreview";
import { DeliveryStatusWidget } from "@/components/DeliveryStatusWidget";
import { categories, featuredProducts, newProducts } from "@/data/mock-data";
import { useCart } from "@/hooks/use-cart";
import { Award, CalendarClock, ChevronRight, Clock, ShoppingBag, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { scheduledItems } = useCart();
  const hasScheduledItems = scheduledItems.length > 0;
  
  // Randomly show delivery status widget (in a real app, this would be based on actual order status)
  const showDeliveryStatus = Math.random() > 0.5;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Quick Info Section */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Entrega Rápida</h3>
                  <p className="text-sm text-gray-500">Em até 60 minutos</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mr-4">
                  <CalendarClock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Agendamento Flexível</h3>
                  <p className="text-sm text-gray-500">Para eventos especiais</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mr-4">
                  <ThumbsUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Qualidade Garantida</h3>
                  <p className="text-sm text-gray-500">Ingredientes selecionados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Schedule Preview */}
        {hasScheduledItems && (
          <div className="bg-gray-50 py-8 border-t border-gray-100">
            <div className="container mx-auto px-4">
              <div className="flex items-center mb-4">
                <CalendarClock className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold">Suas Entregas Agendadas</h2>
              </div>
              <SchedulePreview />
            </div>
          </div>
        )}
        
        <CategorySection categories={categories} />
        
        <FeaturedProducts title="Mais Vendidos" products={featuredProducts} />
        
        {/* Testimonials Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="inline-block bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full mb-2">Clientes Satisfeitos</span>
              <h2 className="text-3xl font-bold">O Que Dizem Sobre Nossos Salgados</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"Os salgados chegaram no horário marcado e estavam deliciosos! Todos os convidados adoraram e já quero agendar para o próximo evento."</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                      <h4 className="font-medium">Cliente {item}</h4>
                      <p className="text-xs text-gray-500">Festa de Aniversário</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="group">
                Ver Mais Avaliações
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
        
        <FeaturedProducts title="Novos Sabores" products={newProducts} />
        
        {/* Enhanced Promotional Banner */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 py-16 my-10">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-secondary/10 p-2 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                    <Award className="h-8 w-8 text-secondary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    PROMOÇÃO ESPECIAL
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Compre 10 salgados e ganhe mais 2 grátis! Promoção válida para todos os sabores.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-primary text-white hover:bg-primary/90">
                      <Link to="/promocoes">
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Aproveitar agora
                      </Link>
                    </Button>
                    <Button variant="outline">Ver detalhes</Button>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-secondary to-primary relative hidden md:block">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-white rotate-12 animate-float"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-white rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-8xl font-bold">+2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para experimentar nossos salgados?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Faça seu pedido agora mesmo ou agende para seu próximo evento e impressione seus convidados!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link to="/produtos">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Ver Cardápio
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20">
                <Link to="/agendamento">
                  <CalendarClock className="mr-2 h-5 w-5" />
                  Agendar Entrega
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Delivery Status Widget - only show sometimes */}
      {showDeliveryStatus && <DeliveryStatusWidget />}
    </div>
  );
};

export default Index;
