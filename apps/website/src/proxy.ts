import { NextRequest, NextResponse } from "next/server";

type CountryRegionEntry = {
  countryCode: string;
  countryName: string;
  region: "emea" | "apac";
};

const COUNTRY_TO_REGION: CountryRegionEntry[] = [
  { countryCode: "AU", countryName: "Australia", region: "apac" },
  { countryCode: "NZ", countryName: "New Zealand", region: "apac" },
  { countryCode: "JP", countryName: "Japan", region: "apac" },
  { countryCode: "SG", countryName: "Singapore", region: "apac" },
  { countryCode: "IN", countryName: "India", region: "apac" },
  { countryCode: "HK", countryName: "Hong Kong", region: "apac" },
  { countryCode: "KR", countryName: "South Korea", region: "apac" },
  { countryCode: "TW", countryName: "Taiwan", region: "apac" },
  { countryCode: "MY", countryName: "Malaysia", region: "apac" },
  { countryCode: "PH", countryName: "Philippines", region: "apac" },
  { countryCode: "TH", countryName: "Thailand", region: "apac" },
  { countryCode: "ID", countryName: "Indonesia", region: "apac" },
  { countryCode: "VN", countryName: "Vietnam", region: "apac" },
  { countryCode: "CN", countryName: "China", region: "apac" },
  { countryCode: "MO", countryName: "Macau", region: "apac" },
  { countryCode: "BN", countryName: "Brunei", region: "apac" },
  { countryCode: "KH", countryName: "Cambodia", region: "apac" },
  { countryCode: "LA", countryName: "Laos", region: "apac" },
  { countryCode: "MM", countryName: "Myanmar", region: "apac" },
  { countryCode: "NP", countryName: "Nepal", region: "apac" },
  { countryCode: "LK", countryName: "Sri Lanka", region: "apac" },
  { countryCode: "BD", countryName: "Bangladesh", region: "apac" },
  { countryCode: "PK", countryName: "Pakistan", region: "apac" },
  { countryCode: "AF", countryName: "Afghanistan", region: "apac" },
  { countryCode: "BT", countryName: "Bhutan", region: "apac" },
  { countryCode: "MV", countryName: "Maldives", region: "apac" },
  { countryCode: "PG", countryName: "Papua New Guinea", region: "apac" },
  { countryCode: "FJ", countryName: "Fiji", region: "apac" },
  { countryCode: "SB", countryName: "Solomon Islands", region: "apac" },
  { countryCode: "VU", countryName: "Vanuatu", region: "apac" },
  { countryCode: "WS", countryName: "Samoa", region: "apac" },
  { countryCode: "TO", countryName: "Tonga", region: "apac" },
  { countryCode: "NC", countryName: "New Caledonia", region: "apac" },
  { countryCode: "PF", countryName: "French Polynesia", region: "apac" },
];

function getRegionFromCountry(country: string) {
  const entry = COUNTRY_TO_REGION.find(
    (item) => item.countryCode === country.toUpperCase(),
  );

  return entry?.region ?? "emea";
}

function stripRegionPrefix(pathname: string) {
  return pathname.replace(/^\/(emea|apac)(?=\/|$)/, "") || "/";
}

function hasRegionPrefix(pathname: string) {
  return /^\/(emea|apac)(?=\/|$)/.test(pathname);
}

export const config = {
  matcher: [
    /*
      Match all request paths except for:
      - _next static files
      - _next image files
      - api routes
      - files with an extension
      - favicon.ico
    */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};

export function proxy(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") ?? "UNDETECTED";
  const region = getRegionFromCountry(country);

  const { pathname } = request.nextUrl;

  if (hasRegionPrefix(pathname)) {
    return NextResponse.next();
  }

  const cleanPathname = stripRegionPrefix(pathname);
  const url = request.nextUrl.clone();
  url.pathname = `/${region}${cleanPathname === "/" ? "" : cleanPathname}`;

  return NextResponse.redirect(url);
}
