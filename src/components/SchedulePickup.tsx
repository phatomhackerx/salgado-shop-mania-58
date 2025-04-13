
import { Clock } from "lucide-react";
import { ScheduleCore, type ScheduleCoreProps } from "@/components/ScheduleCore";

interface SchedulePickupProps {
  onSchedule: (date: Date, time: string, note: string, location?: number, isPickup?: boolean) => void;
  isButtonDisabled?: boolean;
  minimumQuantity?: number;
  currentQuantity?: number;
}

export const SchedulePickup = ({
  onSchedule,
  isButtonDisabled = false,
  minimumQuantity = 10,
  currentQuantity = 0,
}: SchedulePickupProps) => {
  return (
    <ScheduleCore
      onSchedule={onSchedule}
      isButtonDisabled={isButtonDisabled}
      minimumQuantity={minimumQuantity}
      currentQuantity={currentQuantity}
      buttonText="Agendar Entrega/Retirada"
      buttonIcon={<Clock className="mr-2 h-5 w-5" />}
      allowPickup={true}
      allowDelivery={true}
      defaultType="delivery"
    />
  );
};
