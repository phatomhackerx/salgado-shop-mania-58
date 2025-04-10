
import { Clock, CheckCircle, Truck, Calendar } from "lucide-react";

type StatusType = "scheduled" | "preparing" | "on-the-way" | "delivered";

type ScheduleStatusProps = {
  status: StatusType;
  scheduledDate: Date;
  estimatedDeliveryTime?: string;
};

export const ScheduleStatus = ({ 
  status, 
  scheduledDate,
  estimatedDeliveryTime
}: ScheduleStatusProps) => {
  const steps = [
    { id: "scheduled", label: "Agendado", icon: Calendar },
    { id: "preparing", label: "Em Preparação", icon: Clock },
    { id: "on-the-way", label: "A Caminho", icon: Truck },
    { id: "delivered", label: "Entregue", icon: CheckCircle },
  ];

  // Find the current step index
  const currentStepIndex = steps.findIndex(step => step.id === status);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Status da Entrega</div>
        <div className="text-sm text-muted-foreground">
          {scheduledDate.toLocaleDateString('pt-BR')} {estimatedDeliveryTime && `- ${estimatedDeliveryTime}`}
        </div>
      </div>

      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-700 ease-in-out" 
            style={{ 
              width: `${currentStepIndex === 0 ? 5 : 
                      currentStepIndex === 1 ? 33 : 
                      currentStepIndex === 2 ? 66 : 
                      100}%` 
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index <= currentStepIndex;
            const isCurrentStep = index === currentStepIndex;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center 
                  z-10 transition-all duration-300
                  ${isCurrentStep 
                    ? 'bg-primary text-white scale-110 shadow-md' 
                    : isActive 
                      ? 'bg-primary/90 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }
                `}>
                  <StepIcon className={`h-5 w-5 ${isCurrentStep ? 'animate-pulse' : ''}`} />
                </div>
                <div className={`
                  text-xs mt-2 text-center max-w-[80px] transition-colors duration-300
                  ${isCurrentStep ? 'text-primary font-bold' : isActive ? 'text-primary font-medium' : 'text-gray-500'}
                `}>
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
