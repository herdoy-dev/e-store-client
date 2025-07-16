import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@radix-ui/themes";

const Reviews = () => {
  const reviews = [
    {
      text: "Excellent quality! The product exceeded my expectations and arrived sooner than expected.",
      author: "Sarah J.",
      role: "Premium Member",
    },
    {
      text: "Amazing customer support! They helped me resolve an issue within minutes.",
      author: "Michael T.",
      role: "First-time Buyer",
    },
    {
      text: "Would definitely buy again! The quality-price ratio is unbeatable.",
      author: "Emma L.",
      role: "Repeat Customer",
    },
    {
      text: "Fast shipping and perfect packaging. Everything arrived in mint condition.",
      author: "David K.",
      role: "Verified Buyer",
    },
    {
      text: "The attention to detail is remarkable. Clearly a company that cares about its products.",
      author: "Olivia M.",
      role: "Design Professional",
    },
  ];

  return (
    <section id="reviews" className="py-16 bg-gray-50 dark:bg-gray-900">
      <Container className="px-4 sm:px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our Customers Say
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to
            say about us.
          </p>
        </div>

        <Carousel
          className="w-full max-w-7xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, i) => (
              <CarouselItem
                key={i}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="h-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                        “{review.text}”
                      </p>
                    </div>
                    <div className="mt-auto">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {review.author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex justify-center gap-4">
            <CarouselPrevious className="static sm:relative transform-none" />
            <CarouselNext className="static sm:relative transform-none" />
          </div>
        </Carousel>
      </Container>
    </section>
  );
};

export default Reviews;
