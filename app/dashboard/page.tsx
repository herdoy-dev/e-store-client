import Navbar from "@/components/navbar";
import { Container, Grid } from "@radix-ui/themes";
import React from "react";

function Dashboard() {
  return (
    <>
      <Navbar />
      <Container className="px-4 bg-gray-100">
        <Grid
          columns={{ initial: "1", md: "350px 1fr" }}
          gap="6"
          className="h-[calc(100vh-80px)]"
        >
          <div className="bg-white p-4">aside</div>
          <div className="p-4 bg-white">dashboard</div>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
