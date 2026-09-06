import { ReactNode } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";

interface HydratedProps {
  queryKey: (string | number)[];
  queryFn: () => Promise<any>;
  children: ReactNode;
}

export default async function Hydrated({
  queryKey,
  queryFn,
  children,
}: HydratedProps) {
  const queryClient = getQueryClient();

  const data = await queryFn();

  if (data !== undefined) {
    queryClient.setQueryData(queryKey, data);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
