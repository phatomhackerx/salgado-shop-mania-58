import { useState } from "react";
import { 
  Users, 
  UserPlus,
  UserCheck,
  ShoppingBag
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
import { CustomerStatsCard } from "@/components/admin/clientes/CustomerStatsCard";
import { CustomerSearchFilters } from "@/components/admin/clientes/CustomerSearchFilters";
import { CustomersTable } from "@/components/admin/clientes/CustomersTable";

export const ClientesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  
  // Mock data for customers
  const customers = [
    { 
      id: 1, 
      name: "Ana Silva", 
      email: "ana.silva@email.com", 
      phone: "(11) 98765-4321", 
      address: "Rua das Flores, 123 - São Paulo, SP", 
      status: "Ativo",
      orders: 15,
      lastOrder: "14/04/2025",
      totalSpent: "R$ 1.235,00",
      since: "Janeiro 2024" 
    },
    { 
      id: 2, 
      name: "Carlos Oliveira", 
      email: "carlos.oliveira@email.com", 
      phone: "(11) 91234-5678", 
      address: "Av. Paulista, 1000 - São Paulo, SP", 
      status: "Ativo",
      orders: 8,
      lastOrder: "10/04/2025",
      totalSpent: "R$ 756,50",
      since: "Fevereiro 2024" 
    },
    { 
      id: 3, 
      name: "Mariana Santos", 
      email: "mariana.santos@email.com", 
      phone: "(11) 99876-5432", 
      address: "Rua Augusta, 456 - São Paulo, SP", 
      status: "Inativo",
      orders: 3,
      lastOrder: "22/03/2025",
      totalSpent: "R$ 234,00",
      since: "Março 2024" 
    },
    { 
      id: 4, 
      name: "Rafael Costa", 
      email: "rafael.costa@email.com", 
      phone: "(11) 98765-8765", 
      address: "Rua Oscar Freire, 789 - São Paulo, SP", 
      status: "Ativo",
      orders: 21,
      lastOrder: "15/04/2025",
      totalSpent: "R$ 1.890,00",
      since: "Dezembro 2023" 
    },
    { 
      id: 5, 
      name: "Juliana Lima", 
      email: "juliana.lima@email.com", 
      phone: "(11) 91234-1234", 
      address: "Av. Rebouças, 321 - São Paulo, SP", 
      status: "Ativo",
      orders: 12,
      lastOrder: "12/04/2025",
      totalSpent: "R$ 1.120,00",
      since: "Janeiro 2024" 
    },
    { 
      id: 6, 
      name: "Pedro Almeida", 
      email: "pedro.almeida@email.com", 
      phone: "(11) 99876-9876", 
      address: "Rua dos Pinheiros, 654 - São Paulo, SP", 
      status: "Ativo",
      orders: 7,
      lastOrder: "08/04/2025",
      totalSpent: "R$ 645,00",
      since: "Fevereiro 2024" 
    },
    { 
      id: 7, 
      name: "Beatriz Ferreira", 
      email: "beatriz.ferreira@email.com", 
      phone: "(11) 98765-3456", 
      address: "Av. Brigadeiro Faria Lima, 987 - São Paulo, SP", 
      status: "Inativo",
      orders: 2,
      lastOrder: "15/02/2025",
      totalSpent: "R$ 178,00",
      since: "Março 2024" 
    },
    { 
      id: 8, 
      name: "Lucas Mendes", 
      email: "lucas.mendes@email.com", 
      phone: "(11) 91234-7890", 
      address: "Rua Bela Cintra, 654 - São Paulo, SP", 
      status: "Ativo",
      orders: 18,
      lastOrder: "14/04/2025",
      totalSpent: "R$ 1.456,00",
      since: "Novembro 2023" 
    },
    { 
      id: 9, 
      name: "Sofia Martins", 
      email: "sofia.martins@email.com", 
      phone: "(11) 99876-2345", 
      address: "Av. Santo Amaro, 123 - São Paulo, SP", 
      status: "Ativo",
      orders: 9,
      lastOrder: "11/04/2025",
      totalSpent: "R$ 867,50",
      since: "Janeiro 2024" 
    },
    { 
      id: 10, 
      name: "Gabriel Silva", 
      email: "gabriel.silva@email.com", 
      phone: "(11) 98765-6789", 
      address: "Rua Haddock Lobo, 456 - São Paulo, SP", 
      status: "Ativo",
      orders: 14,
      lastOrder: "13/04/2025",
      totalSpent: "R$ 1.342,00",
      since: "Dezembro 2023" 
    },
  ];
  
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Customer statistics
  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === "Ativo").length,
    inactive: customers.filter(c => c.status === "Inativo").length,
    newThisMonth: 3
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Clientes</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>
      
      {/* Customer Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomerStatsCard
          title="Total de Clientes"
          value={customerStats.total}
          icon={Users}
          iconColor="text-primary"
        />
        
        <CustomerStatsCard
          title="Clientes Ativos"
          value={customerStats.active}
          icon={UserCheck}
          iconColor="text-green-500"
        />
        
        <CustomerStatsCard
          title="Clientes Inativos"
          value={customerStats.inactive}
          icon={Users}
          iconColor="text-blue-500"
        />
        
        <CustomerStatsCard
          title="Novos (Este Mês)"
          value={customerStats.newThisMonth}
          icon={UserPlus}
          iconColor="text-amber-500"
        />
      </div>
      
      {/* Filter and search */}
      <CustomerSearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      {/* Customers table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CustomersTable customers={filteredCustomers} />
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

export default ClientesPage;
