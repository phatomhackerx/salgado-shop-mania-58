
import { pickupLocations } from "./LocationSelector";
import { Card, CardContent } from "@/components/ui/card";

interface ScheduleSummaryProps {
  date?: Date;
  time: string;
  quantity: number;
  scheduleType: "delivery" | "pickup";
  pickupLocation?: number;
  note: string;
  onNoteChange: (note: string) => void;
}

export const ScheduleSummary = ({
  date,
  time,
  quantity,
  scheduleType,
  pickupLocation,
  note,
  onNoteChange,
}: ScheduleSummaryProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between pb-2 mb-2 border-b">
            <span className="text-muted-foreground">Tipo:</span>
            <span className="font-medium">
              {scheduleType === "pickup" ? "Retirada" : "Entrega"}
            </span>
          </div>
          
          {scheduleType === "pickup" && pickupLocation && (
            <div className="flex justify-between pb-2 mb-2 border-b">
              <span className="text-muted-foreground">Local:</span>
              <span className="font-medium">
                {pickupLocations.find(loc => loc.id === pickupLocation)?.name}
              </span>
            </div>
          )}
          
          <div className="flex justify-between pb-2 mb-2 border-b">
            <span className="text-muted-foreground">Data:</span>
            <span className="font-medium">{date?.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between pb-2 mb-2 border-b">
            <span className="text-muted-foreground">Horário:</span>
            <span className="font-medium">{time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantidade:</span>
            <span className="font-medium">{quantity} unidades</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Observações (opcional):</label>
        <textarea
          className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
          placeholder={scheduleType === "pickup" 
            ? "Instruções adicionais para retirada, contato alternativo..." 
            : "Instruções adicionais para entrega, ponto de referência, contato alternativo..."}
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
        />
      </div>
    </div>
  );
};
