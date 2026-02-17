import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  (await draftMode()).disable();

  // In some hosting environments, request.url might default to localhost.
  // We prioritize the 'Host' header to ensure we redirect to the correct domain.
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? "https";

  if (host) {
    return NextResponse.redirect(`${protocol}://${host}/`);
  }

  return NextResponse.redirect(new URL("/", request.url));
}
