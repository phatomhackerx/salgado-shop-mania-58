
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { featuredProducts, newProducts } from "@/data/mock-data";
import { DashboardStatsCard } from "@/components/admin/dashboard/DashboardStatsCard";
import { RecentOrdersCard } from "@/components/admin/dashboard/RecentOrdersCard";
import { ScheduledDeliveriesCard } from "@/components/admin/dashboard/ScheduledDeliveriesCard";
import { TopSellingProductsCard } from "@/components/admin/dashboard/TopSellingProductsCard";
import { AlertsCard } from "@/components/admin/dashboard/AlertsCard";

export const AdminDashboard = () => {
  const { scheduledItems } = useCart();
  
  // Mock data for dashboard
  const salesData = {
    today: "R$ 1.250,00",
    week: "R$ 7.890,00",
    month: "R$ 32.450,00",
    growth: "+12.5%"
  };
  
  const stats = [
    {
      title: "Vendas hoje",
      value: salesData.today,
      icon: DollarSign,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Novos pedidos",
      value: "24",
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Produtos",
      value: `${featuredProducts.length + newProducts.length}`,
      icon: Package,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Clientes",
      value: "158",
      icon: Users,
      color: "bg-amber-100 text-amber-600"
    }
  ];
  
  // Recent orders
  const recentOrders = [
    { id: "PED-2345", customer: "João Silva", date: "15/04/2025", amount: "R$ 120,00", status: "Entregue" },
    { id: "PED-2344", customer: "Maria Santos", date: "15/04/2025", amount: "R$ 85,00", status: "Em preparo" },
    { id: "PED-2343", customer: "Pedro Oliveira", date: "14/04/2025", amount: "R$ 210,00", status: "Agendado" },
    { id: "PED-2342", customer: "Ana Souza", date: "14/04/2025", amount: "R$ 65,00", status: "Entregue" },
  ];
  
  // Most sold products
  const mostSoldProducts = featuredProducts.slice(0, 5).map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: Math.floor(Math.random() * 100) + 50, // Random quantity for demo
    rating: Math.floor(Math.random() * 5) + 1 // Random rating between 1-5
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <TrendingUp className="mr-2 h-4 w-4" />
            Exportar relatório
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <DashboardStatsCard
            key={i}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent orders */}
        <RecentOrdersCard orders={recentOrders} />
        
        {/* Scheduled deliveries */}
        <ScheduledDeliveriesCard scheduledItems={scheduledItems} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Top selling products */}
        <TopSellingProductsCard products={mostSoldProducts} />
        
        {/* Alerts and notifications */}
        <AlertsCard />
      </div>
    </div>
  );
};

export default AdminDashboard;
