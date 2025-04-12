
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orders, getOrderStats } from "@/data/orders";
import { OrderHeader } from "@/components/admin/orders/OrderHeader";
import { OrderStats } from "@/components/admin/orders/OrderStats";
import { OrderFilters } from "@/components/admin/orders/OrderFilters";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { OrderPagination } from "@/components/admin/orders/OrderPagination";

export const PedidosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Calculate statistics
  const orderStats = getOrderStats(orders);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <OrderHeader />
      
      {/* Order Statistics */}
      <OrderStats stats={orderStats} />
      
      {/* Filter and search */}
      <OrderFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      {/* Orders table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <OrdersTable orders={filteredOrders} />
        </CardContent>
      </Card>
      
      {/* Pagination */}
      <OrderPagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default PedidosPage;
