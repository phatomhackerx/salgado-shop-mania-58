
import { ShoppingBag, Clock, Truck, AlarmClock, CheckCircle, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface OrderStatsProps {
  stats: {
    total: number;
    inPreparation: number;
    inDelivery: number;
    delivered: number;
    scheduled: number;
    canceled: number;
  };
}

export const OrderStats = ({ stats }: OrderStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <ShoppingBag className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm font-medium text-gray-500">Total</p>
            <h3 className="text-2xl font-bold">{stats.total}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Clock className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm font-medium text-gray-500">Em preparo</p>
            <h3 className="text-2xl font-bold">{stats.inPreparation}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Truck className="h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm font-medium text-gray-500">Em entrega</p>
            <h3 className="text-2xl font-bold">{stats.inDelivery}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <AlarmClock className="h-8 w-8 text-amber-500 mb-2" />
            <p className="text-sm font-medium text-gray-500">Agendados</p>
            <h3 className="text-2xl font-bold">{stats.scheduled}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm font-medium text-gray-500">Entregues</p>
            <h3 className="text-2xl font-bold">{stats.delivered}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Package className="h-8 w-8 text-red-500 mb-2" />
            <p className="text-sm font-medium text-gray-500">Cancelados</p>
            <h3 className="text-2xl font-bold">{stats.canceled}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
