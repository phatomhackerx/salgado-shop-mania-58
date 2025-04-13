
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Building, Calendar as CalendarIcon, Clock, Info, MapPin } from "lucide-react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

// Define locations for pickup
export const pickupLocations = [
  { id: 1, name: "Loja Centro", address: "Rua Principal, 123 - Centro" },
  { id: 2, name: "Loja Norte", address: "Av. Norte, 456 - Bairro Norte" },
  { id: 3, name: "Loja Sul", address: "Rua Sul, 789 - Bairro Sul" },
];

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
    // Validation for each step
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

  // Disable weekends for delivery, but allow for pickup
  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    
    if (scheduleType === "delivery") {
      return date < minDate || date > maxDate || isWeekend;
    }
    
    // For pickup, allow weekends but still respect min and max dates
    return date < minDate || date > maxDate;
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
          {/* Step 1: Select Delivery Type and Date/Location */}
          {step === 1 && (
            <div className="space-y-4">
              {allowPickup && allowDelivery && (
                <Tabs 
                  defaultValue={defaultType} 
                  value={scheduleType} 
                  onValueChange={(value) => setScheduleType(value as "delivery" | "pickup")}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="delivery">Entrega</TabsTrigger>
                    <TabsTrigger value="pickup">Retirada</TabsTrigger>
                  </TabsList>
                  <TabsContent value="delivery" className="pt-4">
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
                        disabled={isDateDisabled}
                        className="rounded-md border mx-auto"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="pickup" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Selecione o local de retirada:</h3>
                      </div>
                      
                      <div className="grid gap-3">
                        {pickupLocations.map((location) => (
                          <Card 
                            key={location.id}
                            className={`cursor-pointer transition-all ${
                              pickupLocation === location.id 
                                ? 'border-primary ring-1 ring-primary' 
                                : 'hover:border-primary/50'
                            }`}
                            onClick={() => setPickupLocation(location.id)}
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
                      
                      {pickupLocation && (
                        <div className="pt-4 space-y-3">
                          <h3 className="text-sm font-medium">Selecione a data:</h3>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < minDate || date > maxDate}
                            className="rounded-md border mx-auto"
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
              
              {!allowPickup && allowDelivery && (
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
                      (date.getDay() === 0 || date.getDay() === 6)
                    }
                    className="rounded-md border mx-auto"
                  />
                </div>
              )}
              
              {allowPickup && !allowDelivery && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Selecione o local de retirada:</h3>
                  </div>
                  
                  <div className="grid gap-3">
                    {pickupLocations.map((location) => (
                      <Card 
                        key={location.id}
                        className={`cursor-pointer transition-all ${
                          pickupLocation === location.id 
                            ? 'border-primary ring-1 ring-primary' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setPickupLocation(location.id)}
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
                  
                  {pickupLocation && (
                    <div className="pt-4 space-y-3">
                      <h3 className="text-sm font-medium">Selecione a data:</h3>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < minDate || date > maxDate}
                        className="rounded-md border mx-auto"
                      />
                    </div>
                  )}
                </div>
              )}
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
                    <span className="font-medium">{currentQuantity} unidades</span>
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
