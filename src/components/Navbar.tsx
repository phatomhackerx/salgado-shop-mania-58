
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, ShoppingCart, Menu, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const isMobile = useMobile();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">Salgado Shop Mania</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/produtos">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Produtos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/categorias">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Categorias
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/promocoes">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Promoções
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Eventos</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/combos"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            Combos para Festas
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Pacotes especiais para seus eventos com preços promocionais.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/agendamento"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center text-sm font-medium leading-none">
                            <CalendarClock className="mr-2 h-4 w-4" />
                            Agendamento
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Pedidos grandes com entrega programada.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/produtos"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Corporativo</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Soluções para eventos empresariais.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/categorias"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Produtos Premium</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Salgados gourmet para ocasiões especiais.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Search, Cart and Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Cart Button */}
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => navigate("/carrinho")}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="py-4 grid gap-4">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Pesquisar..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                  <nav className="grid gap-2">
                    <Link
                      to="/"
                      className="flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md hover:bg-accent"
                    >
                      Início
                    </Link>
                    <Link
                      to="/produtos"
                      className="flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md hover:bg-accent"
                    >
                      Produtos
                    </Link>
                    <Link
                      to="/categorias"
                      className="flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md hover:bg-accent"
                    >
                      Categorias
                    </Link>
                    <Link
                      to="/promocoes"
                      className="flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md hover:bg-accent"
                    >
                      Promoções
                    </Link>
                    <Link
                      to="/combos"
                      className="flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md hover:bg-accent"
                    >
                      <span className="font-medium">Combos para Festas</span>
                    </Link>
                    <Link
                      to="/agendamento"
                      className="flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md hover:bg-accent"
                    >
                      <CalendarClock className="h-5 w-5" />
                      <span className="font-medium">Agendamento</span>
                    </Link>
                    <Link
                      to="/carrinho"
                      className="flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md hover:bg-accent"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="font-medium">Carrinho</span>
                      {totalItems > 0 && (
                        <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-auto">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};
