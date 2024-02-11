import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function LotImages({ images }: { images: string[] }) {
  if (!images.length) {
    return null;
  }
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((src, idx) => (
          <CarouselItem key={idx}>
            <img src={src} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3" />
      <CarouselNext className="right-3" />
    </Carousel>
  );
}
