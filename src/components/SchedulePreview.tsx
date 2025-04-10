
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { CalendarClock, ChevronRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SchedulePreview = () => {
  const { scheduledItems } = useCart();
  const [nextDelivery, setNextDelivery] = useState<{
    date: Date;
    time: string;
    products: string[];
    totalItems: number;
    note?: string;
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
        note: next.scheduleInfo.note
      });
    }
  }, [scheduledItems]);

  if (!nextDelivery) return null;

  // Format date as "DD/MM/YYYY"
  const formattedDate = nextDelivery.date.toLocaleDateString('pt-BR');
  
  // Check if the delivery is today
  const isToday = new Date().toDateString() === nextDelivery.date.toDateString();
  
  // Format date nicely
  const formattedNiceDate = nextDelivery.date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-primary overflow-hidden">
      <CardHeader className="pb-2 bg-primary/5">
        <CardTitle className="text-lg flex items-center">
          <CalendarClock className="mr-2 h-5 w-5 text-primary" />
          Próxima Entrega Agendada
          {isToday && <Badge className="ml-2 bg-accent">Hoje</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="font-medium capitalize">{formattedNiceDate}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Horário</p>
                <p className="font-medium">{nextDelivery.time}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <ShoppingBag className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Pedido</p>
                <p className="font-medium truncate">{nextDelivery.products.join(', ')}</p>
                <p className="text-sm">
                  <span className="font-semibold">{nextDelivery.totalItems}</span> unidades
                </p>
              </div>
            </div>
            {nextDelivery.note && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Observação</p>
                  <p className="font-medium text-sm">{nextDelivery.note}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/10 border-t">
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

// Add the missing icon import
import { Calendar, ShoppingBag } from "lucide-react";
