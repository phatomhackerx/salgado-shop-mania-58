
import { Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DateSelectorProps {
  date?: Date;
  onSelectDate: (date: Date | undefined) => void;
  isPickup?: boolean;
  disableDates?: (date: Date) => boolean;
  tooltipContent?: string;
}

export const DateSelector = ({
  date,
  onSelectDate,
  isPickup = false,
  disableDates,
  tooltipContent = "Entregas disponíveis apenas de segunda a sexta, nos próximos 30 dias."
}: DateSelectorProps) => {
  // Calculate the minimum date (next day)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  // Calculate the maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  // Disable dates function (if not provided)
  const defaultDisableDates = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    
    if (!isPickup) {
      return date < minDate || date > maxDate || isWeekend;
    }
    
    // For pickup, allow weekends but still respect min and max dates
    return date < minDate || date > maxDate;
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Selecione a data:</h3>
        {tooltipContent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSelectDate}
        disabled={disableDates || defaultDisableDates}
        className="rounded-md border mx-auto"
      />
    </div>
  );
};
