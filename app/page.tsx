import CallToAction from "@/components/call-to-action";
import ContactSection from "@/components/contact-section";
import FeaturedProducts from "@/components/featured-products";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import TopPicks from "@/components/top-picks";
import Reviews from "@/components/reviews";
import Navbar from "@/components/navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TopPicks />
      <FeaturedProducts />
      <CallToAction />
      <Reviews />
      <ContactSection />
      <Footer />
    </>
  );
}
