
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-secondary/90 to-primary/90 text-white">
      {/* Visual elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white rotate-12 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-white -rotate-12 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-white -rotate-45 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Salgados Deliciosos Direto na Sua Casa
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Os melhores coxinhas, pastéis, empadas e muito mais, com entrega rápida e preços imbatíveis!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
              <Link to="/produtos">Ver Cardápio</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20">
              <Link to="/promocoes">Ofertas Especiais</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
