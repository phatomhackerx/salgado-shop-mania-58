
import { useState } from "react";
import { 
  Bike, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpDown,
  Star,
  BadgeDollarSign,
  Award,
  CheckCircle2,
  Timer,
  Calendar
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
import { DeliveryPerson } from "@/types/admin";

export const EntregadoresPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [activeTab, setActiveTab] = useState("lista");
  
  // Dados de exemplo para entregadores
  const deliveryPeople: DeliveryPerson[] = [
    { 
      id: "1", 
      name: "Carlos Santos", 
      email: "carlos.santos@empresa.com", 
      phone: "(11) 98765-4321", 
      cpf: "123.456.789-10",
      vehicleType: "motorcycle",
      vehiclePlate: "ABC1234",
      level: 3,
      totalDeliveries: 245,
      rating: 4.8,
      status: "active",
      joinDate: "10/01/2023",
      address: "Rua das Flores, 123",
      commission: {
        percentage: 8.5,
        fixed: 2.5
      },
      bonuses: {
        completed: 50,
        onTime: 25,
        weekendBonus: 15
      }
    },
    { 
      id: "2", 
      name: "Ana Oliveira", 
      email: "ana.oliveira@empresa.com", 
      phone: "(11) 97654-3210", 
      cpf: "987.654.321-00",
      vehicleType: "bike",
      level: 2,
      totalDeliveries: 128,
      rating: 4.6,
      status: "active",
      joinDate: "15/03/2023",
      address: "Av. Paulista, 1000",
      commission: {
        percentage: 7.0,
        fixed: 2.0
      },
      bonuses: {
        completed: 30,
        onTime: 15,
        weekendBonus: 10
      }
    },
    { 
      id: "3", 
      name: "Rafael Costa", 
      email: "rafael.costa@empresa.com", 
      phone: "(11) 95432-1098", 
      cpf: "456.789.123-45",
      vehicleType: "car",
      vehiclePlate: "XYZ5678",
      level: 4,
      totalDeliveries: 312,
      rating: 4.9,
      status: "active",
      joinDate: "05/02/2023",
      address: "Rua Augusta, 500",
      commission: {
        percentage: 10.0,
        fixed: 3.0
      },
      bonuses: {
        completed: 75,
        onTime: 40,
        weekendBonus: 20
      }
    },
    { 
      id: "4", 
      name: "Juliana Silva", 
      email: "juliana.silva@empresa.com", 
      phone: "(11) 98888-7777", 
      cpf: "789.123.456-78",
      vehicleType: "motorcycle",
      vehiclePlate: "DEF5678",
      level: 1,
      totalDeliveries: 65,
      rating: 4.2,
      status: "active",
      joinDate: "20/04/2023",
      address: "Rua Oscar Freire, 200",
      commission: {
        percentage: 6.0,
        fixed: 1.5
      },
      bonuses: {
        completed: 15,
        onTime: 10,
        weekendBonus: 5
      }
    },
    { 
      id: "5", 
      name: "Pedro Almeida", 
      email: "pedro.almeida@empresa.com", 
      phone: "(11) 97777-6666", 
      cpf: "321.654.987-12",
      vehicleType: "bike",
      level: 2,
      totalDeliveries: 134,
      rating: 4.7,
      status: "inactive",
      joinDate: "12/01/2023",
      address: "Rua Consolação, 350",
      commission: {
        percentage: 7.0,
        fixed: 2.0
      },
      bonuses: {
        completed: 30,
        onTime: 15,
        weekendBonus: 10
      }
    },
  ];
  
  // Dados de exemplo para níveis de entregador
  const deliveryLevels = [
    {
      id: 1,
      name: "Iniciante",
      minDeliveries: 0,
      commissionPercentage: 6.0,
      bonusMultiplier: 1.0,
      requirements: ["Documentação completa", "Treinamento básico"],
      benefits: ["Acesso ao aplicativo", "Suporte básico"]
    },
    {
      id: 2,
      name: "Bronze",
      minDeliveries: 100,
      commissionPercentage: 7.0,
      bonusMultiplier: 1.2,
      requirements: ["Mínimo de 100 entregas", "Avaliação média > 4.5", "Menos de 5% de atrasos"],
      benefits: ["Acesso prioritário a pedidos", "Bônus de pontualidade"]
    },
    {
      id: 3,
      name: "Prata",
      minDeliveries: 200,
      commissionPercentage: 8.5,
      bonusMultiplier: 1.5,
      requirements: ["Mínimo de 200 entregas", "Avaliação média > 4.7", "Menos de 3% de atrasos"],
      benefits: ["Bônus de fim de semana", "Prioridade em eventos especiais", "Kit de uniformes"]
    },
    {
      id: 4,
      name: "Ouro",
      minDeliveries: 300,
      commissionPercentage: 10.0,
      bonusMultiplier: 2.0,
      requirements: ["Mínimo de 300 entregas", "Avaliação média > 4.8", "Menos de 1% de atrasos"],
      benefits: ["Bônus exclusivos", "Seguro pessoal", "Manutenção do veículo"]
    },
    {
      id: 5,
      name: "Diamante",
      minDeliveries: 500,
      commissionPercentage: 12.0,
      bonusMultiplier: 2.5,
      requirements: ["Mínimo de 500 entregas", "Avaliação média > 4.9", "0% de atrasos nos últimos 3 meses"],
      benefits: ["Comissão premium", "Plano de saúde básico", "Bônus de fidelidade"]
    },
  ];
  
  const filteredDeliveryPeople = deliveryPeople.filter(person => {
    const matchesSearch = 
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      person.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || person.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Estatísticas dos entregadores
  const stats = {
    total: deliveryPeople.length,
    active: deliveryPeople.filter(p => p.status === "active").length,
    inactive: deliveryPeople.filter(p => p.status === "inactive").length,
    avgRating: deliveryPeople.reduce((sum, p) => sum + p.rating, 0) / deliveryPeople.length,
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };
  
  const getStatusBadge = (status: DeliveryPerson["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inativo</Badge>;
      case "on_leave":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Afastado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getLevelBadge = (level: number) => {
    const levelData = deliveryLevels.find(l => l.id === level);
    if (!levelData) return <Badge variant="outline">Nível {level}</Badge>;
    
    switch (level) {
      case 1:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{levelData.name}</Badge>;
      case 2:
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{levelData.name}</Badge>;
      case 3:
        return <Badge className="bg-slate-300 text-slate-800 hover:bg-slate-300">{levelData.name}</Badge>;
      case 4:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{levelData.name}</Badge>;
      case 5:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{levelData.name}</Badge>;
      default:
        return <Badge variant="outline">{levelData.name}</Badge>;
    }
  };
  
  const getVehicleIcon = (type: DeliveryPerson["vehicleType"]) => {
    switch (type) {
      case "bike":
        return <Bike className="h-4 w-4 text-blue-500" />;
      case "motorcycle":
        return <Bike className="h-4 w-4 text-amber-500" />;
      case "car":
        return <Bike className="h-4 w-4 text-purple-500" />;
      default:
        return <Bike className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Entregadores</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Entregador
        </Button>
      </div>
      
      {/* Estatísticas dos entregadores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Bike className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-gray-500">Total</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Ativos</p>
              <h3 className="text-2xl font-bold">{stats.active}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Star className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Avaliação Média</p>
              <h3 className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Award className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Total de Níveis</p>
              <h3 className="text-2xl font-bold">{deliveryLevels.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Abas para alternar entre visualizações */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="lista">Lista de Entregadores</TabsTrigger>
          <TabsTrigger value="niveis">Níveis e Comissões</TabsTrigger>
          <TabsTrigger value="bonificacoes">Bonificações</TabsTrigger>
        </TabsList>
        
        {/* Tab: Lista de Entregadores */}
        <TabsContent value="lista" className="space-y-4">
          {/* Filtros e Busca */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar entregadores..."
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
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
                <SelectItem value="on_leave">Afastados</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Tabela de Entregadores */}
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-lg">Lista de Entregadores</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>
                      <Button variant="ghost" className="p-0 h-auto font-medium">
                        Entregador <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3" />
                        <span>Avaliação</span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Award className="mr-1 h-3 w-3" />
                        <span>Nível</span>
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeliveryPeople.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell>{person.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{person.name}</div>
                            <div className="text-sm text-gray-500">
                              {person.totalDeliveries} entregas
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-gray-500" />
                            <span>{person.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-gray-500" />
                            <span>{person.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getVehicleIcon(person.vehicleType)}
                          <span className="capitalize">{person.vehicleType}</span>
                          {person.vehiclePlate && (
                            <Badge variant="outline" className="ml-1">{person.vehiclePlate}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium">{person.rating.toFixed(1)}</span>
                          <Star className="ml-1 h-3 w-3 fill-amber-400 text-amber-400" />
                        </div>
                      </TableCell>
                      <TableCell>{getLevelBadge(person.level)}</TableCell>
                      <TableCell>{getStatusBadge(person.status)}</TableCell>
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
          
          {/* Paginação */}
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
        </TabsContent>
        
        {/* Tab: Níveis e Comissões */}
        <TabsContent value="niveis" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Configuração de Níveis</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Nível
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {deliveryLevels.map((level) => (
              <Card key={level.id} className="overflow-hidden">
                <CardHeader className={cn(
                  "py-3",
                  level.id === 1 ? "bg-gray-100" :
                  level.id === 2 ? "bg-amber-100" :
                  level.id === 3 ? "bg-slate-200" :
                  level.id === 4 ? "bg-yellow-100" :
                  "bg-blue-100"
                )}>
                  <CardTitle className="flex items-center text-lg">
                    <Award className="h-5 w-5 mr-2" />
                    Nível {level.id}: {level.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-5">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Comissão</p>
                        <p className="text-xl font-bold text-primary">
                          {level.commissionPercentage}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Multiplicador de Bônus</p>
                        <p className="text-xl font-bold text-primary">
                          {level.bonusMultiplier}x
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Requisitos:</p>
                      <ul className="text-sm text-gray-600 pl-5 list-disc space-y-1">
                        {level.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Benefícios:</p>
                      <ul className="text-sm text-gray-600 pl-5 list-disc space-y-1">
                        {level.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Tab: Bonificações */}
        <TabsContent value="bonificacoes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Configuração de Bonificações</h3>
            <Button size="sm">Salvar Alterações</Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Bonificação por entrega concluída */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                  Entrega Concluída
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Bônus pago ao entregador por cada entrega concluída com sucesso.
                  </p>
                  
                  <div className="flex flex-col space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between">
                        <label className="text-sm font-medium">Valor base (R$):</label>
                        <span className="text-sm text-primary">R$ 2,00</span>
                      </div>
                      <Input type="number" defaultValue="2.00" min="0" step="0.50" />
                    </div>
                    
                    <div>
                      <div className="mb-2 flex justify-between">
                        <label className="text-sm font-medium">Bônus por Nível:</label>
                      </div>
                      <div className="space-y-2">
                        {deliveryLevels.map(level => (
                          <div key={level.id} className="flex items-center justify-between">
                            <span className="text-sm">{level.name}</span>
                            <div className="flex items-center">
                              <Input 
                                type="number" 
                                defaultValue={(2 * level.bonusMultiplier).toFixed(2)} 
                                className="w-20 text-right"
                                min="0" 
                                step="0.50" 
                              />
                              <span className="ml-2 text-sm text-gray-500">R$</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Bonificação por entrega no prazo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Timer className="h-5 w-5 mr-2 text-amber-500" />
                  Entrega no Prazo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Bônus adicional para entregas realizadas dentro do prazo estipulado.
                  </p>
                  
                  <div className="flex flex-col space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between">
                        <label className="text-sm font-medium">Valor base (R$):</label>
                        <span className="text-sm text-primary">R$ 1,50</span>
                      </div>
                      <Input type="number" defaultValue="1.50" min="0" step="0.50" />
                    </div>
                    
                    <div>
                      <div className="mb-2 flex justify-between">
                        <label className="text-sm font-medium">Prazo para qualificação:</label>
                      </div>
                      <Select defaultValue="5">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o prazo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">Até 3 minutos antes</SelectItem>
                          <SelectItem value="5">Até 5 minutos antes</SelectItem>
                          <SelectItem value="10">Até 10 minutos antes</SelectItem>
                          <SelectItem value="15">Até 15 minutos antes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="cumulative" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="cumulative" className="text-sm">Cumulativo com outros bônus</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Bonificação por entregas em fins de semana */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Bônus de Fim de Semana
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Bônus percentual adicional para entregas realizadas em fins de semana e feriados.
                  </p>
                  
                  <div className="flex flex-col space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between">
                        <label className="text-sm font-medium">Percentual adicional:</label>
                        <span className="text-sm text-primary">15%</span>
                      </div>
                      <Input type="number" defaultValue="15" min="0" max="100" />
                    </div>
                    
                    <div>
                      <div className="mb-2">
                        <label className="text-sm font-medium">Dias aplicáveis:</label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="saturday" className="rounded border-gray-300" defaultChecked />
                          <label htmlFor="saturday" className="text-sm">Sábados</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="sunday" className="rounded border-gray-300" defaultChecked />
                          <label htmlFor="sunday" className="text-sm">Domingos</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="holidays" className="rounded border-gray-300" defaultChecked />
                          <label htmlFor="holidays" className="text-sm">Feriados</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Bonificação por Meta Mensal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BadgeDollarSign className="h-5 w-5 mr-2 text-purple-500" />
                  Meta Mensal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Bônus por atingimento de metas mensais de entregas concluídas.
                  </p>
                  
                  <div className="flex flex-col space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">50 entregas</span>
                        </div>
                        <Input type="number" defaultValue="30.00" className="w-24 text-right" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">100 entregas</span>
                        </div>
                        <Input type="number" defaultValue="75.00" className="w-24 text-right" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">200 entregas</span>
                        </div>
                        <Input type="number" defaultValue="180.00" className="w-24 text-right" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">300 entregas</span>
                        </div>
                        <Input type="number" defaultValue="300.00" className="w-24 text-right" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <input type="checkbox" id="notification" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="notification" className="text-sm">Notificar entregadores sobre progresso</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

import { cn } from "@/lib/utils";
export default EntregadoresPage;

