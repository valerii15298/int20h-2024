import { useEffect, useState } from "react";
import type { Control } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { LotSchema } from "@/zodTypes";

export function LotImages({ control }: { control: Control<LotSchema> }) {
  const images = useWatch({ control, name: "images" });
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!api) return;
    api.rootNode().style.height = "100%";
  }, [api]);
  if (!images.length) {
    return null;
  }
  return (
    <Carousel className={`h-full w-full`} setApi={setApi}>
      <CarouselContent className="h-full">
        {images.map((src) => (
          <CarouselItem className="h-full max-w-fit" key={src}>
            <img className="h-full" src={src} />
          </CarouselItem>
        ))}
        <CarouselItem className="max-w-max mx-auto grid place-items-center">
          {
            // TODO add image feature
          }
          Add image
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-1 top-5" />
      <CarouselNext className="left-10 top-5" />
    </Carousel>
  );
}
