
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, ShoppingBag, Award, Star } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90 text-white">
      {/* Visual elements - enhanced floating shapes */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/80 rotate-12 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-white/60 -rotate-12 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-white/70 rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-white/80 -rotate-45 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 rounded-full bg-white/60 rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Enhanced decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-secondary/40 blur-xl"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary/30 blur-xl"></div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-white/90 animate-pulse-soft"></div>
        <div className="absolute top-1/3 left-2/3 w-3 h-3 rounded-full bg-white/90 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 rounded-full bg-white/90 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="max-w-xl space-y-6">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium animate-fade-in">
              <span className="mr-2">🎉</span> Novos sabores toda semana!
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
              Salgados Deliciosos Para Seus <span className="text-yellow-200 relative">
                Eventos
                <span className="absolute bottom-1 left-0 w-full h-1 bg-yellow-300/40 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
              Coxinhas, pastéis e empadas deliciosos para festas e eventos com agendamento fácil e entrega pontual!
            </p>
            <div className="flex flex-wrap gap-4 pt-2 animate-slide-in-bottom" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 font-medium shadow-lg">
                <Link to="/produtos" className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Ver Cardápio
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20 hover:scale-105 transform transition-all duration-300 shadow-lg">
                <Link to="/agendamento" className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Salgados
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center space-x-3 pt-4 text-white/90 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-primary font-bold shadow-md">P</div>
                <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center text-primary font-bold shadow-md">C</div>
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-primary font-bold shadow-md">E</div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300 mr-1" />
                <span>Mais de 1000 clientes satisfeitos</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center relative animate-float">
            <div className="relative w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden shadow-xl">
              <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-yellow-200 to-orange-400 flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="Salgados deliciosos" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                />
              </div>
              <div className="absolute -right-10 -bottom-6 transform rotate-12 bg-white/90 text-primary px-4 py-2 rounded-lg shadow-lg font-bold text-sm">
                Peça agora!
              </div>
            </div>
            
            <div className="absolute top-10 -right-8 bg-white rounded-2xl p-3 shadow-xl animate-float-delay-1">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-gray-600 font-medium text-sm">Entrega rápida</div>
                  <div className="text-xs text-gray-500">Em até 60 minutos</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl p-3 shadow-xl animate-float-delay-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-gray-600 font-medium text-sm">Qualidade</div>
                  <div className="text-xs text-gray-500">Salgados artesanais</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-1/2 transform translate-x-1/2 flex items-center text-white/70 animate-bounce-soft hidden md:flex">
          <span className="text-sm mr-2">Veja mais</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
