
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Truck, AlarmClock } from "lucide-react";

interface OrderStatusBadgeProps {
  status: string;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  switch (status) {
    case "Em preparo":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Clock className="mr-1 h-3 w-3" />
          Em preparo
        </Badge>
      );
    case "Em entrega":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          <Truck className="mr-1 h-3 w-3" />
          Em entrega
        </Badge>
      );
    case "Entregue":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <Check className="mr-1 h-3 w-3" />
          Entregue
        </Badge>
      );
    case "Agendado":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <AlarmClock className="mr-1 h-3 w-3" />
          Agendado
        </Badge>
      );
    case "Cancelado":
      return <Badge variant="destructive">Cancelado</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
