import Link from "next/link";
import { buttonVariants } from "./ui/button";

const CallToAction = () => (
  <section className="py-20 bg-primary text-white text-center">
    <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
    <p className="mb-6">Join thousands of satisfied customers now.</p>
    <Link className={buttonVariants({ variant: "secondary" })} href="/contact">
      Contact Us
    </Link>
  </section>
);

export default CallToAction;
