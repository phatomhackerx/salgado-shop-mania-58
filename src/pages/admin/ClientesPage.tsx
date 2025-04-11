
import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpDown,
  UserPlus,
  UserCheck,
  ShoppingBag
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
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
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
              <h3 className="text-2xl font-bold">{customerStats.total}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <UserCheck className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Clientes Ativos</p>
              <h3 className="text-2xl font-bold">{customerStats.active}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <ShoppingBag className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Clientes Inativos</p>
              <h3 className="text-2xl font-bold">{customerStats.inactive}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <UserPlus className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Novos (Este Mês)</p>
              <h3 className="text-2xl font-bold">{customerStats.newThisMonth}</h3>
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
            placeholder="Buscar clientes..."
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
            <SelectItem value="Ativo">Ativo</SelectItem>
            <SelectItem value="Inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Customers table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Cliente <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Compras</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">Cliente desde {customer.since}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-gray-500" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-gray-500" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-gray-500 shrink-0" />
                      <span className="truncate max-w-[200px]">{customer.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{customer.orders} pedidos</div>
                      <div className="text-gray-500">Total: {customer.totalSpent}</div>
                      <div className="text-xs text-gray-500">Último: {customer.lastOrder}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={customer.status === "Ativo" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
                      {customer.status}
                    </Badge>
                  </TableCell>
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

export default ClientesPage;
