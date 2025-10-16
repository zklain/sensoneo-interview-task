import { Package } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { Overview } from "./overview";

export function HomePage() {
  return (
    <div>
      <PageHeader
        title="Deposit management dashboard"
        description="Welcome to your deposit management system. Monitor and manage your products, companies, and users."
        icon={<Package size={28} />}
      />
      <div className="flex flex-col gap-6">
        <Overview />
      </div>
    </div>
  );
}
