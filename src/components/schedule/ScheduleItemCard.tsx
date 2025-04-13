
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScheduleStatus } from "@/components/ScheduleStatus";
import { MapPin } from "lucide-react";
import { CartItem } from "@/types/cart";
import { Location } from "@/components/schedule/LocationSelector";

interface ScheduleItemCardProps {
  item: CartItem;
  status: string;
  locations: Location[];
  isPast?: boolean;
}

export const ScheduleItemCard = ({ 
  item, 
  status, 
  locations,
  isPast = false 
}: ScheduleItemCardProps) => {
  if (!item.scheduleInfo) return null;
  
  const isPickup = item.scheduleInfo?.isPickup;
  const locationId = item.scheduleInfo?.locationId;
  
  const getLocationName = (locationId?: number) => {
    if (!locationId) return "";
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.name : "";
  };

  return (
    <Card className={`overflow-hidden ${isPast ? "border-l-4 border-l-gray-300" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle>{item.product.name}</CardTitle>
          {!isPast && (
            <Badge variant={isPickup ? "outline" : "default"} className={isPickup ? "border-amber-500 text-amber-600" : ""}>
              {isPickup ? "Retirada" : "Entrega"}
            </Badge>
          )}
        </div>
        <CardDescription>
          {item.quantity} unidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScheduleStatus 
          status={isPast ? "delivered" : status as any}
          scheduledDate={item.scheduleInfo?.date || new Date()}
          estimatedDeliveryTime={item.scheduleInfo?.time}
        />
        
        {isPickup && locationId && (
          <div className="mt-3 flex items-start text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
            <div>
              <p className="font-medium">{getLocationName(locationId)}</p>
              <p className="text-muted-foreground">
                {locations.find(loc => loc.id === locationId)?.address}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/10 border-t flex justify-between">
        <div className="text-sm">
          <span className="font-medium">Total:</span> R$ {(item.product.price * item.quantity).toFixed(2)}
        </div>
        <Button variant="outline" size="sm">
          {isPast ? "Pedir Novamente" : "Detalhes"}
        </Button>
      </CardFooter>
    </Card>
  );
};
