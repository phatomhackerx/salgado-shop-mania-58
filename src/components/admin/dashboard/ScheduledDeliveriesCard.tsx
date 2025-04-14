
import { CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduledItem } from "@/types/cart";

interface ScheduledDeliveriesCardProps {
  scheduledItems: ScheduledItem[];
}

export const ScheduledDeliveriesCard = ({ scheduledItems }: ScheduledDeliveriesCardProps) => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <CalendarDays className="mr-2 h-5 w-5 text-primary" />
          Agendamentos
        </CardTitle>
        <Link to="/admin/agendamentos" className="text-sm text-primary hover:underline">
          Ver todos
        </Link>
      </CardHeader>
      <CardContent>
        {scheduledItems.length > 0 ? (
          <div className="space-y-4">
            {scheduledItems.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-start justify-between rounded-lg border p-3">
                <div className="space-y-1">
                  <p className="font-medium">{item.product.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>
                      {item.scheduleInfo?.date.toLocaleDateString('pt-BR')} às {item.scheduleInfo?.time}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarDays className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">Nenhum agendamento para exibir</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
