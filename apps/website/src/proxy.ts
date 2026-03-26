// import { NextResponse } from "next/server";
// //import type { NextRequest } from "next/server";
//
// export const config = {
//   runtime: "nodejs", // edge not supported for proxy in Next.js 16
//   // match all page routes, excluding api routes and static files (or any file with an extension)
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
//   ],
// };
//
// export function proxy(request: Request) {
//   const country = request.headers.get("x-vercel-ip-country") ?? "UNDETECTED";
//
//   console.log("Request to:", request.url);
//   console.log(`Visitor from ${country}`);
//
//   const response = NextResponse.next();
//   response.headers.set("x-todl-geo-region", country);
//   return response;
// }

export const config = {};

export function proxy(request: Request) {
  console.log("Request to:", request.url);
  return new Response("Logging request URL from Middleware");
}
