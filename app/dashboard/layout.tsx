import { Grid } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Aside from "./aside";
import Topbar from "./topbar";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="bg-gray-100 h-dvh">
        <Grid
          columns={{ initial: "1", md: "300px 1fr" }}
          className="h-full lg:h-dvh"
          gap="5"
        >
          <div className="bg-white overflow-y-auto hidden lg:block">
            <Aside />
          </div>
          <div className="lg:overflow-y-auto space-y-6">
            <Topbar />
            <div className="bg-white px-4 py-10">{children}</div>
          </div>
        </Grid>
      </div>
    </>
  );
}

export default Layout;
