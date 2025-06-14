import { NextRequest, NextResponse } from "next/server";
import getSession from "./actions/get-session";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  if (session && (pathname === "/log-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!session && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
