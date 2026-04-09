import { DisableDraftMode } from "@/components/disable-draft-mode";
import { env } from "@/env/client";
import { SanityLive } from "@/sanity/lib/live";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import "@/globals.css";
import HubSpotTracking from "@/components/HubSpotTracking";
import { Suspense } from "react";
import HubSpotPageView from "@/components/HubSpotPageView";

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
  return (
    <html lang="en">
      <body>
        {/*<Header />*/}
        <main className="bg-white min-h-screen">
          {children}
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
        </main>
        {/*<Footer />*/}
        <HubSpotTracking />
        <Suspense fallback={null}>
          <HubSpotPageView />
        </Suspense>
      </body>
    </html>
  );
}
