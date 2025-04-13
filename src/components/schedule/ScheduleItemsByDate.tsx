
import { Calendar } from "lucide-react";
import { ScheduleItemCard } from "./ScheduleItemCard";
import { CartItem } from "@/types/cart";
import { Location } from "@/components/schedule/LocationSelector";
import { ShoppingBag } from "lucide-react";

interface ScheduleItemsByDateProps {
  dateKey: string;
  items: CartItem[];
  getRandomStatus: (index: number, isPickup: boolean) => string;
  locations: Location[];
  isPast?: boolean;
}

export const ScheduleItemsByDate = ({
  dateKey,
  items,
  getRandomStatus,
  locations,
  isPast = false
}: ScheduleItemsByDateProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
        {new Date(dateKey).toLocaleDateString('pt-BR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => {
          const isPickup = item.scheduleInfo?.isPickup;
          
          return (
            <ScheduleItemCard 
              key={index}
              item={item}
              status={getRandomStatus(index, !!isPickup)}
              locations={locations}
              isPast={isPast}
            />
          );
        })}
      </div>
    </div>
  );
};
