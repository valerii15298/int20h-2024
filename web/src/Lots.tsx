import { useState } from "react";

import { Button } from "./components/ui/button";
import { Lot } from "./Lot";
import { trpc } from "./trpc";
import type { LotSchema } from "./zodTypes";

function getDefaultLot(): LotSchema {
  return {
    description: "Description",
    id: Math.random(), // for optimistic updates
    images: [],
    name: "New lot",
    startPrice: 1,
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
        <Button
          onClick={() => {
            setCreatingNew(true);
          }}
        >
          Create Lot
        </Button>
      )}
    </>
  );
}
