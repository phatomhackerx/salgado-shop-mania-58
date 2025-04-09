
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search,
  Calendar
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const { totalItems } = useCart();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  
  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Reset search when changing route
  useEffect(() => {
    setSearchQuery("");
  }, [location]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search implementation would go here
    console.log("Search for:", searchQuery);
  };
  
  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-primary tracking-tight">
              Salgado Shop Mania
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/produtos" className="text-gray-600 hover:text-primary">
                Produtos
              </Link>
              <Link to="/categorias" className="text-gray-600 hover:text-primary">
                Categorias
              </Link>
              <Link to="/promocoes" className="text-gray-600 hover:text-primary">
                Promoções
              </Link>
              <Link to="/combos" className="text-gray-600 hover:text-primary">
                Combos
              </Link>
              <Link to="/agendamento" className="text-gray-600 hover:text-primary flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Agendar
              </Link>
            </nav>
          )}
          
          {/* Search, Cart and Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <form 
              onSubmit={handleSearch} 
              className="hidden md:flex items-center relative w-60"
            >
              <Input
                type="search"
                placeholder="Buscar salgados..."
                className="pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search 
                className="absolute right-2 h-4 w-4 text-gray-500" 
                onClick={() => handleSearch}
              />
            </form>
            
            {/* Cart */}
            <Link to="/carrinho" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary transition-colors" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.5rem] text-center">
                  {totalItems}
                </Badge>
              )}
            </Link>
            
            {/* Mobile Menu */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85%]">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Menu</h2>
                      <SheetClose className="rounded-full p-1 hover:bg-gray-100">
                        <X className="h-5 w-5" />
                      </SheetClose>
                    </div>
                    
                    {/* Mobile Search */}
                    <form 
                      onSubmit={handleSearch} 
                      className="flex items-center relative mb-6"
                    >
                      <Input
                        type="search"
                        placeholder="Buscar salgados..."
                        className="pr-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0"
                      >
                        <Search className="h-4 w-4 text-gray-500" />
                      </Button>
                    </form>
                    
                    {/* Mobile Nav Links */}
                    <nav className="flex flex-col space-y-4">
                      <SheetClose asChild>
                        <Link 
                          to="/" 
                          className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                        >
                          Início
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link 
                          to="/produtos" 
                          className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                        >
                          Produtos
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link 
                          to="/categorias" 
                          className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                        >
                          Categorias
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link 
                          to="/promocoes" 
                          className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                        >
                          Promoções
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link 
                          to="/combos" 
                          className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                        >
                          Combos
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link 
                          to="/agendamento" 
                          className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Agendar Entrega
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link 
                          to="/carrinho" 
                          className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Carrinho
                          {totalItems > 0 && (
                            <Badge className="ml-2">{totalItems}</Badge>
                          )}
                        </Link>
                      </SheetClose>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
