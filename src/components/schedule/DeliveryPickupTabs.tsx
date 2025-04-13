
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface DeliveryPickupTabsProps {
  value: "delivery" | "pickup";
  onChange: (value: "delivery" | "pickup") => void;
  children: React.ReactNode;
}

export const DeliveryPickupTabs = ({
  value,
  onChange,
  children
}: DeliveryPickupTabsProps) => {
  return (
    <Tabs 
      defaultValue={value} 
      value={value} 
      onValueChange={(value) => onChange(value as "delivery" | "pickup")}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="delivery">Entrega</TabsTrigger>
        <TabsTrigger value="pickup">Retirada</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
