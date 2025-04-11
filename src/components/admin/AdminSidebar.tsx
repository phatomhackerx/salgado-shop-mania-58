
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  CalendarDays,
  BarChart3,
  Settings,
  ChevronLeft,
  Briefcase,
  Truck,
  UserCog,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface AdminSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AdminSidebar = ({ open, onOpenChange }: AdminSidebarProps) => {
  const location = useLocation();
  
  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard
    },
    {
      title: "Pedidos",
      href: "/admin/pedidos",
      icon: ShoppingBag
    },
    {
      title: "Produtos",
      href: "/admin/produtos",
      icon: Package
    },
    {
      title: "Clientes",
      href: "/admin/clientes",
      icon: Users
    },
    {
      title: "Agendamentos",
      href: "/admin/agendamentos",
      icon: CalendarDays
    },
    {
      title: "Relatórios",
      href: "/admin/relatorios",
      icon: BarChart3
    },
    {
      title: "Colaboradores",
      href: "/admin/colaboradores",
      icon: UserCog
    },
    {
      title: "Fornecedores",
      href: "/admin/fornecedores",
      icon: Truck
    }
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}
      
      {/* Collapsed sidebar trigger for mobile */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full shadow-lg lg:hidden z-30"
        onClick={() => onOpenChange(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r bg-white shadow-sm transition-all duration-300 ease-in-out lg:static lg:shadow-none",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          !open && "lg:w-20"
        )}
      >
        <div className={cn(
          "flex h-14 items-center border-b px-4",
          !open && "lg:justify-center"
        )}>
          <Link to="/admin" className="flex items-center gap-2 font-semibold">
            <Briefcase className="h-6 w-6 text-primary flex-shrink-0" />
            <span className={cn(
              "text-lg font-bold transition-opacity duration-200",
              !open && "lg:hidden"
            )}>
              Salgado Admin
            </span>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={() => onOpenChange(false)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          {/* Desktop sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hidden lg:flex"
            onClick={() => onOpenChange(!open)}
          >
            <ChevronLeft className={cn(
              "h-5 w-5 transition-transform duration-200",
              !open && "lg:rotate-180"
            )} />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            <TooltipProvider delayDuration={0}>
              {mainNavItems.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative",
                        location.pathname === item.href
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100",
                        !open && "lg:justify-center lg:px-0"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 flex-shrink-0", 
                        location.pathname === item.href ? "text-white" : "text-gray-500"
                      )} />
                      <span className={cn(
                        "transition-opacity duration-200",
                        !open && "lg:hidden"
                      )}>
                        {item.title}
                      </span>
                      
                      {/* Active indicator for collapsed state */}
                      {!open && location.pathname === item.href && (
                        <span className="absolute left-0 top-1/2 -mt-1 h-2 w-1 rounded-r-full bg-primary hidden lg:block"></span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={cn(
                    "hidden",
                    !open && "lg:block"
                  )}>
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
          
          <div className="mt-6 border-t pt-4">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin/configuracoes"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 relative",
                      location.pathname === "/admin/configuracoes" && "bg-primary text-white",
                      !open && "lg:justify-center lg:px-0"
                    )}
                  >
                    <Settings className={cn(
                      "h-5 w-5 flex-shrink-0", 
                      location.pathname === "/admin/configuracoes" ? "text-white" : "text-gray-500"
                    )} />
                    <span className={cn(
                      "transition-opacity duration-200",
                      !open && "lg:hidden"
                    )}>
                      Configurações
                    </span>
                    
                    {/* Active indicator for collapsed state */}
                    {!open && location.pathname === "/admin/configuracoes" && (
                      <span className="absolute left-0 top-1/2 -mt-1 h-2 w-1 rounded-r-full bg-primary hidden lg:block"></span>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn(
                  "hidden",
                  !open && "lg:block"
                )}>
                  Configurações
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};
