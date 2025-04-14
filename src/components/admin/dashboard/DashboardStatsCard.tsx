
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const DashboardStatsCard = ({ title, value, icon: Icon, color }: DashboardStatsCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-row items-center sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-0">
          <div className={`p-2 rounded-full ${color}`}>
            <Icon className="h-8 w-8 sm:mb-2" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-xl sm:text-2xl font-bold">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
