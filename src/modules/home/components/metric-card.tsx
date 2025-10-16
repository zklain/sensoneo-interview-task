import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/card";
import { Skeleton } from "../../../components/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../../../components/alert";
import { AlertCircle } from "lucide-react";

interface MetricCardProps {
  title: string;
  value?: number;
  icon: React.ReactNode;
  isLoading?: boolean;
  label: string;
  error?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  isLoading,
  label,
  error,
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
        {error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isLoading && (
          <>
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-5 w-32" />
          </>
        )}
        {value !== undefined && (
          <>
            <div className="text-3xl font-bold">{value.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
