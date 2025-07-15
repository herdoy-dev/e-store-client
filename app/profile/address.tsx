"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAddress from "@/hooks/useAddress";
import { useState } from "react";
import AddressForm from "./address-form";

function Address() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: address } = useAddress();
  return (
    <div className="w-full md:w-2/3 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Shipping Address</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <AddressForm initialData={address?.data} />
          ) : address ? (
            <div className="space-y-2">
              <p className="font-medium">{address.data.street}</p>
              <p>
                {address.data.city}, {address.data.state}{" "}
                {address.data.postalCode}
              </p>
              <p>{address.data.country}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No address saved yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Address;
