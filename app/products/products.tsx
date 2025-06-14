import ProductCard from "@/components/product-card";
import Product from "@/schemas/Product";
import { Grid } from "@radix-ui/themes";

const products: Product[] = [
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

function Products() {
  return (
    <Grid
      columns={{ initial: "1", sm: "2", md: "3" }}
      gapX="4"
      gapY="8"
      p="4"
      className="bg-white rounded-2xl"
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Grid>
  );
}

export default Products;
