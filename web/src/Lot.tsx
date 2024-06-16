import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { LotImages } from "@/LotImages";

import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { trpc } from "./trpc";
import type { LotSchema } from "./zodTypes";
import { lotSchema } from "./zodTypes";

export function Lot({
  lot,
  createNewMode,
}: {
  lot: LotSchema;
  createNewMode?: {
    onCreate: () => void;
    onCancel: () => void;
  };
}) {
  const utils = trpc.useUtils();
  const [mode, setMode] = useState<LotMode>(createNewMode ? "Create" : "View");

  const imagesFiles = useRef<FileList>();
  const createLot = trpc.lot.create.useMutation({
    onSuccess() {
      createNewMode?.onCreate();
      void utils.lot.list.invalidate();
    },
  });
  const updateLot = trpc.lot.update.useMutation({
    async onSuccess() {
      return utils.lot.list.invalidate();
    },
  });

  const deleteLot = trpc.lot.delete.useMutation({
    async onSuccess() {
      return utils.lot.list.invalidate();
    },
  });
  const submitMap = {
    Create: async ({ id: _id, ...lot }: LotSchema) => {
      lot.images = await Promise.all(
        [...(imagesFiles.current ?? [])].map(async (file) =>
          fetch("/upload", {
            body: file,
            method: "POST",
          }).then(async (res) => res.text()),
        ),
      );
      void createLot.mutateAsync(lot);
      setMode("View");
    },
    Update: async (lot: LotSchema) =>
      updateLot.mutateAsync(lot).then(() => {
        setMode("View");
      }),
  } as const;
  type LotMode = keyof typeof submitMap | "View";

  const isView = mode === "View";
  const { userId } = useAuth();
  const form = useForm<LotSchema>({
    resolver: zodResolver(lotSchema),
    values: lot,
  });

  const isPending =
    deleteLot.isPending ||
    createLot.isPending ||
    form.formState.isSubmitting ||
    !userId;
  const disabledFields = isView || isPending;
  return (
    <Form {...form}>
      {createNewMode && "Create Lot"}
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={isView ? undefined : form.handleSubmit(submitMap[mode])}
        className="w-full"
      >
        <Card className="flex  w-full">
          <div className="min-w-80 max-w-96 flex flex-col justify-between">
            <fieldset disabled={disabledFields}>
              <CardHeader>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) =>
                    isView ? (
                      <CardTitle>{field.value}</CardTitle>
                    ) : (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) =>
                    isView ? (
                      <CardDescription>{field.value}</CardDescription>
                    ) : (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }
                />
              </CardHeader>
              <CardContent className="grid gap-2">
                <FormField
                  control={form.control}
                  name="startPrice"
                  render={({ field }) =>
                    isView ? (
                      <FormLabel className="font-bold text-lg">
                        Price: ${field.value}
                      </FormLabel>
                    ) : (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Start Price"
                            onWheel={(ev) => {
                              (ev.target as HTMLInputElement).blur();
                            }}
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }
                />
                {!isView && (
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field: { value: _, ...field } }) => (
                      <FormItem>
                        <FormLabel className="w-full">
                          <Button
                            className="w-full"
                            onClick={(ev) => {
                              (
                                (ev.target as HTMLButtonElement)
                                  .parentNode as HTMLLabelElement
                              ).click();
                            }}
                          >
                            Choose Images
                          </Button>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            placeholder="images"
                            className="hidden"
                            {...field}
                            onChange={(ev) => {
                              const { files } = ev.target;
                              if (!files) return;
                              imagesFiles.current = files;
                              field.onChange(
                                [...files].map((file) =>
                                  URL.createObjectURL(file),
                                ),
                              );
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </fieldset>
            <CardFooter className="flex justify-evenly gap-2">
              {isView ? (
                <>
                  <Button
                    disabled={isPending}
                    className="w-full"
                    key="edit"
                    type="button"
                    onClick={() => {
                      setMode("Update");
                    }}
                    variant={"secondary"}
                  >
                    Edit
                  </Button>
                  <Button
                    className="w-full"
                    key="delete"
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      deleteLot.mutate(lot.id);
                    }}
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full"
                    key={mode}
                    disabled={isPending}
                    type="submit"
                  >
                    {mode}
                  </Button>
                  <Button
                    disabled={isPending}
                    className="w-full"
                    key={"cancel"}
                    type="button"
                    onClick={() => {
                      if (createNewMode) createNewMode.onCancel();
                      else {
                        setMode("View");
                        form.reset();
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </CardFooter>
          </div>
          <div className="relative overflow-auto w-full">
            <div className="h-0 min-h-full w-full">
              <LotImages control={form.control} />
            </div>
          </div>
        </Card>
      </form>
    </Form>
  );
}
