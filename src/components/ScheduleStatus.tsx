
import { CheckCircle, Clock, Package, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ScheduleStatusProps {
  status: "scheduled" | "preparing" | "on-the-way" | "delivered" | "ready";
  scheduledDate: Date;
  estimatedDeliveryTime?: string;
}

export const ScheduleStatus = ({
  status,
  scheduledDate,
  estimatedDeliveryTime,
}: ScheduleStatusProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "scheduled":
        return {
          icon: Clock,
          text: "Agendado",
          color: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        };
      case "preparing":
        return {
          icon: Package,
          text: "Em Preparação",
          color: "bg-amber-100 text-amber-800 hover:bg-amber-100",
        };
      case "on-the-way":
        return {
          icon: Truck,
          text: "A Caminho",
          color: "bg-purple-100 text-purple-800 hover:bg-purple-100",
        };
      case "ready":
        return {
          icon: Package,
          text: "Pronto para Retirada",
          color: "bg-amber-100 text-amber-800 hover:bg-amber-100",
        };
      case "delivered":
        return {
          icon: CheckCircle,
          text: "Entregue",
          color: "bg-green-100 text-green-800 hover:bg-green-100",
        };
      default:
        return {
          icon: Clock,
          text: "Agendado",
          color: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        };
    }
  };

  const { icon: Icon, text, color } = getStatusConfig();
  const formattedDate = format(scheduledDate, "PPP", { locale: ptBR });

  return (
    <div className="space-y-2">
      <Badge className={`${color} flex w-fit items-center gap-1 px-2 py-1`}>
        <Icon className="h-3.5 w-3.5" />
        <span>{text}</span>
      </Badge>
      
      <div className="flex flex-col text-sm text-gray-500 lg:flex-row lg:items-center lg:gap-2">
        <span className="font-medium">{formattedDate}</span>
        {estimatedDeliveryTime && (
          <>
            <span className="hidden lg:inline">•</span>
            <span>às {estimatedDeliveryTime}</span>
          </>
        )}
      </div>
    </div>
  );
};
