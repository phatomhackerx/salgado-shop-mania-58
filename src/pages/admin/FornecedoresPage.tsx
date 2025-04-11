
import { useState } from "react";
import { 
  Truck, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  Building, 
  ArrowUpDown,
  ShoppingBag,
  Calendar,
  Package,
  FileText,
  MapPin
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

export const FornecedoresPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todos");
  
  // Mock data for suppliers
  const suppliers = [
    { 
      id: 1, 
      name: "Distribuidora Alimentos ABC", 
      email: "contato@alimentosabc.com", 
      phone: "(11) 3456-7890", 
      address: "Rua Industrial, 1234 - São Paulo, SP",
      category: "Alimentos",
      contact: "Roberto Almeida",
      lastOrder: "15/04/2025",
      status: "Ativo",
      products: 28
    },
    { 
      id: 2, 
      name: "Embalagens Express", 
      email: "vendas@embalagensexpress.com", 
      phone: "(11) 2345-6789", 
      address: "Av. das Indústrias, 567 - Guarulhos, SP",
      category: "Embalagens",
      contact: "Carla Oliveira",
      lastOrder: "14/04/2025",
      status: "Ativo",
      products: 15
    },
    { 
      id: 3, 
      name: "Hortifrutigranjeiros Silva", 
      email: "compras@silvahortifruti.com", 
      phone: "(11) 3789-1234", 
      address: "Rodovia Anhanguera, Km 15 - Osasco, SP",
      category: "Alimentos",
      contact: "Paulo Silva",
      lastOrder: "12/04/2025",
      status: "Ativo",
      products: 42
    },
    { 
      id: 4, 
      name: "Descartáveis & CIA", 
      email: "vendas@descartaveiscia.com", 
      phone: "(11) 4567-8901", 
      address: "Rua do Comércio, 890 - São Paulo, SP",
      category: "Descartáveis",
      contact: "Amanda Santos",
      lastOrder: "10/04/2025",
      status: "Ativo",
      products: 23
    },
    { 
      id: 5, 
      name: "Laticínios Puro Sabor", 
      email: "contato@purosabor.com", 
      phone: "(11) 5678-9012", 
      address: "Estrada Rural, 456 - Campinas, SP",
      category: "Laticínios",
      contact: "Marcos Pereira",
      lastOrder: "08/04/2025",
      status: "Inativo",
      products: 12
    },
    { 
      id: 6, 
      name: "Frigorífico Boi Feliz", 
      email: "vendas@boifeliz.com", 
      phone: "(11) 6789-0123", 
      address: "Rodovia dos Bandeirantes, Km 30 - Jundiaí, SP",
      category: "Carnes",
      contact: "Ricardo Mendes",
      lastOrder: "05/04/2025",
      status: "Ativo",
      products: 18
    },
    { 
      id: 7, 
      name: "Bebidas Nacional", 
      email: "comercial@bebidasnacional.com", 
      phone: "(11) 7890-1234", 
      address: "Av. do Estado, 789 - São Paulo, SP",
      category: "Bebidas",
      contact: "Fernanda Lima",
      lastOrder: "04/04/2025",
      status: "Ativo",
      products: 34
    },
    { 
      id: 8, 
      name: "Condimentos Especiais", 
      email: "atendimento@condimentosespeciais.com", 
      phone: "(11) 8901-2345", 
      address: "Rua das Especiarias, 123 - São Paulo, SP",
      category: "Temperos",
      contact: "Vinícius Costa",
      lastOrder: "02/04/2025",
      status: "Inativo",
      products: 45
    },
  ];
  
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "todos" || supplier.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  // Supplier categories
  const categories = [...new Set(suppliers.map(s => s.category))];
  
  // Supplier statistics
  const supplierStats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === "Ativo").length,
    inactive: suppliers.filter(s => s.status === "Inativo").length,
    categories: categories.length
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Fornecedores</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Fornecedor
        </Button>
      </div>
      
      {/* Supplier Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Truck className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-gray-500">Total</p>
              <h3 className="text-2xl font-bold">{supplierStats.total}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <ShoppingBag className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Ativos</p>
              <h3 className="text-2xl font-bold">{supplierStats.active}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Package className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Categorias</p>
              <h3 className="text-2xl font-bold">{supplierStats.categories}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <FileText className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Produtos</p>
              <h3 className="text-2xl font-bold">{suppliers.reduce((sum, s) => sum + s.products, 0)}</h3>
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
            placeholder="Buscar fornecedores..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Suppliers table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Lista de Fornecedores</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Fornecedor <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-gray-500">Contato: {supplier.contact}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-gray-500" />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-gray-500" />
                        <span>{supplier.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-gray-500 shrink-0" />
                      <span className="truncate max-w-[200px]">{supplier.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{supplier.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{supplier.products}</div>
                      <div className="text-xs text-gray-500">Última compra: {supplier.lastOrder}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={supplier.status === "Ativo" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
                      {supplier.status}
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

export default FornecedoresPage;
