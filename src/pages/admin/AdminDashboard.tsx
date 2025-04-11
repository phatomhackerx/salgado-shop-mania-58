
import { 
  CalendarDays, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/RatingStars";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { featuredProducts, newProducts, categories } from "@/data/mock-data";

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
  
  // Most sold products - add the rating property to the product objects
  const mostSoldProducts = featuredProducts.slice(0, 5).map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: Math.floor(Math.random() * 100) + 50, // Random quantity for demo
    rating: Math.floor(Math.random() * 5) + 1 // Adding a random rating between 1-5
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
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent orders */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pedidos recentes</CardTitle>
            <Link to="/admin/pedidos" className="text-sm text-primary hover:underline">
              Ver todos
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "Entregue" ? "bg-green-100 text-green-800" :
                        order.status === "Em preparo" ? "bg-blue-100 text-blue-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Scheduled deliveries */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-primary" />
              Agendamentos
            </CardTitle>
            <Link to="/admin/agendamentos" className="text-sm text-primary hover:underline">
              Ver todos
            </Link>
          </CardHeader>
          <CardContent>
            {scheduledItems.length > 0 ? (
              <div className="space-y-4">
                {scheduledItems.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-start justify-between rounded-lg border p-3">
                    <div className="space-y-1">
                      <p className="font-medium">{item.product.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>
                          {item.scheduleInfo?.date.toLocaleDateString('pt-BR')} às {item.scheduleInfo?.time}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarDays className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">Nenhum agendamento para exibir</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Top selling products */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Produtos mais vendidos</CardTitle>
            <Link to="/admin/produtos" className="text-sm text-primary hover:underline">
              Ver todos
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Vendidos</TableHead>
                  <TableHead>Avaliação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mostSoldProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <RatingStars rating={product.rating} size="sm" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Alerts and notifications */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-amber-50 p-4 text-amber-800">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <p className="font-medium">Estoque baixo</p>
                </div>
                <p className="mt-1 text-sm">3 produtos estão com estoque abaixo do mínimo.</p>
              </div>
              
              <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
                <p className="font-medium">Pedidos agendados hoje</p>
                <p className="mt-1 text-sm">Há 5 pedidos agendados para entrega hoje.</p>
              </div>
              
              <div className="rounded-lg bg-green-50 p-4 text-green-800">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <p className="font-medium">Aumento nas vendas</p>
                </div>
                <p className="mt-1 text-sm">As vendas aumentaram 15% em relação à semana passada.</p>
              </div>
              
              <div className="rounded-lg bg-purple-50 p-4 text-purple-800">
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  <p className="font-medium">Novas avaliações</p>
                </div>
                <p className="mt-1 text-sm">10 novas avaliações de clientes nas últimas 24h.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
