
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { SchedulePreview } from "@/components/SchedulePreview";
import { categories, featuredProducts, newProducts } from "@/data/mock-data";
import { useCart } from "@/hooks/use-cart";
import { CalendarClock } from "lucide-react";

const Index = () => {
  const { scheduledItems } = useCart();
  const hasScheduledItems = scheduledItems.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Schedule Preview */}
        {hasScheduledItems && (
          <div className="bg-gray-50 py-8">
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
        
        <FeaturedProducts title="Novos Sabores" products={newProducts} />
        
        {/* Enhanced Promotional Banner */}
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 py-16 my-10">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block bg-white p-2 rounded-full mb-4 shadow-md">
              <div className="bg-primary p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              PROMOÇÃO ESPECIAL
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Compre 10 salgados e ganhe mais 2 grátis! Promoção válida para todos os sabores.
            </p>
            <a 
              href="/promocoes" 
              className="inline-block bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors shadow-md"
            >
              Aproveitar agora
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

// Import ShoppingBag icon
import { ShoppingBag } from "lucide-react";
