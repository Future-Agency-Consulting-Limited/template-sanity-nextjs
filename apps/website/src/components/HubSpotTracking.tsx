"use client";

import Script from "next/script";
import { env } from "@/env/client";

export default function HubSpotTracking() {
  if (!env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID) {
    return null;
  }

  return (
    <Script
      id="hs-script-loader"
      src={`//js.hs-scripts.com/${env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
      strategy="afterInteractive"
    />
  );
}
