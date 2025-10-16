import { Building2Icon } from "lucide-react";
import { MetricCard } from "./metric-card";
import { useCompanies } from "../hooks/useCompanies";

export function CompaniesCard() {
  const { data: companies, isLoading, error } = useCompanies();

  return (
    <MetricCard
      title="Companies"
      value={companies?.total}
      icon={<Building2Icon size={20} />}
      isLoading={isLoading}
      label="Registered Companies"
      error={error?.error}
    />
  );
}
