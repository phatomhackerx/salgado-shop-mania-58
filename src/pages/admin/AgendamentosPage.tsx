
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  ArrowUpDown,
  CalendarDays,
  AlarmClock,
  CheckCircle,
  Package,
  Users
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
import { useCart } from "@/hooks/use-cart";

export const AgendamentosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const { scheduledItems } = useCart();
  
  // Add more mock scheduled items if there aren't enough in the cart
  const mockScheduledItems = [
    {
      id: 1,
      customer: "Rafael Oliveira",
      product: "Kit Festa - 100 Salgados Variados",
      date: "17/04/2025",
      time: "10:00",
      address: "Rua das Flores, 123 - São Paulo, SP",
      status: "Confirmado",
      price: "R$ 280,00"
    },
    {
      id: 2,
      customer: "Mariana Costa",
      product: "Kit Aniversário - 150 Salgados Premium",
      date: "18/04/2025",
      time: "15:30",
      address: "Av. Paulista, 1000 - São Paulo, SP",
      status: "Pendente",
      price: "R$ 420,00"
    },
    {
      id: 3,
      customer: "Carlos Santos",
      product: "Kit Corporativo - 200 Mini Salgados",
      date: "20/04/2025",
      time: "11:45",
      address: "Rua Augusta, 456 - São Paulo, SP",
      status: "Confirmado",
      price: "R$ 560,00"
    },
    {
      id: 4,
      customer: "Ana Silva",
      product: "Kit Happy Hour - 80 Salgados",
      date: "21/04/2025",
      time: "18:00",
      address: "Rua Oscar Freire, 789 - São Paulo, SP",
      status: "Confirmado",
      price: "R$ 224,00"
    },
    {
      id: 5,
      customer: "Pedro Almeida",
      product: "Kit Especial - 120 Salgados Variados",
      date: "22/04/2025",
      time: "14:15",
      address: "Av. Rebouças, 321 - São Paulo, SP",
      status: "Pendente",
      price: "R$ 336,00"
    },
    {
      id: 6,
      customer: "Juliana Lima",
      product: "Kit Festa Infantil - 100 Mini Salgados",
      date: "24/04/2025",
      time: "09:30",
      address: "Rua dos Pinheiros, 654 - São Paulo, SP",
      status: "Confirmado",
      price: "R$ 280,00"
    },
    {
      id: 7,
      customer: "Gabriel Ferreira",
      product: "Kit Executivo - 150 Salgados Premium",
      date: "25/04/2025",
      time: "16:45",
      address: "Av. Brigadeiro Faria Lima, 987 - São Paulo, SP",
      status: "Cancelado",
      price: "R$ 420,00"
    },
    {
      id: 8,
      customer: "Sofia Martins",
      product: "Kit Celebração - 180 Salgados Variados",
      date: "27/04/2025",
      time: "12:00",
      address: "Rua Bela Cintra, 654 - São Paulo, SP",
      status: "Confirmado",
      price: "R$ 504,00"
    },
  ];
  
  const filteredSchedules = mockScheduledItems.filter(schedule => {
    const matchesSearch = 
      schedule.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      schedule.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || schedule.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Schedule statistics
  const scheduleStats = {
    total: mockScheduledItems.length,
    confirmed: mockScheduledItems.filter(s => s.status === "Confirmado").length,
    pending: mockScheduledItems.filter(s => s.status === "Pendente").length,
    canceled: mockScheduledItems.filter(s => s.status === "Cancelado").length,
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="mr-1 h-3 w-3" />
          Confirmado
        </Badge>;
      case "Pendente":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <Clock className="mr-1 h-3 w-3" />
          Pendente
        </Badge>;
      case "Cancelado":
        return <Badge variant="destructive">
          Cancelado
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Upcoming days for the calendar view
  const currentDate = new Date();
  const upcomingDays = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    return {
      dayName: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      dayNumber: date.getDate(),
      month: date.toLocaleDateString('pt-BR', { month: 'short' }),
      fullDate: date.toLocaleDateString('pt-BR')
    };
  });
  
  // Today's scheduled items
  const todaySchedules = mockScheduledItems.filter(item => 
    item.date === new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/')
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Agendamentos</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>
      
      {/* Schedule Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <CalendarDays className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-gray-500">Total</p>
              <h3 className="text-2xl font-bold">{scheduleStats.total}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Confirmados</p>
              <h3 className="text-2xl font-bold">{scheduleStats.confirmed}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <AlarmClock className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Pendentes</p>
              <h3 className="text-2xl font-bold">{scheduleStats.pending}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Package className="h-8 w-8 text-red-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Cancelados</p>
              <h3 className="text-2xl font-bold">{scheduleStats.canceled}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Calendar preview */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Visão da Semana</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 justify-between">
            {upcomingDays.map((day, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center p-4 rounded-lg border ${index === 0 ? 'bg-primary/10 border-primary' : ''}`}
                style={{ minWidth: '120px' }}
              >
                <span className="text-sm font-medium text-gray-500">{day.dayName}</span>
                <span className="text-3xl font-bold mt-1">{day.dayNumber}</span>
                <span className="text-sm text-gray-500">{day.month}</span>
                
                <div className="mt-3 w-full">
                  {mockScheduledItems
                    .filter(item => item.date === day.fullDate)
                    .slice(0, 2)
                    .map((item, idx) => (
                      <div key={idx} className="text-xs p-1.5 mt-1 bg-gray-100 rounded text-center truncate">
                        {item.time} - {item.customer.split(' ')[0]}
                      </div>
                    ))}
                  
                  {mockScheduledItems.filter(item => item.date === day.fullDate).length > 2 && (
                    <div className="text-xs text-center mt-1 text-primary">
                      + {mockScheduledItems.filter(item => item.date === day.fullDate).length - 2} mais
                    </div>
                  )}
                  
                  {mockScheduledItems.filter(item => item.date === day.fullDate).length === 0 && (
                    <div className="text-xs text-center mt-2 text-gray-400">
                      Sem agendamentos
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Filter and search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar agendamentos..."
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
            <SelectItem value="Confirmado">Confirmado</SelectItem>
            <SelectItem value="Pendente">Pendente</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Schedules table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Lista de Agendamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Data/Hora <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{schedule.customer}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[200px]">{schedule.address}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{schedule.product}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      {schedule.date}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {schedule.time}
                    </div>
                  </TableCell>
                  <TableCell>{schedule.price}</TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
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

export default AgendamentosPage;
