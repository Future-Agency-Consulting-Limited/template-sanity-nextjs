import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};

export function proxy(request: Request) {
  const country = request.headers.get("x-vercel-ip-country") ?? "UNDETECTED";

  console.log("Request to:", request.url);
  console.log(`Visitor from ${country}`);

  const response = NextResponse.next();
  response.headers.set("x-todl-geo-region", country);
  return response;
}
