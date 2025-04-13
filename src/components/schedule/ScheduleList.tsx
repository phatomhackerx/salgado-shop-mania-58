
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScheduleFilters } from "./ScheduleFilters";
import { NoScheduledItems } from "./NoScheduledItems";
import { ScheduleItemsByDate } from "./ScheduleItemsByDate";
import { CartItem } from "@/types/cart";
import { Location } from "@/components/schedule/LocationSelector";

interface ScheduleListProps {
  scheduledItems: CartItem[];
  pickupLocations: Location[];
}

export const ScheduleList = ({
  scheduledItems,
  pickupLocations
}: ScheduleListProps) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);

  const getRandomStatus = (index: number, isPickup: boolean) => {
    const deliveryStatuses = ["scheduled", "preparing", "on-the-way", "delivered"] as const;
    const pickupStatuses = ["scheduled", "preparing", "ready", "delivered"] as const;
    
    if (isPickup) {
      return pickupStatuses[index % pickupStatuses.length];
    }
    return deliveryStatuses[index % deliveryStatuses.length];
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  const handleTypeToggle = (type: string) => {
    setSelectedType(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredItems = scheduledItems.filter(item => {
    const isPickup = item.scheduleInfo?.isPickup || false;
    const itemType = isPickup ? "pickup" : "delivery";
    const itemStatus = getRandomStatus(scheduledItems.indexOf(item), isPickup) as string;
    
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(itemStatus);
    const matchesType = selectedType.length === 0 || selectedType.includes(itemType);
    
    return matchesStatus && matchesType;
  });

  const groupByDate = (items: typeof scheduledItems) => {
    const groups: Record<string, typeof scheduledItems> = {};
    
    items.forEach(item => {
      if (!item.scheduleInfo?.date) return;
      
      const dateKey = item.scheduleInfo.date.toISOString().split('T')[0];
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });
    
    return groups;
  };

  const groupedItems = groupByDate(filteredItems);
  
  const sortedDates = Object.keys(groupedItems).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const today = new Date().toISOString().split('T')[0];
  const upcomingDates = sortedDates.filter(date => date >= today);
  const pastDates = sortedDates.filter(date => date < today);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas Entregas</TabsTrigger>
          <TabsTrigger value="past">Entregas Passadas</TabsTrigger>
        </TabsList>
        
        <ScheduleFilters
          selectedStatus={selectedStatus}
          selectedType={selectedType}
          onStatusToggle={handleStatusToggle}
          onTypeToggle={handleTypeToggle}
        />
      </div>
      
      <TabsContent value="upcoming" className="mt-6">
        {upcomingDates.length > 0 ? (
          <div className="space-y-8">
            {upcomingDates.map(dateKey => (
              <ScheduleItemsByDate
                key={dateKey}
                dateKey={dateKey}
                items={groupedItems[dateKey]}
                getRandomStatus={getRandomStatus}
                locations={pickupLocations}
                isPast={false}
              />
            ))}
          </div>
        ) : (
          <NoScheduledItems type="upcoming" />
        )}
      </TabsContent>
      
      <TabsContent value="past" className="mt-6">
        {pastDates.length > 0 ? (
          <div className="space-y-8">
            {pastDates.map(dateKey => (
              <ScheduleItemsByDate
                key={dateKey}
                dateKey={dateKey}
                items={groupedItems[dateKey]}
                getRandomStatus={getRandomStatus}
                locations={pickupLocations}
                isPast={true}
              />
            ))}
          </div>
        ) : (
          <NoScheduledItems type="past" />
        )}
      </TabsContent>
    </Tabs>
  );
};
