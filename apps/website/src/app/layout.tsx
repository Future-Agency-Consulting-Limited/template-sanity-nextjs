import { env } from "@/env/client";
import { SanityLive } from "@/sanity/lib/live";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import "@/globals.css";
import { Suspense } from "react";
import { DisableDraftMode } from "@/components/util/DisableDraftMode";
import HubspotTracking from "@/components/util/HubspotTracking";
import HubspotPageView from "@/components/util/HubspotPageView";
import { HubspotProvider } from "next-hubspot";
import { GoogleTagManager } from "@next/third-parties/google";
import { getSiteSettings } from "@/sanity/lib/siteSettings";

export function generateMetadata(): Metadata {
  return {
    verification: {
      google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  //coerce null to undefined
  const googleTagManagerId: string | undefined =
    siteSettings?.googleTagManagerId ?? undefined;

  return (
    <html lang="en">
      <body>
        {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}
        <HubspotTracking />
        <Suspense fallback={null}>
          <HubspotPageView />
        </Suspense>
        <HubspotProvider>
          {/*<Header />*/}
          <main className="bg-white min-h-screen">
            {children}
            <SanityLive
              waitFor={
                env.NEXT_PUBLIC_SANITY_LIVE_CACHE_INVALIDATE === true
                  ? "function"
                  : undefined
              }
            />
            {(await draftMode()).isEnabled && (
              <>
                <DisableDraftMode />
                <VisualEditing />
              </>
            )}
          </main>
          {/*<Footer />*/}
        </HubspotProvider>
      </body>
    </html>
  );
}
