import { DisableDraftMode } from "@/components/disable-draft-mode";
import { env } from "@/env/client";
import { SanityLive } from "@/sanity/lib/live";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import "@/globals.css";

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
      </body>
    </html>
  );
}
