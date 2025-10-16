import { PendingProductsCard } from "./components/pending-products-card";
import { CompaniesCard } from "./components/companies-card";
import { UsersCard } from "./components/users-card";
import { ActiveProductsCard } from "./components/active-products-card";

export function Overview() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ActiveProductsCard />
      <PendingProductsCard />
      <CompaniesCard />
      <UsersCard />
    </div>
  );
}
