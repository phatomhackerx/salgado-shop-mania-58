
import { Building } from "lucide-react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";

// Types
export type Location = {
  id: number;
  name: string;
  address: string;
};

export const pickupLocations: Location[] = [
  { id: 1, name: "Loja Centro", address: "Rua Principal, 123 - Centro" },
  { id: 2, name: "Loja Norte", address: "Av. Norte, 456 - Bairro Norte" },
  { id: 3, name: "Loja Sul", address: "Rua Sul, 789 - Bairro Sul" },
];

interface LocationSelectorProps {
  selectedLocation?: number;
  onSelectLocation: (locationId: number) => void;
}

export const LocationSelector = ({
  selectedLocation,
  onSelectLocation
}: LocationSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Selecione o local de retirada:</h3>
      </div>
      
      <div className="grid gap-3">
        {pickupLocations.map((location) => (
          <Card 
            key={location.id}
            className={`cursor-pointer transition-all ${
              selectedLocation === location.id 
                ? 'border-primary ring-1 ring-primary' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSelectLocation(location.id)}
          >
            <CardContent className="p-4 flex items-start">
              <Building className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">{location.name}</h4>
                <p className="text-sm text-muted-foreground">{location.address}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
