import { UsersIcon } from "lucide-react";
import { MetricCard } from "./metric-card";
import { useUsers } from "../hooks/useUsers";

export function UsersCard() {
  const { data: users, isLoading, error } = useUsers();

  return (
    <MetricCard
      title="Users"
      value={users?.total}
      icon={<UsersIcon size={20} />}
      isLoading={isLoading}
      label="Registered users"
      error={error?.error}
    />
  );
}
