import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "./components/ui/button";
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
import { LotSchema, lotSchema } from "./zodTypes";
import { cn } from "@/lib/utils";
import { LotImages } from "@/LotImages";

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (result instanceof ArrayBuffer) {
        return resolve(arrayBufferToBase64(result));
      }
      resolve(result!);
    };
    reader.onerror = reject;
  });

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return window.btoa(binary);
}

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
  const createLot = trpc.lot.create.useMutation({
    onSuccess() {
      utils.lot.list.invalidate();
      createNewMode?.onCreate();
    },
  });
  const updateLot = trpc.lot.update.useMutation({
    onSuccess() {
      return utils.lot.list.invalidate();
    },
  });

  const deleteLot = trpc.lot.delete.useMutation({
    onSuccess() {
      return utils.lot.list.invalidate();
    },
  });
  const submitMap = {
    Create: ({ id: _, ...lot }: LotSchema) => {
      createLot.mutateAsync(lot);
      setMode("View");
    },
    Update: (lot: LotSchema) =>
      updateLot.mutateAsync(lot).then(() => setMode("View")),
  } as const;
  type LotMode = keyof typeof submitMap | "View";

  const [mode, setMode] = useState<LotMode>(createNewMode ? "Create" : "View");
  const isView = mode === "View";
  const utils = trpc.useUtils();
  const { userId } = useAuth();
  const form = useForm<LotSchema>({
    values: lot,
    resolver: zodResolver(lotSchema),
  });

  const isPending = deleteLot.isPending || createLot.isPending;
  const disabledFields = isView || isPending;
  return (
    <Form {...form}>
      {createNewMode && "Create Lot"}
      <form onSubmit={!isView ? form.handleSubmit(submitMap[mode]) : undefined}>
        <Card className="flex items-stretch h-[400px] w-fit">
          <div>
            <CardHeader>
              <FormField
                disabled={disabledFields}
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
                disabled={disabledFields}
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
                disabled={disabledFields}
                control={form.control}
                name="startPrice"
                render={({ field }) =>
                  isView ? (
                    <FormLabel>Price: ${field.value}</FormLabel>
                  ) : (
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
                  )
                }
              />
              <FormField
                disabled={disabledFields}
                control={form.control}
                name="images"
                render={({ field: { value, ...field } }) => (
                  <FormItem className="text-center">
                    <FormLabel className={cn(buttonVariants())}>
                      Choose Images
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        placeholder="images"
                        className="hidden"
                        {...field}
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files) return;
                          const images: string[] = [];
                          for (let i = 0; i < files.length; i++) {
                            images.push(await toBase64(files[i]!));
                          }
                          field.onChange(images);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex gap-2">
              {isView ? (
                <div className="flex w-full justify-evenly" key={"View"}>
                  <Button
                    type="button"
                    onClick={() => setMode("Update")}
                    variant={"secondary"}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    disabled={deleteLot.isPending}
                    onClick={() => deleteLot.mutate(lot.id)}
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div className="flex w-full justify-evenly">
                  <Button disabled={!userId} type="submit">
                    {mode}
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      createNewMode ? createNewMode.onCancel() : setMode("View")
                    }
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardFooter>
          </div>
          <LotImages control={form.control} />
        </Card>
      </form>
    </Form>
  );
}
