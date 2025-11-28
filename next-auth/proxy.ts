import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const pathname = new URL(request.nextUrl).pathname;

  if (pathname == "/") return NextResponse.redirect(new URL('/dashboard', request.url));
}

export const config = {
  matcher: ["/dashboard", "/"],
};
