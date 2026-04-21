"use client";

import Script from "next/script";
import { env } from "@/env/client";

/**
 * Load HubSpot tracking script
 */
export default function HubspotTracking() {
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
