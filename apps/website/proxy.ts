import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // match all page routes, excluding api routes and static files (or any file with an extension)
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};

export function proxy(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") ?? "UNKNOWN";

  console.log(`Visitor from ${country}`);

  const response = NextResponse.next();
  response.headers.set("x-todl-geo-region", country);
  return response;
}
