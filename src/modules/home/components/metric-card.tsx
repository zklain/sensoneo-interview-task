import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/card";
import { Skeleton } from "../../../components/skeleton";

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  isLoading?: boolean;
  label: string;
}
// todo: error state
// todo: loading skeleton
export function MetricCard({
  title,
  value,
  icon,
  isLoading,
  label,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">
            {title}
          </CardTitle>
          <div className="text-muted-foreground">{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <>
            <div className="text-3xl font-bold">{value.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
