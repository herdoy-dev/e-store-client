import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

function ProductLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default ProductLayout;
