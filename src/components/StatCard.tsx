import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger";
  subtitle?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const variantStyles = {
  default: "from-primary to-primary/80",
  success: "from-success to-success/80",
  warning: "from-warning to-warning/80",
  danger: "from-destructive to-destructive/80",
};

export const StatCard = ({
  title,
  value,
  icon: Icon,
  variant = "default",
  subtitle,
  onClick,
  isActive,
}: StatCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg cursor-pointer",
        isActive && "ring-2 ring-primary shadow-lg scale-[1.02]"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div
            className={cn(
              "rounded-lg p-3 bg-gradient-to-br",
              variantStyles[variant]
            )}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
