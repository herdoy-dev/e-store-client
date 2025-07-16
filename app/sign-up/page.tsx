import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./signup-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center md:min-h-screen px-4 py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <p className="text-sm text-center text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/log-in" className="text-primary hover:underline">
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
