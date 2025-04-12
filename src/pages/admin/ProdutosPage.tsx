
import { useState } from "react";
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUpDown,
  FileImage,
  BarChart2,
  Tag,
  ChevronDown,
  Download,
  Upload,
  ChevronRight,
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
import { RatingStars } from "@/components/RatingStars";
import { featuredProducts, newProducts, categories } from "@/data/mock-data";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export const ProdutosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  // Combine and augment products with additional data
  const products = [...featuredProducts, ...newProducts].map(product => ({
    ...product,
    stock: Math.floor(Math.random() * 100) + 1,
    sales: Math.floor(Math.random() * 500) + 1,
    rating: Math.floor(Math.random() * 5) + 1
  }));
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "todas" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  // Product statistics
  const productStats = {
    total: products.length,
    lowStock: products.filter(p => p.stock < 10).length,
    bestSellers: products.filter(p => p.sales > 300).length,
    categories: categories.length
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Produtos</h2>
        <div className="flex flex-wrap gap-2">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      {/* Product Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Package className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-gray-500">Total de Produtos</p>
              <h3 className="text-2xl font-bold">{productStats.total}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <FileImage className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Estoque Baixo</p>
              <h3 className="text-2xl font-bold">{productStats.lowStock}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Mais Vendidos</p>
              <h3 className="text-2xl font-bold">{productStats.bestSellers}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Tag className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-500">Categorias</p>
              <h3 className="text-2xl font-bold">{productStats.categories}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Mobile filter toggle */}
      {isMobile && (
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filtros e Busca
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}
      
      {/* Filter and search */}
      <div className={`${isMobile && !showFilters ? 'hidden' : 'block'} flex flex-col gap-4 md:flex-row`}>
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar produtos..."
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
            <SelectItem value="todas">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Products table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Produto <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="hidden sm:table-cell">Estoque</TableHead>
                <TableHead className="hidden lg:table-cell">Vendas</TableHead>
                <TableHead className="hidden md:table-cell">Avaliação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-gray-100 p-1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="font-normal">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className={`font-medium ${product.stock < 10 ? 'text-red-500' : ''}`}>
                      {product.stock}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{product.sales}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <RatingStars rating={product.rating} size="sm" />
                  </TableCell>
                  <TableCell className="text-right">
                    {isMobile ? (
                      <TooltipProvider>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TooltipProvider>
                    ) : (
                      <div className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Editar</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Excluir</TooltipContent>
                        </Tooltip>
                      </div>
                    )}
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
          <PaginationItem className="hidden sm:inline-block">
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
          <PaginationItem className="hidden sm:inline-block">
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem className="hidden sm:inline-block">
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProdutosPage;
