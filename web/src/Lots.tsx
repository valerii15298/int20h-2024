import { useState } from "react";
import { trpc } from "./trpc";

export function Lots() {
  const lotsQuery = trpc.lot.list.useQuery();
  if (lotsQuery.isPending) return <>Pending...</>;
  if (lotsQuery.isError) return <>{lotsQuery.error.message}</>;
  return (
    <>
      <pre>{JSON.stringify(lotsQuery.data, null, 2)}</pre>
    </>
  );
}

export function AddLot() {
  const [adding, setAdding] = useState(false);
  return !adding ? (
    <button onClick={() => setAdding(true)}>Create Lot</button>
  ) : (
    <form></form>
  );
}
