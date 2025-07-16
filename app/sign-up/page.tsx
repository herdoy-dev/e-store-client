import AuthNav from "@/components/auth-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "./signup-form";

export default function SignUpPage() {
  return (
    <>
      <AuthNav />
      <div className="flex justify-center items-center px-4 py-20">
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
    </>
  );
}
