
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
    { id: "scheduled", label: "Agendado", icon: Calendar, color: "bg-blue-500" },
    { id: "preparing", label: "Em Preparação", icon: Clock, color: "bg-yellow-500" },
    { id: "on-the-way", label: "A Caminho", icon: Truck, color: "bg-orange-500" },
    { id: "delivered", label: "Entregue", icon: CheckCircle, color: "bg-green-500" },
  ];

  // Find the current step index
  const currentStepIndex = steps.findIndex(step => step.id === status);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium text-gray-800">Status da Entrega</div>
        <div className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded-md">
          {scheduledDate.toLocaleDateString('pt-BR')} {estimatedDeliveryTime && `- ${estimatedDeliveryTime}`}
        </div>
      </div>

      <div className="relative mt-6">
        {/* Progress bar */}
        <div className="absolute top-5 left-0 right-0 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500 rounded-full transition-all duration-700 ease-in-out" 
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
                  w-12 h-12 rounded-full flex items-center justify-center 
                  z-10 transition-all duration-300
                  ${isCurrentStep 
                    ? `${step.color} text-white scale-110 shadow-md` 
                    : isActive 
                      ? `${step.color} text-white` 
                      : 'bg-gray-100 text-gray-400'
                  }
                `}>
                  <StepIcon className={`h-6 w-6 ${isCurrentStep ? 'animate-pulse' : ''}`} />
                </div>
                <div className={`
                  text-xs mt-2 text-center max-w-[80px] transition-colors duration-300
                  ${isCurrentStep ? `text-${step.color.replace('bg-', '')} font-bold` : isActive ? `text-${step.color.replace('bg-', '')} font-medium` : 'text-gray-500'}
                `}>
                  {step.label}
                </div>
                
                {/* Current status indicator */}
                {isCurrentStep && (
                  <div className="mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 animate-pulse-soft">
                    Atual
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Status message */}
      <div className="mt-6 text-center text-sm">
        {status === "scheduled" && (
          <p className="text-blue-600">Seu pedido está agendado e será preparado na data programada.</p>
        )}
        {status === "preparing" && (
          <p className="text-yellow-600">Seu pedido está sendo preparado com todo cuidado.</p>
        )}
        {status === "on-the-way" && (
          <p className="text-orange-600">Seu pedido está a caminho e chegará em breve!</p>
        )}
        {status === "delivered" && (
          <p className="text-green-600">Seu pedido foi entregue. Bom apetite!</p>
        )}
      </div>
    </div>
  );
};
