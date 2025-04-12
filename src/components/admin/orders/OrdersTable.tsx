
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { Order } from "@/types/admin";

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">
            <Button variant="ghost" className="p-0 h-auto font-medium">
              Pedido <ArrowUpDown className="ml-1 h-3 w-3" />
            </Button>
          </TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Data/Hora</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Itens</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>
              <div className="font-medium">{order.customer}</div>
              <div className="text-sm text-gray-500 truncate max-w-[200px]">{order.address}</div>
            </TableCell>
            <TableCell>
              <div>{order.date}</div>
              <div className="text-sm text-gray-500">{order.time}</div>
            </TableCell>
            <TableCell>{order.amount}</TableCell>
            <TableCell>{order.items}</TableCell>
            <TableCell>
              <OrderStatusBadge status={order.status} />
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
  );
};
