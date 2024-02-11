import { trpc } from "./trpc";
import { LotSchema } from "./zodTypes";
import { CreateLot } from "./CreateLot";
import { Button } from "./components/ui/button";

export function Lot(lot: LotSchema) {
  return (
    <pre>
      {JSON.stringify(lot, null, 2)}
      <Button variant={"destructive"}>Delete</Button>
    </pre>
  );
}

export function Lots() {
  const lotsQuery = trpc.lot.list.useQuery();

  if (lotsQuery.isPending) return <>Pending...</>;
  if (lotsQuery.isError) return <>{lotsQuery.error.message}</>;
  return (
    <>
      {lotsQuery.data.map((lot) => (
        <Lot key={lot.id} {...lot} />
      ))}
      <CreateLot />
      <br />
    </>
  );
}
