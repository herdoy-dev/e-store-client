import { Grid } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Aside from "./aside";
import Topbar from "./topbar";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="px-4 bg-gray-100">
        <Grid
          columns={{ initial: "1", md: "300px 1fr" }}
          gap="6"
          className="h-dvh"
        >
          <div className="bg-white overflow-y-auto">
            <Aside />
          </div>
          <div className="p-4 overflow-y-auto space-y-6">
            <Topbar />
            <div className="bg-white">{children}</div>
          </div>
        </Grid>
      </div>
    </>
  );
}

export default Layout;
