import { useState } from "react";
import { 
  CalendarDays, 
  CheckCircle,
  AlarmClock,
  Package,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCart } from "@/hooks/use-cart";
import { ScheduleStatsCard } from "@/components/admin/agendamentos/ScheduleStatsCard";
import { WeekCalendarView } from "@/components/admin/agendamentos/WeekCalendarView";
import { ScheduleSearchFilters } from "@/components/admin/agendamentos/ScheduleSearchFilters";
import { SchedulesTable } from "@/components/admin/agendamentos/SchedulesTable";

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
        <ScheduleStatsCard
          title="Total"
          value={scheduleStats.total}
          icon={CalendarDays}
          iconColor="text-primary"
        />
        
        <ScheduleStatsCard
          title="Confirmados"
          value={scheduleStats.confirmed}
          icon={CheckCircle}
          iconColor="text-green-500"
        />
        
        <ScheduleStatsCard
          title="Pendentes"
          value={scheduleStats.pending}
          icon={AlarmClock}
          iconColor="text-amber-500"
        />
        
        <ScheduleStatsCard
          title="Cancelados"
          value={scheduleStats.canceled}
          icon={Package}
          iconColor="text-red-500"
        />
      </div>
      
      {/* Calendar preview */}
      <WeekCalendarView 
        upcomingDays={upcomingDays} 
        scheduledItems={mockScheduledItems}
      />
      
      {/* Filter and search */}
      <ScheduleSearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      {/* Schedules table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Lista de Agendamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <SchedulesTable schedules={filteredSchedules} />
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
