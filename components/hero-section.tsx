import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => (
  <section className="text-center py-24 bg-gradient-to-br from-blue-100 to-purple-200">
    <h2 className="text-4xl font-extrabold mb-4">
      Discover Our Amazing Products
    </h2>
    <p className="text-lg text-muted-foreground mb-6">
      Quality, Performance, and Style
    </p>

    <Link className={buttonVariants({ size: "lg" })} href="/products">
      Explore Now
    </Link>
  </section>
);

export default HeroSection;
