
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface ScheduleDeliveryProps {
  onSchedule: (date: Date, time: string, note: string) => void;
  isButtonDisabled?: boolean;
  minimumQuantity?: number;
  currentQuantity?: number;
}

export const ScheduleDelivery = ({
  onSchedule,
  isButtonDisabled = false,
  minimumQuantity = 100,
  currentQuantity = 0,
}: ScheduleDeliveryProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleScheduleClick = () => {
    if (currentQuantity < minimumQuantity) {
      toast({
        title: "Quantidade mínima não atingida",
        description: `É necessário ao menos ${minimumQuantity} unidades para agendar entrega.`,
        variant: "destructive",
      });
      return;
    }
    setIsOpen(true);
  };

  const handleSubmit = () => {
    if (!date) {
      toast({
        title: "Selecione uma data",
        description: "É necessário selecionar uma data para o agendamento.",
        variant: "destructive",
      });
      return;
    }

    if (!time) {
      toast({
        title: "Selecione um horário",
        description: "É necessário selecionar um horário para o agendamento.",
        variant: "destructive",
      });
      return;
    }

    if (date && time) {
      onSchedule(date, time, note);
      setIsOpen(false);
      toast({
        title: "Agendamento confirmado",
        description: `Sua entrega está agendada para ${date.toLocaleDateString()} às ${time}.`,
      });
    }
  };

  // Generate available times (9AM to 6PM in 1-hour increments)
  const availableTimes = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00`;
  });

  // Calculate the minimum date (next day)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  // Calculate the maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  // Disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleScheduleClick}
          className="w-full mt-4"
          disabled={isButtonDisabled}
          variant="outline"
        >
          <Clock className="mr-2 h-5 w-5" />
          Agendar Entrega
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar Entrega</DialogTitle>
          <DialogDescription>
            Escolha a data e o horário para receber seu pedido.
            Disponibilizamos entrega em até 30 dias, de segunda a sexta.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Selecione a data:</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => 
                date < minDate || 
                date > maxDate || 
                isWeekend(date)
              }
              className="rounded-md border pointer-events-auto"
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Selecione o horário:</label>
            <Select onValueChange={setTime} value={time}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um horário" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Observações (opcional):</label>
            <textarea
              className="min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              placeholder="Instruções adicionais para entrega..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Confirmar Agendamento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
