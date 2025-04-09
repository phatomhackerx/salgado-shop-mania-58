
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { cartItems } = useCart();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-full bg-primary p-1.5">
              <div className="h-6 w-6 rounded-full bg-white" />
            </div>
            <span className="text-xl font-bold text-primary">SalgadoMania</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          {!isMobile && (
            <div className="flex-1 mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  className="w-full rounded-full pl-10 pr-4 border-gray-200 focus:border-primary"
                  placeholder="Buscar salgados deliciosos..."
                  type="search"
                />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              <Link to="/produtos" className="text-gray-600 hover:text-primary">
                Produtos
              </Link>
              <Link to="/categorias" className="text-gray-600 hover:text-primary">
                Categorias
              </Link>
              <Link to="/promocoes" className="text-gray-600 hover:text-primary">
                Promoções
              </Link>
              <Link to="/carrinho" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-primary" />
                {cartItems.length > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-destructive text-white" 
                    variant="destructive"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <div className="flex items-center space-x-3">
              <Link to="/carrinho" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {cartItems.length > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-destructive text-white" 
                    variant="destructive"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
                className="text-gray-600"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Search - shown on mobile */}
        {isMobile && (
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                className="w-full rounded-full pl-10 pr-4 border-gray-200 focus:border-primary"
                placeholder="Buscar salgados..."
                type="search"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobile && isMenuOpen && (
          <div className="mt-4 pb-4 border-t border-gray-100">
            <ul className="space-y-4 mt-4">
              <li>
                <Link 
                  to="/produtos" 
                  className="block text-gray-600 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link 
                  to="/categorias" 
                  className="block text-gray-600 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link 
                  to="/promocoes" 
                  className="block text-gray-600 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Promoções
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
