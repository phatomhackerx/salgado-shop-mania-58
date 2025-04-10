
import { useState } from "react";
import { CalendarClock, Clock, MapPin, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface DeliveryStatus {
  orderNumber: string;
  status: "preparing" | "shipping" | "delivered" | "scheduled";
  address: string;
  timeInfo: string;
  scheduledDate?: string;
  trackingCode?: string;
}

export const DeliveryStatusWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Mock delivery data - in a real app, this would come from an API
  const mockDelivery: DeliveryStatus = {
    orderNumber: "#" + Math.floor(10000 + Math.random() * 90000),
    status: ["preparing", "shipping", "delivered", "scheduled"][Math.floor(Math.random() * 4)] as DeliveryStatus["status"],
    address: "Av. Paulista, 1578 - Bela Vista, São Paulo - SP",
    timeInfo: `${Math.floor(Math.random() * 60) + 15} minutos`,
    scheduledDate: "12/05/2025 às 18:30",
    trackingCode: "BR" + Math.floor(1000000000 + Math.random() * 9000000000)
  };
  
  const statusConfig = {
    preparing: {
      icon: <Package className="h-5 w-5" />,
      label: "Preparando",
      color: "bg-yellow-500",
      message: "Seu pedido está sendo preparado"
    },
    shipping: {
      icon: <Truck className="h-5 w-5" />,
      label: "Em entrega",
      color: "bg-blue-500",
      message: "Seu pedido está a caminho"
    },
    delivered: {
      icon: <MapPin className="h-5 w-5" />,
      label: "Entregue",
      color: "bg-green-500",
      message: "Seu pedido foi entregue"
    },
    scheduled: {
      icon: <CalendarClock className="h-5 w-5" />,
      label: "Agendado",
      color: "bg-purple-500",
      message: "Entrega agendada para"
    }
  };
  
  const status = statusConfig[mockDelivery.status];
  
  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        className="fixed bottom-4 right-4 shadow-md z-40 gap-2 bg-white"
        onClick={() => setIsOpen(true)}
      >
        {status.icon}
        Ver status da entrega
      </Button>
    );
  }
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="fixed bottom-4 right-4 z-40 w-full max-w-sm"
    >
      <Card className="shadow-lg border-t-4 animate-fade-in" style={{ borderTopColor: status.color.replace("bg-", "var(--") + ")" }}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Badge className={status.color + " text-white"}>
                {status.label}
              </Badge>
              <CardTitle className="mt-2 text-lg">
                Pedido {mockDelivery.orderNumber}
              </CardTitle>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <span className="sr-only">Fechar</span>
                ✕
              </Button>
            </CollapsibleTrigger>
          </div>
          <CardDescription className="flex items-center mt-1">
            {status.message}
            {mockDelivery.status === "scheduled" ? (
              <span className="font-medium text-gray-700 ml-1">{mockDelivery.scheduledDate}</span>
            ) : null}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4">
          <CollapsibleContent className="space-y-3">
            {mockDelivery.status === "shipping" && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>Chegada estimada em {mockDelivery.timeInfo}</span>
              </div>
            )}
            
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <span className="text-gray-600">{mockDelivery.address}</span>
            </div>
            
            {mockDelivery.trackingCode && mockDelivery.status === "shipping" && (
              <div className="bg-gray-50 rounded-md p-2 text-xs flex items-center justify-between">
                <span>Código de rastreio: <span className="font-medium">{mockDelivery.trackingCode}</span></span>
                <Button variant="ghost" size="sm" className="h-7 text-xs">Copiar</Button>
              </div>
            )}
          </CollapsibleContent>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link to={mockDelivery.status === "scheduled" ? "/agendamento" : "/carrinho"}>
              Ver detalhes
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </Collapsible>
  );
};
