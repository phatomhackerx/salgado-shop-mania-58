
import { Mail, Phone, MapPin, ArrowUpDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  orders: number;
  lastOrder: string;
  totalSpent: string;
  since: string;
}

interface CustomersTableProps {
  customers: Customer[];
}

export const CustomersTable = ({ customers }: CustomersTableProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
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
        {customers.map((customer) => (
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
  );
};
