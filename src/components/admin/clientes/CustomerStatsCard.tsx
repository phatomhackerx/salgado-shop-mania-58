
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CustomerStatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
}

export const CustomerStatsCard = ({ title, value, icon: Icon, iconColor }: CustomerStatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-row items-center sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-0">
          <Icon className={`h-8 w-8 ${iconColor} sm:mb-2`} />
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-xl sm:text-2xl font-bold">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
