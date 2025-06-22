import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, CheckCircle, Users, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardsProps {
  stats: {
    yetToAttend: number;
    attending: number;
    attended: number;
    total: number;
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const statItems = [
    {
      label: "Urgent",
      value: stats.yetToAttend,
      icon: AlertTriangle,
      color: "red",
      trend: stats.yetToAttend > 0 ? "up" : "stable",
      description: "Yet to attend"
    },
    {
      label: "Active",
      value: stats.attending,
      icon: Clock,
      color: "yellow",
      trend: "stable",
      description: "In progress"
    },
    {
      label: "Resolved",
      value: stats.attended,
      icon: CheckCircle,
      color: "green",
      trend: "up",
      description: "Completed"
    },
    {
      label: "Total",
      value: stats.total,
      icon: Users,
      color: "blue",
      trend: "stable",
      description: "Today's total"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-700",
          icon: "text-red-500",
          badge: "bg-red-100 text-red-700"
        };
      case "yellow":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-700",
          icon: "text-yellow-500",
          badge: "bg-yellow-100 text-yellow-700"
        };
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          icon: "text-green-500",
          badge: "bg-green-100 text-green-700"
        };
      case "blue":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          icon: "text-blue-500",
          badge: "bg-blue-100 text-blue-700"
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-700",
          icon: "text-gray-500",
          badge: "bg-gray-100 text-gray-700"
        };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {statItems.map((item, index) => {
        const colors = getColorClasses(item.color);
        const IconComponent = item.icon;
        
        return (
          <Card 
            key={index} 
            className={`${colors.bg} ${colors.border} border shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                  {item.label}
                </div>
                <IconComponent className={`h-5 w-5 ${colors.icon}`} />
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                </div>
                {getTrendIcon(item.trend)}
              </div>
              
              {item.color === "red" && item.value > 0 && (
                <div className="mt-2">
                  <div className="h-1 bg-red-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full animate-pulse"
                      style={{ width: `${Math.min((item.value / Math.max(stats.total, 1)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
