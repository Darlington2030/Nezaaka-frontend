import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    positive: boolean;
  };
  iconColor?: string;
}

const StatCard = ({ title, value, icon: Icon, change, iconColor = "text-primary" }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p
              className={`text-sm font-medium ${
                change.positive ? "text-success" : "text-destructive"
              }`}
            >
              {change.positive ? "+" : ""}
              {change.value}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-secondary ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
