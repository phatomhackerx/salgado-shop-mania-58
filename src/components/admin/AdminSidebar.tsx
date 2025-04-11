
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
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-white transition-transform lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/admin" className="flex items-center gap-2 font-semibold">
          <Briefcase className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">Salgado Admin</span>
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto lg:hidden"
          onClick={() => onOpenChange(false)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className={cn("h-4 w-4", location.pathname === item.href ? "text-white" : "text-gray-500")} />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-6 border-t pt-4">
          <Link
            to="/admin/configuracoes"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100",
              location.pathname === "/admin/configuracoes" && "bg-primary text-white"
            )}
          >
            <Settings className={cn("h-4 w-4", location.pathname === "/admin/configuracoes" ? "text-white" : "text-gray-500")} />
            <span>Configurações</span>
          </Link>
        </div>
      </ScrollArea>
    </aside>
  );
};
