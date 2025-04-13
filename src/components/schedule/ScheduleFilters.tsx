
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

export const scheduleStatuses = [
  { id: "scheduled", label: "Agendado" },
  { id: "preparing", label: "Em Preparação" },
  { id: "on-the-way", label: "A Caminho" },
  { id: "delivered", label: "Entregue" },
  { id: "ready", label: "Pronto para Retirada" },
];

export const scheduleTypes = [
  { id: "delivery", label: "Entregas" },
  { id: "pickup", label: "Retiradas" },
];

interface ScheduleFiltersProps {
  selectedStatus: string[];
  selectedType: string[];
  onStatusToggle: (status: string) => void;
  onTypeToggle: (type: string) => void;
}

export const ScheduleFilters = ({
  selectedStatus,
  selectedType,
  onStatusToggle,
  onTypeToggle,
}: ScheduleFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center"
      >
        <Filter className="mr-2 h-4 w-4" />
        Filtrar
      </Button>
      
      <Collapsible
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        className="mt-4"
      >
        <CollapsibleContent className="bg-muted/50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2 font-medium">Filtrar por Status</div>
              <div className="flex flex-wrap gap-4">
                {scheduleStatuses.map(status => (
                  <div key={status.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={status.id} 
                      checked={selectedStatus.includes(status.id)}
                      onCheckedChange={() => onStatusToggle(status.id)}
                    />
                    <label 
                      htmlFor={status.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {status.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="mb-2 font-medium">Filtrar por Tipo</div>
              <div className="flex flex-wrap gap-4">
                {scheduleTypes.map(type => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={type.id} 
                      checked={selectedType.includes(type.id)}
                      onCheckedChange={() => onTypeToggle(type.id)}
                    />
                    <label 
                      htmlFor={type.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
