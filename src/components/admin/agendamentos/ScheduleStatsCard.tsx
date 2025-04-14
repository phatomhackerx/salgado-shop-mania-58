
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ScheduleStatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
}

export const ScheduleStatsCard = ({ title, value, icon: Icon, iconColor }: ScheduleStatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <Icon className={`h-8 w-8 ${iconColor} mb-2`} />
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
};
