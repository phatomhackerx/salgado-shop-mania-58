
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
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      {/* Overlay para fechar o sidebar em dispositivos móveis */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 lg:hidden" 
          onClick={() => onOpenChange(false)}
        />
      )}
      
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-white transition-all duration-300 lg:static",
          open 
            ? "w-64 translate-x-0 shadow-lg lg:shadow-none" 
            : "w-[70px] -translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          {open ? (
            <>
              <Link to="/admin" className="flex items-center gap-2 font-semibold">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">Salgado Admin</span>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => onOpenChange(false)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <div className="flex w-full justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(true)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
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
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        location.pathname === item.href
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100",
                        !open && "justify-center px-0"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5", 
                        location.pathname === item.href 
                          ? "text-white" 
                          : "text-gray-500"
                      )} />
                      {open && <span>{item.title}</span>}
                    </Link>
                  </TooltipTrigger>
                  {!open && (
                    <TooltipContent side="right">
                      {item.title}
                    </TooltipContent>
                  )}
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
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100",
                      location.pathname === "/admin/configuracoes" && "bg-primary text-white",
                      !open && "justify-center px-0"
                    )}
                  >
                    <Settings className={cn(
                      "h-5 w-5", 
                      location.pathname === "/admin/configuracoes" 
                        ? "text-white" 
                        : "text-gray-500"
                    )} />
                    {open && <span>Configurações</span>}
                  </Link>
                </TooltipTrigger>
                {!open && (
                  <TooltipContent side="right">
                    Configurações
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};
