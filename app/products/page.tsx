import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Container, Grid } from "@radix-ui/themes";
import Aside from "./aside";
import Products from "./products";

const ProductPage = () => {
  return (
    <>
      <Navbar />
      <Container className="bg-gray-100">
        <Grid columns={{ initial: "1", md: "250px 1fr" }} my="9" gap="6">
          <Aside />
          <Products />
        </Grid>
      </Container>
      <ContactSection />
      <Footer />
    </>
  );
};

export default ProductPage;
