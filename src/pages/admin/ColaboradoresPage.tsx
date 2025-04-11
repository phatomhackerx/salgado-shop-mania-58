
import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  Briefcase, 
  ArrowUpDown,
  UserPlus,
  UserCog,
  BadgeCheck
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

export const ColaboradoresPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("todos");
  
  // Mock data for staff
  const staff = [
    { 
      id: 1, 
      name: "João Silva", 
      email: "joao.silva@empresa.com", 
      phone: "(11) 98765-4321", 
      role: "Gerente",
      department: "Administração",
      joinDate: "12/01/2023",
      status: "Ativo" 
    },
    { 
      id: 2, 
      name: "Maria Oliveira", 
      email: "maria.oliveira@empresa.com", 
      phone: "(11) 91234-5678", 
      role: "Atendente",
      department: "Vendas",
      joinDate: "05/03/2023",
      status: "Ativo" 
    },
    { 
      id: 3, 
      name: "Carlos Santos", 
      email: "carlos.santos@empresa.com", 
      phone: "(11) 99876-5432", 
      role: "Cozinheiro",
      department: "Produção",
      joinDate: "18/02/2023",
      status: "Ativo" 
    },
    { 
      id: 4, 
      name: "Ana Lima", 
      email: "ana.lima@empresa.com", 
      phone: "(11) 98765-8765", 
      role: "Entregador",
      department: "Logística",
      joinDate: "20/04/2023",
      status: "Ativo" 
    },
    { 
      id: 5, 
      name: "Rafael Costa", 
      email: "rafael.costa@empresa.com", 
      phone: "(11) 91234-1234", 
      role: "Assistente",
      department: "Administração",
      joinDate: "10/05/2023",
      status: "Ativo" 
    },
    { 
      id: 6, 
      name: "Juliana Ferreira", 
      email: "juliana.ferreira@empresa.com", 
      phone: "(11) 99876-9876", 
      role: "Atendente",
      department: "Vendas",
      joinDate: "02/06/2023",
      status: "Inativo" 
    },
    { 
      id: 7, 
      name: "Pedro Almeida", 
      email: "pedro.almeida@empresa.com", 
      phone: "(11) 98765-3456", 
      role: "Cozinheiro",
      department: "Produção",
      joinDate: "15/07/2023",
      status: "Ativo" 
    },
    { 
      id: 8, 
      name: "Mariana Souza", 
      email: "mariana.souza@empresa.com", 
      phone: "(11) 91234-7890", 
      role: "Entregador",
      department: "Logística",
      joinDate: "08/08/2023",
      status: "Ativo" 
    },
    { 
      id: 9, 
      name: "Thiago Mendes", 
      email: "thiago.mendes@empresa.com", 
      phone: "(11) 99876-2345", 
      role: "Gerente",
      department: "Vendas",
      joinDate: "25/09/2023",
      status: "Ativo" 
    },
    { 
      id: 10, 
      name: "Luciana Martins", 
      email: "luciana.martins@empresa.com", 
      phone: "(11) 98765-6789", 
      role: "Assistente",
      department: "Administração",
      joinDate: "13/10/2023",
      status: "Inativo" 
    },
  ];
  
  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "todos" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });
  
  // Staff statistics
  const staffStats = {
    total: staff.length,
    active: staff.filter(s => s.status === "Ativo").length,
    inactive: staff.filter(s => s.status === "Inativo").length,
    roles: [...new Set(staff.map(s => s.role))].length
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Gerente":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{role}</Badge>;
      case "Atendente":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{role}</Badge>;
      case "Cozinheiro":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{role}</Badge>;
      case "Entregador":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{role}</Badge>;
      case "Assistente":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{role}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Colaboradores</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Colaborador
        </Button>
      </div>
      
      {/* Staff Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-gray-500">Total</p>
              <h3 className="text-2xl font-bold">{staffStats.total}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <BadgeCheck className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Ativos</p>
              <h3 className="text-2xl font-bold">{staffStats.active}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <UserCog className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Inativos</p>
              <h3 className="text-2xl font-bold">{staffStats.inactive}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Briefcase className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Cargos</p>
              <h3 className="text-2xl font-bold">{staffStats.roles}</h3>
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
            placeholder="Buscar colaboradores..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Cargo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os cargos</SelectItem>
            <SelectItem value="Gerente">Gerente</SelectItem>
            <SelectItem value="Atendente">Atendente</SelectItem>
            <SelectItem value="Cozinheiro">Cozinheiro</SelectItem>
            <SelectItem value="Entregador">Entregador</SelectItem>
            <SelectItem value="Assistente">Assistente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Staff table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Lista de Colaboradores</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Colaborador <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">Desde {member.joinDate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-gray-500" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-gray-500" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Briefcase className="h-3 w-3 text-gray-500 shrink-0" />
                      <span>{member.department}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(member.role)}</TableCell>
                  <TableCell>
                    <Badge className={member.status === "Ativo" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
                      {member.status}
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

export default ColaboradoresPage;
