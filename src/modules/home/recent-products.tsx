import type {
  Product,
  ApiSuccessResponse,
  ApiErrorResponse,
} from "../../lib/api";
import { fetchProducts } from "../../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/card";
import { useQuery } from "@tanstack/react-query";

function ProductItem({
  name,
  volume,
  deposit,
  packaging,
  registeredAt,
}: Product) {
  const formattedDate = new Date(registeredAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedDeposit = (deposit / 100).toFixed(2);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-base">{name}</p>
        <div className="text-sm text-muted-foreground flex flex-row gap-1">
          <span>{volume}ml</span>
          <span> • </span>
          <span>${formattedDeposit} deposit</span>
          <span> • </span>
          <span>{packaging}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground ">{formattedDate}</div>
    </div>
  );
}

function ProductItemSkeleton() {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-2">
        <div className="h-5 w-48 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded" />
      </div>
      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
    </div>
  );
}

export function RecentProducts() {
  const { data, isLoading } = useQuery<
    ApiSuccessResponse<Product[]>,
    ApiErrorResponse
  >({
    queryKey: ["recent-products"],
    queryFn: () =>
      fetchProducts({ limit: 5, sort: "registeredAt", order: "desc" }),
  });

  return (
    <section className="w-full">
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl pb-0">Recent products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 pt-6">
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <ProductItemSkeleton key={i} />
                ))}
              </>
            ) : (
              data?.data.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
