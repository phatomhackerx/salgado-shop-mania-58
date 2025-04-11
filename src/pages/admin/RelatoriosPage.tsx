
import { useState } from "react";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  PieChart,
  UserCheck,
  Package,
  RefreshCcw,
  ChevronDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart as RechartsPie, Pie, Cell } from 'recharts';

export const RelatoriosPage = () => {
  const [period, setPeriod] = useState("mensal");
  
  // Sales data
  const salesData = [
    { name: 'Jan', value: 12400 },
    { name: 'Fev', value: 14200 },
    { name: 'Mar', value: 15800 },
    { name: 'Abr', value: 16900 },
    { name: 'Mai', value: 18100 },
    { name: 'Jun', value: 17300 },
    { name: 'Jul', value: 19200 },
    { name: 'Ago', value: 20500 },
    { name: 'Set', value: 21800 },
    { name: 'Out', value: 23100 },
    { name: 'Nov', value: 24500 },
    { name: 'Dez', value: 26200 },
  ];
  
  // Products by category data
  const categoryData = [
    { name: 'Coxinhas', value: 35 },
    { name: 'Pastéis', value: 25 },
    { name: 'Empadas', value: 15 },
    { name: 'Quibes', value: 10 },
    { name: 'Bolinhos', value: 10 },
    { name: 'Esfirras', value: 5 },
  ];
  
  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#22C55E', '#EAB308'];
  
  // Top selling products
  const topProducts = [
    { name: 'Coxinha de Frango', sales: 430, revenue: 'R$ 2.575,70' },
    { name: 'Pastel de Carne', sales: 385, revenue: 'R$ 2.883,65' },
    { name: 'Coxinha de Frango com Catupiry', sales: 350, revenue: 'R$ 2.446,50' },
    { name: 'Empada de Palmito', sales: 320, revenue: 'R$ 2.876,80' },
    { name: 'Pastel de Queijo', sales: 310, revenue: 'R$ 2.166,90' },
  ];
  
  // Orders by time data
  const ordersByTime = [
    { time: '8-10h', orders: 15 },
    { time: '10-12h', orders: 25 },
    { time: '12-14h', orders: 40 },
    { time: '14-16h', orders: 30 },
    { time: '16-18h', orders: 35 },
    { time: '18-20h', orders: 45 },
    { time: '20-22h', orders: 20 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Relatórios</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semanal">Últimos 7 dias</SelectItem>
              <SelectItem value="mensal">Últimos 30 dias</SelectItem>
              <SelectItem value="trimestral">Últimos 3 meses</SelectItem>
              <SelectItem value="anual">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Vendas Totais</p>
                <h3 className="text-2xl font-bold mt-1">R$ 42.350,00</h3>
                <p className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12.5% que o mês anterior
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pedidos</p>
                <h3 className="text-2xl font-bold mt-1">254</h3>
                <p className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +8.2% que o mês anterior
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Novos Clientes</p>
                <h3 className="text-2xl font-bold mt-1">28</h3>
                <p className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +5.3% que o mês anterior
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ticket Médio</p>
                <h3 className="text-2xl font-bold mt-1">R$ 166,70</h3>
                <p className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +3.8% que o mês anterior
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Trend */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Tendência de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Products by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Orders by Time */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos por Horário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ordersByTime}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Selling Products */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos Mais Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sales} vendas</div>
                  </div>
                </div>
                <div className="font-bold">{product.revenue}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosPage;
