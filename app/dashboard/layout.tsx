import Navbar from "@/components/navbar";
import { Container, Grid } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Aside from "./aside";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Container className="px-4 bg-gray-100">
        <Grid
          columns={{ initial: "1", md: "300px 1fr" }}
          gap="6"
          className="h-[calc(100vh-80px)]"
        >
          <div className="bg-white overflow-y-auto">
            <Aside />
          </div>
          <div className="p-4 bg-white overflow-y-auto">{children}</div>
        </Grid>
      </Container>
    </>
  );
}

export default Layout;
