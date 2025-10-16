import { CircleDashedIcon } from "lucide-react";
import { MetricCard } from "./metric-card";
import { usePendingProducts } from "../hooks/usePendingProducts";

export function PendingProductsCard() {
  const { data: pendingProducts, isLoading, error } = usePendingProducts();

  return (
    <MetricCard
      title="Pending Products"
      value={pendingProducts?.data.length}
      icon={<CircleDashedIcon size={20} />}
      isLoading={isLoading}
      label="Products waiting for approval"
      error={error?.error}
    />
  );
}
