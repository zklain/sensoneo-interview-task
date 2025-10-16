import type { PropsWithChildren } from "react";

export function FormItem({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
