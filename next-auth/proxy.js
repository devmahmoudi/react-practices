export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
// export function proxy(request) {
//   return NextResponse.next();
// }

export const config = {
  matcher: ["/dashboard"],
};
