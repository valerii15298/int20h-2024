import { useState } from "react";
import { Lot } from "./Lot";
import { trpc } from "./trpc";
import { LotSchema } from "./zodTypes";
import { Button } from "./components/ui/button";

function getDefaultLot(): LotSchema {
  return {
    name: "New lot",
    description: "Description",
    images: [],
    startPrice: 1,
    id: Math.random(), // for optimistic updates
  };
}

export function Lots() {
  const lotsQuery = trpc.lot.list.useQuery();
  const [creatingNew, setCreatingNew] = useState(false);

  return (
    <>
      {lotsQuery.isPending && <>Pending...</>}
      {lotsQuery.isError && <>{lotsQuery.error.message}</>}
      <div className="grid gap-2 mb-2">
        {lotsQuery.data?.map((lot) => <Lot key={lot.id} lot={lot} />)}
      </div>

      {creatingNew ? (
        <Lot
          createNewMode={{
            onCancel() {
              setCreatingNew(false);
            },
            onCreate() {
              setCreatingNew(false);
            },
          }}
          lot={getDefaultLot()}
        />
      ) : (
        <Button onClick={() => setCreatingNew(true)}>Create Lot</Button>
      )}
    </>
  );
}
