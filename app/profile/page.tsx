import getSession from "@/actions/get-session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@radix-ui/themes";
import { Pencil } from "lucide-react";
import Address from "./address";

export const dynamic = "force-dynamic";

async function Profile() {
  const session = await getSession();

  if (!session) return null;

  return (
    <Container className="py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={session.image} />
                  <AvatarFallback className="text-3xl font-medium">
                    {session.firstName}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">
                    {session.firstName} {session.lastName}
                  </h2>
                  <p className="text-muted-foreground">{session.email}</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
        <Address />
      </div>
    </Container>
  );
}

export default Profile;
