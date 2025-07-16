import AuthNav from "@/components/auth-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <>
      <AuthNav />
      <div className="flex justify-center items-center px-4 py-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <p className="text-sm text-center text-muted-foreground mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
