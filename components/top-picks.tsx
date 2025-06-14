import Product from "@/schemas/Product";
import { Container, Grid } from "@radix-ui/themes";
import ProductCard from "./product-card";

const topPicks: Product[] = [
  {
    _id: "a",
    title: "Product 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nostrum.",
    image: "/couch.jpg",
    price: 120,
  },
  {
    _id: "b",
    title: "Product 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nostrum.",
    image: "/jacket.jpg",
    price: 120,
  },
  {
    _id: "c",
    title: "Product 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nostrum.",
    image: "/couch.jpg",
    price: 120,
  },
  {
    _id: "d",
    title: "Product 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nostrum.",
    image: "/jacket.jpg",
    price: 120,
  },
  {
    _id: "e",
    title: "Product 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nostrum.",
    image: "/couch.jpg",
    price: 120,
  },
  {
    _id: "f",
    title: "Product 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nostrum.",
    image: "/jacket.jpg",
    price: 120,
  },
];

const TopPicks = () => (
  <section className="py-16 bg-blue-500/10">
    <Container className="px-4">
      <h3 className="text-2xl font-semibold mb-8 text-center">Top Picks</h3>
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6">
        {topPicks.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </Container>
  </section>
);

export default TopPicks;
