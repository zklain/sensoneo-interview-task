import { MilkIcon } from "lucide-react";
import { MetricCard } from "./metric-card";
import { useActiveProducts } from "../hooks/useActiveProducts";

export function ActiveProductsCard() {
  const { data: activeProducts, isLoading, error } = useActiveProducts();

  return (
    <MetricCard
      title="Active Products"
      value={activeProducts?.data.length}
      icon={<MilkIcon size={20} />}
      isLoading={isLoading}
      label="Active products in system"
      error={error?.error}
    />
  );
}
