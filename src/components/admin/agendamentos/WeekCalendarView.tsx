
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CalendarDay {
  dayName: string;
  dayNumber: number;
  month: string;
  fullDate: string;
}

interface ScheduleItem {
  id: number;
  customer: string;
  date: string;
  time: string;
}

interface WeekCalendarViewProps {
  upcomingDays: CalendarDay[];
  scheduledItems: ScheduleItem[];
}

export const WeekCalendarView = ({ upcomingDays, scheduledItems }: WeekCalendarViewProps) => {
  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg">Visão da Semana</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 justify-between">
          {upcomingDays.map((day, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center p-4 rounded-lg border ${index === 0 ? 'bg-primary/10 border-primary' : ''}`}
              style={{ minWidth: '120px' }}
            >
              <span className="text-sm font-medium text-gray-500">{day.dayName}</span>
              <span className="text-3xl font-bold mt-1">{day.dayNumber}</span>
              <span className="text-sm text-gray-500">{day.month}</span>
              
              <div className="mt-3 w-full">
                {scheduledItems
                  .filter(item => item.date === day.fullDate)
                  .slice(0, 2)
                  .map((item, idx) => (
                    <div key={idx} className="text-xs p-1.5 mt-1 bg-gray-100 rounded text-center truncate">
                      {item.time} - {item.customer.split(' ')[0]}
                    </div>
                  ))}
                
                {scheduledItems.filter(item => item.date === day.fullDate).length > 2 && (
                  <div className="text-xs text-center mt-1 text-primary">
                    + {scheduledItems.filter(item => item.date === day.fullDate).length - 2} mais
                  </div>
                )}
                
                {scheduledItems.filter(item => item.date === day.fullDate).length === 0 && (
                  <div className="text-xs text-center mt-2 text-gray-400">
                    Sem agendamentos
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
