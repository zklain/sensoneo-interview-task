import { useState } from "react";
import { Milk } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { DataTable } from "./data-table";
import { useProducts } from "./hooks/useProducts";
import { Alert, AlertDescription } from "../../components/alert";

export function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>(
    undefined,
  );

  const { data, isLoading, error } = useProducts(
    activeFilter !== undefined ? { active: activeFilter } : undefined,
  );

  return (
    <div>
      <PageHeader
        title="Registered products"
        description="View and manage your registered products."
        icon={<Milk size={28} />}
      />

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load products: {error.error}
          </AlertDescription>
        </Alert>
      )}

      {data?.data && (
        <DataTable
          data={data.data}
          activeFilter={activeFilter}
          onActiveFilterChange={setActiveFilter}
        />
      )}
    </div>
  );
}
