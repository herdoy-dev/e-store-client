import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default ProfileLayout;
