
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Clock, Info } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
  const [step, setStep] = useState(1); // 1: Select date, 2: Select time, 3: Add details

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
    setStep(1);
  };

  const handleNextStep = () => {
    if (step === 1 && !date) {
      toast({
        title: "Selecione uma data",
        description: "É necessário selecionar uma data para o agendamento.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !time) {
      toast({
        title: "Selecione um horário",
        description: "É necessário selecionar um horário para o agendamento.",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setIsOpen(false);
    }
  };

  const handleSubmit = () => {
    if (!date || !time) return;
    
    onSchedule(date, time, note);
    setIsOpen(false);
    toast({
      title: "Agendamento confirmado",
      description: `Sua entrega está agendada para ${date.toLocaleDateString()} às ${time}.`,
    });
  };

  // Generate available times (9AM to 6PM in 30-min increments)
  const availableTimes = [];
  for (let i = 9; i <= 18; i++) {
    availableTimes.push(`${i}:00`);
    if (i < 18) availableTimes.push(`${i}:30`);
  }

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

  // Check if time slot is available
  const isTimeSlotAvailable = (time: string) => {
    // In a real app, this would check against a database of booked slots
    // For demo purposes, let's make some slots "unavailable"
    const unavailableTimes = ["11:30", "13:00", "15:30"];
    return !unavailableTimes.includes(time);
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agendar Entrega</DialogTitle>
          <DialogDescription>
            {step === 1 && "Selecione a data da entrega. Disponível em dias úteis."}
            {step === 2 && "Escolha o melhor horário para receber seu pedido."}
            {step === 3 && "Adicione detalhes para a entrega."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Step 1: Select Date */}
          {step === 1 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Selecione a data:</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Entregas disponíveis apenas de segunda a sexta, nos próximos 30 dias.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => 
                  date < minDate || 
                  date > maxDate || 
                  isWeekend(date)
                }
                className="rounded-md border mx-auto"
              />
            </div>
          )}
          
          {/* Step 2: Select Time */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Selecione o horário:</h3>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((timeSlot) => {
                  const isAvailable = isTimeSlotAvailable(timeSlot);
                  return (
                    <button
                      key={timeSlot}
                      className={`
                        p-3 text-sm border rounded-md text-center transition-colors
                        ${time === timeSlot ? 
                          'bg-primary border-primary text-primary-foreground' : 
                          isAvailable ? 
                            'hover:border-primary' : 
                            'opacity-50 cursor-not-allowed bg-muted'
                        }
                      `}
                      disabled={!isAvailable}
                      onClick={() => setTime(timeSlot)}
                    >
                      {timeSlot}
                    </button>
                  );
                })}
              </div>
              <div className="text-xs text-muted-foreground text-center mt-2">
                Os horários em cinza não estão disponíveis para agendamento.
              </div>
            </div>
          )}
          
          {/* Step 3: Additional Details */}
          {step === 3 && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
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
                    <span className="font-medium">{currentQuantity} unidades</span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Observações (opcional):</label>
                <textarea
                  className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  placeholder="Instruções adicionais para entrega, ponto de referência, contato alternativo..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <DialogFooter className="flex space-x-2 justify-between sm:justify-between">
          <Button variant="outline" onClick={handlePrevStep}>
            {step === 1 ? "Cancelar" : "Voltar"}
          </Button>
          <Button onClick={handleNextStep}>
            {step < 3 ? "Continuar" : "Confirmar Agendamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
