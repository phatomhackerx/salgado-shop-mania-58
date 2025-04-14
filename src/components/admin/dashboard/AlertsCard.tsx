
import { AlertTriangle, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AlertsCard = () => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
          Alertas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg bg-amber-50 p-4 text-amber-800">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="font-medium">Estoque baixo</p>
            </div>
            <p className="mt-1 text-sm">3 produtos estão com estoque abaixo do mínimo.</p>
          </div>
          
          <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
            <p className="font-medium">Pedidos agendados hoje</p>
            <p className="mt-1 text-sm">Há 5 pedidos agendados para entrega hoje.</p>
          </div>
          
          <div className="rounded-lg bg-green-50 p-4 text-green-800">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              <p className="font-medium">Aumento nas vendas</p>
            </div>
            <p className="mt-1 text-sm">As vendas aumentaram 15% em relação à semana passada.</p>
          </div>
          
          <div className="rounded-lg bg-purple-50 p-4 text-purple-800">
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              <p className="font-medium">Novas avaliações</p>
            </div>
            <p className="mt-1 text-sm">10 novas avaliações de clientes nas últimas 24h.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
