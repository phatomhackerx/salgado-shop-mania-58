
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { SchedulePreview } from "@/components/SchedulePreview";
import { categories, featuredProducts, newProducts } from "@/data/mock-data";
import { useCart } from "@/hooks/use-cart";

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
          <div className="container mx-auto px-4 py-6">
            <SchedulePreview />
          </div>
        )}
        
        <CategorySection categories={categories} />
        
        <FeaturedProducts title="Mais Vendidos" products={featuredProducts} />
        
        <FeaturedProducts title="Novos Sabores" products={newProducts} />
        
        {/* Promotional Banner */}
        <div className="bg-accent/10 py-12 my-10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              PROMOÇÃO ESPECIAL
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Compre 10 salgados e ganhe mais 2 grátis! Promoção válida para todos os sabores.
            </p>
            <a 
              href="/promocoes" 
              className="inline-block bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors"
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
