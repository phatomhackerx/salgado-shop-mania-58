
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { CalendarClock, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const SchedulePreview = () => {
  const { scheduledItems } = useCart();
  const [nextDelivery, setNextDelivery] = useState<{
    date: Date;
    time: string;
    products: string[];
    totalItems: number;
  } | null>(null);

  useEffect(() => {
    if (scheduledItems.length === 0) return;

    // Sort scheduled items by date
    const sortedItems = [...scheduledItems].sort((a, b) => {
      if (!a.scheduleInfo?.date || !b.scheduleInfo?.date) return 0;
      return a.scheduleInfo.date.getTime() - b.scheduleInfo.date.getTime();
    });

    // Get the soonest delivery
    const next = sortedItems[0];
    if (next.scheduleInfo?.date) {
      setNextDelivery({
        date: next.scheduleInfo.date,
        time: next.scheduleInfo.time,
        products: [next.product.name],
        totalItems: next.quantity,
      });
    }
  }, [scheduledItems]);

  if (!nextDelivery) return null;

  // Format date as "DD/MM/YYYY"
  const formattedDate = nextDelivery.date.toLocaleDateString('pt-BR');
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <CalendarClock className="mr-2 h-5 w-5 text-primary" />
          Próxima Entrega Agendada
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Data</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Horário</p>
            <p className="font-medium">{nextDelivery.time}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-muted-foreground">Pedido</p>
          <p className="font-medium truncate">{nextDelivery.products.join(', ')}</p>
          <p className="text-sm">
            <span className="font-semibold">{nextDelivery.totalItems}</span> unidades
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link to="/agendamento" className="flex justify-between items-center">
            <span>Ver Todos Agendamentos</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
