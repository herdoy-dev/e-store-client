import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@radix-ui/themes";

const Reviews = () => (
  <section id="reviews" className="py-16 bg-gray-100">
    <Container className="px-2">
      <h3 className="text-2xl font-semibold mb-8 text-center">
        What Our Customers Say
      </h3>
      <Carousel className="w-full">
        <CarouselContent>
          {[
            "Excellent quality!",
            "Amazing support!",
            "Would buy again!",
            "Would buy again!",
          ].map((review, i) => (
            <CarouselItem
              key={i}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground">“{review}”</p>
                  <p className="mt-2 text-sm font-medium">– Customer {i + 1}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </Container>
  </section>
);

export default Reviews;
