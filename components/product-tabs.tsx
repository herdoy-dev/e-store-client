import { Tabs, Text } from "@radix-ui/themes";
import { Star } from "lucide-react";

interface Specification {
  name: string;
  value: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

interface ProductTabsProps {
  description: string;
  specifications: Specification[];
  reviews: Review[];
}

const ProductTabs = ({
  description,
  specifications,
  reviews,
}: ProductTabsProps) => {
  return (
    <Tabs.Root defaultValue="description" className="mb-12">
      <Tabs.List className="mb-4">
        <Tabs.Trigger value="description">Description</Tabs.Trigger>
        <Tabs.Trigger value="specifications">Specifications</Tabs.Trigger>
        <Tabs.Trigger value="reviews">Reviews (0)</Tabs.Trigger>
      </Tabs.List>

      <div className="bg-secondary p-6 rounded-b-xl rounded-xl shadow-sm border">
        <Tabs.Content value="description">
          <Text className="text-gray-700 whitespace-pre-line">
            {description}
          </Text>
        </Tabs.Content>

        <Tabs.Content value="specifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specifications.map((spec) => (
              <div key={spec.name} className="border-b pb-2">
                <Text weight="medium" className="text-gray-600">
                  {spec.name}
                </Text>
                <Text className="text-gray-800">{spec.value}</Text>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="reviews">
          {reviews.length === 0 ? (
            <Text className="text-gray-500">No reviews yet</Text>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Text weight="bold">{review.author}</Text>
                    <Text size="1" className="text-gray-500">
                      {review.date}
                    </Text>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Text className="mt-2 text-gray-700">{review.comment}</Text>
                </div>
              ))}
            </div>
          )}
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
};

export default ProductTabs;
