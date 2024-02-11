import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { trpc } from "./trpc";
import { lotInsertSchema } from "./zodTypes";
import { useAuth } from "@clerk/clerk-react";

export function Lots() {
  const lotsQuery = trpc.lot.list.useQuery();

  if (lotsQuery.isPending) return <>Pending...</>;
  if (lotsQuery.isError) return <>{lotsQuery.error.message}</>;
  return (
    <>
      <pre className="mb-5">{JSON.stringify(lotsQuery.data, null, 2)}</pre>
      <AddLot />
      <br />
    </>
  );
}

function getDefaultLot(): z.infer<typeof lotInsertSchema> {
  return {
    name: "",
    description: "",
    images: [],
    startPrice: 0,
    ownerId: "",
  };
}

export function AddLot() {
  const utils = trpc.useUtils();
  const { userId } = useAuth();
  const [adding, setAdding] = useState(false);
  const form = useForm<z.infer<typeof lotInsertSchema>>({
    defaultValues: getDefaultLot(),
    values: {
      ...getDefaultLot(),
      ownerId: userId!,
    },
    resolver: zodResolver(lotInsertSchema),
  });
  const createLot = trpc.lot.create.useMutation({
    onSuccess() {
      utils.lot.list.invalidate();
    },
  });

  return !adding ? (
    <Button onClick={() => setAdding(true)}>Create Lot</Button>
  ) : (
    <>
      <Form {...form}>
        Add Lot
        <form
          onSubmit={form.handleSubmit((newLot) => {
            console.log(newLot);
            createLot.mutateAsync(newLot);
          })}
        >
          <div className="gap-2 flex ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Start Price"
                      onWheel={(e) => (e.target as HTMLInputElement).blur()}
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 my-2">
            <Button disabled={!userId} type="submit">
              Save
            </Button>
            <Button onClick={() => setAdding(false)}>Cancel</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
