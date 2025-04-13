
interface TimeSelectorProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
  availableTimes?: string[];
  unavailableTimes?: string[];
}

export const TimeSelector = ({
  selectedTime,
  onSelectTime,
  unavailableTimes = ["11:30", "13:00", "15:30"],
}: TimeSelectorProps) => {
  // Generate available times (9AM to 6PM in 30-min increments)
  const generateAvailableTimes = () => {
    const times = [];
    for (let i = 9; i <= 18; i++) {
      times.push(`${i}:00`);
      if (i < 18) times.push(`${i}:30`);
    }
    return times;
  };

  const availableTimes = generateAvailableTimes();

  // Check if time slot is available
  const isTimeSlotAvailable = (time: string) => {
    return !unavailableTimes.includes(time);
  };

  return (
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
                ${selectedTime === timeSlot ? 
                  'bg-primary border-primary text-primary-foreground' : 
                  isAvailable ? 
                    'hover:border-primary' : 
                    'opacity-50 cursor-not-allowed bg-muted'
                }
              `}
              disabled={!isAvailable}
              onClick={() => onSelectTime(timeSlot)}
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
  );
};
