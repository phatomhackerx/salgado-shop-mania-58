
import { Clock } from "lucide-react";
import { ScheduleCore, type ScheduleCoreProps } from "@/components/ScheduleCore";

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
  const handleSchedule: ScheduleCoreProps['onSchedule'] = (date, time, note) => {
    onSchedule(date, time, note);
  };

  return (
    <ScheduleCore
      onSchedule={handleSchedule}
      isButtonDisabled={isButtonDisabled}
      minimumQuantity={minimumQuantity}
      currentQuantity={currentQuantity}
      buttonText="Agendar Entrega"
      buttonIcon={<Clock className="mr-2 h-5 w-5" />}
      allowPickup={false}
      allowDelivery={true}
      defaultType="delivery"
    />
  );
};
