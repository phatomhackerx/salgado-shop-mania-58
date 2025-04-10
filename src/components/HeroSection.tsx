
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, ShoppingBag } from "lucide-react";

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
            Planeje seus Eventos com Nossos Salgados
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Coxinhas, pastéis e empadas deliciosos para festas e eventos com agendamento fácil e entrega pontual!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 shadow-lg transition-all">
              <Link to="/produtos" className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Ver Cardápio
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20 shadow-lg transition-all">
              <Link to="/agendamento" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Salgados
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
