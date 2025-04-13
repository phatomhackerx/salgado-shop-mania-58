import { useState } from "react";
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
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

import { LocationSelector } from "./schedule/LocationSelector";
import { DateSelector } from "./schedule/DateSelector";
import { TimeSelector } from "./schedule/TimeSelector";
import { ScheduleSummary } from "./schedule/ScheduleSummary";
import { DeliveryPickupTabs } from "./schedule/DeliveryPickupTabs";

export { pickupLocations } from "./schedule/LocationSelector";

export interface ScheduleCoreProps {
  onSchedule: (date: Date, time: string, note: string, location?: number, isPickup?: boolean) => void;
  isButtonDisabled?: boolean;
  minimumQuantity?: number;
  currentQuantity?: number;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  allowPickup?: boolean;
  allowDelivery?: boolean;
  defaultType?: "delivery" | "pickup";
}

export const ScheduleCore = ({
  onSchedule,
  isButtonDisabled = false,
  minimumQuantity = 100,
  currentQuantity = 0,
  buttonText = "Agendar Entrega",
  buttonIcon = <Clock className="mr-2 h-5 w-5" />,
  allowPickup = false,
  allowDelivery = true,
  defaultType = "delivery",
}: ScheduleCoreProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [scheduleType, setScheduleType] = useState<"delivery" | "pickup">(defaultType);
  const [pickupLocation, setPickupLocation] = useState<number | undefined>(undefined);

  const handleScheduleClick = () => {
    if (currentQuantity < minimumQuantity) {
      toast({
        title: "Quantidade mínima não atingida",
        description: `É necessário ao menos ${minimumQuantity} unidades para agendar.`,
        variant: "destructive",
      });
      return;
    }
    setIsOpen(true);
    setStep(1);
  };

  const handleNextStep = () => {
    if (step === 1 && scheduleType === "delivery" && !date) {
      toast({
        title: "Selecione uma data",
        description: "É necessário selecionar uma data para o agendamento.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 1 && scheduleType === "pickup" && !pickupLocation) {
      toast({
        title: "Selecione um local",
        description: "É necessário selecionar um local para retirada.",
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
    if (scheduleType === "delivery" && (!date || !time)) return;
    if (scheduleType === "pickup" && (!pickupLocation || !date || !time)) return;
    
    onSchedule(
      date || new Date(), 
      time, 
      note, 
      pickupLocation,
      scheduleType === "pickup"
    );
    
    setIsOpen(false);
    
    const locationName = pickupLocation 
      ? pickupLocations.find(loc => loc.id === pickupLocation)?.name 
      : '';
    
    if (scheduleType === "pickup") {
      toast({
        title: "Agendamento de retirada confirmado",
        description: `Sua retirada está agendada para ${date?.toLocaleDateString()} às ${time} na loja ${locationName}.`,
      });
    } else {
      toast({
        title: "Agendamento de entrega confirmado",
        description: `Sua entrega está agendada para ${date?.toLocaleDateString()} às ${time}.`,
      });
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    
    if (scheduleType === "delivery") {
      return date < minDate || date > maxDate || isWeekend;
    }
    
    return date < minDate || date > maxDate;
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return renderStepOne();
      case 2:
        return (
          <TimeSelector
            selectedTime={time}
            onSelectTime={setTime}
          />
        );
      case 3:
        return (
          <ScheduleSummary
            date={date}
            time={time}
            quantity={currentQuantity}
            scheduleType={scheduleType}
            pickupLocation={pickupLocation}
            note={note}
            onNoteChange={setNote}
          />
        );
      default:
        return null;
    }
  };

  const renderStepOne = () => {
    if (allowPickup && allowDelivery) {
      return (
        <DeliveryPickupTabs
          value={scheduleType}
          onChange={setScheduleType}
        >
          <TabsContent value="delivery" className="pt-4">
            <DateSelector
              date={date}
              onSelectDate={setDate}
              disableDates={isDateDisabled}
              tooltipContent="Entregas disponíveis apenas de segunda a sexta, nos próximos 30 dias."
            />
          </TabsContent>
          
          <TabsContent value="pickup" className="pt-4">
            <div className="space-y-4">
              <LocationSelector
                selectedLocation={pickupLocation}
                onSelectLocation={setPickupLocation}
              />
              
              {pickupLocation && (
                <div className="pt-4">
                  <DateSelector
                    date={date}
                    onSelectDate={setDate}
                    isPickup={true}
                    disableDates={(date) => date < minDate || date > maxDate}
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </DeliveryPickupTabs>
      );
    }
    
    if (!allowPickup && allowDelivery) {
      return (
        <DateSelector
          date={date}
          onSelectDate={setDate}
          disableDates={(date) => 
            date < minDate || 
            date > maxDate || 
            (date.getDay() === 0 || date.getDay() === 6)
          }
        />
      );
    }
    
    if (allowPickup && !allowDelivery) {
      return (
        <div className="space-y-4">
          <LocationSelector
            selectedLocation={pickupLocation}
            onSelectLocation={setPickupLocation}
          />
          
          {pickupLocation && (
            <div className="pt-4">
              <DateSelector
                date={date}
                onSelectDate={setDate}
                isPickup={true}
                disableDates={(date) => date < minDate || date > maxDate}
              />
            </div>
          )}
        </div>
      );
    }

    return null;
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
          {buttonIcon}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {allowPickup && allowDelivery 
              ? "Agendar Entrega ou Retirada" 
              : scheduleType === "pickup" 
                ? "Agendar Retirada" 
                : "Agendar Entrega"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && (allowPickup && allowDelivery 
              ? "Escolha como deseja receber seu pedido." 
              : scheduleType === "pickup" 
                ? "Escolha onde deseja retirar seu pedido." 
                : "Selecione a data da entrega. Disponível em dias úteis.")}
            {step === 2 && "Escolha o melhor horário para receber seu pedido."}
            {step === 3 && "Adicione detalhes para finalizar o agendamento."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {renderStepContent()}
        </div>
        
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
