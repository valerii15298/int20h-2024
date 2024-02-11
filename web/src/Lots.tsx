import { trpc } from "./trpc";

export function Lots() {
  const lotsQuery = trpc.lot.list.useQuery();
  if (lotsQuery.isPending) return <>Pending...</>;
  if (lotsQuery.isError) return <>{lotsQuery.error.message}</>;
  return <pre>{JSON.stringify(lotsQuery.data, null, 2)}</pre>;
}
