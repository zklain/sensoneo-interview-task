import { useQuery } from "@tanstack/react-query";
import {
  Building2Icon,
  CircleDashedIcon,
  MilkIcon,
  UsersIcon,
} from "lucide-react";

import { fetchCompanies, fetchProducts, fetchUsers } from "../../lib/api";
import { MetricCard } from "./components/metric-card";

export function Overview() {
  const { data: activeProductsData, isLoading: isLoadingActiveProducts } =
    useQuery({
      queryKey: ["products", { active: true }],
      queryFn: () => fetchProducts({ active: true }),
    });

  const { data: pendingProductsData, isLoading: isLoadingPendingProducts } =
    useQuery({
      queryKey: ["products", { active: false }],
      queryFn: () => fetchProducts({ active: false }),
    });

  const { data: companiesData, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const activeProducts = activeProductsData?.data.length ?? 0;
  const pendingProducts = pendingProductsData?.data.length ?? 0;
  const totalCompanies = companiesData?.total ?? 0;
  const totalUsers = usersData?.total ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Active Products"
        value={activeProducts}
        icon={<MilkIcon size={20} />}
        isLoading={isLoadingActiveProducts}
        label="Active products in system"
      />
      <MetricCard
        title="Pending Products"
        value={pendingProducts}
        icon={<CircleDashedIcon size={20} />}
        isLoading={isLoadingPendingProducts}
        label="Products waiting for approval"
      />
      <MetricCard
        title="Companies"
        value={totalCompanies}
        icon={<Building2Icon size={20} />}
        isLoading={isLoadingCompanies}
        label="Registered Companies"
      />
      <MetricCard
        title="Users"
        value={totalUsers}
        icon={<UsersIcon size={20} />}
        isLoading={isLoadingUsers}
        label="Registered users"
      />
    </div>
  );
}
