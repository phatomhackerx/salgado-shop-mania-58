
import { useState } from "react";
import { 
  Package,
  Check, 
  Clock, 
  Truck, 
  ShoppingBag, 
  AlarmClock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight, 
  ArrowUpDown,
  CheckCircle,
  Printer
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PedidosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data for orders with status "Em preparo", "Em entrega", "Entregue", "Agendado", "Cancelado"
  const orders = [
    { id: "PED-2380", customer: "Sofia Martins", date: "16/04/2025", time: "13:45", amount: "R$ 135,00", items: 3, status: "Em preparo", address: "Rua das Flores, 123" },
    { id: "PED-2379", customer: "Rafael Santos", date: "16/04/2025", time: "10:30", amount: "R$ 87,50", items: 2, status: "Em entrega", address: "Av. Paulista, 1000" },
    { id: "PED-2378", customer: "Clara Oliveira", date: "16/04/2025", time: "09:15", amount: "R$ 210,00", items: 5, status: "Agendado", address: "Rua Augusta, 456" },
    { id: "PED-2377", customer: "Lucas Silva", date: "15/04/2025", time: "18:20", amount: "R$ 65,00", items: 1, status: "Entregue", address: "Rua Oscar Freire, 789" },
    { id: "PED-2376", customer: "Mariana Costa", date: "15/04/2025", time: "16:50", amount: "R$ 145,00", items: 4, status: "Entregue", address: "Av. Rebouças, 321" },
    { id: "PED-2375", customer: "Pedro Almeida", date: "15/04/2025", time: "14:30", amount: "R$ 92,00", items: 2, status: "Entregue", address: "Rua dos Pinheiros, 654" },
    { id: "PED-2374", customer: "Juliana Lima", date: "15/04/2025", time: "12:15", amount: "R$ 78,50", items: 2, status: "Cancelado", address: "Av. Brigadeiro Faria Lima, 987" },
    { id: "PED-2373", customer: "Gabriel Ferreira", date: "15/04/2025", time: "11:00", amount: "R$ 112,00", items: 3, status: "Entregue", address: "Rua Bela Cintra, 654" },
    { id: "PED-2372", customer: "Ana Beatriz", date: "14/04/2025", time: "19:45", amount: "R$ 95,00", items: 2, status: "Entregue", address: "Av. Santo Amaro, 123" },
    { id: "PED-2371", customer: "Thiago Mendes", date: "14/04/2025", time: "17:30", amount: "R$ 175,00", items: 4, status: "Entregue", address: "Rua Haddock Lobo, 456" },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em preparo":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Clock className="mr-1 h-3 w-3" />
          Em preparo
        </Badge>;
      case "Em entrega":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          <Truck className="mr-1 h-3 w-3" />
          Em entrega
        </Badge>;
      case "Entregue":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <Check className="mr-1 h-3 w-3" />
          Entregue
        </Badge>;
      case "Agendado":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <AlarmClock className="mr-1 h-3 w-3" />
          Agendado
        </Badge>;
      case "Cancelado":
        return <Badge variant="destructive">
          Cancelado
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Statistics
  const orderStats = {
    total: orders.length,
    inPreparation: orders.filter(o => o.status === "Em preparo").length,
    inDelivery: orders.filter(o => o.status === "Em entrega").length,
    delivered: orders.filter(o => o.status === "Entregue").length,
    scheduled: orders.filter(o => o.status === "Agendado").length,
    canceled: orders.filter(o => o.status === "Cancelado").length,
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Pedidos</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button>
            <Printer className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      
      {/* Order Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <ShoppingBag className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-gray-500">Total</p>
              <h3 className="text-2xl font-bold">{orderStats.total}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Clock className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Em preparo</p>
              <h3 className="text-2xl font-bold">{orderStats.inPreparation}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Truck className="h-8 w-8 text-purple-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Em entrega</p>
              <h3 className="text-2xl font-bold">{orderStats.inDelivery}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <AlarmClock className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Agendados</p>
              <h3 className="text-2xl font-bold">{orderStats.scheduled}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Entregues</p>
              <h3 className="text-2xl font-bold">{orderStats.delivered}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Package className="h-8 w-8 text-red-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Cancelados</p>
              <h3 className="text-2xl font-bold">{orderStats.canceled}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filter and search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar pedidos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="Em preparo">Em preparo</SelectItem>
            <SelectItem value="Em entrega">Em entrega</SelectItem>
            <SelectItem value="Entregue">Entregue</SelectItem>
            <SelectItem value="Agendado">Agendado</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Orders table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Pedido <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[200px]">{order.address}</div>
                  </TableCell>
                  <TableCell>
                    <div>{order.date}</div>
                    <div className="text-sm text-gray-500">{order.time}</div>
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PedidosPage;
