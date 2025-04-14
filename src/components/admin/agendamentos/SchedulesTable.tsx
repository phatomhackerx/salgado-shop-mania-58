
import { Calendar, Clock, ArrowUpDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface Schedule {
  id: number;
  customer: string;
  product: string;
  date: string;
  time: string;
  address: string;
  status: string;
  price: string;
}

interface SchedulesTableProps {
  schedules: Schedule[];
}

export const SchedulesTable = ({ schedules }: SchedulesTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="mr-1 h-3 w-3" />
          Confirmado
        </Badge>;
      case "Pendente":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <Clock className="mr-1 h-3 w-3" />
          Pendente
        </Badge>;
      case "Cancelado":
        return <Badge variant="destructive">
          Cancelado
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>
            <Button variant="ghost" className="p-0 h-auto font-medium">
              Data/Hora <ArrowUpDown className="ml-1 h-3 w-3" />
            </Button>
          </TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell>{schedule.id}</TableCell>
            <TableCell>
              <div className="font-medium">{schedule.customer}</div>
              <div className="text-sm text-gray-500 truncate max-w-[200px]">{schedule.address}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{schedule.product}</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                {schedule.date}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-3 w-3" />
                {schedule.time}
              </div>
            </TableCell>
            <TableCell>{schedule.price}</TableCell>
            <TableCell>{getStatusBadge(schedule.status)}</TableCell>
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
